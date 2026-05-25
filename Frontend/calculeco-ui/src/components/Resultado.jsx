function Resultado({ dados }) {
    if (!dados) {
        return null;
    }

    return (
        <div className="resultado-container">
            <h2>Resultados do Cálculo</h2>

            <div className="resultado-item">
                <label>Coordenadas Obtidas:</label>
                <span>{dados.coordenadas || "Sem coordenadas mapeadas"}</span>
            </div>

            <div className="resultado-item">
                <label>Emissão Total Físico (kg CO2):</label>
                <span>{dados.emissaoTotalFisico}</span>
            </div>

            <div className="resultado-item">
                <label>Emissão Total Digital (kg CO2):</label>
                <span>{dados.emissaoTotalDigital}</span>
            </div>
        </div>
    );
}

export default Resultado;