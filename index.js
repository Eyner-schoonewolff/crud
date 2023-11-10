const express = require('express');
const app = express()

var bodyParser = require('body-parser')
var cors = require('cors')
const puerto = 3000;
const route = require('./src/rutas/index')
var logger = require("morgan");
require('dotenv').config()


app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(cors());
// Manejo de errores
app.use(express.json());

route(app);

app.listen(puerto, () => {
    console.log(`Conectado a http://localhost:${puerto}`);
});