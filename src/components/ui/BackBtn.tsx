import Link from "next/link";
import React from "react";

export interface BackBtnProps {
  link: string;
  text?: string;
}

export const BackBtn: React.FC<BackBtnProps> = ({
  link = "/",
  text = "Назад",
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Link
        href={link}
        className="inline-flex items-center gap-2 font-bold text-slate-800 hover:text-indigo-600 transition-colors font-['Encode_Sans_Expanded',_sans-serif]"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>{text}</span>
      </Link>
    </div>
  );
};
