import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartBar } from '@fortawesome/free-solid-svg-icons'; // Importar los íconos necesarios
import './estilos.css'; // Asegúrate de que los estilos estén disponibles

const Funcionalidades = () => {
    return (
        <div className="funcionalidades">
            <h2>Funcionalidades de la Aplicación</h2>
            <div className="funcionalidades-container">
                <div className="funcionalidad">
                    <FontAwesomeIcon icon={faDollarSign} size="3x" /> {/* Icono de signo $ */}
                    <h3>Agregar Gastos e Ingresos</h3>
                    <p>Registra tus gastos e ingresos por categoría, monto y fecha para mantener tus finanzas organizadas y bajo control.</p>
                </div>
                <div className="funcionalidad">
                    <FontAwesomeIcon icon={faChartBar} size="3x" /> {/* Icono de gráfico de barras */}
                    <h3>Análisis Estadístico</h3>
                    <p>Analiza tus datos con gráficos y reportes para identificar patrones, comparar categorías y tomar decisiones financieras inteligentes.</p>
                </div>
                
                {/* Agrega más funcionalidades según sea necesario */}
            </div>
        </div>
    );
};

export default Funcionalidades;
