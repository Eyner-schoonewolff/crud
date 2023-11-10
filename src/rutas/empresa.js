const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const usuarios = require('../query');
const verificar_token = require('../servicios/jwt-token');


router.get('/', async (req, res) => {
    res.json({ '/': 'Bienvenido a mi APi' })
});

router.get('/usuarios', verificar_token, async (req, res) => {
    try {
        const usuario = await usuarios.obtener_usuarios();
        if (usuario.length != 0) {
            return res.status(200).json({ 'usuarios': usuario });
        }
        return res.status(200).json({ 'informacion': 'No existen datos' })
    } catch (error) {
        res.status(500).json({ error: 'NO se pudo encontrar los usuarios' })
    }
});

router.post('/crear_usuario', verificar_token, async (req, res) => {
    const { nombre, cedula, id_departamento } = req.body;
    const obtener_cedu = await usuarios.obtener_cedula(cedula);
    try {
        if (obtener_cedu) {
            const resultado = await usuarios.guardar_empleado(nombre, cedula, id_departamento);
            res.json({ mensaje: 'Empleado guardado exitosamente', resultado });
        } else {
            res.json({ mensaje: 'ya existe un usuario con esta cedula' });

        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar empleado', error: error.message });
    }
});

router.put('/actualizar_usuario', verificar_token, async (req, res) => {
    const { nombre, cedula, id_departamento, id } = req.body;
    const usuario = await usuarios.existe(id);
    try {
        if (!usuario) {
            const resultado = await usuarios.actualizar_empleado(nombre, cedula, id_departamento, id);
            res.json({ mensaje: 'Empleado actualizado exitosamente', resultado });
        } else {
            res.status(404).json({ mensaje: 'El empleado no se encontro' })
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar empleado', error: error.message });
    }
})
router.put('/desactivar_usuario', verificar_token, async (req, res) => {
    const { estado, id } = req.body;

    const usuario = await usuarios.existe(id);
    console.log(usuario)
    try {
        if (usuario) {
            res.status(404).json({ mensaje: 'El empleado no se encontro' })
        } else {
            const estado_usuario = await usuarios.deshabilitar(estado, id);
            res.json({ mensaje: 'estado actualizado', estado_usuario });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar empleado', error: error.message });
    }
})


router.post('/login', async (req, res) => {
    const { nombre, cedula } = req.body
    const login = await usuarios.login(nombre, cedula)
    const verificar_usuario = login.usuario
    try {
        if (verificar_usuario) {
            const token = jwt.sign({ _id: login.id }, process.env.TOKEN_SECRET, { expiresIn: 300 });
            res.header('auth-token', token).json({
                session: {
                    'id': login.id,
                    'nombre': login.nombre,
                    'login': login.usuario,
                },
                data: { token }
            })

        } else if (!login) {
            console.log(login)
            res.status(404).json({
                mensaje: {
                    'login': login
                }
            })
        }

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesion', error: error.message });
    }
})




module.exports = router;