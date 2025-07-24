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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
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
      <h1 className="text-5xl font-extrabold text-center mt-20">Como Funciona Nosso Dispositivo</h1>

      {/* Vídeo explicativo */}
      <div
        ref={setRef("video")}
        data-section="video"
        className={`p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700"
            : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6]"
        } ${visibleSections.video ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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

      {/* Explicação do dispositivo */}
      <div
        ref={setRef("explicacao")}
        data-section="explicacao"
        className={`p-8 rounded-3xl shadow-xl w-full max-w-5xl transition-all duration-1000 transform leading-relaxed text-justify text-lg ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
        } ${visibleSections.explicacao ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Explicação do Dispositivo</h2>
        <p>
          O Floody monitora e ajuda na prevenção de enchentes em áreas urbanas. Com sensores de nível de água, IoT e alertas
          em tempo real, auxilia comunidades a agir rapidamente, reduzindo riscos e danos. Integrado a um aplicativo, promove
          gestão eficiente e sustentável.
        </p>
      </div>

      {/* Canal do YouTube */}
      <div
        ref={setRef("youtube")}
        data-section="youtube"
        className={`p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl text-center ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700"
            : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6]"
        } ${visibleSections.youtube ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl font-bold mb-4">Nosso Canal no YouTube</h2>
        <a
          href="https://www.youtube.com/@ManoelGomesOfficial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar canal do YouTube"
          className={`px-8 py-4 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
              : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
          }`}
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
            : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
        } ${visibleSections.forum ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>
          Fórum
        </h2>
        <form onSubmit={handleForumSubmit} className="space-y-4">
          <textarea
            value={forumMessage}
            onChange={(e) => setForumMessage(e.target.value)}
            placeholder="Deixe sua pergunta ou comentário"
            className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
              darkMode
                ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
                : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
            }`}
          >
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
            : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
        } ${visibleSections.ajuda ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-yellow-400" : "text-green-600"}`}>
          Ajuda
        </h2>
        <form onSubmit={handleHelpSubmit} className="space-y-4">
          <textarea
            value={helpMessage}
            onChange={(e) => setHelpMessage(e.target.value)}
            placeholder="Descreva seu problema ou dúvida"
            className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-green-400 outline-none resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
              darkMode
                ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
                : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
            }`}
          >
            Solicitar Ajuda
          </button>
        </form>
      </div>

      {/* Botão Voltar */}
      <Link
        to="/"
        className={`mt-10 px-8 py-4 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animated-button ${
          darkMode
            ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
            : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
        }`}
      >
        Voltar para Home
      </Link>
    </div>
  );
}
