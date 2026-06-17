import { useLanguage } from "../context/LanguageContext";
import { MdInfoOutline } from "react-icons/md";

function Conscientizacao({ dados, periodo }) {
    const { t } = useLanguage();

    if (!dados) return null;

    const porcentagem = dados.emissaoTotalFisico > 0 ?
        ((dados.diferencaEmissao / dados.emissaoTotalFisico) * 100).toFixed(0)
        : 0;
    const textoConscientizacao = t.conscientizacao.textosPorPeriodo?.[periodo] || t.conscientizacao.texto;

    return (
        <div className="resultado-card card-conscientizacao">
            <div className="card-header-with-icon">
                <h2 className="conscientizacao-titulo">
                    {t.informacoes.conscientizacaoTitulo}
                </h2>
                <MdInfoOutline className="info-icon" />
            </div>
            <p className="conscientizacao-texto">
                {textoConscientizacao(porcentagem)}
            </p>
            <div className="card-footer-action">
                <button className="saiba-mais-btn">{t.conscientizacao.saibaMais}</button>
            </div>
        </div>
    );
}

export default Conscientizacao;
