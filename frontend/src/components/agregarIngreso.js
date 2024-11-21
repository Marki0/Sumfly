import React, { useState } from 'react';
import axios from 'axios';

const AgregarIngreso = () => {
    const [tipo, setTipo] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [message, setMessage] = useState(''); // Estado para el mensaje

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/ingresos', { tipo, monto, fecha });
            setMessage('Ingreso agregado correctamente'); // Establecer el mensaje de éxito
            // Reiniciar el formulario
            setTipo('');
            setMonto('');
            setFecha('');
        } catch (error) {
            console.error('Error al agregar ingreso:', error);
            setMessage('Error al agregar ingreso: ' + (error.response ? error.response.data : 'Error desconocido'));
        }
    };

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <h2>Agregar Ingreso</h2>
            <div className="input-container">
                <div className="input-group">
                    <label>Tipo:</label>
                    <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
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
            <button type="submit">Agregar Ingreso</button>
            {message && <p className="success-message">{message}</p>} {/* Mostrar el mensaje */}
        </form>
    );
};

export default AgregarIngreso;