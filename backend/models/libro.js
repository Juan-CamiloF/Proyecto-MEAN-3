// Modulos internos
const mongoose = require('mongoose');
//Crear modelos
const esquemaLibro = new mongoose.Schema({
    idUsuario:String,
    foto:String,
    nombre:String,
    editorial:String,
    fechaDePublicacion:Date,
    descripcion:String
});
//Exportar el modelo
const Libro = mongoose.model("libro",esquemaLibro);
module.exports.Libro = Libro;