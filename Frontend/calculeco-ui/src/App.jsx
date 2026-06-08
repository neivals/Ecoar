import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RotaProtegida from "./components/RotaProtegida";
import FormularioEmissao from "./components/FormularioEmissao";
import Resultado from "./components/Resultado";
import "./App.css";

// Página da calculadora (conteúdo original do App)
function Calculadora() {
    const [meusDados, setMeusDados] = useState(null);

    const handleReceberDados = (dadosDoFormulario) => {
        setMeusDados(dadosDoFormulario);
    };

    return (
        <div className="paginacalculadora">
            <FormularioEmissao onResultado={handleReceberDados} />
            <Resultado dados={meusDados} />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota raiz redireciona para login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rota protegida — só acessível após login */}
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
