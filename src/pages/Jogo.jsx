import React, { useEffect, useRef, useState } from "react";

export default function Jogo() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionsRef.current.indexOf(entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6 bg-[#d8e7f5]"
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-button {
            background: linear-gradient(270deg, #4a90e2, #71b7e6, #b3ddfe);
            background-size: 400% 400%;
            animation: shimmer 6s ease infinite;
            color: #2c3e50;
            font-weight: 600;
            padding: 0.75rem 1.5rem;
            border-radius: 1.5rem; /* rounded-3xl */
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 15px rgba(70,130,180,0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
            display: inline-block;
            text-align: center;
            user-select: none;
          }
          .animated-button:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 25px rgba(70,130,180,0.6);
            color: white;
          }
        `}
      </style>

      <div
        className="p-8 rounded-3xl shadow-xl w-full max-w-5xl text-gray-900 text-center mt-20 space-y-10"
        style={{ background: "linear-gradient(135deg, #b3ddfe, #71b7e6)" }}
      >
        <h1 className="text-5xl font-bold text-gray-900">Jogo Floody</h1>

        {/* Seção 1 */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`p-6 rounded-3xl shadow-xl transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ background: "linear-gradient(135deg, #d0e6f8, #a3cbee)" }}
          tabIndex={0}
          aria-label="Nossa História"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Nossa História</h2>
          <p className="text-lg text-gray-900 text-justify">
            Nosso jogo conta a história de 3 sobreviventes de enchentes que ocorreram em uma cidade antiga.
            Eles se encontram diante de diversos puzzles que precisam resolver para ativar as válvulas de drenagem
            e ajudar a cidade a brilhar novamente.
          </p>
        </section>

        {/* Seção 2 (Gameplay) */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`p-6 rounded-3xl shadow-xl space-y-4 transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ background: "linear-gradient(135deg, #d0e6f8, #a3cbee)" }}
          tabIndex={0}
          aria-label="Gameplay"
        >
          <h2 className="text-3xl font-bold text-gray-900">Gameplay</h2>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/67Bi50_ORjI"
              title="Gameplay Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-110"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <a
              href="https://www.youtube.com/@ManoelGomesOfficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nosso canal no YouTube"
              className="animated-button"
            >
              Nosso Canal
            </a>
            <a
              href="#testar-jogo"
              aria-label="Link para testar o jogo"
              className="animated-button"
            >
              Testar o Jogo
            </a>
          </div>
        </section>

        {/* Seção 3 (Trailer) */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`p-6 rounded-3xl shadow-xl transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ background: "linear-gradient(135deg, #d0e6f8, #a3cbee)" }}
          tabIndex={0}
          aria-label="Trailer do jogo"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Trailer do Jogo</h2>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/f-nnv_9N6s8"
              title="Trailer Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-110"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
