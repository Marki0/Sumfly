import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [gastos, setGastos] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'categoria', direction: 'ascending' });

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

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedGastos = React.useMemo(() => {
        let sortableItems = [...gastos];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [gastos, sortConfig]);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2 className="gastos-header">Gastos:</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('categoria')}>
                            Categoría {sortConfig.key === 'categoria' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('monto')}>
                            Monto {sortConfig.key === 'monto' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('fecha')}>
                            Fecha {sortConfig.key === 'fecha' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedGastos.map((gasto) => (
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
