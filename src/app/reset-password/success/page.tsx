"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BackBtn } from "@/components/ui/BackBtn";

export default function PasswordResetSuccessPage() {
  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] flex flex-col justify-between p-6 md:p-10 relative">
      <BackBtn link="/" />

      <div className="flex-1 flex items-center justify-center py-6">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[620px] flex flex-col items-center text-center">
          {/* Зелена круглі іконка підтвердження */}
          <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
            Пароль оновлено!
          </h1>

          <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed px-2">
            Ваш пароль успішно скинуто. Тепер ви можете увійти в систему,
            використовуючи нові облікові дані.
          </p>

          <Link href="/login" className="w-full">
            <Button
              variant="primary"
              fullWidth
              className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5"
            >
              Повернутися до входу
            </Button>
          </Link>
        </div>
      </div>

      <div className="h-6"></div>
    </div>
  );
}
