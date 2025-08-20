import React, { useState, useEffect } from "react";
import Footer from '../components/Footer.jsx';
const DarkModeIcon = ({ darkMode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={darkMode ? "#ffffff" : "#1f2937"}
    viewBox="0 0 24 24"
    strokeWidth={0}
    stroke="none"
    className={`w-6 h-6 transition-transform duration-700 ease-in-out ${
      darkMode ? "rotate-180" : "rotate-0"
    }`}
  >
    <path d="M9.37 5.51a7.49 7.49 0 0 0 9.11 9.11 7 7 0 1 1-9.11-9.11z" />
  </svg>
);

export default function Auth({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const savedTheme = localStorage.getItem("floody-theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("floody-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("floody-theme", "light");
      }
      return newMode;
    });
  };

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

  const textoCor = "text-[#1f2937]";

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-[#d8e7f5]"
      }`}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-rotate {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(15deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animated-button {
          background: linear-gradient(270deg, #4a90e2, #71b7e6, #b3ddfe);
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
        }
        .theme-toggle {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .theme-toggle:hover {
          animation: pulse-rotate 0.6s ease-in-out;
          box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }

        /* RESPONSIVIDADE MOBILE - só telas <= 640px */
        @media (max-width: 640px) {
          /* Ajusta padding do container do card para mobile */
          .max-w-md {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Labels e inputs menores no mobile */
          label {
            font-size: 0.875rem; /* 14px */
          }

          input {
            font-size: 0.875rem !important;
            min-height: 38px !important;
          }

          /* Botão maior e confortável no mobile */
          button[type="submit"] {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>

      <div
        className={`bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] rounded-3xl shadow-xl w-full max-w-md p-8 transition-transform duration-700 transform ${textoCor}`}
      >
        {/* Botão toggle de tema com animação */}
        <button
          onClick={toggleDarkMode}
          aria-label="Alternar tema claro/escuro"
          className="theme-toggle mb-6 p-2 rounded-full bg-gray-800 dark:bg-gray-700 shadow-md hover:shadow-lg inline-flex items-center justify-center"
          style={{ width: 40, height: 40 }}
          type="button"
        >
          <DarkModeIcon darkMode={darkMode} />
        </button>

        <h1 className={`text-2xl font-bold text-center mb-6 ${textoCor}`}>
          {isLogin ? "Login" : "Cadastro"}
        </h1>

        <p className={`mb-6 text-justify ${textoCor}`}>
          {isLogin
            ? "Por favor, faça login utilizando seu email ou nome de usuário e senha. Sua senha deve conter pelo menos 6 caracteres."
            : "Preencha todos os campos para criar sua conta. Certifique-se de usar um email válido e uma senha com pelo menos 6 caracteres."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin ? (
            <>
              <div>
                <label className={`block font-semibold mb-2 ${textoCor}`}>
                  Email ou Nome de Usuário:
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Digite seu email ou nome de usuário"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-white border-gray-600"
                      : "bg-white text-[#1f2937] placeholder-[#1f2937] border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${textoCor}`}>
                  Senha:
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-white border-gray-600"
                      : "bg-white text-[#1f2937] placeholder-[#1f2937] border-gray-300"
                  }`}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className={`block font-semibold mb-2 ${textoCor}`}>
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-white border-gray-600"
                      : "bg-white text-[#1f2937] placeholder-[#1f2937] border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${textoCor}`}>
                  Nome de Usuário:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu nome de usuário"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-white border-gray-600"
                      : "bg-white text-[#1f2937] placeholder-[#1f2937] border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block font-semibold mb-2 ${textoCor}`}>
                  Senha:
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white placeholder-white border-gray-600"
                      : "bg-white text-[#1f2937] placeholder-[#1f2937] border-gray-300"
                  }`}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 rounded animated-button font-semibold shadow-lg transition duration-300 hover:shadow-2xl cursor-pointer"
            style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className={`mt-4 text-center ${textoCor}`}>
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setUsername("");
              setSenha("");
              setLoginId("");
            }}
            className="underline cursor-pointer"
            style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
            type="button"
          >
            {isLogin ? "Crie uma aqui" : "Faça login"}
          </button>
        </p>
      </div>
      <Footer />
    </div>
  );
}
