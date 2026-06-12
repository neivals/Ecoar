import { useState } from "react";
import { calcularEmissao } from "../services/calculoService";

const RECURSOS = [
    { key: "co2",       label: "Liberação de CO2" },
    { key: "agua",      label: "Consumo de água" },
    { key: "energia",   label: "Uso de energia elétrica" },
    { key: "materiais", label: "Descarte de materiais" },
];

function FormularioEmissao({ onResultado }) {
    const [enderecoDigitado, setEnderecoDigitado] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [recursos, setRecursos] = useState({
        co2: true,
        agua: true,
        energia: true,
        materiais: true,
    });

    const toggleRecurso = (key) =>
        setRecursos((prev) => ({ ...prev, [key]: !prev[key] }));

    function handleSubmit() {
        const dados = {
            periodo,
            endereco: enderecoDigitado,
            recursos,
        };
        calcularEmissao(dados)
            .then((response) => {
                onResultado(response.data);
            })
            .catch((erro) => {
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
            <div className="recursos-lista">
                {RECURSOS.map(({ key, label }) => (
                    <label key={key} className="recurso-item">
                        <input
                            type="checkbox"
                            checked={recursos[key]}
                            onChange={() => toggleRecurso(key)}
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>

            <h3 className="regio">Região</h3>
            <input
                type="text"
                value={enderecoDigitado}
                onChange={(e) => setEnderecoDigitado(e.target.value)}
                placeholder="Digite o endereço..."
            />

            <h3 className="perodo">Período</h3>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
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
