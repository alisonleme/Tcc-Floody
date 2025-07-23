import React, { useState, useEffect, useRef } from "react";

export default function Usuario({ user, onLogout, onUserUpdate }) {
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
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6 transition-all duration-1000 transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-1000 transform ${
          visible ? "scale-100" : "scale-90"
        }`}
      >
        <h1
          className={`text-3xl font-extrabold text-center mb-8 text-gray-900 transition-all duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Área do Usuário
        </h1>

        <div className="flex justify-between mb-6">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transform hover:scale-105 shadow-md hover:shadow-lg transition"
          >
            Sair
          </button>
          <button
            onClick={excluirConta}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 shadow-md hover:shadow-lg transition"
          >
            Excluir Conta
          </button>
        </div>

        <div
          className={`mb-6 p-4 bg-gray-100 rounded-lg text-justify shadow-inner transition-all duration-1000 ${
            visible ? "opacity-100 animate-pulse" : "opacity-0"
          }`}
        >
          <p className="mb-2 font-semibold">Conta atual:</p>
          <p className="mb-1">Nome de usuário: {username || "(não informado)"}</p>
          <p className="mb-1">Email: {email}</p>
          <p className="mb-0">Senha: {senha ? esconderSenha(senha) : "(não informada)"}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-base">Nome de Usuário:</label>
            <input
              type="text"
              value={editandoUsername ? usernameTemp : username}
              onChange={(e) => setUsernameTemp(e.target.value)}
              onFocus={() => !editandoUsername && setEditandoUsername(true)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            {editandoUsername && (
              <button
                onClick={() => confirmarAlteracao("username", usernameTemp, setUsername, setEditandoUsername)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 shadow-md hover:shadow-xl transition"
              >
                Alterar Nome de Usuário
              </button>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-base">Email:</label>
            <input
              type="email"
              value={editandoEmail ? emailTemp : email}
              onChange={(e) => setEmailTemp(e.target.value)}
              onFocus={() => !editandoEmail && setEditandoEmail(true)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            {editandoEmail && (
              <button
                onClick={() => confirmarAlteracao("email", emailTemp, setEmail, setEditandoEmail)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 shadow-md hover:shadow-xl transition"
              >
                Alterar Email
              </button>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-base">Senha:</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={editandoSenha ? senhaTemp : senha}
                onChange={(e) => setSenhaTemp(e.target.value)}
                onFocus={() => !editandoSenha && setEditandoSenha(true)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition-all duration-300 pr-10"
              />
              <button
                type="button"
                onMouseDown={() => setMostrarSenha(true)}
                onMouseUp={() => setMostrarSenha(false)}
                onMouseLeave={() => setMostrarSenha(false)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 cursor-pointer transition"
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
            {editandoSenha && (
              <button
                onClick={() => confirmarAlteracao("senha", senhaTemp, setSenha, setEditandoSenha)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 shadow-md hover:shadow-xl transition"
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
