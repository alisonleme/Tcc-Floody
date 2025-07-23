import React, { useState, useEffect, useRef } from "react";

export default function Material({ user }) {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
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
    setMateriais((prev) => [...prev, novo]);
    setNome("");
    setPreco("");
    setImagem("");
  };

  const excluirMaterial = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    setMateriais((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-700 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ backgroundColor: "#d8e7f5" }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-5xl text-gray-900">
        <h1 className="text-5xl font-bold text-center mb-8">Materiais</h1>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 overflow-y-auto pr-2"
          style={{ maxHeight: "400px" }}
        >
          {materiais.map((item, index) => (
            <div
              key={item.id}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              className="animate-fadeSlide bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 hover:shadow-2xl transition transform duration-300 cursor-default"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-32 h-32 object-cover rounded-xl mb-4 transition transform hover:scale-110"
              />
              <h2 className="text-2xl font-semibold mb-1">{item.nome}</h2>
              <p className="text-gray-600 mb-4 text-justify text-lg">
                R$ {item.preco.toFixed(2)}
              </p>
              {user?.isAdmin && (
                <button
                  onClick={() => excluirMaterial(item.id)}
                  className="mt-2 px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 hover:scale-105 hover:shadow-lg cursor-pointer transition transform duration-300"
                >
                  Excluir
                </button>
              )}
            </div>
          ))}
        </div>

        {user?.isAdmin && (
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md animate-pulse-slow">
            <h2 className="text-3xl font-bold mb-6 text-center">Adicionar Material</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Nome do material"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="flex-1 p-4 border rounded-xl text-lg focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-40 p-4 border rounded-xl text-lg focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                className="flex-1 p-4 border rounded-xl text-lg focus:ring-2 focus:ring-blue-300 transition"
              />
              <button
                onClick={adicionarMaterial}
                className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:scale-105 hover:shadow-lg cursor-pointer transition transform duration-300"
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.8s ease forwards;
        }
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
      `}</style>
    </div>
  );
}
