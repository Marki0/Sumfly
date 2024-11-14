import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    const agregarGasto = async () => {
        await axios.post('http://localhost:5000/gastos', { categoria, monto, fecha });
        
    };

    return (
        <div>
            <h1>Registro de Gastos</h1>
            <input type="text" placeholder="Categoría" onChange={e => setCategoria(e.target.value)} />
            <input type="number" placeholder="Monto" onChange={e => setMonto(e.target.value)} />
            <input type="date" onChange={e => setFecha(e.target.value)} />
            <button onClick={agregarGasto}>Agregar  Gasto</button>
        </div>
    );
}

export default App;
