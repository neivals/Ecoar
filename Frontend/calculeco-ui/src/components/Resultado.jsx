import { useLanguage } from "../context/LanguageContext";

function Resultado({ dados }) {
    const { t } = useLanguage();

    if (!dados) return null;

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
                    <div className="chart-and-legend">
                        <div className="fsico">{t.resultado.fisico}</div>
                        <h3 className="xg">{dados.emissaoTotalFisico}Kg</h3>
                        <div className="digital">{t.resultado.digital}</div>
                        <h3 className="yg">{dados.emissaoTotalDigital}Kg</h3>
                        <div className="ao-usar-o">
                            {t.resultado.impactoAmbiental(dados.diferencaEmissao)}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="comparao-por-tempo">{t.resultado.comparacaoTempo}</h2>
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
