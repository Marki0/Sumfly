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
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos'
});

// Conexión a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas para manejar gastos
app.post('/gastos', (req, res) => {
    const { categoria, monto, fecha } = req.body;
    const query = 'INSERT INTO gastos (categoria, monto, fecha) VALUES (?, ?, ?)';
    db.query(query, [categoria, monto, fecha], (err, result) => {
        if (err) throw err;
        res.send('Gasto agregado');
    });
});

// ... otras rutas para obtener, editar y eliminar gastos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
