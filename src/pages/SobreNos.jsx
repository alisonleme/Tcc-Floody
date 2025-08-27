import React, { useState, useEffect, useRef } from "react";
import AlisonFoto from "../Img/AlisonFoto.png";
import GabrielFoto from "../Img/GabrielFoto.png";
import ThiagoFoto from "../Img/ThiagoFoto.png";
import Footer from '../components/Footer.jsx';

export default function SobreNos({ darkMode, toggleTheme }) {
  const [forumMessage, setForumMessage] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [visibleSections, setVisibleSections] = useState({});
  const sectionsRef = useRef({});

  const devs = [
    {
      nome: "Alison Lemes Gomes Pereira",
      foto: AlisonFoto,
      descricao: "Dev do site, game, dispositivo.",
      linkedin: "https://www.linkedin.com/in/alison-lemes-gomes-pereira-358949337/",
      github: "https://github.com/alisonleme",
      instagram: "https://www.instagram.com/ali.lms_/",
    },
    {
      nome: "Gabriel Santos Sales",
      foto: GabrielFoto,
      descricao: "Dev do site, dispositivo e game.",
      linkedin: "https://www.linkedin.com/in/gabriel-santos-sales-68ab41290/",
      github: "https://github.com/GabrielSantosSales",
      instagram: null,
    },
    {
      nome: "Thiago Modesto Santos",
      foto: ThiagoFoto,
      descricao: "Dev do site, game e dispositivo.",
      linkedin: "https://www.linkedin.com/in/thiago-modesto-santos-21ab64306/",
      github: "https://github.com/ThiagoWebsites",
      instagram: null,
    },
  ];

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
    "px-4 sm:px-6 py-2 sm:py-3 mt-4 font-semibold rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button text-center text-sm sm:text-base";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start px-4 sm:px-8 lg:px-12 py-10 space-y-12 sm:space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
      }`}
    >
      {/* Gradiente animado dos botões */}
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
        .animated-button:hover { filter: brightness(1.15); }
      `}</style>

      {/* Botão de alternar tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="fixed top-4 right-4 p-3 sm:p-4 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-12 shadow-lg bg-gray-700/40 backdrop-blur-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-8 sm:h-8"
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

      {/* Título */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mt-16 sm:mt-20">
        Sobre Nós
      </h1>

      {/* Cards dos devs */}
      <div
        ref={setRef("integrantes")}
        data-section="integrantes"
        className={`flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 transition-all duration-1000 transform w-full max-w-6xl ${
          visibleSections.integrantes
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {devs.map((dev, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl shadow-lg w-full sm:w-64 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
                : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
            }`}
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
              <img
                src={dev.foto}
                alt={dev.nome}
                className="w-full h-full object-cover rounded-full border-4 border-blue-300 shadow-lg transition-transform duration-500 hover:scale-125"
              />
            </div>
            <h2 className="text-base sm:text-lg font-bold">{dev.nome}</h2>
            <p className="mt-1 text-sm sm:text-base text-justify">
              {dev.descricao}
            </p>

            {/* Links sociais */}
            <div className="flex justify-center gap-4 mt-4">
              {/* LinkedIn */}
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-blue-500`}
                >
                  <path d="M41,4H9C6.8,4,5,5.8,5,8v34c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V8C45,5.8,43.2,4,41,4z M17,39h-5V20h5V39z M14.5,17.7 c-1.7,0-3-1.3-3-3s1.3-3,3-3c1.7,0,3,1.3,3,3S16.2,17.7,14.5,17.7z M40,39h-5v-9.5c0-2.3-0.8-3.8-2.7-3.8 c-1.5,0-2.3,1-2.7,2c-0.1,0.3-0.1,0.7-0.1,1.1V39h-5c0,0,0.1-16,0-19h5v2.7c0.7-1,1.9-2.5,4.6-2.5c3.3,0,5.8,2.2,5.8,6.8V39z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-purple-500`}
                >
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.758,8,21.55,8c0.729,0.731,0.383,2.65,0.006,3.577c0.846,0.949,1.338,2.072,1.338,3.237 c0,2.694-1.91,4.69-5.91,5.1c0.574,0.495,1.086,1.461,1.086,2.951v4.364C23.116,24.318,27,19.527,27,15 C27,8.373,21.627,3,15,3z" />
                </svg>
              </a>

              {/* Instagram */}
              {dev.instagram && (
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-pink-600`}
                  >
                    <path d="M15 6.09a8.91 8.91 0 1 0 0 17.82 8.91 8.91 0 0 0 0-17.82zm0 14.645a5.734 5.734 0 1 1 0-11.469 5.734 5.734 0 0 1 0 11.47zm6.447-10.59a2.065 2.065 0 1 1-4.13 0 2.065 2.065 0 0 1 4.13 0zm2.73 2.733a9.507 9.507 0 0 1-1.221 4.867 9.51 9.51 0 0 1-3.36 3.36 9.497 9.497 0 0 1-4.867 1.221c-1.696.1-3.399-.113-5.009-.631a9.522 9.522 0 0 1-3.678-2.152 9.52 9.52 0 0 1-2.15-3.68c-.517-1.61-.73-3.313-.631-5.01.1-1.696.437-3.327 1.22-4.868a9.522 9.522 0 0 1 2.15-3.68 9.516 9.516 0 0 1 3.678-2.152c1.61-.52 3.313-.73 5.01-.63 1.69.1 3.321.438 4.867 1.22a9.522 9.522 0 0 1 3.36 3.36c.783 1.54 1.12 3.171 1.22 4.867z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quem Somos */}
      <div
        ref={setRef("sobreGente")}
        data-section="sobreGente"
        className={`p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center transition-all duration-1000 transform leading-relaxed text-sm sm:text-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        } ${
          visibleSections.sobreGente
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Quem Somos</h2>
        <p className="mb-4 sm:mb-6 text-justify">
          Somos estudantes do UNASP São Paulo e estamos finalizando nosso curso após três anos de muito aprendizado.
          O projeto Floody é fruto de todo o conhecimento, esforço e dedicação que adquirimos ao longo dessa jornada.
        </p>
        <p className="mb-4 sm:mb-6 text-justify">
          Criamos essa solução pensando em ajudar pessoas e contribuir com a sustentabilidade. Se tiver dúvidas, sugestões ou quiser formar uma parceria, fale com a gente pelo e-mail:
        </p>
        <p className="mb-4 sm:mb-6 font-semibold underline break-words text-sm sm:text-base">
          grupo.floody@gmail.com
        </p>
        <button
          onClick={() =>
            window.open(
              "mailto:grupo.floody@gmail.com?subject=Contato%20com%20a%20Equipe&body=Olá%2C%20gostaria%20de%20falar%20com%20vocês!",
              "_blank"
            )
          }
          className={buttonClasses}
        >
          Fale Conosco
        </button>
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

      <Footer darkMode={darkMode} />
    </div>
  );
}
