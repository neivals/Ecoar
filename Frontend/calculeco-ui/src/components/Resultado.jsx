import { useLanguage } from "../context/LanguageContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Resultado({ dados, periodo }) {
    const { t } = useLanguage();

    if (!dados) return null;
    console.log(dados);

    const formatarNumero = (valor) => {
        return typeof valor === "number" ? valor.toFixed(2) : valor;
    };

    const diferencaFormatada = formatarNumero(dados.diferencaEmissao);

    const recursosData = {
        labels: [t.resultado.fisico, t.resultado.digital],
        datasets: [
            {
                label: t.resultado.comparacaoModalidades,
                data: [
                    dados.plasticoTotal +
                    dados.aguaTotal +
                    dados.emissaoTotalFisico,

                    dados.emissaoTotalDigital
                ],
                backgroundColor: ["#162056", "#4C9E6B"]
            }
        ]
    };

    const recursosFisicoData = {
        labels: [t.resultado.plastico, t.resultado.agua, t.resultado.energia],
        datasets: [
            {
                data: [dados.plasticoTotal, dados.aguaTotal, dados.energiaTotal],
                backgroundColor: ["#162056", "#4C9E6B", "#F9C432"],
                borderWidth: 1
            }
        ]
    };

    const recursosDigitalData = {
        labels: [t.resultado.plastico, t.resultado.agua, t.resultado.energia],
        datasets: [
            {
                data: [0, 0, dados.energiaTotal],
                backgroundColor: ["#162056", "#4C9E6B", "#F9C432"],
                borderWidth: 1
            }
        ]
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
                borderColor: "#162056",
                backgroundColor: "#162056",
                tension: 0.3
            },
            {
                label: t.resultado.digital,
                data: dados.emissaoDigitalPorMes,
                borderColor: "#4C9E6B",
                backgroundColor: "#4C9E6B",
                tension: 0.3
            }
        ]
    };

    const barOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const lineOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    const doughnutOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <>
            {/* Card 1: Comparação dentre modalidades de cartões */}
            <div className="resultado-card card-modalidades">
                <h2 className="card-titulo">{t.resultado.comparacaoModalidades}</h2>
                <span className="card-subtitulo">{t.resultado.totalCO2}</span>
                <div className="card-content-modalidades">
                    <div className="bar-chart-wrapper">
                        <Bar data={recursosData} options={barOptions} />
                    </div>
                    <div className="impacto-texto-wrapper">
                        <p className="impacto-texto">
                            {t.resultado.impactoAmbiental(diferencaFormatada)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 2: Comparação por tempo */}
            <div className="resultado-card card-tempo">
                <h2 className="card-titulo">{t.resultado.comparacaoTempo}</h2>
                <div className="line-chart-wrapper">
                    <Line data={tempoData} options={lineOptions} />
                </div>
                <p className="tempo-texto">
                    {t.resultado.cartaoDigitalEmite(diferencaFormatada)}
                </p>
            </div>

            {/* Card 3: Comparação de recursos entre cartões */}
            <div className="resultado-card card-recursos">
                <h2 className="card-titulo">Comparação de recursos entre cartões</h2>
                <div className="recursos-charts-container">
                    <div className="recurso-chart-box">
                        <span className="recurso-chart-label">{t.resultado.fisico}</span>
                        <div className="doughnut-wrapper">
                            <Doughnut data={recursosFisicoData} options={doughnutOptions} />
                        </div>
                    </div>
                    <div className="recurso-chart-box">
                        <span className="recurso-chart-label">{t.resultado.digital}</span>
                        <div className="doughnut-wrapper">
                            <Doughnut data={recursosDigitalData} options={doughnutOptions} />
                        </div>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="custom-legend">
                    <div className="legend-item">
                        <span className="legend-color legend-color-plastico"></span>
                        <span className="legend-label">{t.resultado.plastico}</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color legend-color-agua"></span>
                        <span className="legend-label">{t.resultado.agua}</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color legend-color-energia"></span>
                        <span className="legend-label">{t.resultado.energia}</span>
                    </div>
                </div>

                {/* Details list */}
                <div className="recursos-detalhes">
                    <div className="detalhe-item">
                        <span className="detalhe-titulo">{t.resultado.energia}</span>
                        <p className="detalhe-texto">{t.resultado.energiaConsome(formatarNumero(dados.energiaTotal))}</p>
                    </div>
                    <div className="detalhe-item">
                        <span className="detalhe-titulo">{t.resultado.agua}</span>
                        <p className="detalhe-texto">{t.resultado.aguaGasta(formatarNumero(dados.aguaTotal))}</p>
                    </div>
                    <div className="detalhe-item">
                        <span className="detalhe-titulo">{t.resultado.plastico}</span>
                        <p className="detalhe-texto">{t.resultado.plasticoConsome(formatarNumero(dados.plasticoTotal))}</p>
                    </div>
                    <div className="detalhe-item arvores-detalhe">
                        <span className="detalhe-titulo">{t.resultado.arvoresSalvas}</span>
                        <p className="detalhe-texto">{t.resultado.arvoresSalvasTexto(diferencaFormatada, dados.arvoresSalvas)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resultado;
