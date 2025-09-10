import React, { useState, useEffect, useRef } from "react";
import Footer from '../components/Footer.jsx';

export default function Usuario({ user, onLogout, onUserUpdate, darkMode, toggleTheme }) {
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState(user.senha);
  const [username, setUsername] = useState(user.username || "");
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [editandoUsername, setEditandoUsername] = useState(false);
  const [emailTemp, setEmailTemp] = useState(email);
  const [senhaTemp, setSenhaTemp] = useState(senha);
  const [usernameTemp, setUsernameTemp] = useState(username);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [visible, setVisible] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    setEmailTemp(email);
    setSenhaTemp(senha);
    setUsernameTemp(username);
  }, [email, senha, username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Função para fechar todas as edições
  const fecharEdicoes = () => {
    setEditandoEmail(false);
    setEditandoSenha(false);
    setEditandoUsername(false);
  };

  // Fecha edições ao clicar fora do card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        fecharEdicoes();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const confirmarAlteracao = (campo, valor, setValor, fecharEdicao) => {
    const mensagens = {
      email: "Você tem certeza que deseja alterar o email?",
      senha: "Você tem certeza que deseja alterar a senha?",
      username: "Você tem certeza que deseja alterar o nome de usuário?",
    };
    if (window.confirm(mensagens[campo])) {
      setValor(valor);
      salvarUsuario({
        email: campo === "email" ? valor : email,
        senha: campo === "senha" ? valor : senha,
        username: campo === "username" ? valor : username,
      });
      alert(`${campo.charAt(0).toUpperCase() + campo.slice(1)} alterado com sucesso!`);
      fecharEdicao(false);
    }
  };

  const salvarUsuario = (novoUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      users[index] = novoUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    onUserUpdate(novoUser);
    localStorage.setItem("user", JSON.stringify(novoUser));
  };

  const excluirConta = () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.")) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users = users.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("user");
      alert("Conta excluída com sucesso!");
      onLogout();
    }
  };

  const esconderSenha = (senha) => senha.replace(/./g, "*");

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()} // impede fechar edições ao clicar dentro do card
      className={`usuario-container min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
      }`}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .btn-gradient {
          background: linear-gradient(270deg, #7c3aed, #a78bfa, #c4b5fd);
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 1.5rem;
          cursor: pointer;
          color: white;
          box-shadow: 0 8px 15px rgba(124,58,237,0.5);
          font-size: 0.875rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        @media (min-width: 640px) {
          .btn-gradient { padding: 0.75rem 1.5rem; font-size: 1rem; }
        }
        .btn-gradient:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 20px rgba(124,58,237,0.75);
        }
        .btn-danger {
          background: linear-gradient(270deg, rgba(220,38,38,0.9), rgba(244,63,94,0.85), rgba(219,39,119,0.85));
          box-shadow: 0 8px 18px rgba(244,63,94,0.5);
          animation: shimmer 6s ease infinite, pulse 2s infinite;
        }
        .input-field {
          border-radius: 1.5rem;
          padding: 0.5rem 0.75rem;
          border-width: 1.5px;
          outline: none;
          transition: box-shadow 0.3s ease;
          width: 100%;
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .input-field { padding: 0.5rem 1rem; font-size: 1rem; }
        }
        .input-field:focus { box-shadow: 0 0 8px 2px #7c3aed; }

        /* Mobile: mais respiro no topo */
        @media (max-width: 768px) {
          .usuario-container {
            padding-top: 8rem !important; /* empurra conteúdo pra baixo */
          }
          .usuario-container > div:first-of-type {
            margin-top: 2rem !important; /* card não fica colado no topo */
          }
        }
      `}</style>

      {/* Botão de alternar tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-4 rounded-full shadow-lg transition-transform duration-500 hover:scale-110 hover:rotate-12"
        style={{
          background: "linear-gradient(270deg, #7c3aed, #a78bfa, #c4b5fd)",
          backgroundSize: "400% 400%",
          animation: "shimmer 6s ease infinite",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500 ${
            darkMode ? "fill-yellow-300" : "fill-white"
          }`}
        >
          <path d="M12 2a9.93 9.93 0 00-7.07 2.93A10 10 0 1012 2z" />
        </svg>
      </button>

      {/* Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md sm:max-w-lg transition-all duration-1000 transform ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        } ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8">
          Área do Usuário
        </h1>

        {/* Informações do usuário */}
        <div
          className={`mb-6 p-4 sm:p-6 rounded-xl shadow-inner text-sm sm:text-base ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <p className="mb-2 font-semibold">Conta atual:</p>
          <p className="mb-1">
            Nome de usuário: <span className="font-normal">{username || "(não informado)"}</span>
          </p>
          <p className="mb-1">
            Email: <span className="font-normal">{email}</span>
          </p>
          <p className="mb-0">
            Senha: <span className="font-normal">{senha ? esconderSenha(senha) : "(não informada)"}</span>
          </p>
        </div>

        {/* Campos editáveis */}
        <div className="space-y-6">
          {/* Nome de usuário */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base" htmlFor="username-input">
              Nome de Usuário:
            </label>
            <input
              id="username-input"
              type="text"
              value={editandoUsername ? usernameTemp : username}
              onChange={(e) => setUsernameTemp(e.target.value)}
              onFocus={() => {
                setEditandoUsername(true);
                setEditandoEmail(false);
                setEditandoSenha(false);
              }}
              className={`input-field ${
                darkMode ? "bg-gray-900 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
              style={{ borderColor: darkMode ? "#a78bfa" : "#7c3aed" }}
            />
            {editandoUsername && (
              <button
                onClick={() => confirmarAlteracao("username", usernameTemp, setUsername, setEditandoUsername)}
                className="mt-3 btn-gradient w-full sm:w-auto"
              >
                Alterar Nome de Usuário
              </button>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base" htmlFor="email-input">
              Email:
            </label>
            <input
              id="email-input"
              type="email"
              value={editandoEmail ? emailTemp : email}
              onChange={(e) => setEmailTemp(e.target.value)}
              onFocus={() => {
                setEditandoEmail(true);
                setEditandoUsername(false);
                setEditandoSenha(false);
              }}
              className={`input-field ${
                darkMode ? "bg-gray-900 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
              style={{ borderColor: darkMode ? "#a78bfa" : "#7c3aed" }}
            />
            {editandoEmail && (
              <button
                onClick={() => confirmarAlteracao("email", emailTemp, setEmail, setEditandoEmail)}
                className="mt-3 btn-gradient w-full sm:w-auto"
              >
                Alterar Email
              </button>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base" htmlFor="senha-input">
              Senha:
            </label>
            <div className="relative">
              <input
                id="senha-input"
                type={mostrarSenha ? "text" : "password"}
                value={editandoSenha ? senhaTemp : senha}
                onChange={(e) => setSenhaTemp(e.target.value)}
                onFocus={() => {
                  setEditandoSenha(true);
                  setEditandoEmail(false);
                  setEditandoUsername(false);
                }}
                className={`input-field pr-10 ${
                  darkMode ? "bg-gray-900 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                style={{ borderColor: darkMode ? "#a78bfa" : "#7c3aed" }}
              />
              <button
                type="button"
                onMouseDown={() => setMostrarSenha(true)}
                onMouseUp={() => setMostrarSenha(false)}
                onMouseLeave={() => setMostrarSenha(false)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition cursor-pointer select-none"
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
            {editandoSenha && (
              <button
                onClick={() => confirmarAlteracao("senha", senhaTemp, setSenha, setEditandoSenha)}
                className="mt-3 btn-gradient w-full sm:w-auto"
              >
                Alterar Senha
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Botões principais */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-md sm:max-w-lg justify-between">
        <button className="btn-gradient w-full sm:w-auto" onClick={onLogout}>
          Sair
        </button>
        <button className="btn-gradient btn-danger w-full sm:w-auto" onClick={excluirConta}>
          Excluir Conta
        </button>
      </div>
      <Footer />
    </div>
  );
}
