import React, { useEffect, useRef, useState } from "react";

export default function Jogo({ darkMode, toggleTheme }) {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionsRef.current.indexOf(entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
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

  useEffect(() => {
    localStorage.setItem("floody-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const containerClasses = `flex flex-col items-center justify-start min-h-screen p-6 transition-colors duration-700 ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
      : "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 text-gray-900"
  }`;

  const sectionBaseClasses =
    "p-6 rounded-3xl shadow-xl transition-opacity transition-transform duration-700 ease-in-out max-w-5xl w-full mb-10";
  const sectionBg = darkMode
    ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80"
    : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc]";

  // Títulos agora brancos com sombra no modo escuro
  const sectionTitleClasses = `text-3xl font-bold mb-4 transition-colors duration-500 ${
    darkMode
      ? "text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]"
      : "text-gray-900"
  }`;

  const paragraphClasses = `text-lg text-justify transition-colors duration-500 ${
    darkMode ? "text-gray-200" : "text-gray-900"
  }`;

  // Botões com gradiente suave e shimmer animado
  const buttonClasses = `mt-6 px-10 py-4 rounded-md font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animated-button`;

  return (
    <div className={containerClasses}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-button {
          background: ${
            darkMode
              ? "linear-gradient(270deg, rgba(147,51,234,0.6), rgba(88,28,135,0.6), rgba(30,58,138,0.5))"
              : "linear-gradient(270deg, rgba(113,183,230,0.7), rgba(179,221,254,0.7), rgba(74,144,226,0.7))"
          };
          background-size: 400% 400%;
          animation: shimmer 6s ease infinite;
          color: ${darkMode ? "#f8fafc" : "#1f2937"};
          text-shadow: ${darkMode ? "0 0 6px rgba(0,0,0,0.7)" : "none"};
          transition: all 0.7s ease-in-out;
        }
        .animated-button:hover {
          filter: brightness(1.15);
        }
        .toggle-icon {
          transition: transform 0.6s ease;
          filter: drop-shadow(0 0 6px rgba(0,0,0,0.5));
        }
        .toggle-icon:hover {
          transform: rotate(15deg) scale(1.1);
        }
      `}</style>

      {/* Botão de alternância do tema */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className={`mb-10 p-3 rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300 inline-flex items-center justify-center ${
          darkMode ? "bg-gray-800" : "bg-gray-300"
        }`}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={darkMode ? "#ffffff" : "#374151"}
          className="w-8 h-8 toggle-icon"
          role="img"
          aria-hidden="true"
        >
          {darkMode ? (
            <path d="M12 3v1m0 16v1m8.485-9h1M3 12H2m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
          ) : (
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          )}
        </svg>
      </button>

      <h1
        className={`text-5xl font-bold mb-16 text-center select-none ${
          darkMode
            ? "text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]"
            : "text-gray-900"
        }`}
      >
        Jogo Floody
      </h1>

      {[
        {
          title: "Nossa História",
          content:
            "Nosso jogo conta a história de 3 sobreviventes de enchentes que ocorreram em uma cidade antiga. Eles se encontram diante de diversos puzzles que precisam resolver para ativar as válvulas de drenagem e ajudar a cidade a brilhar novamente.",
          ariaLabel: "Nossa História",
        },
        {
          title: "Gameplay",
          content: (
            <>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
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
                  className={buttonClasses}
                >
                  Nosso Canal
                </a>
                <a
                  href="#testar-jogo"
                  aria-label="Link para testar o jogo"
                  className={buttonClasses}
                >
                  Testar o Jogo
                </a>
              </div>
            </>
          ),
          ariaLabel: "Gameplay",
        },
        {
          title: "Trailer do Jogo",
          content: (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
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
          ariaLabel: "Trailer do jogo",
        },
      ].map(({ title, content, ariaLabel }, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`${sectionBaseClasses} ${sectionBg} ${
            visibleSections.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{
            transition: "background 0.7s ease-in-out, color 0.7s ease-in-out",
          }}
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
