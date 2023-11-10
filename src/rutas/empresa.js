const express = require('express')

const router = express.Router();
const usuarios = require('../query');


router.get('/', async (req, res) => {
    res.json({ '/': 'Bienvenido a mi APi' })
});

router.get('/usuarios', async (req, res) => {
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

router.post('/crear_usuario', async (req, res) => {
    const { nombre, cedula, id_departamento } = req.body;

    try {
        const resultado = await usuarios.guardar_empleado(nombre, cedula, id_departamento);
        res.json({ mensaje: 'Empleado guardado exitosamente', resultado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar empleado', error: error.message });
    }
});

router.put('/actualizar_usuario', async (req, res) => {
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
router.put('/desactivar_usuario', async (req, res) => {
    const { estado, id } = req.body;

    const usuario = await usuarios.existe(id);

    try {
        if (!usuario) {
            const estado_usuario = await usuarios.deshabilitar(estado, id);
            res.json({ mensaje: 'estado actualizado', estado_usuario });
        } else {
            res.status(404).json({ mensaje: 'El empleado no se encontro' })
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar empleado', error: error.message });
    }
})





module.exports = router;