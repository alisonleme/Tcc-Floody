import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ComoFunciona({ darkMode, toggleTheme }) {
  const [forumMessage, setForumMessage] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [visibleSections, setVisibleSections] = useState({});
  const sectionsRef = useRef({});

  const enviarMensagem = (mensagem, tipo) => {
    try {
      const mailtoLink = `mailto:grupo.floody@gmail.com?subject=${encodeURIComponent(
        tipo
      )}&body=${encodeURIComponent(mensagem)}`;
      window.location.href = mailtoLink;
    } catch {
      alert("Não foi possível abrir o aplicativo de email. Por favor, tente manualmente.");
    }
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    if (!forumMessage.trim()) {
      alert("Por favor, preencha a mensagem do fórum.");
      return;
    }
    enviarMensagem(forumMessage, "Mensagem do Fórum");
    setForumMessage("");
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    if (!helpMessage.trim()) {
      alert("Por favor, preencha a mensagem de ajuda.");
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
    "px-6 py-3 mt-4 font-semibold rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button";

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-start p-8 md:p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
      }`}
    >
      {/* Wrapper centralizado */}
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

          /* Mobile improvements */
          @media (max-width: 768px) {
            div[data-section] {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            iframe {
              border-radius: 1rem !important;
            }
            textarea {
              font-size: 1rem !important;
            }
            .animated-button {
              width: 100% !important;
              text-align: center !important;
            }
          }
        `}</style>

        {/* Botão alternar tema */}
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
        <h1 className="text-5xl font-extrabold text-center mt-20">
          Como Funciona Nosso Dispositivo
        </h1>

        {/* Vídeo */}
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

        {/* Explicação */}
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
          <p>
            O Floody monitora e ajuda na prevenção de enchentes em áreas urbanas. Com sensores de nível de água, IoT e alertas
            em tempo real, auxilia comunidades a agir rapidamente, reduzindo riscos e danos. Integrado a um aplicativo, promove
            gestão eficiente e sustentável.
          </p>
        </div>

        {/* Canal YouTube */}
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
            aria-label="Visitar canal do YouTube"
            className={buttonClasses}
          >
            Visitar Canal
          </a>
        </div>

        {/* Fórum */}
        <div
          ref={setRef("forum")}
          data-section="forum"
          className={`p-8 rounded-3xl shadow-xl max-w-3xl w-full transition-all duration-1000 transform ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
              : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
          } ${visibleSections.forum ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Fórum</h2>
          <form onSubmit={handleForumSubmit} className="space-y-4">
            <textarea
              value={forumMessage}
              onChange={(e) => setForumMessage(e.target.value)}
              placeholder="Deixe sua pergunta ou comentário"
              className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              rows="4"
              required
            />
            <button type="submit" className={buttonClasses}>
              Enviar Pergunta
            </button>
          </form>
        </div>

        {/* Ajuda */}
        <div
          ref={setRef("ajuda")}
          data-section="ajuda"
          className={`p-8 rounded-3xl shadow-xl max-w-3xl w-full transition-all duration-1000 transform ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
              : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
          } ${visibleSections.ajuda ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Ajuda</h2>
          <form onSubmit={handleHelpSubmit} className="space-y-4">
            <textarea
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              placeholder="Descreva seu problema ou dúvida"
              className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-green-400 outline-none resize-none"
              rows="4"
              required
            />
            <button type="submit" className={buttonClasses}>
              Solicitar Ajuda
            </button>
          </form>
        </div>

        {/* Botão Voltar */}
        <Link to="/" className={buttonClasses}>
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
