import React, { useState, useEffect, useRef } from "react";

export default function Auth({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const loginInputRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    setError("");
    setLoginId("");
    setEmail("");
    setUsername("");
    setSenha("");
    setTimeout(() => {
      loginInputRef.current?.focus();
    }, 0);
  }, [isLogin]);

  const saveUsers = (newUsers) => {
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      if (!loginId.trim()) {
        setError("Preencha o email ou nome de usuário");
        return;
      }
      if (!senha || senha.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      const user = users.find(
        (u) =>
          (u.email.toLowerCase() === loginId.trim().toLowerCase() ||
            u.username.toLowerCase() === loginId.trim().toLowerCase()) &&
          u.senha === senha
      );

      if (user) {
        onLogin(user);
      } else {
        setError("Usuário ou senha incorretos.");
      }
    } else {
      if (!email.trim() || !username.trim() || !senha) {
        setError("Preencha todos os campos");
        return;
      }
      if (senha.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        return;
      }
      if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
        setError("Email já cadastrado.");
        return;
      }
      if (users.some((u) => u.username.toLowerCase() === username.trim().toLowerCase())) {
        setError("Nome de usuário já cadastrado.");
        return;
      }

      const newUser = { email: email.trim(), username: username.trim(), senha };
      const newUsers = [...users, newUser];
      saveUsers(newUsers);
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

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

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
                  ref={loginInputRef}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Digite seu email ou nome de usuário"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Senha:</label>
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
                <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  value={email}
                  ref={loginInputRef}
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
                <label className="block text-gray-700 font-semibold mb-2">Senha:</label>
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
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            type="button"
          >
            {isLogin ? "Crie uma aqui" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
}
