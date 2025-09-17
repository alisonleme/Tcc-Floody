import React, { useState, useEffect, useRef } from "react";
import BombaPng from "../Img/bomba.png";
import SensorPng from "../Img/SensorPh.png";
import ProtoboardPng from "../Img/Protoboard.png";
import ArduinoMat from "../Img/ArduinoMat.png";
import Peneira from "../Img/Peneira.png";
import Display from "../Img/Display.png";
import Pastilha from "../Img/Pastilha.png";
import Servo from "../Img/Servo.png";
import Jumper from "../Img/Jumper.png";
import Modulo from "../Img/Modulo.png";
import Pilha from "../Img/Pilha.png";
import Footer from "../components/Footer.jsx";

export default function Material({ darkMode }) {
  const [materiais, setMateriais] = useState([]);
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const itensMock = [
      { id: 1, nome: "Bomba submersível", preco: 11.9, imagem: BombaPng },
      { id: 2, nome: "Sensor de pH", preco: 193, imagem: SensorPng },
      { id: 3, nome: "Protoboard - 3 Unidades", preco: 26.7, imagem: ProtoboardPng },
      { id: 4, nome: "Módulo WiFi Bluetooth ESP32", preco: 64.9, imagem: ArduinoMat },
      { id: 5, nome: "Peneira", preco: 10.0, imagem: Peneira },
      { id: 6, nome: "Display", preco: 17, imagem: Display },
      { id: 7, nome: "Carbonato de cálcio", preco: 20.5, imagem: Pastilha },
      { id: 8, nome: "Servo motor", preco: 15.0, imagem: Servo },
      { id: 9, nome: "Jumper (Fios)", preco: 5.0, imagem: Jumper },
      { id: 10, nome: "Módulo relé 5V", preco: 7.0, imagem: Modulo },
      { id: 11, nome: "Pilha AA", preco: 8.0, imagem: Pilha },
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

  const containerClasses = `
    flex flex-col items-center justify-start min-h-screen overflow-y-auto pt-40 p-6
    transition-all duration-700 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
    ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
        : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
    }`;

  const cardGrandeClasses = `p-6 rounded-3xl shadow-xl w-full max-w-6xl`;
  const cardPequenoClasses = `p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out`;
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
      {/* Card grande */}
      <div className={`${cardGrandeClasses} ${cardBg}`}>
        <h1 className={`text-5xl font-bold text-center mb-8 ${cardTextColor}`}>
          Materiais
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 w-full">
          {materiais.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{ animationDelay: `${index * 150}ms` }}
              className={`${cardPequenoClasses} flex flex-col items-center justify-center text-center cursor-default ${cardBg} animate-fadeSlide`}
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
        <Footer />
      </div>
    </div>
  );
}
