const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

const app = express()

const puerto = 3000;
const route = require('./src/rutas/index')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

route(app);

app.listen(puerto, () => {
    console.log(`Conectado a http://localhost:${puerto}`);
});