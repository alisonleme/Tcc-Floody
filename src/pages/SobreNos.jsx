import React from "react";
import { Link } from "react-router-dom";

export default function SobreNos() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-purple-100 text-gray-900 p-10">
      <h1 className="text-5xl font-bold mb-8">Sobre Nós</h1>
      <p className="text-xl max-w-3xl text-center">
        O Floody é desenvolvido por uma equipe dedicada a criar soluções sustentáveis para o meio ambiente,
        ajudando pessoas em áreas de risco de alagamentos.
      </p>

      <Link
        to="/"
        className="mt-10 px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
