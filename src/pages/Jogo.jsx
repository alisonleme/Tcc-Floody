import React from "react";

export default function Jogo() {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6"
      style={{ backgroundColor: "#d8e7f5" }}
    >
      {/* Container fixo e centralizado */}
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-5xl text-gray-900 text-center mt-20 space-y-10">
        <h1 className="text-5xl font-bold">Jogo Floody</h1>

        {/* Quadrado - História */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
          <p className="text-lg text-gray-700">
            Nosso jogo conta a história de 3 sobreviventes de enchentes que ocorreram em uma cidade antiga.
            Eles se encontram diante de diversos puzzles que precisam resolver para ativar as válvulas de drenagem
            e ajudar a cidade a brilhar novamente.
          </p>
        </div>

        {/* Quadrado - Gameplay + canal */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-3xl font-bold">Gameplay</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/67Bi50_ORjI"
              title="Gameplay Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <a
              href="https://www.youtube.com/@ManoelGomesOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Nosso Canal
            </a>
            <a
              href="#testar-jogo"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Testar o Jogo
            </a>
          </div>
        </div>

        {/* Quadrado - Trailer */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-4">Trailer do Jogo</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/f-nnv_9N6s8"
              title="Trailer Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
