import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Informacoes from "./pages/Informacoes";
import RotaProtegida from "./components/RotaProtegida";
import FormularioEmissao from "./components/FormularioEmissao";
import Resultado from "./components/Resultado";
import "./App.css";
import Conscientizacao from "./components/Conscientizacao";
import calculecoLogo from "./icone/Calculeco_logo2.png";
import edenredLogo from "./icone/Edenred_logo1.png";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

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
                <img src={calculecoLogo} alt="Calculeco" />
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
    const [meusDados, setMeusDados] = useState(null);

    const handleReceberDados = (dadosDoFormulario) => {
        setMeusDados(dadosDoFormulario);
    };

    return (
        <Layout>
            <div className="calculadora-layout">
                <FormularioEmissao onResultado={handleReceberDados} />
                <div className="resultados-area">
                    <Resultado dados={meusDados} />
                    <Conscientizacao />
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

function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
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
                </Routes>
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
