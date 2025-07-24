import React, { useState, useEffect, useRef } from "react";
import AlisonFoto from "../Img/AlisonFoto.png";
import GabrielFoto from "../Img/GabrielFoto.png";
import ThiagoFoto from "../Img/ThiagoFoto.png";

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

  // Classe padrão dos botões (igual à página ComoFunciona)
  const buttonClasses =
    "px-6 py-3 mt-4 font-semibold rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
      }`}
    >
      {/* Estilo animado igual da página ComoFunciona */}
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
      <h1 className="text-5xl font-extrabold text-center mt-20">Sobre Nós</h1>

      {/* Cards dos devs */}
      <div
        ref={setRef("integrantes")}
        data-section="integrantes"
        className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 transform ${
          visibleSections.integrantes
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {devs.map((dev, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl shadow-lg w-64 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
                : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
            }`}
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={dev.foto}
                alt={dev.nome}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-lg transition-transform duration-500 hover:scale-125"
              />
            </div>
            <h2 className="text-lg font-bold">{dev.nome}</h2>
            <p className="mt-1 text-justify">{dev.descricao}</p>

            {/* Links sociais */}
            <div className="flex justify-center gap-4 mt-4">
              {/* LinkedIn */}
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform">
                {/* SVG igual ao anterior */}
              </a>
              {/* GitHub */}
              <a href={dev.github} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform">
                {/* SVG igual ao anterior */}
              </a>
              {/* Instagram (se existir) */}
              {dev.instagram && (
                <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform">
                  {/* SVG igual ao anterior */}
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
        className={`p-8 rounded-3xl shadow-xl max-w-3xl w-full transition-all duration-1000 transform leading-relaxed text-justify text-lg text-center ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee] text-gray-900"
        } ${visibleSections.sobreGente ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl font-bold mb-6">Quem Somos</h2>
        <p className="mb-6">
          Somos estudantes do UNASP São Paulo e estamos finalizando nosso curso após três anos de muito aprendizado.
          O projeto Floody é fruto de todo o conhecimento, esforço e dedicação que adquirimos ao longo dessa jornada.
        </p>
        <p className="mb-6">
          Criamos essa solução pensando em ajudar pessoas e contribuir com a sustentabilidade. Se tiver dúvidas, sugestões ou quiser formar uma parceria, fale com a gente pelo e-mail:
        </p>
        <p className="mb-6 font-semibold underline break-words">
          grupo.floody@gmail.com
        </p>
        <button
          onClick={() =>
            (window.location.href =
              "mailto:grupo.floody@gmail.com?subject=Contato com a Equipe&body=Olá, gostaria de falar com vocês!")
          }
          className={buttonClasses}
        >
          Falar Conosco
        </button>
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
          <button type="submit" className={buttonClasses}>Enviar Pergunta</button>
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
          <button type="submit" className={buttonClasses}>Enviar Solicitação</button>
        </form>
      </div>
    </div>
  );
}
