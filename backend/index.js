//Modulos internos
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//Modulos creados
const usuario = require("./routes/usuario");
const auth = require('./routes/auth');
const libro = require("./routes/libro");
//Crear la aplicación
const app = express();

//Manejo de la aplicación

app.use(cors());
app.use(express.json());
app.use("/api/registro", usuario);
app.use("/api/inicio", auth);
app.use("/api/libro",libro);
app.use("/public",express.static('public'));

//El puerto de la app
const port = process.env.PORT || 3000;
//Decirle a la aplicación que escuche
app.listen(port, () => {
  console.log("Se esta ejecutando en el puerto", port);
});
//Conexion a la base de datos
mongoose
  .connect(" mongodb://127.0.0.1:27017/proyecto3", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Base de datos funcionando"))
  .catch((err) => console.log("Algo salio mal ", err));
