    import { useNavigate } from "react-router-dom";
    import { useLanguage } from "../context/LanguageContext";
    import "../page css/Informacoes.css";
    import {useCalculo} from "../context/CalculoContext.jsx";
    import ciclo_pt from "../assets/Ciclo_portugues.png";
    import ciclo_ing from "../assets/Ciclo_ingles.png";
    import calculadora from "../icone/Calculator.png";

    function Informacoes() {
        const { t, lang } = useLanguage();
        const { resultado } = useCalculo();
        const navigate = useNavigate();

        const ciclo = lang === "ptbr" ? ciclo_pt : ciclo_ing;

        return (
            <div className="pagina-informacoes">
                <div className="informacoes-layout">
                    <div className="informacoes-cards">
                        <div className="info-card">
                            <p className="info-card-texto">
                                <span className="info-card-titulo">{t.informacoes.conscientizacaoTitulo}: </span>
                                {resultado
                                    ? t.informacoes.conscientizacaoTexto(resultado.diferencaEmissao, resultado.arvoresSalvas)
                                    : t.informacoes.semCalculo
                                }
                            </p>
                        </div>
                        <div className="info-card">
                            <p className="info-card-titulo">{t.informacoes.infoTitulo}</p>
                            <p className="info-card-texto">{t.informacoes.infoTexto}</p>
                        </div>
                    </div>

                    <div className="informacoes-cta-area">
                        <div className="ciclo-vida-container">
                            <img src={ciclo} alt="Ciclo de vida de um cartão físico" className="ciclo-vida-imagem"/>
                        </div>
                        <div className="info-cta-card">
                            <p className="info-cta-titulo">{t.informacoes.ctaTitulo}</p>
                            <button
                                className="info-cta-botao"
                                onClick={() => navigate("/calculadora")}
                            >
                                {t.informacoes.ctaBotao}
                                <img src={calculadora} className="botao-icone"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Informacoes;
