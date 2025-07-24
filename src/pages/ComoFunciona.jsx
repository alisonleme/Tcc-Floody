import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ComoFunciona() {
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
      className="min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-all duration-700 ease-in-out bg-[#d8e7f5]"
    >
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
          transition: color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
        .animated-button:hover {
          color: white !important;
          box-shadow: 0 8px 15px rgba(59, 130, 246, 0.6);
          transform: scale(1.05);
        }
      `}</style>

      <h1 className="text-5xl font-extrabold text-gray-900 text-center mt-20">
        Como Funciona Nosso Dispositivo
      </h1>

      <div
        ref={setRef("video")}
        data-section="video"
        className={`bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl ${
          visibleSections.video ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">
          Vídeo Explicativo
        </h2>
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
        className={`bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] p-8 rounded-3xl shadow-xl w-full max-w-5xl text-gray-900 transition-all duration-1000 transform leading-relaxed ${
          visibleSections.explicacao ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ textAlign: "justify" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Explicação do Dispositivo</h2>
        <p className="text-lg md:text-xl">
          Nosso dispositivo Floody é desenvolvido para monitorar e auxiliar na prevenção de enchentes em áreas urbanas.
          Utilizando sensores avançados de nível de água, conectividade IoT e um sistema de alertas em tempo real, ele
          ajuda comunidades a agir antes que ocorram danos graves. A integração com nosso aplicativo e sistema back-end
          permite um controle eficiente e sustentável, contribuindo para a segurança e bem-estar das pessoas.
        </p>
      </div>

      <div
        ref={setRef("youtube")}
        data-section="youtube"
        className={`bg-gradient-to-br from-[#b3ddfe] to-[#71b7e6] p-6 rounded-3xl shadow-xl transition-all duration-1000 transform w-full max-w-5xl text-center ${
          visibleSections.youtube ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Nosso Canal no YouTube</h2>
        <a
          href="https://www.youtube.com/@ManoelGomesOfficial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visitar canal do YouTube Manoel Gomes"
          className="px-8 py-4 animated-button text-gray-900 font-semibold rounded-3xl shadow-xl transition cursor-pointer inline-block"
        >
          Visitar Canal
        </a>
      </div>

      <div
        ref={setRef("forum")}
        data-section="forum"
        className={`bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full text-gray-900 transition-all duration-1000 transform ${
          visibleSections.forum ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ textAlign: "justify" }}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Fórum</h2>
        <form onSubmit={handleForumSubmit} className="space-y-4">
          <textarea
            value={forumMessage}
            onChange={(e) => setForumMessage(e.target.value)}
            placeholder="Deixe sua pergunta ou comentário"
            className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-blue-400 outline-none text-justify resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            aria-label="Enviar pergunta para o fórum"
            className="px-6 py-3 animated-button text-gray-900 font-semibold rounded-3xl shadow-xl transition cursor-pointer w-full"
          >
            Enviar Pergunta
          </button>
        </form>
      </div>

      <div
        ref={setRef("ajuda")}
        data-section="ajuda"
        className={`bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full text-gray-900 transition-all duration-1000 transform ${
          visibleSections.ajuda ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ textAlign: "justify" }}
      >
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Ajuda</h2>
        <form onSubmit={handleHelpSubmit} className="space-y-4">
          <textarea
            value={helpMessage}
            onChange={(e) => setHelpMessage(e.target.value)}
            placeholder="Descreva seu problema ou dúvida"
            className="w-full p-4 border rounded-3xl focus:ring-2 focus:ring-green-400 outline-none text-justify resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            aria-label="Solicitar ajuda"
            className="px-6 py-3 animated-button text-gray-900 font-semibold rounded-3xl shadow-xl transition cursor-pointer w-full"
          >
            Solicitar Ajuda
          </button>
        </form>
      </div>

      <Link
        to="/"
        className="mt-10 px-8 py-4 animated-button text-gray-900 font-semibold rounded-3xl shadow-xl transition cursor-pointer inline-block"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
