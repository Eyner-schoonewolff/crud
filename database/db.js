const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"empleados"
});

conexion.connect((err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("se ha conectado")
});

module.exports = conexion;