const { resolve } = require('path');
const { rejects } = require('assert');
const conexion = require('../database/db');
const { error } = require('console');

const obtener_usuarios = () => {
    return new Promise((resolve, rejects) => {
        const usuarios = 'SELECT * FROM usuario'
        conexion.query(usuarios, (error, usuarios) => {
            if (error) {
                rejects(error)
            } else {
                resolve(usuarios)
            }
        });
    });
}

const guardar_empleado = (nombre, cedula, id) => {
    return new Promise((resolve, rejects) => {
        const crear_usuario = 'INSERT INTO usuario (nombre,cedula,id_departamento) VALUES (?,?,?)';
        const datos_usuario = [nombre, cedula, id]

        conexion.query(crear_usuario, datos_usuario,
            (error) => {
                if (error) {
                    rejects(error)
                } else {
                    resolve({
                        'nombre': nombre,
                        'cedula': cedula,
                        'id': id
                    });
                }
            });
    });
}

const existe = (id_usuario) => {
    return new Promise((resolve, rejects) => {
        const query = 'SELECT * FROM usuario WHERE id = ?'
        conexion.query(query, [id_usuario], (err, usuario) => {
            if (err) {
                rejects(err);
            } else {
                const user = usuario.length == 0;
                resolve(user);
            }
        });
    });
}

const actualizar_empleado = (nombre, cedula, id_departamento, id) => {
    return new Promise((resolve, rejects) => {
        const query = 'UPDATE usuario SET nombre = ?, cedula = ?, id_departamento = ? WHERE id = ?'
        const actualizar_datos = [nombre, cedula, id_departamento, id];

        conexion.query(query, actualizar_datos, (error) => {
            if (error) {
                rejects(error)
            } else {
                resolve({
                    'nombre': nombre,
                    'cedula': cedula,
                    'id': id
                });
            }
        });
    });
}
const deshabilitar = (estado, id_usuario) => {
    return new Promise((resolve, rejects) => {
        const query = 'UPDATE usuario SET id_estado = ? WHERE id = ?'
        const desactivar_usuario = [estado, id_usuario]
        conexion.query(query, desactivar_usuario, (error) => {
            if (error) {
                rejects(error)
            } else {
                resolve(estado);
            }
        });
    });
}


module.exports = { obtener_usuarios, guardar_empleado, actualizar_empleado, existe, deshabilitar }