import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlisonFoto from "../Img/AlisonFoto.png";
import GabrielFoto from "../Img/GabrielFoto.png";
import ThiagoFoto from "../Img/ThiagoFoto.png";

// Ícone com hover animado (cor e zoom)
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
    <div className="flex flex-col items-center min-h-screen pt-40 pb-20 px-6 space-y-16" style={{ backgroundColor: "#d8e7f5" }}>
      <h1 className="text-5xl font-bold text-gray-900">Sobre Nós</h1>

      {/* Cards dos membros */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Alison */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-64 text-center flex flex-col items-center">
          <img src={AlisonFoto} alt="Alison Lemes Gomes Pereira" className={`${tamanhoFoto} object-cover rounded-full mb-4 border-4 border-blue-300`} />
          <div className="flex justify-center gap-6 mb-4">
            <IconHover icon={instagramIcon} hoverColor="#8e3e9f" link="https://www.instagram.com/off._alisu/" tamanhoIcon={tamanhoIcon} />
            <IconHover icon={linkedinIcon} hoverColor="#004182" link="https://www.linkedin.com/in/alison-lemes-gomes-pereira-358949337/" tamanhoIcon={tamanhoIcon} />
            <IconHover icon={githubIcon} hoverColor="purple" link="https://github.com/alisonleme" tamanhoIcon={tamanhoIcon} />
          </div>
          <h2 className="text-lg font-bold text-blue-600">Alison Lemes Gomes Pereira</h2>
          <p className="text-gray-600 mt-1">Dev do <strong>site</strong>, <strong>game</strong>, <strong>back-end</strong> e <strong>dispositivo</strong>.</p>
        </div>

        {/* Gabriel */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-64 text-center flex flex-col items-center">
          <img src={GabrielFoto} alt="Gabriel Santos Sales" className={`${tamanhoFoto} object-cover rounded-full mb-4 border-4 border-blue-300`} />
          <div className="flex justify-center gap-6 mb-4">
            <IconHover icon={linkedinIcon} hoverColor="#004182" link="https://www.linkedin.com/in/gabriel-santos-sales-68ab41290/" tamanhoIcon={tamanhoIcon} />
            <IconHover icon={githubIcon} hoverColor="purple" link="https://github.com/GabrielSantosSales" tamanhoIcon={tamanhoIcon} />
          </div>
          <h2 className="text-lg font-bold text-blue-600">Gabriel Santos Sales</h2>
          <p className="text-gray-600 mt-1">Dev do <strong>back-end</strong>, <strong>dispositivo</strong> e <strong>game</strong>.</p>
        </div>

        {/* Thiago */}
        <div className="bg-white p-4 rounded-lg shadow-lg w-64 text-center flex flex-col items-center">
          <img src={ThiagoFoto} alt="Thiago Modesto Santos" className={`${tamanhoFoto} object-cover rounded-full mb-4 border-4 border-blue-300`} />
          <div className="flex justify-center gap-6 mb-4">
            <IconHover icon={linkedinIcon} hoverColor="#004182" link="https://www.linkedin.com/in/thiago-modesto-santos-21ab64306/" tamanhoIcon={tamanhoIcon} />
            <IconHover icon={githubIcon} hoverColor="purple" link="https://github.com/ThiagoWebsites" tamanhoIcon={tamanhoIcon} />
          </div>
          <h2 className="text-lg font-bold text-blue-600">Thiago Modesto Santos</h2>
          <p className="text-gray-600 mt-1">Dev do <strong>back-end</strong>, <strong>game</strong> e <strong>dispositivo</strong>.</p>
        </div>
      </div>

      {/* Texto de apresentação */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-gray-900 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Somos estudantes do UNASP São Paulo e estamos finalizando nosso curso após três anos de muito aprendizado.
          O projeto Floody é fruto de todo o conhecimento, esforço e dedicação que adquirimos ao longo dessa jornada.
        </p>
        <p className="text-lg mt-4 text-gray-700 leading-relaxed">
          Criamos essa solução para ajudar pessoas e contribuir com a sustentabilidade.
          Se tiver dúvidas, sugestões ou quiser parceria, fale com a gente:
        </p>
        <p className="mt-3 text-xl font-semibold text-blue-700">📧 grupo.floody@gmail.com</p>
      </div>

      {/* Fórum */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Fórum</h2>
        <form onSubmit={handleForumSubmit} className="space-y-4">
          <textarea value={forumMessage} onChange={(e) => setForumMessage(e.target.value)} placeholder="Deixe sua pergunta ou comentário" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" rows="4" required />
          <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Enviar Pergunta</button>
        </form>
      </div>

      {/* Ajuda */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Ajuda</h2>
        <form onSubmit={handleHelpSubmit} className="space-y-4">
          <textarea value={helpMessage} onChange={(e) => setHelpMessage(e.target.value)} placeholder="Descreva seu problema ou dúvida" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" rows="4" required />
          <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition">Solicitar Ajuda</button>
        </form>
      </div>

      <Link to="/" className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition mt-6">
        Voltar para Home
      </Link>
    </div>
  );
}
