const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'gastos_db'
});

// Conexión a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los gastos
app.get('/gastos', (req, res) => {
    const query = 'SELECT * FROM gastos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rutas para manejar gastos
app.post('/gastos', (req, res) => {
    const { categoria, monto, fecha } = req.body;
    const query = 'INSERT INTO gastos (categoria, monto, fecha) VALUES (?, ?, ?)';
    db.query(query, [categoria, monto, fecha], (err, result) => {
        if (err) {
            console.error('Error al agregar gasto:', err);
            return res.status(500).send('Error al agregar gasto');
        }
        res.send('Gasto agregado');
    });
});

// Ruta para agregar un ingreso
app.post('/ingresos', (req, res) => {
    const { tipo, monto, fecha } = req.body;
    const query = 'INSERT INTO ingresos (tipo, monto, fecha) VALUES (?, ?, ?)';
    db.query(query, [tipo, monto, fecha], (err, result) => {
        if (err) {
            console.error('Error al agregar ingreso:', err);
            return res.status(500).send('Error al agregar ingreso');
        }
        res.send('Ingreso agregado');
    });
});

// ... otras rutas para obtener, editar y eliminar gastos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
