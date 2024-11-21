import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './estilos.css';
import logo from '../assets/images/3v2.png'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú desplegable
    const [confirmLogout, setConfirmLogout] = useState(false); // Estado para confirmar cierre de sesión
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Cambiar el estado del menú
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Cerrar el menú al seleccionar un enlace
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        navigate('/'); // Redirigir a la página de inicio
    };

    const isLoggedIn = !!localStorage.getItem('token'); // Verificar si hay un token

    const handleDashboardClick = () => {
        if (isLoggedIn) {
            navigate('/dashboard'); // Redirigir al dashboard si está logueado
        } else {
            navigate('/login'); // Redirigir al login si no está logueado
        }
    };

    const handleLogoutClick = () => {
        setConfirmLogout(true); // Mostrar confirmación de cierre de sesión
    };

    const handleConfirmLogout = (confirm) => {
        if (confirm) {
            handleLogout(); // Cerrar sesión si se confirma
        }
        setConfirmLogout(false); // Ocultar confirmación
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
                <li>
                    <a href="#" onClick={handleDashboardClick}>Dashboard</a>
                </li>
                {isLoggedIn ? (
                    <li>
                        {confirmLogout ? (
                            <div className="logout-confirmation">
                                <span>¿Deseas cerrar sesión?</span>
                                <button onClick={() => handleConfirmLogout(true)} className="confirm-button">Sí</button>
                                <button onClick={() => handleConfirmLogout(false)} className="cancel-button">No</button>
                            </div>
                        ) : (
                            <Link to="#" onClick={handleLogoutClick} className="logout-link">Cerrar Sesión</Link>
                        )}
                    </li>
                ) : (
                    <li><Link to="/login" onClick={handleLinkClick}>Iniciar Sesión</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
