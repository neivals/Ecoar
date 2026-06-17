import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../page css/Informacoes.css";
import {useCalculo} from "../context/CalculoContext.jsx";

function Informacoes() {
    const { t } = useLanguage();
    const { resultado } = useCalculo();
    const navigate = useNavigate();

    return (
        <div className="pagina-informacoes">
            <div className="informacoes-layout">
                <div className="informacoes-cards">
                    <div className="info-card">
                        <p className="info-card-texto">
                            <span className="info-card-titulo">{t.informacoes.conscientizacaoTitulo}: </span>
                            {t.informacoes.conscientizacaoTexto(resultado.diferencaEmissao, resultado.arvoresSalvas)}
                        </p>
                    </div>
                    <div className="info-card">
                        <p className="info-card-titulo">{t.informacoes.infoTitulo}</p>
                        <p className="info-card-texto">{t.informacoes.infoTexto}</p>
                    </div>
                </div>

                <div className="informacoes-cta-area">
                    <div className="info-cta-card">
                        <p className="info-cta-titulo">{t.informacoes.ctaTitulo}</p>
                        <button
                            className="info-cta-botao"
                            onClick={() => navigate("/calculadora")}
                        >
                            {t.informacoes.ctaBotao} &#x1F5A9;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Informacoes;
