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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6"
      style={{ backgroundColor: "#d8e7f5" }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-5xl text-gray-900 text-center mt-20 space-y-10">
        <h1 className="text-5xl font-bold">Jogo Floody</h1>

        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`bg-gray-100 p-6 rounded-2xl shadow-md transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          tabIndex={0}
          aria-label="Nossa História"
        >
          <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
          <p className="text-lg text-gray-700 text-justify">
            Nosso jogo conta a história de 3 sobreviventes de enchentes que ocorreram em uma cidade antiga.
            Eles se encontram diante de diversos puzzles que precisam resolver para ativar as válvulas de drenagem
            e ajudar a cidade a brilhar novamente.
          </p>
        </section>

        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          tabIndex={0}
          aria-label="Gameplay"
        >
          <h2 className="text-3xl font-bold">Gameplay</h2>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/67Bi50_ORjI"
              title="Gameplay Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <a
              href="https://www.youtube.com/@ManoelGomesOfficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nosso canal no YouTube"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors duration-300 shadow"
            >
              Nosso Canal
            </a>
            <a
              href="#testar-jogo"
              aria-label="Link para testar o jogo"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors duration-300 shadow"
            >
              Testar o Jogo
            </a>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`bg-gray-100 p-6 rounded-2xl shadow-md transition-opacity transition-transform duration-700 ease-in-out ${
            visibleSections.includes(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          tabIndex={0}
          aria-label="Trailer do jogo"
        >
          <h2 className="text-3xl font-bold mb-4">Trailer do Jogo</h2>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/f-nnv_9N6s8"
              title="Trailer Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
