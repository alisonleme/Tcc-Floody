import React, { useState, useEffect, useRef } from 'react';
import Artigo1 from '../Img/image.png';
import Artigo2 from '../Img/image copy.png';
import Artigo3 from '../Img/image copy 2.png';
import { Link } from 'react-router-dom';

const artigos = [
  {
    img: Artigo1,
    titulo:
      '1. Impactos da inserção dos piscinões na escala local: o caso do Reservatório de Contenção RC5 - Taboão',
    download: '/downloads/artigo1.pdf',
  },
  {
    img: Artigo2,
    titulo:
      '2. Alagamentos em áreas Urbanas: O caso da Av. Amazilio Lino de Souza com Av. Pedro Ludovico em Anápolis -GO',
    download: '/downloads/artigo2.pdf',
  },
  {
    img: Artigo3,
    titulo:
      '3. Análise do efeito dos reservatórios de detenção domiciliares no escoamento superficial urbano, com inserção parcial da água precipitada, pela estimativa de vazões geradas em uma área urbanizada hipotética',
    download: '/downloads/artigo3.pdf',
  },
];

export default function Artigo() {
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
      className="min-h-screen flex flex-col items-center justify-start p-12 space-y-16"
      style={{ backgroundColor: '#d8e7f5' }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-button {
            background: linear-gradient(270deg, #4a90e2, #71b7e6, #b3ddfe);
            background-size: 400% 400%;
            animation: shimmer 6s ease infinite;
          }
        `}
      </style>

      <h1
        className={`text-5xl font-extrabold text-gray-900 text-center mt-20 transform transition-all duration-700 ease-in-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Artigos Utilizados
      </h1>

      <div className="flex flex-col gap-12 w-full max-w-5xl">
        {artigos.map((artigo, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl cursor-pointer bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6]`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: visible ? `${index * 150}ms` : '0ms',
            }}
          >
            <div className="flex items-center gap-6">
              <img
                src={artigo.img}
                alt={artigo.titulo}
                loading="lazy"
                className="w-48 h-32 object-cover rounded-3xl shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <p
                className="text-gray-900 font-semibold text-lg md:text-xl leading-relaxed max-w-xl"
                style={{ textAlign: 'justify' }}
              >
                {artigo.titulo}
              </p>
            </div>
            <a
              href={artigo.download}
              download
              aria-label={`Baixar o artigo: ${artigo.titulo}`}
              className="mt-6 md:mt-0 px-6 py-3 rounded-xl text-gray-900 shadow-lg transition-all duration-500 hover:text-white hover:shadow-2xl animated-button cursor-pointer transform hover:scale-105"
            >
              Fazer Download
            </a>
          </div>
        ))}
      </div>

      {/* Card explicativo no mesmo estilo com gradiente */}
      <div
        className={`rounded-3xl shadow-xl p-8 max-w-5xl text-gray-900 space-y-6 leading-relaxed transform transition-all duration-700 ease-in-out bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6]`}
        style={{
          textAlign: 'justify',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: visible ? `${artigos.length * 150}ms` : '0ms',
        }}
      >
        <p className="text-lg md:text-xl">
          As imagens acima representam três artigos que foram pesquisados e utilizados como base teórica e de dados para o desenvolvimento do projeto Floody. Cada um traz informações relevantes sobre sustentabilidade, reaproveitamento da água e tecnologias aplicadas em soluções urbanas.
        </p>
        <p className="text-lg md:text-xl">
          📥 Para baixar os artigos individualmente, use os botões "Fazer Download" ao lado de cada imagem.
        </p>
        <p className="text-lg md:text-xl">
          Se preferir, use o botão abaixo para <strong>baixar todos os artigos de uma vez</strong> ou clique no botão de <strong>Resumo</strong>, que levará você a uma página com o resumo dos três artigos (também disponível para download).
        </p>
      </div>

      <div
        className={`flex flex-col md:flex-row items-center gap-8 mt-8 transform transition-all duration-700 ease-in-out`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: visible ? `${(artigos.length + 1) * 150}ms` : '0ms',
        }}
      >
        <a
          href="/downloads/todos-artigos.zip"
          download
          className="px-6 py-3 rounded-xl text-gray-900 shadow-lg transition-all duration-500 hover:text-white hover:shadow-2xl animated-button cursor-pointer transform hover:scale-105"
        >
          Baixar Todos os Artigos
        </a>
        <Link
          to="/resumo"
          className="px-6 py-3 rounded-xl text-gray-900 shadow-lg transition-all duration-500 hover:text-white hover:shadow-2xl animated-button cursor-pointer transform hover:scale-105"
        >
          Ver Página de Resumo
        </Link>
      </div>
    </div>
  );
}
