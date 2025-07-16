import React from 'react';
import FundoPNGclaro from './Img/FundoPNGclaroGirar.png';
import Imagem1 from './Img/account_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import Imagem2 from './Img/dark_mode_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import ImagemDaHome from './Img/ImagemDaHome.png';
import FundoPNGClaro from './Img/FundoPNGclaro.png';

// Importando as imagens novas para os quadrados
import ArtigoImg from './Img/artigo_quadrado.png';
import ArduinoImg from './Img/arduino.png';

export function App() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--cor-principal)' }}>
      
      {/* IMAGEM DA HOME NO FLUXO NORMAL */}
      <div className="w-full h-[900px] relative z-0 flex justify-center items-center">
        <img
          src={ImagemDaHome}
          alt="Imagem Home"
          className="w-[2350px] h-full object-cover"
        />

        {/* Quadrado azul transparente centralizado */}
        <div
          className="absolute p-20 rounded-lg text-white text-center max-w-xl"
          style={{ backgroundColor: 'rgba(3, 99, 167, 0.2)' }}
        >
          <p className="text-4xl font-bold">
            Floody
          </p>
        </div>
      </div>

      <div className="w-full h-[400px] relative z-10 -mt-15">
        <img
          src={FundoPNGClaro}
          alt="Imagem Adicional"
          className="w-full h-full"
        />
      </div>

      {/* TOPO FIXO SEMPRE NA FRENTE */}
      <div className="fixed top-0 left-0 w-full h-[120px] overflow-hidden z-50">
        <img
          src={FundoPNGclaro}
          alt="Fundo girado"
          className="w-full h-full"
        />

        <div className="absolute inset-0 h-full">

          {/* Botões centralizados subidos */}
          <div className="absolute left-1/2 top-[30px] transform -translate-x-1/2 flex space-x-56">
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Jogo</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Matérias</button>
            <button className="text-white hover:text-blue-500 text-xl font-bold px-6 py-2">Sobre Nós</button>
          </div>

          {/* Ícones canto direito subidos */}
          <div className="absolute right-8 top-[15px] flex space-x-4">
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem1} alt="Perfil" className="h-12 w-12 object-contain" />
            </button>
            <button className="p-3 hover:bg-blue-500 rounded-full">
              <img src={Imagem2} alt="Modo escuro" className="h-12 w-12 object-contain" />
            </button>
          </div>

        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL ABAIXO DE TUDO */}
      <div className="-mt-20 flex flex-col justify-center items-center relative z-20">
        <div
          className="p-16 rounded-lg text-white text-center max-w-7xl w-full space-y-6"
          style={{ backgroundColor: 'rgba(3, 99, 167, 0.75)' }}
        >
          <h1 className="text-4xl font-bold">O que é o Floody?</h1>
          <p className="text-2xl font-semibold">
            O Floody foi desenvolvido como um dispositivo doméstico inovador que visa auxiliar no combate às enchentes e promover o reaproveitamento da água da chuva. Seu funcionamento simula um “piscinão domiciliar”, inspirado em estruturas como o Piscinão de Taboão da Serra (RC-5 Taboão).
            Trata-se de um ralo inteligente, instalado em áreas externas da casa. Quando identifica acúmulo de água, ele se eleva automaticamente, permitindo que a água escoe para seu interior. O sistema realiza duas etapas de filtragem: uma inicial e outra mais densa. Após o tratamento, a água é armazenada em um reservatório interno e enviada para uma caixa d’água auxiliar, podendo ser reutilizada em tarefas como lavar o quintal, regar plantas e dar descarga.
          </p>
          <p className="text-2xl font-semibold">
            👥 Público-alvo:  Moradores de áreas urbanas com histórico de alagamentos.
          </p>
          <p className="text-2xl font-semibold">
            🎯 Objetivo do Projeto:  Reduzir os impactos das enchentes e promover práticas sustentáveis dentro das residências.
          </p>
          <p className="text-2xl font-semibold">
            🌟 Diferenciais do Floody:
            Ação automática em casos de acúmulo de água
            Sistema de filtragem
            Reaproveitamento de água tratada
            Instalação simples em áreas externas
            Contribuição direta com o meio ambiente
          </p>
          <p className="text-2xl font-semibold">
            📲 Baixe o app do Floody:  Botão de download para acesso ao aplicativo.
          </p>

          {/* Botão Download app */}
          <button
            className="mt-6 px-8 py-3 rounded-md font-semibold transition-colors duration-300 text-black hover:text-white"
            style={{ backgroundColor: '#B3E1FB', cursor: 'pointer' }}
          >
            Download app
          </button>

          {/* === NOVOS QUADRADOS COM IMAGENS E TEXTOS === */}
          <div className="mt-10 flex flex-col space-y-6 max-w-7xl w-full items-start">

            {/* Primeiro quadrado */}
            <div
              className="flex rounded-lg p-6 items-center max-w-xl w-full"
              style={{ backgroundColor: '#B2E1FE' }}
            >
              <button
                onClick={() => {
                  alert('Redirecionar para a seção do artigo');
                }}
                className="mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Ir para a seção do artigo"
                type="button"
              >
                <img
                  src={ArtigoImg}
                  alt="Artigo"
                  className="w-500 h-32 object-cover rounded-md"
                />
              </button>
              <p className="text-lg font-semibold text-gray-800">
                Ao clicar na imagem ao lado, você será redirecionado para a seção do artigo, onde apresentamos a parte mais científica do projeto Floody. Lá, você encontrará dados técnicos, referências utilizadas e uma explicação aprofundada sobre o funcionamento e a fundamentação do dispositivo.
              </p>
            </div>

            {/* Segundo quadrado */}
            <div
              className="flex rounded-lg p-6 items-center max-w-xl w-full"
              style={{ backgroundColor: '#B2E1FE' }}
            >
              <button
                onClick={() => {
                  alert('Redirecionar para a página de Produtos');
                }}
                className="mr-6 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Ir para a página de Produtos"
                type="button"
              >
                <img
                  src={ArduinoImg}
                  alt="Arduino"
                  className="w-500 h-32 object-cover rounded-md"
                />
              </button>
              <p className="text-lg font-semibold text-gray-800">
                Ao clicar na imagem ao lado, você será redirecionado para a página de Produtos, onde estão listados todos os materiais utilizados no desenvolvimento do protótipo do Floody. Lá, você poderá conferir as descrições, os preços e o valor total do projeto.
              </p>
            </div>

          </div>  {/* <<< FECHAMENTO CORRETO DA DIV DOS QUADRADOS */}

        </div>
      </div>

      {/* ÍCONE FIXO NO CANTO INFERIOR ESQUERDO */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          className="group p-5 hover:bg-blue-500 rounded-full transition-colors duration-300"
          style={{ backgroundColor: '#B1E3FD' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="64px"
            width="64px"
            viewBox="0 -960 960 960"
            className="fill-black group-hover:fill-white transition duration-300"
          >
            <path d="M480-540ZM80-160v-80h400v80H80Zm120-120q-33 0-56.5-23.5T120-360v-360q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720H200v360h280v80H200Zm600 40v-320H640v320h160Zm-180 80q-25 0-42.5-17.5T560-220v-360q0-25 17.5-42.5T620-640h200q25 0 42.5 17.5T880-580v360q0 25-17.5 42.5T820-160H620Zm100-300q13 0 21.5-9t8.5-21q0-13-8.5-21.5T720-520q-12 0-21 8.5t-9 21.5q0 12 9 21t21 9Zm0 60Z" />
          </svg>
        </button>
      </div>

    </div>
  );
}
