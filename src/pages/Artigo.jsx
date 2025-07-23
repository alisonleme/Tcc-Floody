import React from 'react';
import Artigo1 from '../Img/image.png';
import Artigo2 from '../Img/image copy.png';
import Artigo3 from '../Img/image copy 2.png';
import { Link } from 'react-router-dom';

export default function Artigo() {
  const artigos = [
    {
      img: Artigo1,
      titulo: '1. Impactos da inserção dos piscinões na escala local: o caso do Reservatório de Contenção RC5 - Taboão',
      download: '/downloads/artigo1.pdf',
    },
    {
      img: Artigo2,
      titulo: '2. Alagamentos em áreas Urbanas: O caso da Av. Amazilio Lino de Souza com Av. Pedro Ludovico em Anápolis -GO',
      download: '/downloads/artigo2.pdf',
    },
    {
      img: Artigo3,
      titulo: '3. Análise do efeito dos reservatórios de detenção domiciliares no escoamento superficial urbano, com inserção parcial da água precipitada, pela estimativa de vazões geradas em uma área urbanizada hipotética',
      download: '/downloads/artigo3.pdf',
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-12 space-y-16"
      style={{ backgroundColor: '#E0E7F3' }}
    >
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mt-20">
        Artigos Utilizados
      </h1>

      <div className="flex flex-col gap-12 w-full max-w-5xl">
        {artigos.map((artigo, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between bg-[#AED2E6] rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-6">
              <img
                src={artigo.img}
                alt={artigo.titulo}
                className="w-48 h-32 object-cover rounded-md shadow-md"
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
              className="mt-6 md:mt-0 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-semibold shadow-md cursor-pointer"
            >
              Fazer Download
            </a>
          </div>
        ))}
      </div>

      <div
        className="bg-white rounded-lg shadow-xl p-8 max-w-5xl text-gray-900 space-y-6 leading-relaxed"
        style={{ textAlign: 'justify' }}
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

      <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
        <a
          href="/downloads/todos-artigos.zip"
          download
          className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 shadow-md cursor-pointer"
        >
          Baixar Todos os Artigos
        </a>
        <Link
          to="/resumo"
          className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300 shadow-md cursor-pointer"
        >
          Ver Página de Resumo
        </Link>
      </div>
    </div>
  );
}
