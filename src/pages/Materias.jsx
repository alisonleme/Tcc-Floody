import React, { useState, useEffect } from "react";

export default function Material({ user }) {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    const itensMock = [
      { id: 1, nome: "Caderno", preco: 15.9, imagem: "https://via.placeholder.com/150" },
      { id: 2, nome: "Caneta", preco: 3.5, imagem: "https://via.placeholder.com/150" },
      { id: 3, nome: "Mochila", preco: 89.9, imagem: "https://via.placeholder.com/150" },
      { id: 4, nome: "Lápis", preco: 2.2, imagem: "https://via.placeholder.com/150" },
      { id: 5, nome: "Borracha", preco: 1.5, imagem: "https://via.placeholder.com/150" },
    ];
    setMateriais(itensMock);
  }, []);

  const adicionarMaterial = () => {
    if (!nome || !preco || !imagem) {
      alert("Preencha todos os campos");
      return;
    }
    const novo = {
      id: Date.now(),
      nome,
      preco: parseFloat(preco),
      imagem,
    };
    setMateriais([...materiais, novo]);
    setNome("");
    setPreco("");
    setImagem("");
  };

  const excluirMaterial = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    setMateriais(materiais.filter((m) => m.id !== id));
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#d8e7f5" }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-5xl text-gray-900">
        <h1 className="text-4xl font-bold text-center mb-8">Materiais</h1>

        {/* Lista com scroll interno */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 overflow-y-auto pr-2"
          style={{ maxHeight: "400px" }}
        >
          {materiais.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-32 h-32 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold">{item.nome}</h2>
              <p className="text-gray-600">R$ {item.preco.toFixed(2)}</p>
              {user?.isAdmin && (
                <button
                  onClick={() => excluirMaterial(item.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>
              )}
            </div>
          ))}
        </div>

        {user?.isAdmin && (
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Adicionar Material
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Nome do material"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="flex-1 p-3 border rounded-xl"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-32 p-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                className="flex-1 p-3 border rounded-xl"
              />
              <button
                onClick={adicionarMaterial}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
