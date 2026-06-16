import { useLanguage } from "../context/LanguageContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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
    Legend
);

function Resultado({ dados, periodo }) {
    const { t } = useLanguage();

    if (!dados) return null;
    console.log(dados);

    const recursosData = {
        labels: ["Físico", "Digital"],
        datasets: [
            {
                label: "Impacto Ambiental",
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

    const energiaData = {
        labels: ["Físico", "Digital"],
        datasets: [
            {
                label: "Energia (kWh)",
                data: [
                    dados.energiaTotal,
                    dados.energiaTotal
                ],
                backgroundColor: ["#162056", "#4C9E6B"]
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
                label: "Cartão Físico",
                data: dados.emissaoFisicoPorMes,
                borderColor: "#162056",
                backgroundColor: "#162056",
                tension: 0.3
            },
            {
                label: "Cartão Digital",
                data: dados.emissaoDigitalPorMes,
                borderColor: "#4C9E6B",
                backgroundColor: "#4C9E6B",
                tension: 0.3
            }
        ]
    };

    return (
        <section className="frame">
            <div className="chart-container">
                <h2 className="comparao-dentre-modalidades">
                    {t.resultado.comparacaoModalidades}
                </h2>
                <div className="chart-area">
                    <div className="quantidade-de-recursos">
                        {t.resultado.totalCO2}
                    </div>
                    <div className="graficos-topo">

                        <div className="grafico-box">
                            <h3>Recursos Consumidos</h3>
                            <Bar data={recursosData} />
                        </div>

                        <div className="grafico-box">
                            <h3>Energia Elétrica</h3>
                            <Bar data={energiaData} />
                        </div>

                    </div>
                </div>
            </div>
            <h2 className="comparao-por-tempo">{t.resultado.comparacaoTempo}</h2>
            <div className="grafico-tempo">
                <Line data={tempoData} />
            </div>
            <div className="dentro-de-1">
                {t.resultado.cartaoDigitalEmite(dados.diferencaEmissao)}
            </div>
            <h2 className="recursos">{t.resultado.recursos}</h2>

            <div className="cada-um">
                <div className="energia">{t.resultado.energia}</div>
                {t.resultado.energiaConsome(dados.energiaTotal)}
                <div className="agua">{t.resultado.agua}</div>
                {t.resultado.aguaGasta(dados.aguaTotal)}
                <div className="plastico">{t.resultado.plastico}</div>
                {t.resultado.plasticoConsome(dados.plasticoTotal)}
            </div>
            <h2 className="arvores">{t.resultado.arvoresSalvas}</h2>
            <div className="arvores-salvas">
                {t.resultado.arvoresSalvasTexto(dados.diferencaEmissao, dados.arvoresSalvas)}
            </div>
        </section>
    );
}

export default Resultado;
