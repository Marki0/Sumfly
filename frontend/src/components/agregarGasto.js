import React, { useState } from 'react';
import axios from 'axios';

const AgregarGasto = () => {
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/gastos', { categoria, monto, fecha }, {
                headers: {
                    'x-access-token': token
                }
            });
            setMessage('Gasto agregado correctamente');
            setCategoria('');
            setMonto('');
            setFecha('');
        } catch (error) {
            console.error('Error al agregar gasto:', error);
            setMessage('Error al agregar gasto: ' + (error.response ? error.response.data : 'Error desconocido'));
        }
    };

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <h2>Agregar Gasto</h2>
            <div className="input-container">
                <div className="input-group">
                    <label>Categoría:</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Ropa y calzado">Ropa y calzado</option>
                        <option value="Tecnologia">Tecnología</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Pagos">Pagos</option>
                        <option value="Inversiones">Inversiones</option>
                        <option value="Mascotas">Mascotas</option>
                        <option value="Emergencias">Emergencias</option>
                        <option value="Eventos especiales">Eventos especiales</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Monto:</label>
                    <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
            </div>
            <button type="submit">Agregar Gasto</button>
            {message && <p className="success-message">{message}</p>}
        </form>
    );
};

export default AgregarGasto;