//Modulos internos
const jwt = require("jsonwebtoken");
//Funcion de autenticacion
function auth(request, response, next) {
  //Traer el token de la autorizacion
  let jwtoken = request.header("Authorization");
  //Separar el bearer del token
  jwtoken = jwtoken.split(" ")[1];
  //Si no existe el token
  if (!jwtoken) return response.status(400).send("No hay token para acceso");
  //Si existe el token verificar
  try {
    const payload = jwt.verify(jwtoken, "clave");
    request.usuario = payload;
    next();
  } catch (err) {
    response.status(400).send("Token invalido");
  }
}
//Exportar la funcion
module.exports = auth;