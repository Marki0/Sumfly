import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/estilos.css';
import AgregarGasto from './components/agregarGasto';
import AgregarIngreso from './components/agregarIngreso';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                <Route path="/" element={
                        <div className="inicio">
                            <h1>Sumfly App</h1>
                            <div className="form-container">
                                <AgregarGasto />
                                <AgregarIngreso />
                            </div>
                        </div>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
