import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Artigo1 from "../Img/image.png";
import Artigo2 from "../Img/image copy.png";
import Artigo3 from "../Img/image copy 2.png";
import Footer from '../components/Footer.jsx';

const artigos = [
  {
    img: Artigo1,
    titulo: "Chuvas Ácidas: Impactos Ambientais, Urbanos e a Importância de sua Análise",
    download: "/downloads/artigo1.pdf",
  },
  {
    img: Artigo2,
    titulo: "Educação Ambiental e Chuva Ácida: Uma Abordagem Didática no Ensino Médio",
    download: "/downloads/artigo2.pdf",
  },
  {
    img: Artigo3,
    titulo: "Tecnologias de Filtração e Radiação Ultravioleta para o Tratamento da Água de Chuva",
    download: "/downloads/artigo3.pdf",
  },
];

export default function Artigo({ darkMode, toggleTheme }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const buttonClasses = `mt-6 md:mt-0 px-8 py-3 rounded-2xl font-semibold shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-[#06B7F5] via-[#4AA2E2] to-[#06B7F5] text-gray-900`;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-start p-6 md:p-12 space-y-14 md:space-y-16 transition-colors duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
      }`}
    >
      {/* Botão alternar tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className={`fixed top-6 right-6 p-3 rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300 inline-flex items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={darkMode ? "#ffffff" : "#374151"}
          className="w-8 h-8 transition-transform duration-500 hover:rotate-15 hover:scale-110"
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
        className={`text-5xl font-extrabold text-center mt-20 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${darkMode ? "text-white drop-shadow-lg" : "text-gray-900"}`}
      >
        Artigos Utilizados
      </h1>

      {/* Lista de artigos */}
      <div className="flex flex-col gap-14 w-full max-w-5xl">
        {artigos.map((artigo, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80 text-white"
                : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc] text-gray-900"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={artigo.img}
                alt={artigo.titulo}
                loading="lazy"
                className="w-48 h-32 md:w-64 md:h-40 object-cover rounded-3xl shadow-md transition-transform duration-300 hover:scale-110"
              />
              <p
                className={`font-semibold text-lg md:text-xl leading-relaxed max-w-xl ${
                  darkMode ? "text-white drop-shadow-sm" : "text-gray-900"
                } text-justify`}
              >
                {artigo.titulo}
              </p>
            </div>
            <a
              href={artigo.download}
              download
              aria-label={`Baixar o artigo: ${artigo.titulo}`}
              className={buttonClasses}
            >
              Fazer Download
            </a>
          </div>
        ))}
      </div>

      {/* Card explicativo */}
      <div
        className={`rounded-3xl shadow-xl p-8 max-w-5xl leading-relaxed transition-all duration-700 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80 text-white"
            : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc] text-gray-900"
        } text-justify`}
      >
        <p className="text-lg md:text-xl mb-4">
          As imagens acima representam três artigos que foram pesquisados e utilizados como base teórica e de dados para o desenvolvimento do projeto Floody.
        </p>
        <p className="text-lg md:text-xl mb-4">
          📥 Para baixar individualmente, use os botões "Fazer Download".
        </p>
        <p className="text-lg md:text-xl">
          Ou, utilize os botões abaixo para baixar todos ou ver o resumo.
        </p>
      </div>

      {/* Botões finais */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-8 w-full max-w-5xl">
        <a href="/downloads/todos-artigos.zip" download className={buttonClasses}>
          Baixar Todos os Artigos
        </a>
        <Link to="/resumo" className={buttonClasses}>
          Ver Página de Resumo
        </Link>
      </div>

      <Footer />
    </div>
  );
}
