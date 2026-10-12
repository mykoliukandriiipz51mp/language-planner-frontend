"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ParrotLogo from "@/assets/brand/parrot-mascot.png";

export interface HeaderProps {
  /** Назва бренду або логотипу */
  brandName?: string;
  /** Кількість днів безперервного навчання (Streak) */
  streakDays?: number;
  /** Поточний рівень користувача */
  userLevel?: number;
  /** Прогрес досягнення наступного рівня у відсотках (0 - 100) */
  levelProgressPercentage?: number;
  /** Обробники кліків навігації */
  onNavigateWorkplace?: () => void;
  onNavigateProfile?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
}

export default function Header({
  brandName = "Birbi",
  streakDays = 7,
  userLevel = 28,
  levelProgressPercentage = 70,
  onNavigateWorkplace,
  onNavigateProfile,
  onNavigateSettings,
  onLogout,
}: HeaderProps) {
  return (
    <header className="w-full bg-white rounded-b-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
      {/* 1. Логотип та бренд */}
      <div className="flex items-center gap-3">
        <Image src={ParrotLogo} alt="logo" className="rounded-full w-10 h-10 shadow-md border-3 border-indigo-500" />

        <span className="text-xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
          {brandName}
        </span>
      </div>

      {/* 2. Навігаційне меню */}
      <nav className="flex items-center gap-6 text-base font-bold text-slate-500">
        <Link
          href="/dashboard"
          className="text-[#5046E5] hover:text-[#4338CA] transition-all bg-transparent border-none cursor-pointer"
        >
          Робочий простір
        </Link>
        <Link
          href="/profile"
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer"
        >
          Профіль
        </Link>
        <Link
          href="/settings"
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer"
        >
          Налаштування
        </Link>
      </nav>

      {/* 3. Показники гейміфікації (Стрик та Рівень) */}
      <div className="flex items-center gap-3">
        {/* Стрик */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-base font-extrabold text-amber-600">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span>{streakDays} днів поспіль</span>
        </div>

        {/* Рівень прогресу */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-base font-extrabold text-slate-700">
          <span>Рівень {userLevel}</span>
          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5046E5] transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.max(0, levelProgressPercentage))}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer text-base font-bold text-slate-500"
        >
          Вийти
        </button>
      </div>
    </header>
  );
}
