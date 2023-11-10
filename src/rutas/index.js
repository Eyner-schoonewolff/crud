const express = require('express');
var createError = require("http-errors");
const app_router = require('../rutas/empresa');

function router_api(app){
    router = express.Router();
    app.use('/',app_router);

    app.use(function (req, res, next) {
        next(createError(404));
    });
    
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: req.app.get("env") === "development" ? err : {},
        });
    });
    
}

module.exports = router_api;