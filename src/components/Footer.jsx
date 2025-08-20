import React from 'react';

export default function Footer() {
  return (
    <footer
      className="w-full py-4 text-center text-sm select-none dark:text-gray-400"
      style={{ userSelect: 'none', color: '#ffffff' }} // branco no claro
    >
      © 2025 Floody. Todos os direitos reservados.
    </footer>
  );
}
