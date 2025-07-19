import React from "react";
import { Link } from "react-router-dom";

export default function Materias() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-100 text-gray-900 p-10">
      <h1 className="text-5xl font-bold mb-8">Matérias</h1>
      <p className="text-xl max-w-3xl text-center">
        Nesta seção, você encontrará artigos, conteúdos educativos e materiais relacionados ao projeto Floody.
      </p>

      <Link
        to="/"
        className="mt-10 px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
