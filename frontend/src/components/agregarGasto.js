import React, { useState } from 'react';
import axios from 'axios';

const AgregarGasto = () => {
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
        try {
            const response = await axios.post('http://localhost:5000/gastos', { categoria, monto, fecha }, {
                headers: {
                    'x-access-token': token // Enviar el token en los headers
                }
            });
            alert(response.data);
            setCategoria('');
            setMonto('');
            setFecha('');
        } catch (error) {
            console.error('Error al agregar gasto:', error);
            alert('Error al agregar gasto: ' + (error.response ? error.response.data : 'Error desconocido'));
        }
    };

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <h2>Agregar Gasto</h2>
            <div>
                <label>Categoría:</label>
                <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
            </div>
            <div>
                <label>Monto:</label>
                <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
            </div>
            <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
            </div>
            <button type="submit">Agregar Gasto</button>
        </form>
    );
};

export default AgregarGasto;