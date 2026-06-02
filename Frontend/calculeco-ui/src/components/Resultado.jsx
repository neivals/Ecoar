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
                        Quantidade de recursos consumidos
                    </div>
                    <div className="chart-and-legend">
                        <div className="fsico">Físico</div>
                        <h3 className="xg">{dados.emissaoTotalFisico}g</h3>
                        <div className="digital">Digital</div>
                        <h3 className="yg">{dados.emissaoTotalDigital}g</h3>
                        <div className="ao-usar-o">
                            Ao usar o Cartão de Benefícios Digital, causa um impacto
                            ambiental de {dados.diferencaEmissao}g a menos do que
                            causaria usando o Cartão Físico.
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="comparao-por-tempo">Comparação por tempo</h2>
            <div className="dentro-de-1">
                Dentro de 1 ano, o cartão digital gasta {dados.diferencaEmissao}g menos que o físico!
            </div>
        </section>
    );
}

export default Resultado;