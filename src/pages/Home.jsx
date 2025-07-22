import React from 'react';
import { Link } from 'react-router-dom';

import FundoPNGclaro from '../Img/FundoPNGclaroGirar.png';
import ImagemDaHome from '../Img/ImagemDaHome.png';
import FundoPNGClaro from '../Img/FundoPNGclaro.png';
import ArtigoImg from '../Img/artigo_quadrado.png';
import ArduinoImg from '../Img/arduino.png';
import ComoFuncionaImg from '../Img/comofunciona.png';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      {/* Seção da imagem principal */}
      <div className="relative w-full h-[900px] flex justify-center items-center overflow-hidden">
        {/* Imagem de fundo principal */}
        <img
          src={ImagemDaHome}
          alt="Imagem Home"
          className="w-[2350px] h-full object-cover max-w-none"
        />

        {/* FundoPNGClaro sobre a imagem (estendido e descido) */}
        <img
          src={FundoPNGClaro}
          alt="Efeito Borda"
          className="absolute top-[700px] left-1/2 -translate-x-1/2 w-[100%] max-w-none z-10 pointer-events-none"
        />

        {/* Texto sobreposto */}
        <div
          className="absolute p-20 text-white text-center max-w-xl z-20"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Floody</p>
        </div>
      </div>

      {/* Faixa ciano */}
      <div className="w-full h-[400px] relative z-10 -mt-16">
        <img src={FundoPNGclaro} alt="Imagem Ciano" className="w-full h-full object-cover" />
      </div>

      {/* Bloco azul escuro com conteúdo */}
      <div className="-mt-40 flex flex-col justify-center items-center relative z-20 px-4">
        <div
          className="p-16 rounded-lg text-white text-center max-w-7xl w-full space-y-6 shadow-lg"
          style={{ backgroundColor: 'rgba(3, 99, 167, 0.85)' }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">O que é o Floody?</h1>

          <div className="text-left text-sm sm:text-lg font-medium space-y-4 leading-relaxed">
            <p>
              🌧️ O Floody foi desenvolvido como um dispositivo doméstico inovador que visa auxiliar no combate
              às enchentes e promover o reaproveitamento da água da chuva. Seu funcionamento simula um{' '}
              <q>piscinão domiciliar</q>, inspirado em estruturas como o Piscinão de Taboão da Serra (RC-5 Taboão).
            </p>
            <p>
              🏠 Trata-se de um ralo inteligente, instalado em áreas externas da casa. Quando identifica acúmulo de
              água, ele se eleva automaticamente, permitindo que a água escoe para seu interior. O sistema realiza
              duas etapas de filtragem: uma inicial e outra mais densa. Após o tratamento, a água é armazenada em um
              reservatório interno e enviada para uma caixa d'água auxiliar, podendo ser reutilizada em tarefas como
              lavar o quintal, regar plantas e dar descarga.
            </p>
            <p>
              👥 <strong>Público-alvo:</strong> Moradores de áreas urbanas com histórico de alagamentos.
            </p>
            <p>
              🎯 <strong>Objetivo do Projeto:</strong> Reduzir os impactos das enchentes e promover práticas
              sustentáveis dentro das residências.
            </p>
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

          <button
            className="mt-6 px-10 py-4 rounded-md font-semibold transition-colors duration-300 text-black hover:text-white shadow-lg hover:shadow-blue-500"
            style={{ backgroundColor: '#B3E1FB', cursor: 'pointer' }}
          >
            📥 Download app
          </button>

          {/* Quadrados com links */}
          <div className="mt-10 flex flex-col space-y-6 max-w-screen-2xl w-full items-center sm:items-start px-2 sm:px-0">
            {[{
              img: ArtigoImg,
              title: 'Artigo Técnico',
              text: 'Clique na imagem para acessar a seção do artigo técnico do Floody, com informações completas sobre a pesquisa e desenvolvimento.',
              link: '/artigo',
            }, {
              img: ArduinoImg,
              title: 'Materiais do Floody',
              text: 'Clique na imagem para ver todos os materiais usados no protótipo do Floody, com descrições e preços.',
              link: '/materias',
            }, {
              img: ComoFuncionaImg,
              title: 'Como Funciona',
              text: 'Clique para entender como o Floody funciona, incluindo sistema, instalação e uso do dispositivo.',
              link: '/comofunciona',
            }].map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row rounded-lg p-4 sm:p-6 items-center sm:items-start w-full max-w-5xl bg-[#B2E1FE]"
              >
                <Link
                  to={item.link}
                  className="mb-3 sm:mb-0 sm:mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ minWidth: '250px' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[250px] h-[50px] sm:w-[300px] sm:h-[80px] md:w-[350px] md:h-[100px] lg:w-[400px] lg:h-[120px] object-cover rounded-md"
                  />
                </Link>
                <div className="text-gray-800 text-center sm:text-left text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                  <p className="mb-1">
                    <strong>{item.title}</strong>
                  </p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
