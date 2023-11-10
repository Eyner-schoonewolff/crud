const express = require('express');

const app_router = require('../rutas/empresa');

function router_api(app){
    router = express.Router();
    app.use('/',app_router);
}

module.exports = router_api;