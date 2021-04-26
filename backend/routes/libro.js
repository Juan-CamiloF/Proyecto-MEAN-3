//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados
const { Usuario } = require("../models/usuario");
const { Libro } = require("../models/libro");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");
const { request } = require("http");
//Crear rutas
//Subir libro
router.post(
  "/agregarLibro",
  cargarArchivo.single("foto"),
  auth,
  async (request, response) => {
    //Guardar como url la foto
    const url = request.protocol + "://" + request.get("host");
    //Buscar si existe el usuario
    const usuario = await Usuario.findById(request.usuario._id);
    //Si no existe
    if (!usuario) return response.status(400).send("El usuario no existe");
    //Si existe
    let rutaImg = null;
    if (request.file.filename) {
      rutaImg = url + "/public/" + request.file.filename;
    } else {
      rutaImg = null;
    }
    //Crear el libro con imagen
    const libro = new Libro({
      idUsuario: usuario._id,
      foto: rutaImg,
      nombre: request.body.nombre,
      editorial: request.body.editorial,
      fechaDePublicacion: request.body.fechaDePublicacion,
      descripcion: request.body.descripcion,
    });
    //Guardar el libro
    const result = await libro.save();
    response.status(200).send(result);
  }
);
//Actualizar datos
router.put("/actualizar",auth, async (request, response) => {
    //Buscar el usuario
    const usuario = await Usuario.findById(request.usuario._id);
    //Si existe
    if (!usuario) return response.status(400).send("El usuario no existe");
    const libro = await Libro.findByIdAndUpdate(
      request.body._id,
      {
        idUsuario: usuario._id,
        nombre: request.body.nombre,
        editorial: request.body.editorial,
        fechaDePublicacion: request.body.fechaDePublicacion,
        descripcion: request.body.descripcion,
      },
      {
        new: true,
      }
    );
    if (!libro) return response.status(400).send("El libro no existe");
    const save = await libro.save();
    response.status(200).send(libro);
  }
);
//Actualizar libro
router.put("/actualizarImg", auth, cargarArchivo.single('foto'), async(request,response)=>{
  //Buscar el usuario
  const usuario = await Usuario.findById(request.usuario._id);
  //Si no existe
  if(!usuario) return response.status(400).send('El usuario no existe');
  //Guardar como url la foto
  const url = request.protocol + "://" + request.get("host");
  //Imagen 
  let rutaImg = null;
    if (request.file.filename) {
      rutaImg = url + "/public/" + request.file.filename;
    } else {
      rutaImg = null;
    }
  const libro = await Libro.findByIdAndUpdate(request.body._id,
    {
      foto:rutaImg
    },
    {
      new:true,
    });
    if(!libro) return response.status(400).send('EL libro no existe');
    const save = await libro.save();
    response.status(200).send(libro);
})
//Listar los libros propios
router.get("/misLibros", auth, async (request, response) => {
  //Buscar el usuario
  const usuario = await Usuario.findById(request.usuario._id);
  //Si no existe
  if (!usuario) return response.status(400).send("El usuario no existe");
  //Si existe traer los libros
  const libros = await Libro.find({ idUsuario: request.usuario._id }).sort({
    nombre: 1,
  });
  //Mostrar los libros
  response.status(200).send(libros);
});

//Listar todos los libros
router.get("/libros", auth, async (request, response) => {
  //Buscar el usuario
  const usuario = await Usuario.findById(request.usuario._id);
  //Si no existe
  if (!usuario) return response.status(400).send("El usuario no existe");
  //Si existe
  const libros = await Libro.find({}, function(err,libros){
    Usuario.populate(libros,{path:'idUsuario'},function(err,libros){
      response.status(200).send(libros)
    })
  }).sort({ nombre: 1 });
});
//Eliminar libros propios
router.delete("/borrar/:_id", auth, async (request, response) => {
  //Buscar el usuario
  const usuario = await Usuario.findById(request.usuario._id);
  //Si no existe
  if (!usuario) return response.status(400).send("El usuario no existe");
  //Si existe
  // await unlinkAsync(request.file.path);
  const libro = await Libro.findByIdAndDelete(request.params._id);
  if (!libro) return response.status(400).send("No existe el libro");
  response.status(200).send({ message: "Libro eliminado" });
});
//Eliminar la imagen
router.delete("/borrarImg/:nombreImg", auth, async (request, response) => {
  //Modulo interno FIle Systems
  const fs = require("fs");
  //Si no hay una imagen
  if (!request.params.nombreImg)
    return response.status(400).send("No hay archivo");
  //Si hay una imagen
  try {
    fs.unlinkSync("./public" + "/" + request.params.nombreImg);
    return response.status(200).send({message:'Imagen eliminada'});
  } catch (err) {
    return response.status(400).send("Algo paso");
  }
});
module.exports = router;
