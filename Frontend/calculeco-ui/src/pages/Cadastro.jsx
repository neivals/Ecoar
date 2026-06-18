import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdOutlineEmail, MdPersonOutline } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { cadastrar, salvarSessao } from "../services/authService";
import edenredLogo from "../icone/image.png";
import "../page css/Cadastro.css";
import calculecoLogo from "../icone/Calculeco_logo11.png";

function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
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
                    <img src={calculecoLogo} alt="Calculeco" />
                </div>
                <div className="edenred-brand" aria-label="Edenred">
                    <img src={edenredLogo} alt="Edenred" />
                </div>
            </header>

            <div className="auth-card">
                <h1 className="auth-titulo">Criar uma conta</h1>

                <button type="button" className="google-btn">
                    <FcGoogle className="google-icon" aria-hidden="true" />
                    Logar com Google
                </button>

                <span className="auth-separator">ou</span>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-campo">
                        <label htmlFor="nome">Nome</label>
                        <MdPersonOutline className="input-icon" aria-hidden="true" />
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                            required
                        />
                    </div>

                    <div className="auth-campo">
                        <label htmlFor="email">Email</label>
                        <MdOutlineEmail className="input-icon" aria-hidden="true" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Insira o email"
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
                            placeholder="Insira sua senha (mínimo 6 caractere)"
                            required
                        />
                    </div>

                    <div className="auth-campo">
                        <label htmlFor="confirmarSenha">Confirmar senha</label>
                        <MdLockOutline className="input-icon" aria-hidden="true" />
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
