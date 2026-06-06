function Resultado({ dados }) {
    if (!dados) return null;

    return (
        <section className="frame">
            <div className="chart-container">
                <h2 className="comparao-dentre-modalidades">
                    Comparação dentre modalidades de cartões
                </h2>
                <div className="chart-area">
                    <div className="quantidade-de-recursos">
                        Total de CO2 emitido por cada cartão
                    </div>
                    <div className="chart-and-legend">
                        <div className="fsico">Físico</div>
                        <h3 className="xg">{dados.emissaoTotalFisico}Kg</h3>
                        <div className="digital">Digital</div>
                        <h3 className="yg">{dados.emissaoTotalDigital}Kg</h3>
                        <div className="ao-usar-o">
                            Ao usar o Cartão de Benefícios Digital, causa um impacto
                            ambiental de {dados.diferencaEmissao}Kg a menos do que
                            causaria usando o Cartão Físico.
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="comparao-por-tempo">Comparação por tempo</h2>
            <div className="dentro-de-1">
                Dentro de 1 ano, o cartão digital emite {dados.diferencaEmissao}Kg de CO2 menos que o físico!
            </div>
            <h2 className="recursos">Recursos</h2>
            <div className="cada-um">
                <div className="energia">Energia</div>
                Dentro de 1 ano, o cartão físico e digital consomem {dados.energiaTotal}KWh
                <div className="agua">Água</div>
                Dentro de 1 ano, a produção dos cartões físicos gasta no total {dados.aguaTotal}L
                <div className="plastico">Plástico</div>
                Dentro de 1 ano, a produção dos cartões físicos consome no total {dados.plasticoTotal}Kg de plástico
            </div>
            <h2 className="arvores">Árvores salvas</h2>
            <div className="arvores-salvas">
                Com {dados.diferencaEmissao}Kg de CO2 economizados, {dados.arvoresSalvas} árvores são salvas
            </div>

        </section>
    );
}

export default Resultado;