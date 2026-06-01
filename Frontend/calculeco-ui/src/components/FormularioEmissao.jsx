import { useState } from "react";
import { calcularEmissao } from "../services/calculoService";

function FormularioEmissao({ onResultado }) {
    const [tipoTransporte, setTipoTransporte] = useState("");
    const [periodo, setPeriodo] = useState("");

    function handleSubmit() {
        const dados = {
            transporte: tipoTransporte,
            periodo
        };
        calcularEmissao(dados)
            .then(response => {
                onResultado(response.data);
            })
            .catch(erro => {
                console.error("Erro na comunicação com o servidor:", erro);
            });
    }

    return (
        <div className="paginacalculadora2">
            <div className="a-calculeco-tem">
                A CalculECO tem como objetivo calcular e comparar os impactos
                ambientais gerados pelo uso de cartões de benefício físicos e
                digitais. Preencha os campos abaixo para iniciar o cálculo.
            </div>
            <h2 className="preencha">Preencha:</h2>
            <h3 className="recursos">Recursos</h3>
            <div className="calculator-page">
                <div className="consumo-de-gua">Liberação de CO2</div>
            </div>
            <div className="calculator-page">
                <div className="consumo-de-gua">Consumo de água</div>
            </div>
            <div className="calculator-page">
                <div className="consumo-de-gua">Uso de energia elétrica</div>
            </div>
            <div className="calculator-page">
                <div className="consumo-de-gua">Descarte de materiais</div>
            </div>
            <h3 className="regio">Região</h3>
            <select value={tipoTransporte} onChange={e => setTipoTransporte(e.target.value)}>
                <option value="">Selecione o meio de transporte</option>
                <option value="AVIAO">Avião</option>
                <option value="CAMINHAO">Caminhão</option>
            </select>
            <h3 className="perodo">Período</h3>
            <select value={periodo} onChange={e => setPeriodo(e.target.value)}>
                <option value="">Selecione o período</option>
                <option value="SEISMESES">Seis meses</option>
                <option value="UMANO">Um ano</option>
                <option value="TRESANOS">Três anos</option>
                <option value="CINCOANOS">Cinco anos</option>
            </select>
            <button onClick={handleSubmit}>Calcular</button>
        </div>
    );
}

export default FormularioEmissao;