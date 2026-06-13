import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
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
                <span className="navbar-tab navbar-tab-ativo">{t.navbar.calculadora}</span>
                <span className="navbar-tab">{t.navbar.informacoes}</span>
                <span className="navbar-tab">{t.navbar.acessibilidade}</span>
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

function Calculadora() {
    const [meusDados, setMeusDados] = useState(null);

    const handleReceberDados = (dadosDoFormulario) => {
        setMeusDados(dadosDoFormulario);
    };

    return (
        <LanguageProvider>
            <div className="paginacalculadora">
                <Navbar />
                <div className="calculadora-layout">
                    <FormularioEmissao onResultado={handleReceberDados} />
                    <div className="resultados-area">
                        <Resultado dados={meusDados} />
                        <Conscientizacao />
                    </div>
                </div>
            </div>
        </LanguageProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
