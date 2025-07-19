import React from "react";
import { Link } from "react-router-dom";

export default function Jogo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 text-gray-900 p-10">
      <h1 className="text-5xl font-bold mb-8">Jogo Floody</h1>
      <p className="text-xl max-w-3xl text-center">
        Aqui ficará o jogo interativo do Floody, onde você poderá simular enchentes e aprender sobre o funcionamento do nosso dispositivo.
      </p>

      <Link
        to="/"
        className="mt-10 px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
