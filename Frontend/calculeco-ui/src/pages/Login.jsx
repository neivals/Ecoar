import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, salvarSessao } from "../services/authService";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const dados = await login(email, senha);
            salvarSessao(dados.token, dados.email);
            navigate("/calculadora");
        } catch (err) {
            const mensagem =
                err.response?.data?.erro || "Email ou senha inválidos.";
            setErro(mensagem);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-titulo">Entrar</h1>
                <p className="auth-subtitulo">Calculadora de Emissão de Carbono</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-campo">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className="auth-campo">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Sua senha"
                            required
                        />
                    </div>

                    {erro && <p className="auth-erro">{erro}</p>}

                    <button type="submit" disabled={carregando} className="auth-btn">
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="auth-link">
                    Não tem conta ainda?{" "}
                    <Link to="/cadastro">Criar conta</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
