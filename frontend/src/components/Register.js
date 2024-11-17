import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { username, email, password });
            alert('Registro exitoso');
            // Redirigir al login después de registrarse
            window.location.href = '/login';
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al registrar usuario: ' + (error.response ? error.response.data : 'Error desconocido'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <div>
                <label>Nombre de Usuario:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
