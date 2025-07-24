import React, { useEffect, useRef, useState } from "react";

export default function Jogo({ darkMode, toggleTheme }) {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);

  // Controla visibilidade das seções com Intersection Observer
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

  // Persistência localStorage para tema (exemplo, opcional, pois toggleTheme pode controlar externamente)
  useEffect(() => {
    localStorage.setItem("floody-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Classes condicionais para container e texto
  const containerClasses = `flex flex-col items-center justify-start min-h-screen p-6 transition-colors duration-500 ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
      : "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900"
  }`;

  // Classes para seção (mesma para todas, mas cores adaptadas)
  const sectionBaseClasses =
    "p-6 rounded-3xl shadow-xl transition-opacity transition-transform duration-700 ease-in-out max-w-5xl w-full";
  const sectionBg = darkMode
    ? "bg-gradient-to-br from-gray-800 to-gray-700"
    : "bg-gradient-to-br from-[#d0e6f8] to-[#a3cbee]";

  // Classes para título das seções
  const sectionTitleClasses = `text-3xl font-bold mb-4 ${
    darkMode ? "text-yellow-300" : "text-gray-900"
  }`;

  // Classes para parágrafos
  const paragraphClasses = `text-lg text-justify ${
    darkMode ? "text-gray-200" : "text-gray-900"
  }`;

  // Botão animado (shimmer no dark, hover azul no light)
  const animatedButtonClasses = darkMode
    ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 animate-shimmer text-gray-900 font-semibold py-3 px-6 rounded shadow-lg transition duration-500 cursor-pointer"
    : "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition duration-300 cursor-pointer";

  return (
    <div className={containerClasses}>
      {/* Estilos para shimmer e animação do toggle */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 4s linear infinite;
        }
        .toggle-icon {
          transition: transform 0.6s ease;
        }
        .toggle-icon:hover {
          transform: rotate(15deg) scale(1.1);
        }
      `}</style>

      {/* Toggle do tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="mb-10 p-3 rounded-full bg-gray-700 dark:bg-gray-800 shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300 inline-flex items-center justify-center"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={darkMode ? "#FBBF24" : "#374151"}
          className="w-8 h-8 toggle-icon"
          role="img"
          aria-hidden="true"
        >
          {/* Ícone de sol/lua simplificado */}
          {darkMode ? (
            <path d="M12 3v1m0 16v1m8.485-9h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
          ) : (
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          )}
        </svg>
      </button>

      <h1 className="text-5xl font-bold mb-16 text-center select-none">
        Jogo Floody
      </h1>

      {/* Seções */}
      {[{
        title: "Nossa História",
        content:
          "Nosso jogo conta a história de 3 sobreviventes de enchentes que ocorreram em uma cidade antiga. Eles se encontram diante de diversos puzzles que precisam resolver para ativar as válvulas de drenagem e ajudar a cidade a brilhar novamente.",
        ariaLabel: "Nossa História"
      },
      {
        title: "Gameplay",
        content: (
          <>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/67Bi50_ORjI"
                title="Gameplay Floody"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a
                href="https://www.youtube.com/@ManoelGomesOfficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar nosso canal no YouTube"
                className={animatedButtonClasses}
              >
                Nosso Canal
              </a>
              <a href="#testar-jogo" aria-label="Link para testar o jogo" className={animatedButtonClasses}>
                Testar o Jogo
              </a>
            </div>
          </>
        ),
        ariaLabel: "Gameplay"
      },
      {
        title: "Trailer do Jogo",
        content: (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/f-nnv_9N6s8"
              title="Trailer Floody"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-110"
            />
          </div>
        ),
        ariaLabel: "Trailer do jogo"
      }].map(({ title, content, ariaLabel }, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`${sectionBaseClasses} ${sectionBg} ${
            visibleSections.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          tabIndex={0}
          aria-label={ariaLabel}
        >
          <h2 className={sectionTitleClasses}>{title}</h2>
          {typeof content === "string" ? (
            <p className={paragraphClasses}>{content}</p>
          ) : (
            content
          )}
        </section>
      ))}
    </div>
  );
}
