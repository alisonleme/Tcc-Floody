import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AlisonFoto from "../Img/AlisonFoto.png";
import GabrielFoto from "../Img/GabrielFoto.png";
import ThiagoFoto from "../Img/ThiagoFoto.png";

function IconHover({ icon, hoverColor, link, tamanhoIcon }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center cursor-pointer transition-transform duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: tamanhoIcon, height: tamanhoIcon }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          fill: hover ? hoverColor : icon.props.fill,
          transform: hover ? "scale(1.2)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </div>
    </a>
  );
}

export default function SobreNos() {
  const [forumMessage, setForumMessage] = useState("");
  const [helpMessage, setHelpMessage] = useState("");
  const [visibleSections, setVisibleSections] = useState({});
  const sectionsRef = useRef({});

  const enviarMensagem = (mensagem, tipo) => {
    const mailtoLink = `mailto:grupo.floody@gmail.com?subject=${encodeURIComponent(
      tipo
    )}&body=${encodeURIComponent(mensagem)}`;
    window.location.href = mailtoLink;
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    enviarMensagem(forumMessage, "Mensagem do Fórum");
    setForumMessage("");
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
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

  const tamanhoFoto = "w-32 h-32";
  const tamanhoIcon = "40px";

  const githubIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="black">
      <path d="M12 .5C5.65.5.5 5.65.5 12.07c0 5.08 3.29 9.39 7.85 10.92.57.11.77-.25.77-.56 0-.27-.01-1.16-.02-2.1-3.19.7-3.87-1.53-3.87-1.53-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.74.4-1.24.72-1.53-2.54-.29-5.22-1.27-5.22-5.65 0-1.25.44-2.28 1.17-3.08-.12-.29-.51-1.44.11-3 0 0 .95-.3 3.12 1.18a10.81 10.81 0 012.85-.39c.97 0 1.95.13 2.85.39 2.16-1.48 3.12-1.18 3.12-1.18.62 1.56.23 2.71.11 3 .73.8 1.17 1.83 1.17 3.08 0 4.39-2.68 5.36-5.23 5.65.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.12 0 .31.2.68.78.56A10.56 10.56 0 0023.5 12.07C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );

  const linkedinIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0077B5" viewBox="0 0 24 24">
      <path d="M4.983 3.5c0 1.381-1.117 2.5-2.492 2.5-1.374 0-2.492-1.119-2.492-2.5S1.117 1 2.491 1c1.375 0 2.492 1.119 2.492 2.5zM.17 8h4.663v12H.17V8zm7.167 0h4.474v1.714h.062c.623-1.185 2.145-2.436 4.416-2.436 4.722 0 5.594 3.11 5.594 7.152V20H17.63v-6.598c0-1.573-.029-3.598-2.193-3.598-2.196 0-2.533 1.716-2.533 3.488V20H7.336V8z" />
    </svg>
  );

  const instagramIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#C13584" viewBox="0 0 24 24">
      <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm5.75-.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-12 space-y-16 transition-all duration-700 ease-in-out bg-gradient-to-b from-blue-100 to-blue-200"
    >
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mt-20 animate-fadeIn">
        Sobre Nós
      </h1>

      <div
        ref={setRef("integrantes")}
        data-section="integrantes"
        className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 transform ${
          visibleSections.integrantes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {[ 
          { nome: "Alison Lemes Gomes Pereira", foto: AlisonFoto, descricao: "Dev do site, game, back-end e dispositivo.", links: [
              { icon: instagramIcon, hover: "#8e3e9f", url: "https://www.instagram.com/off._alisu/" },
              { icon: linkedinIcon, hover: "#004182", url: "https://www.linkedin.com/in/alison-lemes-gomes-pereira-358949337/" },
              { icon: githubIcon, hover: "purple", url: "https://github.com/alisonleme" }
            ]
          },
          { nome: "Gabriel Santos Sales", foto: GabrielFoto, descricao: "Dev do back-end, dispositivo e game.", links: [
              { icon: linkedinIcon, hover: "#004182", url: "https://www.linkedin.com/in/gabriel-santos-sales-68ab41290/" },
              { icon: githubIcon, hover: "purple", url: "https://github.com/GabrielSantosSales" }
            ]
          },
          { nome: "Thiago Modesto Santos", foto: ThiagoFoto, descricao: "Dev do back-end, game e dispositivo.", links: [
              { icon: linkedinIcon, hover: "#004182", url: "https://www.linkedin.com/in/thiago-modesto-santos-21ab64306/" },
              { icon: githubIcon, hover: "purple", url: "https://github.com/ThiagoWebsites" }
            ]
          }
        ].map((dev, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg w-64 text-center flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <img
              src={dev.foto}
              alt={dev.nome}
              className={`${tamanhoFoto} object-cover rounded-full mb-4 border-4 border-blue-300 transform transition duration-500 hover:scale-110`}
            />
            <div className="flex justify-center gap-6 mb-4">
              {dev.links.map((l, j) => (
                <IconHover key={j} icon={l.icon} hoverColor={l.hover} link={l.url} tamanhoIcon={tamanhoIcon} />
              ))}
            </div>
            <h2 className="text-lg font-bold text-blue-600">{dev.nome}</h2>
            <p className="text-gray-600 mt-1 text-justify px-4">{dev.descricao}</p>
          </div>
        ))}
      </div>

      <div
        ref={setRef("sobre")}
        data-section="sobre"
        className={`bg-white p-8 rounded-lg shadow-xl max-w-3xl text-gray-900 text-justify leading-relaxed text-lg transition-all duration-1000 transform ${
          visibleSections.sobre ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p>
          Somos estudantes do UNASP São Paulo e estamos finalizando nosso curso após três anos de muito aprendizado.
          O projeto Floody é fruto de todo o conhecimento, esforço e dedicação que adquirimos ao longo dessa jornada.
        </p>
        <p className="mt-4">
          Criamos essa solução para ajudar pessoas e contribuir com a sustentabilidade.
          Se tiver dúvidas, sugestões ou quiser parceria, fale com a gente:
        </p>
        <a
          href="mailto:grupo.floody@gmail.com"
          className="mt-3 inline-block text-xl font-semibold text-blue-700 hover:text-blue-900 hover:underline transform transition duration-300 hover:scale-105"
        >
          📧 grupo.floody@gmail.com
        </a>
      </div>

      <div
        ref={setRef("forum")}
        data-section="forum"
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl transition-all duration-1000 transform ${
          visibleSections.forum ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">Fórum</h2>
        <form onSubmit={handleForumSubmit} className="space-y-4">
          <textarea
            value={forumMessage}
            onChange={(e) => setForumMessage(e.target.value)}
            placeholder="Deixe sua pergunta ou comentário"
            className="w-full p-4 border rounded-lg focus:ring-4 focus:ring-blue-400 outline-none resize-none transition-all duration-300"
            rows="4"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transform hover:scale-105 shadow-md hover:shadow-xl transition"
          >
            Enviar Pergunta
          </button>
        </form>
      </div>

      <div
        ref={setRef("ajuda")}
        data-section="ajuda"
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl transition-all duration-1000 transform ${
          visibleSections.ajuda ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center">Ajuda</h2>
        <form onSubmit={handleHelpSubmit} className="space-y-4">
          <textarea
            value={helpMessage}
            onChange={(e) => setHelpMessage(e.target.value)}
            placeholder="Descreva seu problema ou dúvida"
            className="w-full p-4 border rounded-lg focus:ring-4 focus:ring-green-400 outline-none resize-none transition-all duration-300"
            rows="4"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transform hover:scale-105 shadow-md hover:shadow-xl transition"
          >
            Solicitar Ajuda
          </button>
        </form>
      </div>

      <Link
        to="/"
        className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transform hover:scale-105 shadow-md hover:shadow-xl transition text-lg font-semibold"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
