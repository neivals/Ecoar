import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, salvarSessao } from "../services/authService";
import "../page css/Login.css";

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
        <div className="auth-container login-page">
            <header className="auth-brandbar" aria-label="Marcas">
                <div className="calculeco-brand">
                    <span className="calculeco-mark" aria-hidden="true"></span>
                    <span>CalculECO</span>
                </div>
                <div className="edenred-brand" aria-label="Edenred">
                    <span aria-hidden="true"></span>
                    Edenred
                </div>
            </header>

            <div className="auth-card">
                <h1 className="auth-titulo">Login into CalculECO</h1>

                <button type="button" className="google-btn">
                    <span className="google-icon" aria-hidden="true">G</span>
                    Log in with Google
                </button>

                <span className="auth-separator">or</span>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-campo">
                        <label htmlFor="email">Email</label>
                        <span className="input-icon email-icon" aria-hidden="true"></span>
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
                        <span className="input-icon lock-icon" aria-hidden="true"></span>
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

                <a href="#" className="forgot-password">
                    Don’t remember your password?
                </a>

                <p className="auth-link">
                    Don’t have an account?{" "}
                    <Link to="/cadastro">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
