import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import FundoPNGclaro from '../Img/FundoPNGclaroGirar.png';
import ImagemDaHome from '../Img/ImagemDaHome.png';
import FundoPNGClaro from '../Img/FundoPNGclaro.png';
import ArtigoImg from '../Img/artigo_quadrado.png';
import ArduinoImg from '../Img/arduino.png';
import ComoFuncionaImg from '../Img/comofunciona.png';

export default function Home() {
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const blocksRef = useRef([]);
  const titleRef = useRef(null);
  const mainRef = useRef(null);

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

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      <div className="relative w-full h-[900px] flex justify-center items-center overflow-hidden">
        <img src={ImagemDaHome} alt="Imagem Home" className="w-[2350px] h-full object-cover max-w-none" />
        <img
          src={FundoPNGClaro}
          alt="Efeito Borda"
          className="absolute top-[700px] left-1/2 -translate-x-1/2 w-full max-w-none z-10 pointer-events-none"
        />
        <div
          ref={titleRef}
          className={`absolute p-20 text-white text-center max-w-xl z-20 transition-all duration-1000 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-5xl font-bold drop-shadow-lg">Floody</p>
        </div>
      </div>

      <div className="w-full h-[400px] relative z-10 -mt-16">
        <img src={FundoPNGclaro} alt="Imagem Ciano" className="w-full h-full object-cover" />
      </div>

      <div className="-mt-40 flex flex-col justify-center items-center relative z-20 px-4">
        <div
          ref={mainRef}
          className={`p-16 rounded-lg text-gray-900 text-center max-w-7xl w-full space-y-6 shadow-lg transition-all duration-1000 transform ${
            mainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ backgroundColor: '#E0E7F3' }}
        >
          <h1 className="text-5xl font-bold">O que é o Floody?</h1>

          <div className="text-left text-lg font-medium space-y-4 leading-relaxed text-justify">
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
            className="mt-6 px-10 py-4 rounded-md font-semibold text-black shadow-lg transition-all duration-500 hover:text-white hover:bg-blue-500 hover:shadow-blue-500"
            style={{ backgroundColor: '#B3E1FB', cursor: 'pointer' }}
          >
            📥 Download app
          </button>

          <div className="mt-10 flex flex-col space-y-6 max-w-screen-2xl w-full items-center sm:items-start px-2 sm:px-0">
            {sections.map((item, i) => (
              <div
                key={i}
                ref={(el) => (blocksRef.current[i] = el)}
                className={`flex flex-col sm:flex-row rounded-lg p-4 sm:p-6 items-center sm:items-start w-full max-w-5xl transform transition-all duration-1000 ease-in-out ${
                  visibleBlocks.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } hover:scale-[1.02]`}
                style={{ backgroundColor: '#AED2E6' }}
              >
                <Link
                  to={item.link}
                  className="mb-3 sm:mb-0 sm:mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 hover:scale-105 cursor-pointer"
                  style={{ minWidth: '250px' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[250px] h-[50px] sm:w-[300px] sm:h-[80px] md:w-[350px] md:h-[100px] lg:w-[400px] lg:h-[120px] object-cover rounded-md"
                  />
                </Link>
                <div className="text-gray-900 text-center sm:text-left text-base lg:text-lg font-semibold text-justify">
                  <p className="mb-1 text-2xl font-bold">{item.title}</p>
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
