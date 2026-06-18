import { createContext, useContext, useState } from "react";

const CalculoContext = createContext();

export function CalculoProvider({ children }) {
    const [resultado, setResultadoState] = useState(() => {
        const salvo = sessionStorage.getItem("calculeco_resultado");
        return salvo ? JSON.parse(salvo) : null;
    });

    const [periodo, setPeriodoState] = useState(() => {
        return sessionStorage.getItem("calculeco_periodo") || "";
    });

    const [periodoCalculado, setPeriodoCalculadoState] = useState(() => {
        return sessionStorage.getItem("calculeco_periodo_calculado") || "";
    });

    const setResultado = (dados, periodoUsado) => {
        setResultadoState(dados);
        if (dados) {
            sessionStorage.setItem("calculeco_resultado", JSON.stringify(dados));
            if (periodoUsado) {
                setPeriodoCalculadoState(periodoUsado);
                sessionStorage.setItem("calculeco_periodo_calculado", periodoUsado);
            }
        } else {
            sessionStorage.removeItem("calculeco_resultado");
            sessionStorage.removeItem("calculeco_periodo_calculado");
            setPeriodoCalculadoState("");
        }
    };

    const setPeriodo = (p) => {
        setPeriodoState(p);
        sessionStorage.setItem("calculeco_periodo", p);
    };

    return (
        <CalculoContext.Provider value={{ resultado, setResultado, periodo, setPeriodo, periodoCalculado }}>
            {children}
        </CalculoContext.Provider>
    );
}

export function useCalculo() {
    return useContext(CalculoContext);
}