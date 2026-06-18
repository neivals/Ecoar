import { useLanguage } from "../context/LanguageContext";
import Conscientizacao from "./Conscientizacao";
import recursos from "../icone/Recursos.png";
import energia from "../icone/Energia.png";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const COR_FISICO = "#135b4f";
const COR_DIGITAL = "#ff2f28";

function formatarNumero(valor, casas = 1) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
    });
}

function formatarEmissao(kg) {
    if (kg >= 1000) {
        return `${formatarNumero(kg / 1000)}t`;
    }
    return `${formatarNumero(kg, 0)}Kg`;
}

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#162056",
            titleFont: { family: "Kufam" },
            bodyFont: { family: "Kufam" },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
                color: "#162056",
                font: { family: "Kufam", size: 13, weight: "600" },
            },
        },
        y: {
            grid: { color: "rgba(22, 32, 86, 0.08)" },
            border: { display: false },
            ticks: {
                color: "#162056",
                font: { family: "Kufam", size: 11 },
                callback: (valor) => (valor >= 1000 ? `${valor / 1000}t` : `${valor}kg`),
            },
        },
    },
};

const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#162056",
            titleFont: { family: "Kufam" },
            bodyFont: { family: "Kufam" },
        },
    },
    scales: {
        x: {
            grid: { color: "rgba(22, 32, 86, 0.06)" },
            border: { display: false },
            ticks: {
                color: "#162056",
                font: { family: "Kufam", size: 11 },
            },
        },
        y: {
            grid: { color: "rgba(22, 32, 86, 0.08)" },
            border: { display: false },
            ticks: {
                color: "#162056",
                font: { family: "Kufam", size: 11 },
                callback: (valor) => (valor >= 1000 ? `${valor / 1000}t` : `${valor}kg`),
            },
        },
    },
    elements: {
        point: { radius: 0, hoverRadius: 5 },
        line: { borderWidth: 2.5 },
    },
};

function Resultado({ dados, periodo }) {
    const { t } = useLanguage();

    if (!dados) return null;

    const obterLabelPeriodo = () => {
        switch (periodo) {
            case "SEISMESES":
                return `${t.formulario.seisMeses.toLowerCase()}`;
            case "UMANO":
                return `${t.formulario.umAno.toLowerCase()}`;
            case "TRESANOS":
                return `${t.formulario.tresAnos.toLowerCase()}`;
            case "CINCOANOS":
                return `${t.formulario.cincoAnos.toLowerCase()}`;
            default:
                return "";
        }
    };

    const textoPeriodoDinamico = obterLabelPeriodo();

    const emissaoFisico = dados.emissaoTotalFisico;
    const emissaoDigital = dados.emissaoTotalDigital;
    const porcentagemEconomia =
        emissaoFisico > 0
            ? ((dados.diferencaEmissao / emissaoFisico) * 100).toFixed(1).replace(".", ",")
            : "0";

    const impactoFisico = dados.emissaoTotalFisico + dados.aguaTotal + dados.plasticoTotal;

    const recursosData = {
        labels: [t.resultado.fisico, t.resultado.digital],
        datasets: [
            {
                label: t.resultado.totalCO2,
                data: [impactoFisico, emissaoDigital],
                backgroundColor: [COR_FISICO, COR_DIGITAL],
                borderRadius: 6,
                borderSkipped: false,
                maxBarThickness: 72,
            },
        ],
    };

    const energiaData = {
        labels: [t.resultado.fisico, t.resultado.digital],
        datasets: [
            {
                label: t.resultado.energia,
                data: [dados.energiaTotal, dados.energiaTotal],
                backgroundColor: [COR_FISICO, COR_DIGITAL],
                borderRadius: 6,
                borderSkipped: false,
                maxBarThickness: 72,
            },
        ],
    };

    const gerarLabels = () => {
        switch (periodo) {
            case "SEISMESES":
                return ["0", "1", "2", "3", "4", "5", "6"];
            case "UMANO":
                return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            case "TRESANOS":
                return ["0", "3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"];
            case "CINCOANOS":
                return ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"];
            default:
                return Array.from(
                    { length: dados.emissaoFisicoPorMes.length },
                    (_, i) => i.toString()
                );
        }
    };

    const tempoData = {
        labels: gerarLabels(),
        datasets: [
            {
                label: t.resultado.fisico,
                data: dados.emissaoFisicoPorMes,
                borderColor: COR_FISICO,
                backgroundColor: "rgba(19, 91, 79, 0.08)",
                fill: true,
                tension: 0.35,
            },
            {
                label: t.resultado.digital,
                data: dados.emissaoDigitalPorMes,
                borderColor: COR_DIGITAL,
                backgroundColor: "rgba(255, 47, 40, 0.06)",
                fill: true,
                tension: 0.35,
            },
        ],
    };

    return (
        <section className="frame">
            <h2 className="comparao-dentre-modalidades">
                {t.resultado.comparacaoModalidades}
            </h2>

            <div className="resultados-topo">
                <div className="grafico-painel">
                    <h3 className="grafico-painel-titulo">
                        {t.resultado.quantidadeRecursosConsumidos}
                    </h3>
                    <div className="grafico-painel-corpo">
                        <div className="coluna-esquerda-painel">
                            <img src={recursos} className="recurso-icone"/>
                            <p className="ao-usar-o">
                                {t.resultado.impactoAmbiental(formatarNumero(dados.aguaTotal || 0, 0), formatarNumero(dados.diferencaEmissao, 0), formatarNumero(dados.plasticoTotal, 0))}
                            </p>
                        </div>
                        <div className="coluna-direita-grafico">
                            <div className="grafico-valores">
                                <div className="grafico-valor-item">
                                    <span className="fsico">{t.resultado.fisico}</span>
                                    <span className="xg">{formatarEmissao(impactoFisico)}</span>
                                </div>
                                <div className="grafico-valor-item">
                                    <span className="digital">{t.resultado.digital}</span>
                                    <span className="yg">{formatarEmissao(emissaoDigital)}</span>
                                </div>
                            </div>
                            <div className="grafico-painel-chart">
                                <div className="grafico-chart-wrap">
                                    <Bar data={recursosData} options={barOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grafico-painel">
                    <h3 className="grafico-painel-titulo">
                        {t.resultado.quantidadeEnergiaUsada}
                    </h3>
                    <div className="grafico-painel-corpo">
                        <div className="coluna-esquerda-painel">
                            <img src={energia} className="energia-icone"/>
                            <p className="ao-usar-o">
                                {t.resultado.energiaConsome(textoPeriodoDinamico, formatarNumero(dados.energiaTotal, 0))}
                            </p>
                        </div>
                        <div className="coluna-direita-grafico">
                            <div className="grafico-valores">
                                <div className="grafico-valor-item">
                                    <span className="fsico">{t.resultado.fisico}</span>
                                    <span className="xg">{formatarNumero(dados.energiaTotal, 0)}kw</span>
                                </div>
                                <div className="grafico-valor-item">
                                    <span className="digital">{t.resultado.digital}</span>
                                    <span className="yg">{formatarNumero(dados.energiaTotal, 0)}kw</span>
                                </div>
                            </div>
                            <div className="grafico-painel-chart">
                                <div className="grafico-chart-wrap">
                                    <Bar data={energiaData} options={barOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="resultados-base">
                <div className="grafico-tempo-area">
                    <h2 className="comparao-por-tempo">{t.resultado.comparacaoTempo}</h2>
                    <div className="grafico-tempo">
                        <Line data={tempoData} options={lineOptions} />
                    </div>
                    <div className="grafico-tempo-legenda">
                        <span className="legenda-item legenda-fisico">
                            <span className="legenda-cor" />
                            {t.resultado.fisico}
                        </span>
                        <span className="legenda-item legenda-digital">
                            <span className="legenda-cor" />
                            {t.resultado.digital}
                        </span>
                    </div>
                    <p className="dentro-de-1">
                        {t.resultado.cartaoDigitalEmitePorcentagem(textoPeriodoDinamico, porcentagemEconomia)}
                    </p>
                </div>

                <Conscientizacao dados={dados} periodo={periodo} />
            </div>
        </section>
    );
}

export default Resultado;
