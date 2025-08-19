import React, { useState, useEffect, useRef } from "react";
import BombaPng from "../Img/bomba.png";
import SensorPng from "../Img/SensorPh.png";
import ProtoboardPng from "../Img/Protoboard.png";
import Hc05 from "../Img/Hc05.png";
import ArduinoMat from "../Img/ArduinoMat.png";
import Peneira from "../Img/Peneira.png";
import Display from "../Img/Display.png";
import Pastilha from "../Img/Pastilha.png";




export default function Material({ darkMode }) {
  const [materiais, setMateriais] = useState([]);
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const itensMock = [
      { id: 1, nome: "Bomba submersível", preco: 10.0, imagem: BombaPng },
      { id: 2, nome: "Sensor de pH", preco: 10.0, imagem: SensorPng },
      { id: 3, nome: "Protoboard - 4 Unidades", preco: 10.0, imagem: ProtoboardPng },
      { id: 4, nome: "Módulo WiFi ESP32 Bluetooth", preco: 10.0, imagem: ArduinoMat },
      { id: 5, nome: "Peneira", preco: 10.0, imagem: Peneira },
      { id: 6, nome: " Display ", preco: 10.0, imagem: Display },
      { id: 7, nome: "Cabornato de cálcio", preco: 10.0, imagem: Pastilha },
      { id: 8, nome: "Servo motor", preco: 10.0, imagem: "https://via.placeholder.com/150" },
      { id: 9, nome: "Jumper (Fios) ", preco: 10.0, imagem: "https://via.placeholder.com/150" },
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

  const containerClasses = `flex flex-col items-center justify-start
    h-screen overflow-y-auto pt-40 p-6 transition-all duration-700 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
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

  return (
    <div ref={containerRef} className={containerClasses}>
      <div className={`${cardClasses} w-full max-w-6xl ${cardBg}`}>
        <h1 className={`text-5xl font-bold text-center mb-8 ${cardTextColor}`}>
          Materiais
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 w-full">
          {materiais.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{ animationDelay: `${index * 150}ms` }}
              className={`${cardClasses} flex flex-col items-center justify-center text-center cursor-default ${cardBg} animate-fadeSlide`}
            >
              <div className="w-full p-4 flex flex-col items-center justify-center text-center">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="w-full h-auto object-cover rounded-xl mb-4 transition-transform hover:scale-110"
                />
                <h2 className={`text-2xl font-semibold mb-1 ${cardTextColor}`}>
                  {item.nome}
                </h2>
                <p className={`mb-4 text-lg ${cardPriceColor}`}>
                  R$ {item.preco.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlide { animation: fadeSlide 0.8s ease forwards; }
      `}</style>
    </div>
  );
}
