import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export function calcularEmissao(dados) {
    return axios.post(`${API}/calcular/emissao`, dados);
}