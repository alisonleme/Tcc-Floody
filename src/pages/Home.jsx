import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer.jsx';
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
      text: 'Clique na imagem para acessar os artigos utilizados na pesquisa do tema, que serviram de base e inspiração para o desenvolvimento do projeto Floody.',
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
      text: 'Clique para entender o funcionamento do Floody, incluindo o sistema, a instalação e a aplicação do dispositivo no dia a dia.',
      link: '/comofunciona',
    },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      const corSecundaria = getComputedStyle(root).getPropertyValue('--cor-secundaria').trim() || '#243c5a';
      root.style.setProperty('--cor-principal', corSecundaria);
    } else {
      root.style.setProperty('--cor-principal', '#06B7F5');
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
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#281d5b] to-[#281d5b]'
        : 'bg-gradient-to-br from-[#2fb7f6] to-[#2fb7f6]'
    }`}>
      
      {/* Banner superior */}
      <div className="relative w-full h-[700px] sm:h-[900px] flex justify-center items-center overflow-hidden transition-all duration-700">
        <img src={ImagemDaHome} alt="Imagem Home" className="w-full h-full object-cover max-w-none" />
        <img src={darkMode ? FundoPNGescuro : FundoPNGClaro} alt="Efeito Borda" className="absolute left-1/2 -translate-x-1/2 bottom-[-570px] sm:bottom-[-570px] md:bottom-[-570px] w-full pointer-events-none transition-opacity duration-700" />
        <div ref={titleRef} className={`absolute p-10 sm:p-20 text-center max-w-xl z-20 transition-all duration-1000 ease-out drop-shadow-lg ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.7)]">Floody</p>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-col justify-center items-center relative z-20 px-4 mt-14 sm:mt-20`}>
        <div ref={mainRef} className={`home-main p-6 sm:p-16 rounded-3xl text-center max-w-7xl w-full space-y-6 shadow-lg transition-all duration-1000 transform ${mainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${darkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-700/70 text-white' : 'bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc] text-gray-900'}`}>
          
          <div className="text-left text-base sm:text-lg font-medium space-y-4 leading-relaxed">
            <h1 className='text-4xl sm:text-5xl font-extrabold text-center'>Floody</h1>

            <p>🌧️ O <strong>Floody</strong> é um sistema inteligente que ajuda a reduzir enchentes e ainda permite o <strong>reaproveitamento completo da água da chuva</strong>.</p>
            <p>💧 Funciona como um receptor de chuva com <strong>filtragem dupla</strong> e purificação, capaz de <strong>remover impurezas e neutralizar a acidez</strong> comum em áreas urbanas e industriais.</p>
            <p>🏠 Pode ser instalado em áreas externas, embutido em <strong>paredes ou telhados próximos às calhas</strong>, de forma simples e eficaz.</p>
            <p>👥 <strong>Público-alvo:</strong> Moradores que buscam <strong>economizar na conta de água</strong> e adotar práticas mais <strong>sustentáveis</strong>.</p>
            <p>🎯 <strong>Objetivo:</strong>  Promover o reaproveitamento da água e incentivar a preservação do meio ambiente.</p>
            <p>📱 Além disso, o sistema conta com um <strong>aplicativo de monitoramento em tempo real</strong>, onde você pode acompanhar o funcionamento, a captação e a qualidade da água armazenada.</p>

            <p>
              🌟 <strong>Diferenciais:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>Ação automática ao detectar acúmulo de água</li>
                <li>Filtragem completa e purificação da água da chuva</li>
                <li>Instalação versátil e simplificada</li>
                <li>Economia na conta de água</li>
                <li>Monitoramento via aplicativo</li>
                <li>Contribuição direta para o meio ambiente</li>
              </ul>
            </p>
          </div>

          <button className={`mt-6 px-8 py-3 sm:px-10 sm:py-4 rounded-md font-semibold shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-shimmer ${darkMode ? 'text-white bg-shimmer-dark' : 'text-gray-900 bg-shimmer-light'}`}>
            📥 Download app
          </button>

          {/* Cards */}
          <div className="mt-20 flex flex-col space-y-6 max-w-screen-2xl w-full items-center sm:items-start px-2 sm:px-0">
            {sections.map((item, i) => (
              <div
                key={i}
                ref={(el) => (blocksRef.current[i] = el)}
                className={`home-card flex flex-col sm:flex-row rounded-xl p-4 sm:p-8 items-center sm:items-start w-full max-w-5xl shadow-xl hover:shadow-2xl transform transition-all duration-1000 ease-in-out cursor-pointer hover:scale-[1.03] ${visibleBlocks.includes(i) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${darkMode ? 'bg-gradient-to-br from-gray-800/85 to-gray-700/75 text-white' : 'bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc] text-gray-900'}`}
                style={{ transitionDelay: visibleBlocks.includes(i) ? `${i * 200}ms` : '0ms' }}
              >
                <Link to={item.link} className="mb-4 sm:mb-0 sm:mr-8 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 hover:scale-105 min-w-[220px]">
                  <img src={item.img} alt={item.title} className="w-[220px] h-[50px] sm:w-[300px] sm:h-[80px] md:w-[350px] md:h-[100px] lg:w-[400px] lg:h-[120px] object-cover rounded-md" />
                </Link>
                <div className="text-center sm:text-left text-sm sm:text-base lg:text-lg font-semibold text-justify">
                  <p className="mb-2 text-xl sm:text-2xl font-bold">{item.title}</p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
