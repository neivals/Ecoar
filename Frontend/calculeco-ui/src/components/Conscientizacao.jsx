import { useLanguage } from "../context/LanguageContext";

function Conscientizacao({ dados }) {
    const { t } = useLanguage();

    const porcentagem = dados && dados.emissaoTotalFisico > 0 ?
        ((dados.diferencaEmissao / dados.emissaoTotalFisico) * 100).toFixed(0)
        : 0;

    return (
        <div className="conscientizacao-container">
            <p className="conscientizacao-texto">
                {t.conscientizacao.titulo}<br /><br />
                {t.conscientizacao.texto(porcentagem)}
            </p>
            <button className="saiba-mais-btn">{t.conscientizacao.saibaMais}</button>
        </div>
    );
}

export default Conscientizacao;
