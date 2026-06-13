import { useAccessibility, FONT_SCALES } from "../context/AccessibilityContext";
import { useLanguage } from "../context/LanguageContext";
import "../page css/Acessibilidade.css";

const FILTER_KEYS = ["grayscale", "deuteranopia", "protanopia", "tritanopia"];

export default function Acessibilidade() {
    const {
        fontSizeIndex, setFontSizeIndex,
        filterEnabled, setFilterEnabled,
        filterValues, setFilterValues,
    } = useAccessibility();
    const { t } = useLanguage();
    const ac = t.acessibilidade;

    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({ ...prev, [key]: Number(value) }));
    };

    return (
        <div className="acessibilidade-page">
            <div className="acess-card">

                <section className="acess-section">
                    <h2 className="acess-titulo">{ac.tamanho}</h2>
                    <div className="font-size-control">
                        <div className="font-size-labels">
                            <span className="font-aa font-aa-sm" aria-label="Pequeno">Aa</span>
                            <span className="font-aa font-aa-md" aria-label="Médio">Aa</span>
                            <span className="font-aa font-aa-lg" aria-label="Grande">Aa</span>
                        </div>
                        <div className="slider-track-wrapper">
                            <input
                                type="range"
                                min={0}
                                max={2}
                                step={1}
                                value={fontSizeIndex}
                                onChange={e => setFontSizeIndex(Number(e.target.value))}
                                className="acess-slider"
                                aria-label={ac.tamanho}
                            />
                        </div>
                    </div>
                </section>

                <section className="acess-section">
                    <h2 className="acess-titulo">{ac.filtroCores}</h2>

                    <div className="filter-toggle-row">
                        <span className="filter-label">{ac.ativadoDesativado}</span>
                        <button
                            role="switch"
                            aria-checked={filterEnabled}
                            className={`toggle-switch ${filterEnabled ? "on" : ""}`}
                            onClick={() => setFilterEnabled(v => !v)}
                            aria-label={ac.ativadoDesativado}
                        >
                            <span className="toggle-thumb" />
                        </button>
                    </div>

                    {FILTER_KEYS.map(key => (
                        <div key={key} className="filter-item">
                            <span className="filter-name">{ac[key]}</span>
                            <div className="filter-slider-row">
                                <span className="filter-sign">-</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={filterValues[key]}
                                    onChange={e => handleFilterChange(key, e.target.value)}
                                    className="acess-slider"
                                    disabled={!filterEnabled}
                                    aria-label={ac[key]}
                                />
                                <span className="filter-sign">+</span>
                            </div>
                        </div>
                    ))}
                </section>

            </div>
        </div>
    );
}
