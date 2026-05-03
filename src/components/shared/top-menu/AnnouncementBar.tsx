"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";

interface AnnouncementBarProps {
  text: string;
}

export const AnnouncementBar = ({ text }: AnnouncementBarProps) => {
  const [show, setShow] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setShow(false), 200); 
  };

  if (!show) return null;

  return (
    <div
      className={`
        announce-bar
        h-8
        relative flex items-center justify-center
        py-2 px-3 sm:px-4
        transition-all duration-200
        ${closing ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"}
      `}
    >
      {/* Texto centrado */}
      <p
        className="
          announce-text
          text-[10px] sm:text-[11px]
          tracking-[0.16em] sm:tracking-[0.18em]
          uppercase font-light text-center
          leading-tight
        "
      >
        {text}
      </p>

      {/* Botón cerrar */}
      <button
        onClick={handleClose}
        aria-label="Cerrar anuncio"
        className="
          cursor-pointer
          absolute right-2 sm:right-4
          flex items-center justify-center
          opacity-70 hover:opacity-100
          transition-opacity
        "
      >
        <XIcon size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
};