"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";

export interface DashboardHeaderProps {
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

export default function DashboardHeader({
  brandName = "Birbi",
  streakDays = 7,
  userLevel = 28,
  levelProgressPercentage = 70,
  onNavigateWorkplace,
  onNavigateProfile,
  onNavigateSettings,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="w-full bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
      {/* 1. Логотип та бренд */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#5046E5] flex items-center justify-center text-white font-extrabold shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
          {brandName}
        </span>
      </div>

      {/* 2. Навігаційне меню */}
      <nav className="flex items-center gap-6 text-base font-bold text-slate-500">
        <button
          type="button"
          onClick={onNavigateWorkplace}
          className="text-[#5046E5] hover:text-[#4338CA] transition-all bg-transparent border-none cursor-pointer"
        >
          Робочий простір
        </button>
        <button
          type="button"
          onClick={onNavigateProfile}
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer"
        >
          Профіль
        </button>
        <button
          type="button"
          onClick={onNavigateSettings}
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer"
        >
          Налаштування
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="hover:text-slate-800 transition-all bg-transparent border-none cursor-pointer"
        >
          Вийти
        </button>
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
      </div>
    </header>
  );
}
