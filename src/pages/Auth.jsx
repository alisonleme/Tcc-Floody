import React, { useState, useEffect } from "react";

export default function Auth({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsers = (newUsers) => {
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!loginId) {
        alert("Preencha o email ou nome de usuário");
        return;
      }
      if (!senha || senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      const user = users.find(
        (u) =>
          (u.email === loginId || u.username === loginId) && u.senha === senha
      );

      if (user) {
        alert("Login realizado com sucesso!");
        onLogin(user);
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } else {
      if (!email || !username || !senha) {
        alert("Preencha todos os campos");
        return;
      }
      if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres");
        return;
      }
      if (users.some((u) => u.email === email)) {
        alert("Email já cadastrado.");
        return;
      }
      if (users.some((u) => u.username === username)) {
        alert("Nome de usuário já cadastrado.");
        return;
      }

      const newUser = { email, username, senha };
      const newUsers = [...users, newUser];
      saveUsers(newUsers);
      alert("Cadastro realizado com sucesso!");
      onLogin(newUser);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Cadastro"}
        </h1>

        <p className="mb-6 text-justify text-gray-700">
          {isLogin
            ? "Por favor, faça login utilizando seu email ou nome de usuário e senha. Sua senha deve conter pelo menos 6 caracteres."
            : "Preencha todos os campos para criar sua conta. Certifique-se de usar um email válido e uma senha com pelo menos 6 caracteres."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin ? (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email ou Nome de Usuário:
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Digite seu email ou nome de usuário"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Senha:
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nome de Usuário:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu nome de usuário"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Senha:
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setUsername("");
              setSenha("");
              setLoginId("");
            }}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
          >
            {isLogin ? "Crie uma aqui" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
}
