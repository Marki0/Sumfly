import React, { useState } from 'react';
import axios from 'axios';
import './estilos.css';

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
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <div className="input-container">
                    <div className="input-group">
                        <label>Nombre de Usuario:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Contraseña:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
