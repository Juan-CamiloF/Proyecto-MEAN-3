//Modulos internos
const multer = require("multer");
//Ruta donde se van a guardar las imagenes
const directorio = "./public";
//DiskStorage
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, directorio);
  },
  filename: (request, file, callback) => {
    const filename =
      Date.now() +
      "-" +
      file.originalname.toLocaleLowerCase().split(" ").join("-");
      callback(null,filename);
  },
});
//Cargar archivos
const cargarArchivo = multer({
  storage: storage,
  fileFilter: (request, file, callback) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Formato no valido"));
    }
  },
});
module.exports = cargarArchivo;