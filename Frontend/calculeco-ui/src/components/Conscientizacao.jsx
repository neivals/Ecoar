import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

function Conscientizacao({ dados, periodo }) {
    const { t } = useLanguage();
    const navigate = useNavigate();

    if (!dados) return null;

    const porcentagem =
        dados.emissaoTotalFisico > 0
            ? ((dados.diferencaEmissao / dados.emissaoTotalFisico) * 100).toFixed(0)
            : 0;

    const textoConscientizacao =
        t.conscientizacao.textosPorPeriodo?.[periodo] || t.conscientizacao.texto;
    
    const estilos = {
        container: {
            padding: "16px",
            paddingBottom: "12px",
            marginBottom: "0px",
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            alignSelf: "flex-start"
        },
        paragrafo: {
            margin: "0px",
            marginBottom: "8px"
        },
        btnContainer: {
            margin: "0px",
            padding: "0px",
            display: "block",
            lineHeight: "0"
        },
        botao: {
            margin: "0px"
        }
    };

    return (
        <div className="conscientizacao-container" style={estilos.container}>
            <button type="button" className="conscientizacao-info" aria-label="Informação">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ margin: 0 }}>
                    <circle cx="12" cy="12" r="10" stroke="#4c9e6b" strokeWidth="1.5" />
                    <path d="M12 11V16" stroke="#4c9e6b" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="8" r="1" fill="#4c9e6b" />
                </svg>
            </button>

            <p className="conscientizacao-titulo" style={estilos.paragrafo}>
                {t.conscientizacao.titulo}
            </p>

            <p className="conscientizacao-texto" style={estilos.paragrafo}>
                {typeof textoConscientizacao === "function"
                    ? textoConscientizacao(porcentagem)
                    : textoConscientizacao}
            </p>

            <div style={estilos.btnContainer}>
                <button
                    type="button"
                    className="saiba-mais-btn"
                    style={estilos.botao}
                    onClick={() => navigate("/informacoes")}
                >
                    {t.conscientizacao.saibaMais}
                </button>
            </div>
        </div>
    );
}

export default Conscientizacao;