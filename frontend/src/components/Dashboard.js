import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchGastos(token);
        }
    }, [navigate]);

    const fetchGastos = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/gastos', {
                headers: {
                    'x-access-token': token,
                },
            });
            setGastos(response.data);
        } catch (error) {
            console.error('Error al obtener los gastos:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Gastos:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map((gasto) => (
                        <tr key={gasto.id}>
                            <td>{gasto.categoria}</td>
                            <td>{gasto.monto}</td>
                            <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
