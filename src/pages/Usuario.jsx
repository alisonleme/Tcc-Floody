import React, { useState, useEffect } from "react";

export default function Usuario({ user, onLogout, onUserUpdate }) {
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState(user.senha);
  const [username, setUsername] = useState(user.username || ""); // nome de usuário
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [editandoUsername, setEditandoUsername] = useState(false);
  const [emailTemp, setEmailTemp] = useState(email);
  const [senhaTemp, setSenhaTemp] = useState(senha);
  const [usernameTemp, setUsernameTemp] = useState(username);
  const [mostrarSenha, setMostrarSenha] = useState(false); // controla se a senha fica visível

  useEffect(() => {
    setEmailTemp(email);
  }, [email]);

  useEffect(() => {
    setSenhaTemp(senha);
  }, [senha]);

  useEffect(() => {
    setUsernameTemp(username);
  }, [username]);

  const confirmarAlteracaoEmail = () => {
    if (window.confirm("Você tem certeza que deseja alterar o email?")) {
      setEmail(emailTemp);
      salvarUsuario({ email: emailTemp, senha, username });
      alert("Email alterado com sucesso!");
      setEditandoEmail(false);
    }
  };

  const confirmarAlteracaoSenha = () => {
    if (window.confirm("Você tem certeza que deseja alterar a senha?")) {
      setSenha(senhaTemp);
      salvarUsuario({ email, senha: senhaTemp, username });
      alert("Senha alterada com sucesso!");
      setEditandoSenha(false);
    }
  };

  const confirmarAlteracaoUsername = () => {
    if (window.confirm("Você tem certeza que deseja alterar o nome de usuário?")) {
      setUsername(usernameTemp);
      salvarUsuario({ email, senha, username: usernameTemp });
      alert("Nome de usuário alterado com sucesso!");
      setEditandoUsername(false);
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

  const esconderSenha = (senha) => senha.replace(/./g, "*");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Área do Usuário</h1>

        <button
          onClick={onLogout}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sair
        </button>

        <div className="mb-6 p-4 bg-gray-200 rounded">
          <p>
            <strong>Conta atual:</strong>
          </p>
          <p>Nome de usuário: {username || "(não informado)"}</p>
          <p>Email: {email}</p>
          <p>Senha: {senha ? esconderSenha(senha) : "(não informada)"}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nome de Usuário:</label>
            <input
              type="text"
              value={editandoUsername ? usernameTemp : username}
              onChange={(e) => setUsernameTemp(e.target.value)}
              onFocus={() => !editandoUsername && setEditandoUsername(true)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {editandoUsername && (
              <button
                onClick={confirmarAlteracaoUsername}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Alterar Nome de Usuário
              </button>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={editandoEmail ? emailTemp : email}
              onChange={(e) => setEmailTemp(e.target.value)}
              onFocus={() => !editandoEmail && setEditandoEmail(true)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {editandoEmail && (
              <button
                onClick={confirmarAlteracaoEmail}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Alterar Email
              </button>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Senha:</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={editandoSenha ? senhaTemp : senha}
                onChange={(e) => setSenhaTemp(e.target.value)}
                onFocus={() => !editandoSenha && setEditandoSenha(true)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
              />
              <button
                type="button"
                onMouseDown={() => setMostrarSenha(true)}
                onMouseUp={() => setMostrarSenha(false)}
                onMouseLeave={() => setMostrarSenha(false)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                aria-label="Mostrar senha"
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
            {editandoSenha && (
              <button
                onClick={confirmarAlteracaoSenha}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
