import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import FundoPNGclaro from "./Img/FundoPNGclaroGirar.png";
import FundoPNGescuro from "./Img/FundoPNGescuroGirar.png";
import MenuIcon from "./Img/menu_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import WaterDropIcon from "./Img/water_drop_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import Error404 from './components/Error404';

import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Materias from "./pages/Materias";
import SobreNos from "./pages/SobreNos";
import Artigo from "./pages/Artigo";
import ComoFunciona from "./pages/ComoFunciona";
import Resumo from "./pages/Resumo";

export function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("floody-theme") === "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("floody-theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark", newTheme);
  };

  const paths = ["/jogo", "/materias", "/artigo", "/comofunciona", "/sobre-nos"];
  const labels = ["Jogo", "Materiais", "Artigo", "Dispositivo", "Sobre Nós"];

  return (
    <Router>
      {/* Cabeçalho fixo */}
      <div className="fixed top-0 left-0 w-full h-[120px] overflow-hidden z-50">
        <img
          src={darkMode ? FundoPNGescuro : FundoPNGclaro}
          alt="Fundo girado"
          className="w-full h-full"
        />
        <div className="absolute inset-0 h-full flex items-center px-6">
          {/* Home no lado esquerdo */}
          <Link
            to="/"
            className="text-white p-3 rounded-full cursor-pointer transition-colors duration-300 flex items-center hover:bg-blue-500 hover:text-blue-200"
            aria-label="Home"
          >
            <img src={WaterDropIcon} alt="Home" className="w-10 h-10" />
          </Link>

          {/* Container flexível que ocupa o meio */}
          <nav className="flex-grow hidden md:flex justify-center space-x-28">
            {paths.map((path, idx) => (
              <Link
                key={idx}
                to={path}
                className="text-white hover:text-blue-500 text-xl font-bold transition-colors duration-300 relative flex items-center gap-2"
              >
                {labels[idx]}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Botões lado direito */}
          <div className="flex items-center space-x-6 ml-auto">
            {/* Tema */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full cursor-pointer transition-colors duration-300 hover:bg-blue-500"
              aria-label="Alternar tema"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                className={`transition-colors duration-300 ${darkMode ? "fill-yellow-300" : "fill-gray-200"}`}
              >
                <path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q18 0 38 2.5t42 7.5q-47 26-74.5 73.5T458-602q0 87 61.5 148.5T668-392q59 0 106-27-5 22-7.5 42t-2.5 38q0 133-93.5 226.5T480-160Z" />
              </svg>
            </button>

            {/* Menu Hambúrguer */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-3 rounded-full cursor-pointer transition hover:bg-blue-500 md:hidden"
              aria-label="Menu"
            >
              <img src={MenuIcon} alt="Menu" className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="fixed top-[120px] right-0 w-64 bg-gray-900 text-white shadow-xl z-50 p-6 animate-slideIn">
          <ul className="space-y-4 text-lg font-bold">
            {paths.map((path, idx) => (
              <li key={idx}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-blue-400 transition flex items-center gap-2"
                >
                  {labels[idx]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/jogo" element={<Jogo darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/materias" element={<Materias darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/sobre-nos" element={<SobreNos darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/artigo" element={<Artigo darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/comofunciona" element={<ComoFunciona darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/resumo" element={<Resumo darkMode={darkMode} toggleTheme={toggleTheme} />} />

        {/* Rota 404 personalizada */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </Router>
  );
}
