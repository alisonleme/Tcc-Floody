import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Artigo1 from "../Img/image.png";
import Artigo2 from "../Img/image copy.png";
import Artigo3 from "../Img/image copy 2.png";

const artigos = [
  {
    img: Artigo1,
    titulo:
      "1. Impactos da inserção dos piscinões na escala local: o caso do Reservatório de Contenção RC5 - Taboão",
    download: "/downloads/artigo1.pdf",
  },
  {
    img: Artigo2,
    titulo:
      "2. Alagamentos em áreas Urbanas: O caso da Av. Amazilio Lino de Souza com Av. Pedro Ludovico em Anápolis -GO",
    download: "/downloads/artigo2.pdf",
  },
  {
    img: Artigo3,
    titulo:
      "3. Análise do efeito dos reservatórios de detenção domiciliares no escoamento superficial urbano...",
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

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-colors duration-500 ${
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
      <h1
        className={`text-5xl font-extrabold text-center mt-20 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Artigos Utilizados
      </h1>

      {/* Lista de artigos */}
      <div className="flex flex-col gap-12 w-full max-w-5xl">
        {artigos.map((artigo, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 shadow-xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
                : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
            }`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: visible ? `${index * 150}ms` : "0ms",
            }}
          >
            <div className="flex items-center gap-6">
              <img
                src={artigo.img}
                alt={artigo.titulo}
                loading="lazy"
                className="w-48 h-32 object-cover rounded-3xl shadow-md transition-transform duration-300 hover:scale-110"
              />
              <p
                className={`font-semibold text-lg md:text-xl leading-relaxed max-w-xl ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
                style={{ textAlign: "justify" }}
              >
                {artigo.titulo}
              </p>
            </div>
            <a
              href={artigo.download}
              download
              aria-label={`Baixar o artigo: ${artigo.titulo}`}
              className={`mt-6 md:mt-0 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button ${
                darkMode
                  ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900 hover:text-black"
                  : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white hover:text-gray-200"
              }`}
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
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        }`}
        style={{
          textAlign: "justify",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: visible ? `${artigos.length * 150}ms` : "0ms",
        }}
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
      <div
        className="flex flex-col md:flex-row items-center gap-8 mt-8 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: visible ? `${(artigos.length + 1) * 150}ms` : "0ms",
        }}
      >
        <a
          href="/downloads/todos-artigos.zip"
          download
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
        >
          Baixar Todos os Artigos
        </a>
        <Link
          to="/resumo"
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
        >
          Ver Página de Resumo
        </Link>
      </div>
    </div>
  );
}
