import React, { useState } from 'react';
import axios from 'axios';

const AgregarIngreso = () => {
    const [tipo, setTipo] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/ingresos', { tipo, monto, fecha });
            alert(response.data); // Muestra el mensaje de respuesta
            // Reiniciar el formulario
            setTipo('');
            setMonto('');
            setFecha('');
        } catch (error) {
            console.error('Error al agregar ingreso:', error);
            alert('Error al agregar ingreso: ' + error.response.data); // Muestra el error
        }
    };

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <h2>Agregar Ingreso</h2>
            <div>
                <label>Tipo:</label>
                <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
            </div>
            <div>
                <label>Monto:</label>
                <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
            </div>
            <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </div>
            <button type="submit">Agregar Ingreso</button>
        </form>
    );
};

export default AgregarIngreso;