import { useState, useEffect, useRef } from "react";
import { calcularEmissao } from "../services/calculoService";
import { useLanguage } from "../context/LanguageContext";

function FormularioEmissao({
                               onResultado,
                               periodoSelecionado,
                               setPeriodoSelecionado
                           }) {
    const { t } = useLanguage();
    const [enderecoDigitado, setEnderecoDigitado] = useState("");
    const periodo = periodoSelecionado;
    const setPeriodo = setPeriodoSelecionado;
    const [recursos, setRecursos] = useState({
        co2: true,
        agua: true,
        energia: true,
        materiais: true,
    });

    const RECURSOS = [
        { key: "co2",       label: t.formulario.co2 },
        { key: "agua",      label: t.formulario.agua },
        { key: "energia",   label: t.formulario.energia },
        { key: "materiais", label: t.formulario.materiais },
    ];

    const toggleRecurso = (key) =>
        setRecursos((prev) => ({ ...prev, [key]: !prev[key] }));

    const enviarDados = (recursosAtuais) => {
        if (!enderecoDigitado || !periodo) return;

        const dados = {
            periodo,
            endereco: enderecoDigitado,
            recursos: recursosAtuais,
        };

        calcularEmissao(dados)
            .then((response) => {
                onResultado(response.data, periodo);
            })
            .catch((erro) => {
                console.error("Erro na comunicação com o servidor:", erro);
            });
    };
    function handleSubmit() {
        enviarDados(recursos);
    }

    return (
        <div className="paginacalculadora2">
            <div className="a-calculeco-tem">
                {t.formulario.descricao}
            </div>

            <h2 className="preencha">{t.formulario.preencha}</h2>

            <h3 className="recursos">{t.formulario.recursos}</h3>
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

            <h3 className="regio">{t.formulario.regiao}</h3>
            <input
                type="text"
                value={enderecoDigitado}
                onChange={(e) => setEnderecoDigitado(e.target.value)}
                placeholder={t.formulario.enderecoPlaceholder}
            />

            <h3 className="perodo">{t.formulario.periodo}</h3>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                <option value="">{t.formulario.selecionePeriodo}</option>
                <option value="SEISMESES">{t.formulario.seisMeses}</option>
                <option value="UMANO">{t.formulario.umAno}</option>
                <option value="TRESANOS">{t.formulario.tresAnos}</option>
                <option value="CINCOANOS">{t.formulario.cincoAnos}</option>
            </select>

            <button onClick={handleSubmit}>{t.formulario.calcular}</button>
        </div>
    );
}

export default FormularioEmissao;