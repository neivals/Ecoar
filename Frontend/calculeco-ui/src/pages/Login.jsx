import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { login, salvarSessao } from "../services/authService";
import edenredLogo from "../icone/image.png";
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
                    <img src={edenredLogo} alt="Edenred" />
                </div>
            </header>

            <div className="auth-card">
                <h1 className="auth-titulo">Login into CalculECO</h1>

                <button type="button" className="google-btn">
                    <FcGoogle className="google-icon" aria-hidden="true" />
                    Logar com Google
                </button>

                <span className="auth-separator">or</span>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-campo">
                        <label htmlFor="email">Email</label>
                        <MdOutlineEmail className="input-icon" aria-hidden="true" />
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
                        <MdLockOutline className="input-icon" aria-hidden="true" />
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
                    Esqueceu a senha?
                </a>

                <p className="auth-link">
                    Não possui uma conta?{" "}
                    <Link to="/cadastro">Criar uma conta</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
