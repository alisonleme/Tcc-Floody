import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from '../components/Footer.jsx';

export default function ComoFunciona({ darkMode, toggleTheme }) {
  const [forumMessage, setForumMessage] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
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

  const buttonClasses =
    "px-6 py-3 mt-4 font-semibold rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button";

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-start p-8 md:p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-16">

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
        `}</style>

        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 p-4 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-12 shadow-lg bg-gray-700/40 backdrop-blur-md"
          aria-label="Alternar tema"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8"
            fill="white"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.7))" }}
          >
            {darkMode ? (
              <path d="M12 3v1m0 16v1m8.485-9h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
            ) : (
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            )}
          </svg>
        </button>

        <h1 className="text-5xl font-extrabold text-center mt-20">
          Como Funciona Nosso Dispositivo
        </h1>

        <div
          ref={setRef("video")}
          data-section="video"
          className={`p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700"
              : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee]"
          } ${visibleSections.video ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ maxWidth: 900 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Vídeo Explicativo</h2>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/J4FwiaCZEwA"
              title="Como Funciona o Dispositivo Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-110"
            ></iframe>
          </div>
        </div>

        <div
          ref={setRef("explicacao")}
          data-section="explicacao"
          className={`p-8 rounded-3xl shadow-xl w-full max-w-5xl transition-all duration-1000 transform leading-relaxed text-justify text-lg ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
              : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
          } ${visibleSections.explicacao ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Explicação do Dispositivo</h2>
          <div className="text-base sm:text-lg leading-relaxed space-y-4 text-justify">
            <p>
              O <strong>Floody</strong> é um sistema inteligente voltado para o <strong>aproveitamento sustentável da água da chuva</strong> e a <strong>prevenção de enchentes em áreas urbanas</strong>. Mais do que um simples coletor, ele combina <strong>automação</strong>, <strong>sensoriamento</strong> e <strong>filtragem avançada</strong> para oferecer uma solução completa e autônoma.
            </p>

            <h3 className="text-2xl font-semibold mt-6">🌧️ Etapas do Funcionamento:</h3>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Coleta da água da chuva:</strong> A água é captada por calhas e entradas posicionadas estrategicamente (em telhados, muros ou áreas externas). O sistema possui sensores e um <strong>ralo inteligente autolimpante</strong>, garantindo o fluxo contínuo mesmo em períodos de chuva intensa.
              </li>

              <li>
                <strong>Análise e correção do pH:</strong> Um sensor integrado mede o <strong>nível de pH da água coletada</strong>, identificando possíveis níveis de acidez — comuns em ambientes urbanos. Quando necessário, o dispositivo libera automaticamente uma <strong>pastilha de carbonato de cálcio</strong> para neutralizar a água antes do armazenamento.
              </li>

              <li>
                <strong>Filtragem em dois reservatórios:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li><strong>Pré-reservatório:</strong> Responsável pela filtragem inicial e remoção de partículas maiores.</li>
                  <li>
                    <strong>Reservatório com filtro biológico:</strong> A água passa por camadas filtrantes compostas de <strong>carvão ativado, algodão, pedras e areia</strong>, removendo impurezas, odores, metais pesados e microrganismos.
                  </li>
                </ul>
              </li>

              <li>
                <strong>Monitoramento inteligente via app:</strong> O sistema é totalmente conectado a um <strong>aplicativo</strong>, onde o usuário pode acompanhar em tempo real:
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>Nível de água armazenada</li>
                  <li>Estado dos sensores</li>
                  <li>Qualidade da água (incluindo pH)</li>
                  <li>Ativação dos ciclos de filtragem e limpeza</li>
                </ul>
              </li>

              <li>
                <strong>Manutenção automatizada:</strong> O ralo inteligente realiza a <strong>autolimpeza de forma periódica</strong>, evitando entupimentos e reduzindo a necessidade de manutenção manual.
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={setRef("youtube")}
          data-section="youtube"
          className={`p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl text-center ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700"
              : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee]"
          } ${visibleSections.youtube ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl font-bold mb-4">Nosso Canal no YouTube</h2>
          <a
            href="https://www.youtube.com/@ManoelGomesOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            Visitar Canal
          </a>
        </div>

        <div
  ref={setRef("formForum")}
  data-section="formForum"
  className={`p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl w-full transition-all duration-1000 transform text-sm sm:text-base ${
    darkMode
      ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
      : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
  } ${
    visibleSections.formForum
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`}
>
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Fórum Floody</h2>
  <form
    action="https://formsubmit.co/grupo.floody@gmail.com"
    method="POST"
    className="flex flex-col space-y-4"
  >
    <input type="hidden" name="_subject" value="Mensagem do Fórum - Floody" />
    <textarea
      name="mensagem"
      value={forumMessage}
      onChange={(e) => setForumMessage(e.target.value)}
      placeholder="Escreva aqui sua dúvida, sugestão ou comentário..."
      className={`resize-none rounded-md p-3 w-full min-h-[100px] border-4 border-gray-400 ${
        darkMode
          ? "text-gray-300 placeholder-gray-500"
          : "text-gray-700 placeholder-gray-400"
      }`}
      required
    />
    <button
      type="submit"
      className={`${buttonClasses} self-center w-max`}
    >
      Enviar
    </button>
  </form>
</div>

{/* Formulário Ajuda */}
<div
  ref={setRef("formHelp")}
  data-section="formHelp"
  className={`p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl w-full transition-all duration-1000 transform text-sm sm:text-base ${
    darkMode
      ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
      : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
  } ${
    visibleSections.formHelp
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`}
>
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Ajuda</h2>
  <form
    action="https://formsubmit.co/grupo.floody@gmail.com"
    method="POST"
    className="flex flex-col space-y-4"
  >
    <input type="hidden" name="_subject" value="Solicitação de Ajuda - Floody" />
    <textarea
      name="mensagem"
      value={helpMessage}
      onChange={(e) => setHelpMessage(e.target.value)}
      placeholder="Descreva sua dúvida ou problema..."
      className={`resize-none rounded-md p-3 w-full min-h-[100px] border-4 border-gray-400 ${
        darkMode
          ? "text-gray-300 placeholder-gray-500"
          : "text-gray-700 placeholder-gray-400"
      }`}
      required
    />
    <button
      type="submit"
      className={`${buttonClasses} self-center w-max`}
    >
      Enviar
    </button>
  </form>
</div>



        <Link to="/" className={buttonClasses}>
          Voltar para Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
