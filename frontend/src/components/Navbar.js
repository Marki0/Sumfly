import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Cambiar el estado del menú
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Cerrar el menú al seleccionar un enlace
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <h1>Sumfly App</h1>
            <div className="menu-icon" onClick={toggleMenu}>
                {/* Icono de hamburguesa */}
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            </div>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
                <li><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
                <li><Link to="/login" onClick={handleLinkClick}>Iniciar Sesión</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
