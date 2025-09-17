import React, { useEffect, useRef, useState } from "react";
import Footer from '../components/Footer.jsx';

export default function Jogo({ darkMode, toggleTheme }) {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionsRef = useRef([]);

  const fundoClaro = "bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900";

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

  const containerClasses = `flex flex-col items-center justify-start min-h-screen p-4 sm:p-6 transition-colors duration-700 ${
    darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white" : fundoClaro
  }`;

  const sectionBaseClasses =
    "p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl transition-opacity transition-transform duration-700 ease-in-out max-w-5xl w-full mb-12";

  const sectionBg = darkMode
    ? "bg-gradient-to-br from-gray-800/90 to-gray-700/80"
    : "bg-gradient-to-br from-[#d0e6f8cc] to-[#a3cbeecc]";

  const sectionTitleClasses = `text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${
    darkMode ? "text-white drop-shadow-text-dark" : "text-gray-900"
  }`;

  const paragraphClasses = `text-base sm:text-lg text-justify leading-relaxed transition-colors duration-500 ${
    darkMode ? "text-gray-200" : "text-gray-900"
  }`;

  const buttonClasses = `mt-6 px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-shimmer text-center text-base sm:text-lg ${
    darkMode ? "bg-shimmer-dark text-white" : "bg-shimmer-light text-gray-900"
  }`;

  return (
    <div className={containerClasses}>
      {/* Botão alternar tema */}
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
          className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-500 hover:rotate-15 hover:scale-110"
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

      {/* Título principal */}
      <h1
        className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-14 text-center select-none ${
          darkMode ? "text-white drop-shadow-text-dark" : "text-gray-900"
        }`}
      >
        Jogo Floody
      </h1>

      {/* Seções */}
      {[
        {
          title: "Nossa História",
          content:
            "Nosso jogo conta a história de 3 sobreviventes de enchentes em uma cidade antiga. Eles precisam resolver puzzles para ativar válvulas de drenagem e restaurar a cidade.",
        },
        {
          title: "Gameplay",
          content: (
            <>
              <div className="relative w-full mb-6 aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/67Bi50_ORjI"
                  title="Gameplay Floody"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-105"
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
        },
        {
          title: "Trailer do Jogo",
          content: (
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/f-nnv_9N6s8"
                title="Trailer Floody"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          ),
        },
      ].map(({ title, content }, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`${sectionBaseClasses} ${sectionBg} ${
            visibleSections.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className={sectionTitleClasses}>{title}</h2>
          {typeof content === "string" ? (
            <p className={paragraphClasses}>{content}</p>
          ) : (
            content
          )}
        </section>
      ))}

      <Footer />
    </div>
  );
}
