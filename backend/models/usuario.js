//Modulos internos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Modulos creados
const esquemaUsuario = mongoose.Schema({
  nombre: String,
  edad: String,
  correo: String,
  contrasenia: String,
  foto:String,
});
//Crear el esquema del usuario
esquemaUsuario.methods.generateJWT = function(){
  return jwt.sign(
    {
      _id: this._id,
      nombre: this.nombre,
      correo: this.correo,
    },
    "clave"
  );
};
//Exportar el modelo
const Usuario = mongoose.model("usuario",esquemaUsuario);
module.exports.Usuario = Usuario; 

