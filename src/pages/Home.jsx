import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import FundoPNGclaro from '../Img/FundoPNGclaroGirar.png';
import FundoPNGescuro from '../Img/FundoPNGescuro.png';
import FundoPNGClaro from '../Img/FundoPNGclaro.png';
import ImagemDaHome from '../Img/ImagemDaHome.png';
import ArtigoImg from '../Img/artigo_quadrado.png';
import ArduinoImg from '../Img/arduino.png';
import ComoFuncionaImg from '../Img/comofunciona.png';

export default function Home({ darkMode }) {
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const blocksRef = useRef([]);
  const titleRef = useRef(null);
  const mainRef = useRef(null);

  const sections = [
    {
      img: ArtigoImg,
      title: 'Artigo Técnico',
      text: 'Clique na imagem para acessar a seção do artigo técnico do Floody, com informações completas sobre a pesquisa e desenvolvimento.',
      link: '/artigo',
    },
    {
      img: ArduinoImg,
      title: 'Materiais do Floody',
      text: 'Clique na imagem para ver todos os materiais usados no protótipo do Floody, com descrições e preços.',
      link: '/materias',
    },
    {
      img: ComoFuncionaImg,
      title: 'Como Funciona',
      text: 'Clique para entender como o Floody funciona, incluindo sistema, instalação e uso do dispositivo.',
      link: '/comofunciona',
    },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      const corSecundaria =
        getComputedStyle(root).getPropertyValue('--cor-secundaria').trim() || '#243c5a';
      root.style.setProperty('--cor-principal', corSecundaria);
    } else {
      root.style.setProperty('--cor-principal', '#06baf9');
    }
  }, [darkMode]);

  useEffect(() => {
    const blockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = blocksRef.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleBlocks((prev) => [...new Set([...prev, index])]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    blocksRef.current.forEach((el) => el && blockObserver.observe(el));
    return () => blockObserver.disconnect();
  }, []);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTitleVisible(true);
        });
      },
      { threshold: 0.5 }
    );
    if (titleRef.current) titleObserver.observe(titleRef.current);
    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    const mainObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setMainVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (mainRef.current) mainObserver.observe(mainRef.current);
    return () => mainObserver.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: 'var(--cor-principal)' }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-button {
            background: ${darkMode
              ? 'linear-gradient(270deg, rgba(147,51,234,0.6), rgba(88,28,135,0.6), rgba(30,58,138,0.5))'
              : 'linear-gradient(270deg, rgba(113,183,230,0.7), rgba(179,221,254,0.7), rgba(74,144,226,0.7))'};
            background-size: 400% 400%;
            animation: shimmer 6s ease infinite;
            transition: all 0.5s ease-in-out;
          }
          .animated-button:hover {
            filter: brightness(1.15);
          }
        `}
      </style>

      {/* Banner superior */}
      <div className="relative w-full h-[900px] flex justify-center items-center overflow-hidden transition-all duration-700">
        <img src={ImagemDaHome} alt="Imagem Home" className="w-[2350px] h-full object-cover max-w-none" />
        <img
          src={darkMode ? FundoPNGescuro : FundoPNGClaro}
          alt="Efeito Borda"
          className="absolute top-[700px] left-1/2 -translate-x-1/2 w-full max-w-none z-10 pointer-events-none transition-opacity duration-700"
        />
        <div
          ref={titleRef}
          className={`absolute p-20 text-center max-w-xl z-20 transition-all duration-1000 ease-out drop-shadow-lg ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.7)]">Floody</p>
        </div>
      </div>

      {!darkMode && (
        <div className="w-full h-[400px] relative z-10 -mt-16 transition-all duration-700">
          <img
            src={FundoPNGclaro}
            alt="Imagem Ciano"
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>
      )}

      {/* Bloco principal com texto e cards */}
      <div
        className={`flex flex-col justify-center items-center relative z-20 px-4 ${
          darkMode ? 'mt-20' : '-mt-40'
        } transition-all duration-700`}
      >
        <div
          ref={mainRef}
          className={`p-16 rounded-2xl text-center max-w-7xl w-full space-y-6 shadow-lg transition-all duration-1000 transform ${
            mainVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(51,65,85,0.7))'
              : 'linear-gradient(to bottom right, #d0e6f8cc, #a3cbeecc)',
            color: darkMode ? '#f8fafc' : '#1f2937',
            transition: 'background 0.7s ease-in-out, color 0.7s ease-in-out, opacity 0.8s ease, transform 0.8s ease',
            transitionDelay: mainVisible ? '150ms' : '0ms',
          }}
        >
          <h1 className="text-5xl font-extrabold">O que é o Floody?</h1>

          <div
            className="text-left text-lg font-medium space-y-4 leading-relaxed"
            style={{
              color: darkMode ? '#f1f5f9' : '#1f2937',
              transition: 'color 0.7s ease-in-out',
            }}
          >
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
            className="mt-6 px-10 py-4 rounded-md font-semibold shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl animated-button"
            style={{
              color: darkMode ? '#f1f5f9' : '#1f2937',
              transition: 'color 0.7s ease-in-out, background 0.7s ease-in-out',
            }}
          >
            📥 Download app
          </button>

          <div className="mt-10 flex flex-col space-y-6 max-w-screen-2xl w-full items-center sm:items-start px-2 sm:px-0">
            {sections.map((item, i) => (
              <div
                key={i}
                ref={(el) => (blocksRef.current[i] = el)}
                className={`flex flex-col sm:flex-row rounded-xl p-6 sm:p-8 items-center sm:items-start w-full max-w-5xl shadow-xl hover:shadow-2xl transform transition-all duration-1000 ease-in-out cursor-pointer hover:scale-[1.03] ${
                  visibleBlocks.includes(i)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.75))'
                    : 'linear-gradient(to bottom right, #d0e6f8cc, #a3cbeecc)',
                  color: darkMode ? '#f8fafc' : '#1f2937',
                  transition: `background 0.7s ease-in-out, color 0.7s ease-in-out, opacity 0.8s ease, transform 0.8s ease`,
                  transitionDelay: visibleBlocks.includes(i) ? `${i * 200}ms` : '0ms',
                }}
              >
                <Link
                  to={item.link}
                  className="mb-4 sm:mb-0 sm:mr-8 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 hover:scale-105"
                  style={{ minWidth: '250px' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[250px] h-[50px] sm:w-[300px] sm:h-[80px] md:w-[350px] md:h-[100px] lg:w-[400px] lg:h-[120px] object-cover rounded-md"
                  />
                </Link>
                <div className="text-center sm:text-left text-base lg:text-lg font-semibold text-justify">
                  <p className="mb-2 text-2xl font-bold">{item.title}</p>
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
