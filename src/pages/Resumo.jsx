import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImagemDaHome from "../Img/ImagemDaHome.png";

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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-8 space-y-10 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
      }`}
    >
      {/* Botão de alternar tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="fixed top-6 right-6 p-4 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-12 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-8 h-8 transition-colors duration-500 ${
            darkMode ? "fill-yellow-300" : "fill-gray-800"
          }`}
        >
          <path d="M12 2a9.93 9.93 0 00-7.07 2.93A10 10 0 1012 2z" />
        </svg>
      </button>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animated-button {
          background-size: 200% 200%;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 transition-all duration-700">
        Resumo dos Artigos
      </h1>

      {/* Imagem principal */}
      <img
        src={ImagemDaHome}
        alt="Imagem Resumo"
        className="w-full max-w-4xl rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      />

      {/* Conteúdo do resumo */}
      <div
        ref={setRef("conteudo")}
        data-section="conteudo"
        className={`p-8 rounded-3xl shadow-xl max-w-5xl space-y-6 leading-relaxed text-justify text-lg transition-all duration-1000 transform ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        } ${visibleSections.conteudo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
        className={`flex flex-col md:flex-row gap-6 mt-6 transition-all duration-1000 transform ${
          visibleSections.botoes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <a
          href="/downloads/resumo.pdf"
          download
          className={`px-8 py-4 rounded-3xl font-semibold shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
        >
          Baixar Resumo Completo
        </a>

        <a
          href="/downloads/resumo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-8 py-4 rounded-3xl font-semibold shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
        >
          Abrir Resumo em Nova Aba
        </a>

        <Link
          to="/artigo"
          className={`px-8 py-4 rounded-3xl font-semibold shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
        >
          Voltar para Artigos
        </Link>
      </div>
    </div>
  );
}
