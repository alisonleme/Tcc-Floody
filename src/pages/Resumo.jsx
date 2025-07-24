import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ImagemDaHome from '../Img/ImagemDaHome.png';

export default function Resumo() {
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
    <div className="min-h-screen flex flex-col items-center justify-start p-8 space-y-10 bg-[#d8e7f5]">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-button {
          background: linear-gradient(270deg, #4a90e2, #71b7e6, #b3ddfe);
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
          transition: color 0.3s ease, box-shadow 0.3s ease;
        }
        .animated-button:hover {
          color: white !important;
          box-shadow: 0 8px 15px rgba(59, 130, 246, 0.6);
        }
        .fade-slide-enter {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-slide-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
        Resumo dos Artigos
      </h1>

      <img
        src={ImagemDaHome}
        alt="Imagem Resumo"
        className="w-full max-w-4xl rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-110 cursor-pointer"
      />

      <div
        ref={setRef('conteudo')}
        data-section="conteudo"
        className={`bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] p-8 rounded-3xl shadow-xl max-w-5xl text-gray-900 space-y-6 leading-relaxed text-justify text-lg transition-all duration-1000 transform ${
          visibleSections.conteudo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Soluções para Alagamentos e Drenagem Urbana no Brasil
        </h2>

        <p>
          As chuvas fortes e até mesmo chuvas de média intensidade têm se tornado um dos maiores desafios enfrentados pelas cidades brasileiras.
          Com o aumento da impermeabilização do solo, ocupações irregulares e sistemas de drenagem ultrapassados ou mal dimensionados,
          as precipitações intensas rapidamente se transformam em alagamentos e enchentes, afetando diretamente a segurança, a saúde pública e a mobilidade urbana.
        </p>

        <p>
          Este resumo reúne três estudos que analisam diferentes abordagens para entender e combater esses eventos:
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-2">1. Impactos dos Piscinões no ABCD Paulista</h3>
          <p>
            O estudo do Reservatório de Contenção RC5, em São Bernardo do Campo (SP), mostra que embora os piscinões sejam eficazes
            na retenção temporária da água da chuva, sua implantação sem planejamento urbano adequado pode gerar impactos negativos,
            como desvalorização do entorno, uso limitado dos espaços e aumento da segregação urbana.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. Reservatórios de Detenção Domiciliares</h3>
          <p>
            Reservatórios menores, instalados em residências, demonstraram eficiência significativa em testes simulados.
            Em casos de chuvas com diferentes intensidades (2 a 100 anos de recorrência), conseguiram reduzir a vazão de pico
            do escoamento superficial em até 31%. Isso mostra que, mesmo em chuvas de média intensidade, é possível mitigar
            alagamentos com soluções descentralizadas e acessíveis.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Estudo de Caso: Alagamentos em Anápolis-GO</h3>
          <p>
            A cidade de Anápolis sofre com alagamentos frequentes nas Avenidas Amazilio Lino de Souza e Pedro Ludovico,
            principalmente durante chuvas fortes. A falta de fiscalização em áreas de preservação permanente e o crescimento
            urbano desorganizado resultaram na obstrução de cursos d’água, além de um sistema de drenagem ineficiente.
            O estudo propõe requalificação das vias, campanhas de conscientização e infraestrutura verde como parques lineares e calçadas permeáveis.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Conclusão</h3>
          <p>
            Eventos de chuva cada vez mais intensos, mesmo quando não extremos, têm sobrecarregado os sistemas urbanos.
            Por isso, é essencial integrar infraestrutura cinza (como piscinões e reservatórios domiciliares) com infraestrutura verde
            e políticas públicas eficazes. A prevenção de alagamentos passa por planejamento urbano sustentável, fiscalização,
            educação ambiental e investimentos contínuos.
          </p>
        </div>
      </div>

      <div
        ref={setRef('botoes')}
        data-section="botoes"
        className={`flex flex-col md:flex-row gap-6 mt-6 transition-all duration-1000 transform ${
          visibleSections.botoes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <a
          href="/downloads/resumo.pdf"
          download
          className="px-8 py-4 rounded-3xl animated-button font-semibold shadow-xl text-gray-900 hover:text-white hover:shadow-2xl transform hover:scale-110 transition cursor-pointer text-center"
        >
          Baixar Resumo Completo
        </a>

        <a
          href="/downloads/resumo.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-3xl animated-button font-semibold shadow-xl text-gray-900 hover:text-white hover:shadow-2xl transform hover:scale-110 transition cursor-pointer text-center"
        >
          Abrir Resumo em Nova Aba
        </a>

        <Link
          to="/artigo"
          className="px-8 py-4 rounded-3xl animated-button font-semibold shadow-xl text-gray-900 hover:text-white hover:shadow-2xl transform hover:scale-110 transition cursor-pointer text-center"
        >
          Voltar para Artigos
        </Link>
      </div>
    </div>
  );
}
