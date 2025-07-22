import React from 'react';
import { Link } from 'react-router-dom';

import FundoPNGClaro from '../Img/FundoPNGclaro.png';

export default function ComoFunciona() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      {/* HEADER */}
      <div className="w-full h-[400px] relative z-0 flex justify-center items-center overflow-hidden">
        <img
          src={FundoPNGClaro}
          alt="Fundo"
          className="absolute w-full h-full object-cover"
        />
        <div
          className="absolute p-8 rounded-lg text-white text-center max-w-xl"
          style={{ backgroundColor: 'rgba(3, 99, 167, 0.6)' }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Como o Floody Funciona</h1>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col items-center justify-center relative z-10 px-4 -mt-10">
        <div
          className="p-10 rounded-lg text-white text-center max-w-7xl w-full space-y-8"
          style={{ backgroundColor: 'rgba(3, 99, 167, 0.75)' }}
        >
          <p className="text-sm sm:text-lg leading-relaxed">
            O Floody funciona como um ralo inteligente que identifica acúmulo de água e redireciona para um sistema
            de filtragem e armazenamento, permitindo o reaproveitamento seguro da água da chuva em diversas tarefas domésticas.
          </p>

          <ul className="list-disc list-inside text-left space-y-2 text-sm sm:text-lg">
            <li>Detecta acúmulo de água automaticamente</li>
            <li>Realiza filtragem em duas etapas</li>
            <li>Armazena a água em reservatórios para reuso</li>
            <li>Ajuda a reduzir alagamentos em áreas residenciais</li>
          </ul>

          {/* BOTÃO PARA VOLTAR */}
          <div className="mt-8">
            <Link
              to="/"
              className="px-8 py-4 bg-[#B3E1FB] rounded-md text-black hover:text-white shadow-lg hover:shadow-blue-500 transition-colors duration-300 font-semibold"
            >
              ⬅ Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
