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
      descricao: "Dev do site, game, back-end e dispositivo.",
      linkedin: "https://www.linkedin.com/in/alison-lemes-gomes-pereira-358949337/",
      github: "https://github.com/alisonleme",
      instagram: "https://www.instagram.com/off._alisu/",
    },
    {
      nome: "Gabriel Santos Sales",
      foto: GabrielFoto,
      descricao: "Dev do back-end, dispositivo e game.",
      linkedin: "https://www.linkedin.com/in/gabriel-santos-sales-68ab41290/",
      github: "https://github.com/GabrielSantosSales",
      instagram: null,
    },
    {
      nome: "Thiago Modesto Santos",
      foto: ThiagoFoto,
      descricao: "Dev do back-end, game e dispositivo.",
      linkedin: "https://www.linkedin.com/in/thiago-modesto-santos-21ab64306/",
      github: "https://github.com/ThiagoWebsites",
      instagram: null,
    },
  ];

  const enviarMensagem = (mensagem, tipo) => {
    try {
      const mailtoLink = `mailto:grupo.floody@gmail.com?subject=${encodeURIComponent(
        tipo
      )}&body=${encodeURIComponent(mensagem)}`;
      window.location.href = mailtoLink;
    } catch {
      alert("Não foi possível abrir o app de email. Tente manualmente.");
    }
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    if (!forumMessage.trim()) {
      alert("Digite sua mensagem para o fórum.");
      return;
    }
    enviarMensagem(forumMessage, "Mensagem do Fórum");
    setForumMessage("");
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    if (!helpMessage.trim()) {
      alert("Descreva seu problema ou dúvida.");
      return;
    }
    enviarMensagem(helpMessage, "Mensagem de Ajuda");
    setHelpMessage("");
  };

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
                {/* SVG LinkedIn */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="26" height="26" fill="currentColor"
                  className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-blue-500`}>
                  <path d="M41,4H9C6.8,4,5,5.8,5,8v34c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V8C45,5.8,43.2,4,41,4z M17,39h-5V20h5V39z M14.5,17.7 c-1.7,0-3-1.3-3-3s1.3-3,3-3c1.7,0,3,1.3,3,3S16.2,17.7,14.5,17.7z M40,39h-5v-9.5c0-2.3-0.8-3.8-2.7-3.8 c-1.5,0-2.3,1-2.7,2c-0.1,0.3-0.1,0.7-0.1,1.1V39h-5c0,0,0.1-16,0-19h5v2.7c0.7-1,1.9-2.5,4.6-2.5c3.3,0,5.8,2.2,5.8,6.8V39z"></path>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition-transform"
              >
                {/* SVG GitHub */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="26" height="26" fill="currentColor"
                  className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-purple-500`}>
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
              </a>

              {/* Instagram (se existir) */}
              {dev.instagram && (
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform"
                >
                  {/* SVG Instagram */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="26" height="26" fill="currentColor"
                    className={`${darkMode ? "text-white" : "text-gray-800"} hover:text-pink-500`}>
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
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
        } ${visibleSections.sobreGente ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
            (window.location.href =
              "mailto:grupo.floody@gmail.com?subject=Contato com a Equipe&body=Olá, gostaria de falar com vocês!")
          }
          className={buttonClasses}
        >
          Fale Conosco
        </button>
      </div>

      {/* Fórum */}
      <div
        ref={setRef("forum")}
        data-section="forum"
        className={`p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center transition-all duration-1000 transform leading-relaxed text-sm sm:text-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        } ${visibleSections.forum ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Fórum</h2>
        <p className="mb-4 sm:mb-6 text-justify">
          Aqui você pode compartilhar sugestões, feedbacks e ideias para ajudar a melhorar a plataforma Floody.
        </p>
        <textarea
          value={forumMessage}
          onChange={(e) => setForumMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className={`w-full h-28 sm:h-32 p-3 rounded-lg border text-sm sm:text-base resize-none focus:outline-none ${
            darkMode ? "bg-gray-900 border-gray-600 text-gray-200" : "bg-white border-gray-400 text-gray-900"
          }`}
        ></textarea>
        <button onClick={handleForumSubmit} className={buttonClasses}>
          Enviar
        </button>
      </div>

      {/* Ajuda */}
      <div
        ref={setRef("ajuda")}
        data-section="ajuda"
        className={`p-6 sm:p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center transition-all duration-1000 transform leading-relaxed text-sm sm:text-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        } ${visibleSections.ajuda ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ajuda</h2>
        <p className="mb-4 sm:mb-6 text-justify">
          Está com dúvidas sobre como usar o site ou o dispositivo Floody? Preencha abaixo que entraremos em contato.
        </p>
        <textarea
          value={helpMessage}
          onChange={(e) => setHelpMessage(e.target.value)}
          placeholder="Descreva sua dúvida..."
          className={`w-full h-28 sm:h-32 p-3 rounded-lg border text-sm sm:text-base resize-none focus:outline-none ${
            darkMode ? "bg-gray-900 border-gray-600 text-gray-200" : "bg-white border-gray-400 text-gray-900"
          }`}
        ></textarea>
        <button onClick={handleHelpSubmit} className={buttonClasses}>
          Enviar
        </button>
      </div>
      <Footer />
    </div>
  );
}
