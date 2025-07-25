import React, { useState, useEffect, useRef } from "react";

export default function Material({ user, darkMode }) {
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
    const novo = { id: Date.now(), nome, preco: parseFloat(preco), imagem };
    setMateriais((prev) => [...prev, novo]);
    setNome(""); setPreco(""); setImagem("");
  };

  const excluirMaterial = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    setMateriais((prev) => prev.filter((m) => m.id !== id));
  };

  const containerClasses = `flex flex-col items-center justify-center min-h-screen 
    pt-28 md:pt-12 p-6 transition-all duration-700 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
    ${darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
      : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
    }`;

  const cardClasses = `p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out`;
  const cardBg = darkMode
    ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80"
    : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc]";

  const cardTextColor = darkMode
    ? "text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.7)]"
    : "text-gray-900";
  const cardPriceColor = darkMode
    ? "text-gray-300 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]"
    : "text-gray-800";

  const buttonShimmerStyle = {
    backgroundSize: "400% 400%",
    animation: "shimmer 6s ease infinite",
    backgroundImage: darkMode
      ? "linear-gradient(270deg, rgba(147,51,234,0.6), rgba(88,28,135,0.6), rgba(30,58,138,0.5))"
      : "linear-gradient(270deg, rgba(113,183,230,0.7), rgba(179,221,254,0.7), rgba(74,144,226,0.7))",
    color: darkMode ? "#f8fafc" : "#1f2937",
    textShadow: darkMode ? "0 0 6px rgba(0,0,0,0.7)" : "none",
  };

  const inputClasses = `flex-1 p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 transition duration-300 ${
    darkMode
      ? "bg-gray-700 text-white placeholder-gray-300 border-gray-600 focus:ring-purple-400"
      : "bg-white text-gray-900 placeholder-gray-600 border-gray-300 focus:ring-blue-400"
  }`;

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className={`${cardClasses} w-full max-w-6xl ${cardBg}`}>
        <h1 className={`text-5xl font-bold text-center mb-8 ${cardTextColor}`}>
          Materiais
        </h1>

        {/* Grid adaptável */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full">
          {materiais.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 150}ms` }}
              className={`${cardClasses} flex flex-col items-center cursor-default ${cardBg} animate-fadeSlide`}
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-32 h-32 object-cover rounded-xl mb-4 transition-transform hover:scale-110"
              />
              <h2 className={`text-2xl font-semibold mb-1 ${cardTextColor}`}>
                {item.nome}
              </h2>
              <p className={`mb-4 text-lg ${cardPriceColor}`}>
                R$ {item.preco.toFixed(2)}
              </p>
              {user?.isAdmin && (
                <button
                  onClick={() => excluirMaterial(item.id)}
                  className="mt-2 px-5 py-3 rounded-xl hover:scale-105 hover:shadow-lg cursor-pointer transition-transform duration-300"
                  style={buttonShimmerStyle}
                >
                  Excluir
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Formulário responsivo */}
        {user?.isAdmin && (
          <div className={`${cardClasses} ${cardBg} animate-pulse-slow`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${cardTextColor}`}>
              Adicionar Material
            </h2>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
              <input
                type="text"
                placeholder="Nome do material"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputClasses}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className={`${inputClasses} md:w-40`}
              />
              <input
                type="text"
                placeholder="URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                className={inputClasses}
              />
              <button
                onClick={adicionarMaterial}
                className="px-8 py-4 rounded-xl hover:scale-105 hover:shadow-lg cursor-pointer transition-transform duration-300 font-semibold w-full md:w-auto"
                style={buttonShimmerStyle}
              >
                Adicionar
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide { animation: fadeSlide 0.8s ease forwards; }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-slow { animation: pulseSlow 3s infinite; }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
