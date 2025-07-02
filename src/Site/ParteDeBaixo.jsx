import React from 'react'; 
import ImagemDaHome from '../Img/ImagemDaHome.png';

export function ParteDeBaixo() {
  return (
    <div className="relative -mt-210 z-50">
      <img
        src={ImagemDaHome}
        alt="Imagem inferior"
        className="w-480 h-180 object-cover mx-auto"
      />
    </div>
  );
}