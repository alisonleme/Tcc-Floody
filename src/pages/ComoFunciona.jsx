import React, { useState } from "react";

export default function ComoFunciona() {
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

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6"
      style={{ backgroundColor: "#d8e7f5" }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-5xl text-gray-900 text-center mt-20 space-y-10">
        <h1 className="text-5xl font-bold">Como Funciona Nosso Dispositivo</h1>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Vídeo Explicativo</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/J4FwiaCZEwA"
              title="Como Funciona o Dispositivo Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-justify">
          <h2 className="text-3xl font-bold mb-4">Explicação do Dispositivo</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nosso dispositivo Floody é desenvolvido para monitorar e auxiliar na prevenção de enchentes em áreas urbanas.
            Utilizando sensores avançados de nível de água, conectividade IoT e um sistema de alertas em tempo real, ele ajuda comunidades a agir antes que ocorram danos graves.
            A integração com nosso aplicativo e sistema back-end permite um controle eficiente e sustentável, contribuindo para a segurança e bem-estar das pessoas.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Nosso Canal no YouTube</h2>
          <a
            href="https://www.youtube.com/@ManoelGomesOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer inline-block"
          >
            Visitar Canal
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">Fórum</h2>
          <form onSubmit={handleForumSubmit} className="space-y-4">
            <textarea
              value={forumMessage}
              onChange={(e) => setForumMessage(e.target.value)}
              placeholder="Deixe sua pergunta ou comentário"
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-justify"
              rows="4"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
            >
              Enviar Pergunta
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Ajuda</h2>
          <form onSubmit={handleHelpSubmit} className="space-y-4">
            <textarea
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              placeholder="Descreva seu problema ou dúvida"
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none text-justify"
              rows="4"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 cursor-pointer"
            >
              Solicitar Ajuda
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
