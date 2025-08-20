import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImagemDaHome from "../Img/ImagemDaHome.png";
import Footer from '../components/Footer.jsx';
export default function Resumo({ darkMode, toggleTheme }) {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (key) => (el) => {
    sectionsRef.current[key] = el;
  };

  // Botões estilo Artigo.jsx
  const buttonClasses =
    "mt-4 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button";

  return (
    <div
      className={`container-padding-mobile min-h-screen flex flex-col items-center justify-start p-6 md:p-8 space-y-10 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
      }`}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-button {
          background: ${
            darkMode
              ? "linear-gradient(270deg, rgba(147,51,234,0.6), rgba(88,28,135,0.6), rgba(30,58,138,0.5))"
              : "linear-gradient(270deg, rgba(113,183,230,0.7), rgba(179,221,254,0.7), rgba(74,144,226,0.7))"
          };
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
          color: ${darkMode ? "#f8fafc" : "#1f2937"};
          text-shadow: ${darkMode ? "0 0 6px rgba(0,0,0,0.7)" : "none"};
          transition: all 0.7s ease-in-out;
        }
        .animated-button:hover {
          filter: brightness(1.15);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .container-padding-mobile {
            padding-top: 6rem !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .content-section {
            margin-top: 3rem !important;
            padding: 2.5rem 1rem !important;
            font-size: 1rem !important;
            line-height: 1.6 !important;
            text-align: justify !important;
          }
          .action-buttons {
            flex-direction: column !important;
            width: 100%;
            gap: 1rem !important;
          }
          .action-buttons > a {
            width: 100%;
            text-align: center;
          }
          img.resumo-image {
            max-width: 100%;
            height: auto;
            border-radius: 1.5rem;
          }
        }
      `}</style>

      {/* Botão de alternar tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="fixed top-6 right-6 p-4 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-12 shadow-lg bg-gray-700/40 backdrop-blur-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="white"
          style={{
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.7))",
          }}
        >
          {darkMode ? (
            <path d="M12 3v1m0 16v1m8.485-9h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
          ) : (
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          )}
        </svg>
      </button>

      {/* Título */}
      <h1
        className={`text-5xl font-bold text-center mb-6 transition-all duration-700 ${
          darkMode ? "text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]" : ""
        }`}
      >
        Resumo dos Artigos
      </h1>

      {/* Imagem principal */}
      <img
        src={ImagemDaHome}
        alt="Imagem Resumo"
        className="resumo-image w-full max-w-4xl rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      />

      {/* Conteúdo do resumo */}
      <div
        ref={setRef("conteudo")}
        data-section="conteudo"
        className={`content-section p-8 rounded-3xl shadow-xl max-w-5xl space-y-6 leading-relaxed text-justify transition-all duration-1000 transform ${
          darkMode
            ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc] text-gray-900"
        } ${
          visibleSections.conteudo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Soluções para Alagamentos e Drenagem Urbana no Brasil
        </h2>

        <p>
          As chuvas fortes, mesmo as de média intensidade, têm se tornado um dos maiores desafios enfrentados pelas cidades brasileiras.
          A impermeabilização do solo, ocupações irregulares e sistemas de drenagem ultrapassados transformam precipitações intensas em alagamentos frequentes.
        </p>

        <p>
          Este resumo reúne três estudos com diferentes abordagens para entender e combater esses eventos:
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-2">1. Impactos dos Piscinões no ABCD Paulista</h3>
          <p>
            O estudo do Reservatório RC5 em São Bernardo do Campo mostra que piscinões, embora eficazes, podem gerar impactos negativos no entorno quando mal planejados.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. Reservatórios Domiciliares</h3>
          <p>
            Pequenos reservatórios residenciais reduziram picos de vazão em até 31% em simulações, mostrando que soluções descentralizadas podem aliviar o sistema urbano.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Alagamentos em Anápolis-GO</h3>
          <p>
            O estudo aponta crescimento urbano desorganizado e obstrução de cursos d’água como fatores principais, propondo infraestrutura verde e fiscalização.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Conclusão</h3>
          <p>
            É essencial integrar infraestrutura cinza e verde, planejamento urbano e educação ambiental para mitigar enchentes cada vez mais frequentes.
          </p>
        </div>
      </div>

      {/* Botões de ação */}
      <div
        ref={setRef("botoes")}
        data-section="botoes"
        className={`action-buttons flex flex-col md:flex-row gap-6 mt-6 transition-all duration-1000 transform ${
          visibleSections.botoes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <a href="/downloads/resumo.pdf" download className={buttonClasses}>
          Baixar Resumo Completo
        </a>

        <a
          href="/downloads/resumo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          Abrir Resumo em Nova Aba
        </a>

        <Link to="/artigo" className={buttonClasses}>
          Voltar para Artigos
        </Link>
      </div>
      <Footer />
    </div>
  );
}
