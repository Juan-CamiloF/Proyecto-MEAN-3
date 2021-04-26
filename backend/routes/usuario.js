//Modulos internos
const express = require("express");
const router = express.Router();
//Modulos creados
const { Usuario } = require("../models/usuario");
const auth = require("../middleware/auth");
//Creación de las rutas
//Registrar el usuario
router.post("/", async (request, response) => {
  //Buscar el usuario en base de datos
  let usuario = await Usuario.findOne({ correo: request.body.correo });
  //Si existe
  if (usuario) return response.status(400).send("El usuario ya existe");
  //Si no existe se registra
  usuario = new Usuario({
    nombre: request.body.nombre,
    edad: request.body.edad,
    correo: request.body.correo,
    contrasenia: request.body.contrasenia,
  });
  //Guardar el usuario
  const save = await usuario.save();
  //Generar token
  const jwt = usuario.generateJWT();
  response.status(200).send({ jwt });
});

module.exports = router;
