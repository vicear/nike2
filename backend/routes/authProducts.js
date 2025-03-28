const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Producto = require("../models/Productos");
require('dotenv').config();

const router = express.Router();

// Productos
// router.post("/productos", async (req, res) => {
//     try {
//         console.log("Datos recibidos:", req.body);

//         const { id, nombre, precio, descripcion, tipoProducto, productoOferta, img} = req.body; // 🔹 Aquí se cambia `username` por `name`
      
//         if (!id || !nombre || !precio || !tipoProducto) {
//             return res.status(400).json({ msg: "Todos los campos son obligatorios" });
//         }

//         let exsitente = await Producto.findOne({ where: { id } });
//         if (exsitente) {
//             return res.status(400).json({ msg: "El producto ya existe" });
//         }

    
//         res.json({ msg: "Productos creado correctamente" });
//     } catch (error) {
//         console.error("Error en el servidor:", error);
//         res.status(500).json({ msg: "Error en el servidor" });
//     }
// });

router.post("/productos", async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);

        const { nombre, precio, descripcion, tipoProducto, productoOferta, img } = req.body;

        if (!nombre || !precio || !tipoProducto) {
            return res.status(400).json({ msg: "Todos los campos obligatorios" });
        }

        let nuevoProducto = await Producto.create({
            nombre,
            precio,
            descripcion,
            tipoProducto,
            productoOferta,
            img
        });

        res.json({ msg: "Producto creado correctamente", producto: nuevoProducto });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
});





module.exports = router;
