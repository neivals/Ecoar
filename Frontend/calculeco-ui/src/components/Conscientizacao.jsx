import { useLanguage } from "../context/LanguageContext";

function Conscientizacao({ dados, periodo }) {
    const { t } = useLanguage();

    const porcentagem = dados && dados.emissaoTotalFisico > 0 ?
        ((dados.diferencaEmissao / dados.emissaoTotalFisico) * 100).toFixed(0)
        : 0;
    const textoConscientizacao = t.conscientizacao.textosPorPeriodo?.[periodo] || t.conscientizacao.texto;

    return (
        <div className="conscientizacao-container">
            <p className="conscientizacao-texto">
                {t.conscientizacao.titulo}<br /><br />
                {textoConscientizacao(porcentagem)}
            </p>
            <button className="saiba-mais-btn">{t.conscientizacao.saibaMais}</button>
        </div>
    );
}

export default Conscientizacao;
