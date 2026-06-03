import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cadastrar, salvarSessao } from "../services/authService";

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
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-titulo">Criar conta</h1>
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
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div className="auth-campo">
                        <label htmlFor="confirmarSenha">Confirmar senha</label>
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
                    Já tem uma conta?{" "}
                    <Link to="/login">Entrar</Link>
                </p>
            </div>
        </div>
    );
}

export default Cadastro;
