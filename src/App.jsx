import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React from "react";

import FundoPNGclaro from "./Img/FundoPNGclaroGirar.png";
import Imagem1 from "./Img/account_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import Imagem2 from "./Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

// Páginas
import Home from "./pages/Home";
import Jogo from "./pages/Jogo";
import Materias from "./pages/Materias";
import SobreNos from "./pages/SobreNos";
import Artigo from "./pages/Artigo";

export function App() {
  return (
    <Router>
      {/* Menu fixo no topo */}
      <div className="fixed top-0 left-0 w-full h-[120px] overflow-hidden z-50">
        <img src={FundoPNGclaro} alt="Fundo girado" className="w-full h-full" />
        <div className="absolute inset-0 h-full">
          <div className="absolute left-1/2 top-[30px] transform -translate-x-1/2 flex space-x-12">
            <Link to="/" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">Home</Link>
            <Link to="/jogo" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">Jogo</Link>
            <Link to="/materias" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">Matérias</Link>
            <Link to="/sobre-nos" className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2 whitespace-nowrap">Sobre Nós</Link>
          </div>
          <div className="absolute right-8 top-[15px] flex space-x-4">
            <button className="p-3 hover:bg-blue-500 rounded-full"><img src={Imagem1} alt="Perfil" className="h-12 w-12" /></button>
            <button className="p-3 hover:bg-blue-500 rounded-full"><img src={Imagem2} alt="Modo escuro" className="h-12 w-12" /></button>
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
        {/* fallback para qualquer rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
