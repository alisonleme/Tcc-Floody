import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useState } from "react";

import FundoPNGclaro from "./Img/FundoPNGclaroGirar.png";
import Imagem2 from "./Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Materias from "./pages/Materias";
import SobreNos from "./pages/SobreNos";
import Artigo from "./pages/Artigo";
import Usuario from "./pages/Usuario";
import Auth from "./pages/Auth";
import ComoFunciona from "./pages/ComoFunciona"; // <-- Adicionada aqui

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
    alert(`Tema alterado para: ${!darkMode ? "Escuro" : "Claro"}`);
  };

  const handleLogin = (usuario) => {
    setUser(usuario);
    localStorage.setItem("user", JSON.stringify(usuario));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleUserUpdate = (usuarioAtualizado) => {
    setUser(usuarioAtualizado);
    localStorage.setItem("user", JSON.stringify(usuarioAtualizado));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      users[index] = usuarioAtualizado;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Router>
      {/* Menu fixo */}
      <div className={`fixed top-0 left-0 w-full h-[120px] overflow-hidden z-50 ${darkMode ? "bg-gray-900" : ""}`}>
        <img src={FundoPNGclaro} alt="Fundo girado" className="w-full h-full" />
        <div className="absolute inset-0 h-full">
          <div className="absolute left-1/2 top-[30px] transform -translate-x-1/2 flex space-x-12">
            <Link to="/" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">
              Home
            </Link>
            <Link to="/jogo" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">
              Jogo
            </Link>
            <Link to="/materias" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">
              Matérias
            </Link>
            <Link to="/sobre-nos" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">
              Sobre Nós
            </Link>
          </div>
          <div className="absolute right-8 top-[15px] flex space-x-4">
            <Link to="/usuario" className="p-3 hover:bg-blue-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e3e3e3">
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </Link>

            <button onClick={toggleTheme} className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem2} alt="Modo escuro" className="h-12 w-12" />
            </button>
          </div>
        </div>
      </div>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo" element={<Jogo />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/artigo" element={<Artigo />} />
        <Route path="/comofunciona" element={<ComoFunciona />} /> {/* <-- Rota adicionada */}
        <Route path="/usuario" element={<Usuario user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
