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
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-button {
          background: linear-gradient(270deg, #4a90e2, #71b7e6, #b3ddfe);
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
          color: #1f2937;
          transition: all 0.5s ease;
        }
        .animated-button:hover {
          color: white;
          box-shadow: 0 10px 20px rgba(50,130,220,0.6);
          transform: scale(1.05);
        }
      `}</style>

      {/* Título */}
      <h1 className="text-5xl font-extrabold text-center mt-20">
        Como Funciona Nosso Dispositivo
      </h1>

      {/* Vídeo explicativo */}
      <div
        ref={setRef("video")}
        data-section="video"
        className={`p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee]"
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
          className="px-8 py-4 font-semibold rounded-3xl shadow-xl animated-button cursor-pointer"
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
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-yellow-400" : "text-blue-600"
          }`}
        >
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
          <button type="submit" className="px-6 py-3 font-semibold rounded-3xl shadow-xl animated-button cursor-pointer">
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
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-yellow-400" : "text-green-600"
          }`}
        >
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
          <button type="submit" className="px-6 py-3 font-semibold rounded-3xl shadow-xl animated-button cursor-pointer">
            Solicitar Ajuda
          </button>
        </form>
      </div>

      {/* Botão Voltar */}
      <Link to="/" className="mt-10 px-8 py-4 font-semibold rounded-3xl shadow-xl animated-button cursor-pointer">
        Voltar para Home
      </Link>
    </div>
  );
}
