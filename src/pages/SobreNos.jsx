import React from "react";
import { Link } from "react-router-dom";

export default function SobreNos() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#d8e7f5" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-gray-900 text-center">
        <h1 className="text-5xl font-bold mb-8">Sobre Nós</h1>
        <p className="text-xl mb-10">
          O Floody é desenvolvido por uma equipe dedicada a criar soluções sustentáveis para o meio ambiente,
          ajudando pessoas em áreas de risco de alagamentos.
        </p>

        <Link
          to="/"
          className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
