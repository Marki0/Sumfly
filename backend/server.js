const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('No se proporcionó token');

    jwt.verify(token, 'tu_secreto', (err, decoded) => {
        if (err) return res.status(500).send('Token no válido');
        req.userId = decoded.id; // Guardar el ID del usuario en la solicitud
        next();
    });
};

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // Encriptar la contraseña
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).send('Error al registrar usuario');
        }
        res.send('Usuario registrado');
    });
});

// Ruta para autenticar un usuario
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(401).send('Usuario no encontrado');

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Contraseña incorrecta');

        // Generar un token JWT
        const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ auth: true, token });
    });
});

// Ruta para obtener todos los gastos
app.get('/gastos', verifyToken, (req, res) => {
    const query = 'SELECT * FROM gastos WHERE user_id = ?';
    db.query(query, [req.userId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para agregar un gasto
app.post('/gastos', verifyToken, (req, res) => {
    const { categoria, monto, fecha } = req.body;
    const query = 'INSERT INTO gastos (categoria, monto, fecha, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [categoria, monto, fecha, req.userId], (err, result) => {
        if (err) {
            console.error('Error al agregar gasto:', err);
            return res.status(500).send('Error al agregar gasto');
        }
        res.send('Gasto agregado');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
