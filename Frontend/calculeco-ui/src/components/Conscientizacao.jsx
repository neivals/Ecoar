import { useLanguage } from "../context/LanguageContext";
import {useNavigate} from "react-router-dom";

function Conscientizacao({ dados, periodo }) {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const porcentagem =
        dados && dados.emissaoTotalFisico > 0
            ? ((dados.diferencaEmissao / dados.emissaoTotalFisico) * 100).toFixed(0)
            : 0;
    const textoConscientizacao =
        t.conscientizacao.textosPorPeriodo?.[periodo] || t.conscientizacao.texto;

    return (
        <div className="conscientizacao-container">
            <button type="button" className="conscientizacao-info" aria-label="Informação">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="#4c9e6b" strokeWidth="1.5" />
                    <path d="M12 11V16" stroke="#4c9e6b" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="8" r="1" fill="#4c9e6b" />
                </svg>
            </button>
            <p className="conscientizacao-titulo">{t.conscientizacao.titulo}</p>
            <p className="conscientizacao-texto">
                {textoConscientizacao(porcentagem)}
            </p>
            <button type="button" className="saiba-mais-btn" onClick={() => navigate("/informacoes")}>
                {t.conscientizacao.saibaMais}
            </button>
        </div>
    );
}

export default Conscientizacao;
