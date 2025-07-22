import React, { useState } from "react";

export default function IconHover({ staticImg, gifImg, alt, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <img
      src={isHovered ? gifImg : staticImg}
      alt={alt}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    />
  );
}
