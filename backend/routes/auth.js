//Modulos internos
const express = require('express');
const router = express.Router();
//Modulos creados
const { Usuario } = require('../models/usuario');
//Crear rutas
router.post("/", async(request,response)=>{
    //Buscar el usuario en BD
    const usuario = await Usuario.findOne({correo:request.body.correo});
    //Si no existe
    if(!usuario) return response.status(400).send('Correo o contraseña incorrectos');
    //Si existe
    if(usuario.contrasenia !== request.body.contrasenia) return response.status(400).send('Correo o contraseña incorrectos');
    //Generar el token
    const jwt = usuario.generateJWT();
    response.status(200).send({jwt});
});
module.exports = router