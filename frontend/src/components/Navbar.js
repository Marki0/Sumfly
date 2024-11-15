import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Sumfly</h1>
            <div className="navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;
