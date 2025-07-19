import React from "react";
import { Link } from "react-router-dom";

export default function Artigo() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100 text-gray-900 p-10">
      <h1 className="text-5xl font-bold mb-8">Artigo Técnico</h1>
      <p className="text-xl max-w-3xl text-center">
        Aqui você encontra a parte mais científica do projeto Floody, com dados técnicos, referências e explicações detalhadas sobre o funcionamento do dispositivo.
      </p>

      <Link
        to="/"
        className="mt-10 px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
