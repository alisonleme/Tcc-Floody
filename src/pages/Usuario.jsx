import React, { useState, useEffect, useRef } from "react";

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
      className={`min-h-screen flex flex-col items-center justify-center p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
      }`}
    >
      {/* Botão toggle tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="fixed top-6 right-6 p-4 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-12 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-8 h-8 transition-colors duration-500 ${
            darkMode ? "fill-yellow-300" : "fill-gray-800"
          }`}
        >
          <path d="M12 2a9.93 9.93 0 00-7.07 2.93A10 10 0 1012 2z" />
        </svg>
      </button>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animated-button {
          background-size: 200% 200%;
          animation: shimmer 4s linear infinite;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          border-radius: 0.75rem;
          cursor: pointer;
          box-shadow: 0 8px 15px rgba(70,130,180,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        }
        .animated-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 25px rgba(70,130,180,0.6);
          color: white;
        }
      `}</style>

      {/* Card centralizado */}
      <div
        className={`p-8 rounded-3xl shadow-xl w-full max-w-md transition-all duration-1000 transform ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        } ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center mb-8">Área do Usuário</h1>

        <div className="flex justify-between mb-6">
          <button className="animated-button" onClick={onLogout}>
            Sair
          </button>
          <button className="animated-button" onClick={excluirConta}>
            Excluir Conta
          </button>
        </div>

        <div className="mb-6 p-4 rounded-lg shadow-inner bg-white bg-opacity-20">
          <p className="mb-2 font-semibold">Conta atual:</p>
          <p className="mb-1">Nome de usuário: {username || "(não informado)"}</p>
          <p className="mb-1">Email: {email}</p>
          <p className="mb-0">Senha: {senha ? esconderSenha(senha) : "(não informada)"}</p>
        </div>

        <div className="space-y-6">
          {/* Nome de usuário */}
          <div>
            <label className="block font-semibold mb-2">Nome de Usuário:</label>
            <input
              type="text"
              value={editandoUsername ? usernameTemp : username}
              onChange={(e) => setUsernameTemp(e.target.value)}
              onFocus={() => !editandoUsername && setEditandoUsername(true)}
              className={`w-full px-4 py-2 rounded-3xl border focus:ring-2 outline-none transition-all duration-300 ${
                darkMode
                  ? "bg-gray-900 border-gray-600 text-gray-100 focus:ring-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
            />
            {editandoUsername && (
              <button
                onClick={() =>
                  confirmarAlteracao("username", usernameTemp, setUsername, setEditandoUsername)
                }
                className="mt-2 animated-button"
              >
                Alterar Nome de Usuário
              </button>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={editandoEmail ? emailTemp : email}
              onChange={(e) => setEmailTemp(e.target.value)}
              onFocus={() => !editandoEmail && setEditandoEmail(true)}
              className={`w-full px-4 py-2 rounded-3xl border focus:ring-2 outline-none transition-all duration-300 ${
                darkMode
                  ? "bg-gray-900 border-gray-600 text-gray-100 focus:ring-yellow-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
            />
            {editandoEmail && (
              <button
                onClick={() => confirmarAlteracao("email", emailTemp, setEmail, setEditandoEmail)}
                className="mt-2 animated-button"
              >
                Alterar Email
              </button>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block font-semibold mb-2">Senha:</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={editandoSenha ? senhaTemp : senha}
                onChange={(e) => setSenhaTemp(e.target.value)}
                onFocus={() => !editandoSenha && setEditandoSenha(true)}
                className={`w-full px-4 py-2 rounded-3xl border focus:ring-2 outline-none transition-all duration-300 pr-10 ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-gray-100 focus:ring-yellow-400"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onMouseDown={() => setMostrarSenha(true)}
                onMouseUp={() => setMostrarSenha(false)}
                onMouseLeave={() => setMostrarSenha(false)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition cursor-pointer select-none"
                tabIndex={-1}
                aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
            {editandoSenha && (
              <button
                onClick={() => confirmarAlteracao("senha", senhaTemp, setSenha, setEditandoSenha)}
                className="mt-2 animated-button"
              >
                Alterar Senha
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
