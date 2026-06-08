import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function cadastrar(email, senha, confirmarSenha) {
    const response = await axios.post(`${API}/auth/cadastro`, {
        email,
        senha,
        confirmarSenha,
    });
    return response.data; // { token, email }
}

export async function login(email, senha) {
    const response = await axios.post(`${API}/auth/login`, { email, senha });
    return response.data; // { token, email }
}

export function salvarSessao(token, email) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
}

export function obterToken() {
    return localStorage.getItem("token");
}

export function obterEmail() {
    return localStorage.getItem("email");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
}

export function estaLogado() {
    return !!localStorage.getItem("token");
}
