import { useLanguage } from "../context/LanguageContext";

function Conscientizacao() {
    const { t } = useLanguage();

    return (
        <div className="conscientizacao-container">
            <p className="conscientizacao-texto">
                {t.conscientizacao.titulo}<br /><br />
                {t.conscientizacao.texto}
            </p>
            <button className="saiba-mais-btn">{t.conscientizacao.saibaMais}</button>
        </div>
    );
}

export default Conscientizacao;
