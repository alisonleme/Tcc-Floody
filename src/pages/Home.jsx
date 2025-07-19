import React from 'react';
import { Link } from 'react-router-dom';

import FundoPNGclaro from '../Img/FundoPNGclaroGirar.png';
import Imagem1 from '../Img/account_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import Imagem2 from '../Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import ImagemDaHome from '../Img/ImagemDaHome.png';
import FundoPNGClaro from '../Img/FundoPNGclaro.png';
import ArtigoImg from '../Img/artigo_quadrado.png';
import ArduinoImg from '../Img/arduino.png';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      {/* IMAGEM DA HOME */}
      <div className="w-full h-[900px] relative z-0 flex justify-center items-center">
        <img src={ImagemDaHome} alt="Imagem Home" className="w-[2350px] h-full object-cover" />
        <div className="absolute p-20 rounded-lg text-white text-center max-w-xl" style={{ backgroundColor: 'rgba(3, 99, 167, 0.2)' }}>
          <p className="text-4xl font-bold">Floody</p>
        </div>
      </div>

      <div className="w-full h-[400px] relative z-10 -mt-15">
        <img src={FundoPNGClaro} alt="Imagem Adicional" className="w-full h-full" />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="-mt-20 flex flex-col justify-center items-center relative z-20 px-4">
        <div className="p-16 rounded-lg text-white text-center max-w-7xl w-full space-y-6" style={{ backgroundColor: 'rgba(3, 99, 167, 0.75)' }}>
          <h1 className="text-4xl font-bold">O que é o Floody?</h1>

          {/* Texto detalhado com emojis */}
          <div className="text-left text-lg font-medium space-y-4 leading-relaxed">
            <p>🌧️ O Floody foi desenvolvido como um dispositivo doméstico inovador que visa auxiliar no combate às enchentes e promover o reaproveitamento da água da chuva. Seu funcionamento simula um <q>piscinão domiciliar</q>, inspirado em estruturas como o Piscinão de Taboão da Serra (RC-5 Taboão).</p>

            <p>🏠 Trata-se de um ralo inteligente, instalado em áreas externas da casa. Quando identifica acúmulo de água, ele se eleva automaticamente, permitindo que a água escoe para seu interior. O sistema realiza duas etapas de filtragem: uma inicial e outra mais densa. Após o tratamento, a água é armazenada em um reservatório interno e enviada para uma caixa d'água auxiliar, podendo ser reutilizada em tarefas como lavar o quintal, regar plantas e dar descarga.</p>

            <p>👥 <strong>Público-alvo:</strong> Moradores de áreas urbanas com histórico de alagamentos.</p>

            <p>🎯 <strong>Objetivo do Projeto:</strong> Reduzir os impactos das enchentes e promover práticas sustentáveis dentro das residências.</p>

            <p>✨ <strong>Diferenciais do Floody:</strong></p>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>Ação automática em casos de acúmulo de água</li>
              <li>Sistema de filtragem</li>
              <li>Reaproveitamento de água tratada</li>
              <li>Instalação simples em áreas externas</li>
              <li>Contribuição direta com o meio ambiente</li>
            </ul>

            <p>📲 Baixe o app do Floody:</p>
          </div>

          {/* Botão Download app */}
          <button
            className="mt-6 px-10 py-4 rounded-md font-semibold transition-colors duration-300 text-black hover:text-white shadow-lg hover:shadow-blue-500"
            style={{ backgroundColor: '#B3E1FB', cursor: 'pointer' }}
          >
            📥 Download app
          </button>

          {/* Quadrados de navegação */}
          <div className="mt-10 flex flex-col space-y-6 max-w-7xl w-full items-start">
            {/* Artigo */}
            <div className="flex rounded-lg p-6 items-center max-w-xl w-full" style={{ backgroundColor: '#B2E1FE' }}>
              <Link to="/artigo" className="mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500">
                <img src={ArtigoImg} alt="Artigo" className="w-500 h-32 object-cover rounded-md" />
              </Link>
              <p className="text-lg font-semibold text-gray-800">
                Clique para acessar a seção do artigo técnico do Floody.
              </p>
            </div>

            {/* Matérias */}
            <div className="flex rounded-lg p-6 items-center max-w-xl w-full" style={{ backgroundColor: '#B2E1FE' }}>
              <Link to="/materias" className="mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500">
                <img src={ArduinoImg} alt="Matérias" className="w-500 h-32 object-cover rounded-md" />
              </Link>
              <p className="text-lg font-semibold text-gray-800">
                Clique para acessar a lista de matérias e conteúdos usados no Floody.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ÍCONE FIXO NO CANTO INFERIOR ESQUERDO */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          className="group p-5 hover:bg-blue-500 rounded-full transition-colors duration-300"
          style={{ backgroundColor: '#B1E3FD' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="64px" width="64px" viewBox="0 -960 960 960" className="fill-black group-hover:fill-white transition duration-300">
            <path d="M480-540ZM80-160v-80h400v80H80Zm120-120q-33 0-56.5-23.5T120-360v-360q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720H200v360h280v80H200Zm600 40v-320H640v320h160Zm-180 80q-25 0-42.5-17.5T560-220v-360q0-25 17.5-42.5T620-640h200q25 0 42.5 17.5T880-580v360q0 25-17.5 42.5T820-160H620Zm100-300q13 0 21.5-9t8.5-21q0-13-8.5-21.5T720-520q-12 0-21 8.5t-9 21.5q0 12 9 21t21 9Zm0 60Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
