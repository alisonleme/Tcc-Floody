import React from 'react';
import FundoPNGclaro from '../Img/FundoPNGclaro.png';
import Imagem1 from '../Img/account_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';
import Imagem2 from '../Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png';

export function ParteDeCima() {
  return (
    <div className="relative min-h-screen bg-gray-100">

      {/* TOPO FIXO */}
      <div className="fixed top-0 left-0 w-full h-[150px] overflow-hidden z-50 relative">
        <img
          src={FundoPNGclaro}
          alt="Fundo girado"
          className="w-full h-full object-cover transform rotate-180"
        />

        {/* Container principal */}
        <div className="absolute inset-0 flex items-center h-full">

          {/* Botões centralizados */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-56">
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Jogo</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Matérias</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Sobre Nós</button>
          </div>

          {/* Ícones canto direito */}
          <div className="ml-auto flex space-x-4 pr-6">
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem1} alt="Perfil" className="h-12 w-12 object-contain" />
            </button>
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem2} alt="Modo escuro" className="h-12 w-12 object-contain" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
