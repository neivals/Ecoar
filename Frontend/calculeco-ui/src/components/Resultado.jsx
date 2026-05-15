import React from 'react';

function Resultado({ dados }) {
    if (!dados){
        return null;
    }

    return (
        <div className="resultado-container">
            <h2>Resultados</h2>

            <div className="resultado-item">
                <label>EmissaoTotalFisico:</label>
                <span>{dados.emissaoTotalFisico}</span>
            </div>

            <div className="resultado-item">
                <label>EmissãoTotalDigital:</label>
                <span>{dados.emissaoTotalDigital}</span>
            </div>


        </div>
        );


}


export default Resultado;