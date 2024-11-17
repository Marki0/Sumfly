import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        window.location.href = '/login'; // Redirigir al login
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Verificar si hay un token

    return (
        <nav className="navbar">
            <h1>Sumfly</h1>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/dashboard">Dashboard</Link>
                {isLoggedIn ? ( // Mostrar "Cerrar Sesión" si está logueado
                    <Link to="#" onClick={handleLogout} className="logout-link">Cerrar Sesión</Link>
                ) : ( // Mostrar "Login" si no está logueado
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
