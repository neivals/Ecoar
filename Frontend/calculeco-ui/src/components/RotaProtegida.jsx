import React from "react";
import { Navigate } from "react-router-dom";
import { estaLogado } from "../services/authService";

// Envolve qualquer rota que exige login.
// Se o usuário não estiver logado, redireciona para /login.
function RotaProtegida({ children }) {
    if (!estaLogado()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default RotaProtegida;
