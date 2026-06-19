import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Informacoes from "./pages/Informacoes";
import Acessibilidade from "./pages/Acessibilidade";
import RotaProtegida from "./components/RotaProtegida";
import FormularioEmissao from "./components/FormularioEmissao";
import Resultado from "./components/Resultado";
import "./App.css";
import calculecoLogo from "./icone/Calculeco_logo2.png";
import edenredLogo from "./icone/Edenred_logo1.png";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { AccessibilityProvider, useAccessibility, FONT_SCALES } from "./context/AccessibilityContext";
import {CalculoProvider, useCalculo} from "./context/CalculoContext.jsx";
import calculecoIcone from "./icone/logo_branca.png";
import iconeUsuario from "./icone/icone_usuario.png";
import iconeEngrenagem from "./icone/Engrenagem_icone.png";
import iconeHistorico from "./icone/historico_icone.png";
import { logout, obterEmail } from "./services/authService";

function ColorFilterSVG() {
    const { filterEnabled, filterValues, FILTER_MATRICES, IDENTITY } = useAccessibility();

    const activeFilters = [
        { key: "grayscale",    value: filterValues.grayscale },
        { key: "deuteranopia", value: filterValues.deuteranopia },
        { key: "protanopia",   value: filterValues.protanopia },
        { key: "tritanopia",   value: filterValues.tritanopia },
    ].filter(f => filterEnabled && f.value > 0);

    if (activeFilters.length === 0) return null;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
            aria-hidden="true"
        >
            <defs>
                <filter id="ecoar-color-filter" colorInterpolationFilters="sRGB">
                    {activeFilters.map((f, i) => {
                        const t = f.value / 100;
                        const matrix = IDENTITY.map((v, idx) => v * (1 - t) + FILTER_MATRICES[f.key][idx] * t);
                        return (
                            <feColorMatrix
                                key={f.key}
                                in={i === 0 ? "SourceGraphic" : `r${i - 1}`}
                                type="matrix"
                                values={matrix.join(" ")}
                                result={`r${i}`}
                            />
                        );
                    })}
                </filter>
            </defs>
        </svg>
    );
}

function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const dropdownRef = useRef(null);
    const email = obterEmail();

    const tabs = [
        { label: t.navbar.calculadora, path: "/calculadora" },
        { label: t.navbar.informacoes, path: "/informacoes" },
        { label: t.navbar.acessibilidade, path: "/acessibilidade" },
    ];

    useEffect(() => {
        function handleClickFora(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownAberto(false);
            }
        }
        document.addEventListener("mousedown", handleClickFora);
        return () => document.removeEventListener("mousedown", handleClickFora);
    }, []);

    function handleTerminarSessao() {
        logout();
        setDropdownAberto(false);
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="navbar-mark" aria-hidden="true"></span>
                <img src={calculecoIcone} className="navbar-icone" alt="Ícone" />
                <img src={calculecoLogo} className="logo-calculeco" alt="Calculeco" />
                <div className="edenred-brand" aria-label="Edenred">
                    <img src={edenredLogo} alt="Edenred" />
                </div>
            </div>
            <div className="navbar-tabs">
                {tabs.map((tab) => (
                    <span
                        key={tab.path}
                        className={`navbar-tab${location.pathname === tab.path ? " navbar-tab-ativo" : ""}`}
                        onClick={() => navigate(tab.path)}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
            <div className="navbar-direita">
                <div className="navbar-lang">
                    <span
                        className={lang === "ptbr" ? "lang-ativo" : ""}
                        style={{ cursor: "pointer" }}
                        onClick={() => setLang("ptbr")}
                    >
                        ptbr
                    </span>
                    <span className="lang-sep"> | </span>
                    <span
                        className={lang === "eng" ? "lang-ativo" : ""}
                        style={{ cursor: "pointer" }}
                        onClick={() => setLang("eng")}
                    >
                        eng
                    </span>
                </div>
                <div className="perfil-wrapper" ref={dropdownRef}>
                    <button
                        className="perfil-btn"
                        onClick={() => setDropdownAberto(v => !v)}
                        aria-label="Menu do usuário"
                    >
                        <img src={iconeUsuario} alt="Usuário" className="perfil-avatar" />
                    </button>
                    {dropdownAberto && (
                        <div className="perfil-dropdown">
                            <div className="perfil-dropdown-avatar">
                                <img src={iconeUsuario} alt="Usuário" className="perfil-dropdown-foto" />
                            </div>
                            <p className="perfil-dropdown-email">{email}</p>
                            <button className="perfil-dropdown-btn" onClick={() => setDropdownAberto(false)}>
                                <img src={iconeHistorico} alt="" className="perfil-dropdown-icone" />
                                {t.navbar.historico}
                            </button>
                            <button className="perfil-dropdown-btn" onClick={() => setDropdownAberto(false)}>
                                <img src={iconeEngrenagem} alt="" className="perfil-dropdown-icone" />
                                {t.navbar.configuracoes}
                            </button>
                            <button className="perfil-dropdown-sair" onClick={handleTerminarSessao}>
                                {t.navbar.terminarSessao}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function Layout({ children }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            {children}
        </div>
    );
}

function Calculadora() {
    const { resultado, setResultado, periodo, setPeriodo, periodoCalculado } = useCalculo();
    const { t } = useLanguage();

    return (
        <Layout>
            <div className="calculadora-layout">
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "360px", flexShrink: 0 }}>
                    <div className="paginacalculadora2">
                        <div className="a-calculeco-tem">
                            {t.formulario.descricao}
                        </div>
                    </div>
                    <FormularioEmissao
                        onResultado={setResultado}
                        periodoSelecionado={periodo}
                        setPeriodoSelecionado={setPeriodo}
                    />
                </div>
                <div className="resultados-area">
                    <Resultado dados={resultado} periodo={periodoCalculado || periodo} />
                </div>
            </div>
        </Layout>
    );
}

function PaginaInformacoes() {
    return (
        <Layout>
            <Informacoes />
        </Layout>
    );
}

function PaginaAcessibilidade() {
    return (
        <Layout>
            <Acessibilidade />
        </Layout>
    );
}

function AppContent() {
    const { fontSizeIndex, filterEnabled, filterValues } = useAccessibility();
    const hasActiveFilter = filterEnabled && Object.values(filterValues).some(v => v > 0);

    return (
        <div
            style={{
                zoom: FONT_SCALES[fontSizeIndex],
                filter: hasActiveFilter ? "url(#ecoar-color-filter)" : undefined,
                minHeight: "100vh",
            }}
        >
            <ColorFilterSVG />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route
                    path="/calculadora"
                    element={
                        <RotaProtegida>
                            <Calculadora />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/informacoes"
                    element={
                        <RotaProtegida>
                            <PaginaInformacoes />
                        </RotaProtegida>
                    }
                />
                <Route
                    path="/acessibilidade"
                    element={
                        <RotaProtegida>
                            <PaginaAcessibilidade />
                        </RotaProtegida>
                    }
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AccessibilityProvider>
                <LanguageProvider>
                    <CalculoProvider>
                        <AppContent />
                    </CalculoProvider>
                </LanguageProvider>
            </AccessibilityProvider>
        </BrowserRouter>
    );
}

export default App;
