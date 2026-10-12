"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidthClass?: string; // Наприклад: "max-w-md", "max-w-lg", "max-w-2xl"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = "max-w-lg",
}: ModalProps) {
  // Блокування прокручування документа (body scroll lock) при відкритій модалці
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose} // Закриття при кліку на фон
    >
      {/* Контейнер модального вікна (зупиняє клік, щоб не закривати при кліку всередині) */}
      <div
        className={`bg-white rounded-3xl w-full ${maxWidthClass} p-6 shadow-2xl border border-slate-200/80 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модального вікна */}
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
            {title ? (
              <h2 className="text-base font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                {title}
              </h2>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-red-500 rounded-xl text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Вміст модального вікна */}
        <div className="flex-1 flex flex-col gap-4 text-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
}
