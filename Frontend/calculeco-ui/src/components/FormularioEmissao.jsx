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
        <div className="formulario-container">

            <div>
                <label>Meio de Transporte:</label>
                <select value={tipoTransporte} onChange={e => setTipoTransporte(e.target.value)}>
                    <option value="">Selecione o meio de transporte</option>
                    <option value="AVIAO">AVIAO</option>
                    <option value="CAMINHAO">CAMINHAO</option>
                </select>
            </div>

            <div>
                <label>Período de tempo:</label>
                <select value={periodo} onChange={e => setPeriodo(e.target.value)}>
                    <option value="">Selecione o período de tempo</option>
                    <option value="SEISMESES">Seis meses</option>
                    <option value="UMANO">Um ano</option>
                    <option value="TRESANOS">Três anos</option>
                    <option value="CINCOANOS">Cinco anos</option>
                </select>
            </div>

            <button type="button" onClick={handleSubmit}>Calcular</button>
        </div>
    );
}

export default FormularioEmissao;