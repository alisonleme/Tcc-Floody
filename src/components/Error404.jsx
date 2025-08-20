
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Footer reutilizável
import LoadingSVG from '../Img/loading.svg'; // coloque seu loading.svg em /Img/

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redireciona para a home após 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-4"
      style={{ userSelect: 'none' }}
    >
      <img
        src={LoadingSVG}
        alt="Loading"
        className="w-24 h-24 mb-6 animate-spin-slow"
        style={{ animationDuration: '3s' }}
      />
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-xl mb-4">Página não encontrada</p>
      <p>Redirecionando para a página inicial...</p>

      <Footer />
    </div>
  );
}
