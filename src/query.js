const { resolve } = require('path');
const { rejects } = require('assert');
const conexion = require('../database/db');
const { error } = require('console');

const obtener_usuarios = () => {
    return new Promise((resolve, rejects) => {
        const usuarios = `
        SELECT u.id, u.nombre,u.cedula, d.tipo as departamento, d.descripcion, e.tipo as estado
        FROM usuario u
        JOIN departamentos d on u.id_departamento = d.id
        JOIN estado e on u.id_estado = e.id;
      `;
        conexion.query(usuarios, (error, usuarios) => {
            if (error) {
                rejects(error)
            } else {
                console.log(usuarios);
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

const obtener_cedula = (cedula_usuario) => {
    return new Promise((resolve, rejects) => {
        const query = 'SELECT * FROM usuario WHERE cedula = ?'
        conexion.query(query, [cedula_usuario], (err, respuesta_cedula) => {
            if (err) {
                rejects(err)
            } else {
                const validacion = respuesta_cedula.length == 0;
                resolve(validacion);
            }
        })
    })
}

const existe = (id_usuario) => {
    return new Promise((resolve, rejects) => {
        const query = 'SELECT * FROM usuario WHERE id = ?';
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
const login = (nombre, cedula) => {
    return new Promise((resolve, rejects) => {
        const query = 'SELECT * FROM usuario WHERE nombre = ? and cedula = ?';
        conexion.query(query, [nombre, cedula], (err, usuario) => {
            if (err) {
                rejects(err);
            }
            const user = usuario.length !== 0;
            if (user) {
                const datos = usuario[0]
                datos.usuario = user;
                resolve(datos);
            } else {
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


module.exports = { obtener_usuarios, guardar_empleado, actualizar_empleado, existe, deshabilitar, obtener_cedula, login }