import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrar, salvarSessao } from "../services/authService";
import "../page css/Cadastro.css";

function Cadastro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);
        try {
            const dados = await cadastrar(email, senha, confirmarSenha);
            salvarSessao(dados.token, dados.email);
            navigate("/calculadora");
        } catch (err) {
            const mensagem =
                err.response?.data?.erro || "Erro ao realizar cadastro.";
            setErro(mensagem);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="auth-container cadastro-page">
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
                <h1 className="auth-titulo">Create an account</h1>

                <button type="button" className="google-btn">
                    <span className="google-icon" aria-hidden="true">G</span>
                    Sign up with Google
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
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div className="auth-campo">
                        <label htmlFor="confirmarSenha">Confirmar senha</label>
                        <span className="input-icon lock-icon" aria-hidden="true"></span>
                        <input
                            id="confirmarSenha"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Repita sua senha"
                            required
                        />
                    </div>

                    {erro && <p className="auth-erro">{erro}</p>}

                    <button type="submit" disabled={carregando} className="auth-btn">
                        {carregando ? "Criando conta..." : "Criar conta"}
                    </button>
                </form>

                <p className="auth-link">
                    Já possui uma conta?{" "}
                    <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;
