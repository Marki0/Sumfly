import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './estilos.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            setMessage('Login exitoso');
            localStorage.setItem('token', response.data.token);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setMessage('Error al iniciar sesión: ' + (error.response ? error.response.data : 'Error desconocido'));
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-container">
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Contraseña:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <div className="text-container">
                    <button type="submit">Iniciar Sesión</button>
                    <p>
                        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                    </p>
                    {message && <p className="success-message">{message}</p>}
                </div>
            </form>
        </div>
    );
};

export default Login;
