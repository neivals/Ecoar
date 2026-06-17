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

    const setResultado = (dados) => {
        setResultadoState(dados);
        if (dados) {
            sessionStorage.setItem("calculeco_resultado", JSON.stringify(dados));
        } else {
            sessionStorage.removeItem("calculeco_resultado");
        }
    };

    const setPeriodo = (p) => {
        setPeriodoState(p);
        sessionStorage.setItem("calculeco_periodo", p);
    };

    return (
        <CalculoContext.Provider value={{ resultado, setResultado, periodo, setPeriodo }}>
            {children}
        </CalculoContext.Provider>
    );
}

export function useCalculo() {
    return useContext(CalculoContext);
}