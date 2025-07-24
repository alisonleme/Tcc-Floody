import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AlisonFoto from "../Img/AlisonFoto.png";
import GabrielFoto from "../Img/GabrielFoto.png";
import ThiagoFoto from "../Img/ThiagoFoto.png";

export default function SobreNos({ darkMode, toggleTheme }) {
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
      alert("Descreva sua dúvida ou problema.");
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

  const devs = [
    {
      nome: "Alison Lemes Gomes Pereira",
      foto: AlisonFoto,
      descricao: "Dev do site, game, back-end e dispositivo.",
    },
    {
      nome: "Gabriel Santos Sales",
      foto: GabrielFoto,
      descricao: "Dev do back-end, dispositivo e game.",
    },
    {
      nome: "Thiago Modesto Santos",
      foto: ThiagoFoto,
      descricao: "Dev do back-end, game e dispositivo.",
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
      }`}
    >
      {/* Botão alternar tema (mesmo do app) */}
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

      <h1 className="text-5xl font-extrabold text-center mt-20">Sobre Nós</h1>

      {/* Cards de integrantes */}
      <div
        ref={setRef("integrantes")}
        data-section="integrantes"
        className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 transform ${
          visibleSections.integrantes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {devs.map((dev, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl shadow-xl w-64 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
                : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
            }`}
          >
            <img
              src={dev.foto}
              alt={dev.nome}
              className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-300"
            />
            <h2 className="text-lg font-bold">{dev.nome}</h2>
            <p className="mt-1 text-justify">{dev.descricao}</p>
          </div>
        ))}
      </div>

      {/* Sobre o projeto */}
      <div
        ref={setRef("sobre")}
        data-section="sobre"
        className={`p-8 rounded-3xl shadow-xl max-w-3xl text-justify leading-relaxed text-lg transition-all duration-1000 transform ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-gray-200"
            : "bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] text-gray-900"
        } ${visibleSections.sobre ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <p>
          Somos estudantes do UNASP São Paulo e estamos concluindo nosso curso após três anos de dedicação.
          O Floody nasceu desse esforço e do desejo de criar uma solução real para ajudar comunidades.
        </p>
        <p className="mt-4">
          Dúvidas, sugestões ou parcerias? Fale conosco:{" "}
          <a href="mailto:grupo.floody@gmail.com" className="underline">
            grupo.floody@gmail.com
          </a>
        </p>
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
            className={`px-6 py-3 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${
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
            className={`px-6 py-3 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${
              darkMode
                ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900"
                : "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white"
            }`}
          >
            Solicitar Ajuda
          </button>
        </form>
      </div>

      {/* Voltar */}
      <Link
        to="/"
        className={`mt-10 px-8 py-4 font-semibold rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${
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
