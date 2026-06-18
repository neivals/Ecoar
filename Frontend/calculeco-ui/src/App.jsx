import React, { useState } from "react";
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

    const tabs = [
        { label: t.navbar.calculadora, path: "/calculadora" },
        { label: t.navbar.informacoes, path: "/informacoes" },
        { label: t.navbar.acessibilidade, path: "/acessibilidade" },
    ];

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
