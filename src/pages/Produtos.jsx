import React from "react";
import { Link } from "react-router-dom";

export default function Produtos() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-100 text-gray-900 p-10">
      <h1 className="text-5xl font-bold mb-8">Produtos</h1>
      <p className="text-xl max-w-3xl text-center">
        Aqui estão listados todos os materiais utilizados no desenvolvimento do protótipo do Floody, com descrições, preços e valores totais do projeto.
      </p>

      <Link
        to="/"
        className="mt-10 px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
