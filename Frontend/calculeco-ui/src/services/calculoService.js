import axios from "axios";

const API = "http://localhost:8080";

export function calcularEmissao(dados) {
    return axios.post(`${API}/emissoes`, dados);
}