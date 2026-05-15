import { useState } from "react";
//import { calcularEmissao } from "../services/calculoService";
import { calcularEmissao } from "../services/calculoService.mock";

function FormularioEmissao({ onResultado }) {
    const [material, setMaterial] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState("");
    const [tipoTransporte, setTipoTransporte] = useState("");
    const [quantidadeCartoes, setQuantidadeCartoes] = useState(1);
    const [quantidadeTransacoes, setQuantidadeTransacoes] = useState(1);

    function handleSubmit() {
        const dados = {
            material,
            tipoPagamento,
            tipoTransporte,
            quantidadeCartoes,
            quantidadeTransacoes
        };
        calcularEmissao(dados)
            .then(response => {
                onResultado(response.data);
            })
            .catch(erro => {
                console.error("Erro ao calcular emissão:", erro);
            });
    }

    return (
        <div>
            <select value={tipoPagamento} onChange={e => setTipoPagamento(e.target.value)}>
                <option value="">Selecione o tipo de pagamento</option>
                <option value="NFC">NFC</option>
                <option value="PIX">PIX</option>
                <option value="WALLET">WALLET</option>
                <option value="QRCODE">QRCODE</option>
            </select>
            <select value={material} onChange={e => setMaterial(e.target.value)}>
                <option value="">Selecione o tipo de material</option>
                <option value="PVC">PVC</option>
                <option value="PVCRECICLADO">PVCRECICLADO</option>
                <option value="METAL">METAL</option>
            </select>
            <select value={tipoTransporte} onChange={e => setTipoTransporte(e.target.value)}>
                <option value="">Selecione o meio de transporte</option>
                <option value="AVIAO">AVIAO</option>
                <option value="CAMINHAO">CAMINHAO</option>
            </select>
            <input
                type="number"
                value={quantidadeCartoes}
                onChange={e => setQuantidadeCartoes(Number(e.target.value))}
            />
            <input
                type="number"
                value={quantidadeTransacoes}
                onChange={e => setQuantidadeTransacoes(Number(e.target.value))}
            />
            <button onClick={handleSubmit}>Calcular</button>
        </div>
    );
}

export default FormularioEmissao;