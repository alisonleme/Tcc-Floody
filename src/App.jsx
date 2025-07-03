import React from 'react';
import FundoPNGclaro from './Img/FundoPNGclaroGirar.png';
import Imagem1 from './Img/account_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import Imagem2 from './Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import ImagemDaHome from './Img/ImagemDaHome.png';
import FundoPNGClaro from './Img/FundoPNGclaro.png';

export function App() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      
      {/* IMAGEM DA HOME NO FLUXO NORMAL */}
      <div className="w-full h-[900px] relative z-0 flex justify-center items-center">
        <img
          src={ImagemDaHome}
          alt="Imagem Home"
          className="w-[2350px] h-full object-cover"
        />

        {/* Quadrado azul transparente centralizado */}
        <div className="absolute p-20 rounded-lg text-white text-center max-w-sm">
          <p className="text-4xl font-bold">
            Floody
          </p>
        </div>
      </div>

      <div className="w-full h-[400px] relative z-10 -mt-15">
        <img
          src={FundoPNGClaro}
          alt="Imagem Adicional"
          className="w-full h-full"
        />
      </div>

      {/* TOPO FIXO SEMPRE NA FRENTE */}
      <div className="fixed top-0 left-0 w-full h-[120px] overflow-hidden z-50">
        <img
          src={FundoPNGclaro}
          alt="Fundo girado"
          className="w-full h-full"
        />

        <div className="absolute inset-0 h-full">

          {/* Botões centralizados subidos */}
          <div className="absolute left-1/2 top-[30px] transform -translate-x-1/2 flex space-x-56">
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Jogo</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Matérias</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Sobre Nós</button>
          </div>

          {/* Ícones canto direito subidos */}
          <div className="absolute right-8 top-[15px] flex space-x-4">
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem1} alt="Perfil" className="h-12 w-12 object-contain" />
            </button>
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem2} alt="Modo escuro" className="h-12 w-12 object-contain" />
            </button>
          </div>

        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL ABAIXO DE TUDO */}
      <div className="pt-[140px] flex justify-center items-center relative z-20">
        <h1 className="text-3xl font-bold text-white">Conteúdo Principal</h1>
      </div>

    </div>
  );
}
