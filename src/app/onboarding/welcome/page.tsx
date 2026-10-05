"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Замініть шлях на ваш реальний SVG/PNG файл талісмана
import ParrotMascotIco from "@/assets/brand/parrot-mascot.png";

export default function OnboardingWelcomePage() {
  return (
    <div className="min-h-screen w-full bg-indigo-400 flex flex-col justify-center items-center p-6 md:p-10 relative">
      {/* Центральна картка */}
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[480px] flex flex-col items-center text-center">
        {/* Брендовий персонаж (Папуга) */}
        <div className="">
          <Image
            src={ParrotMascotIco}
            alt="FluentFlow Parrot Mascot"
            priority
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Привітання */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 font-['Encode_Sans_Expanded',_sans-serif] leading-tight">
          Привіт! Готові налаштувати ваш ідеальний план?
        </h1>

        {/* Пояснювальний текст */}
        <p className="text-sm text-slate-500 mb-8 px-2 font-medium leading-relaxed">
          Щоб розклад був максимально комфортним і враховував ваше щоденне
          навантаження, ми підготували декілька простих запитань. Це займе лише
          2 хвилини!
        </p>

        {/* Кнопки вибору */}
        <div className="w-full flex flex-col gap-3">
          {/* Кнопка 1: Старт візарду */}
          <Link href="/onboarding/quiz" className="w-full">
            <Button
              variant="primary"
              fullWidth
              className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 text-sm font-bold shadow-md shadow-indigo-100"
            >
              Розпочати налаштування 🚀
            </Button>
          </Link>

          {/* Кнопка 2: Перехід до дашборду */}
          <Link href="/dashboard" className="w-full">
            <button
              type="button"
              className="w-full bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-semibold py-3.5 px-6 rounded-full border border-slate-200 transition-colors text-sm"
            >
              Перейти до головної панелі
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
