"use client";

import React, { useState, useMemo } from "react";
import { Award, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Мапа кольорів та бейджів для мов
const LANGUAGE_BADGES: Record<
  string,
  { code: string; colorClass: string; bgClass: string }
> = {
  en: { code: "EN", colorClass: "text-white", bgClass: "bg-[#5046E5]" },
  de: { code: "DE", colorClass: "text-white", bgClass: "bg-[#10B981]" },
  es: { code: "ES", colorClass: "text-white", bgClass: "bg-[#F59E0B]" },
  fr: { code: "FR", colorClass: "text-white", bgClass: "bg-[#EC4899]" },
  it: { code: "IT", colorClass: "text-white", bgClass: "bg-[#06B6D4]" },
};

const DEFAULT_BADGE = {
  code: "LANG",
  colorClass: "text-white",
  bgClass: "bg-indigo-500",
};

const DAYS_HEADER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DaySchedule {
  dayNumber: number;
  isRestDay: boolean;
  languages: string[];
}

interface Step10ScheduleReadyProps {
  languagesCount?: number;
  dailyMinutes?: number;
  strategyName?: string;
  activeStudyDays?: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
  selectedLanguageIds?: string[];
  onGoToDashboard: () => void;
  onAdjustParameters?: () => void;
}

export default function Step10ScheduleReady({
  languagesCount = 3,
  dailyMinutes = 60,
  strategyName = "Alternating Strategy",
  activeStudyDays = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  selectedLanguageIds = ["en", "de", "es"],
  onGoToDashboard,
  onAdjustParameters,
}: Step10ScheduleReadyProps) {
  // Базовий місяць для демонстрації генерації (жовтень 2026 / поточний місяць)
  const [currentDate] = useState(new Date(2026, 9, 1)); // Жовтень 2026

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Розрахунок генерації місячної сітки
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Визначаємо день тижня першого дня місяця (0 = Неділя, зміщуємо до 0 = Понеділок)
    let firstDayIndex = new Date(year, month, 1).getDay() - 1;
    if (firstDayIndex < 0) firstDayIndex = 6;

    const daysArray: (DaySchedule | null)[] = [];

    // Порожні комірки до початку місяця
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(null);
    }

    // Генерація днів місяця
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeekIndex = (firstDayIndex + day - 1) % 7;
      const dayOfWeekName = DAYS_HEADER[dayOfWeekIndex];

      const isRestDay = !activeStudyDays.includes(dayOfWeekName);

      // Алгоритмічний розподіл мов для активного дня
      let dayLangs: string[] = [];
      if (!isRestDay) {
        if (selectedLanguageIds.length > 0) {
          // Симуляція генератора чергування мов
          const primaryLang =
            selectedLanguageIds[(day - 1) % selectedLanguageIds.length];
          const secondaryLang =
            selectedLanguageIds[day % selectedLanguageIds.length];
          dayLangs = Array.from(new Set([primaryLang, secondaryLang])).slice(
            0,
            2,
          );
        } else {
          dayLangs = ["en", "de"];
        }
      }

      daysArray.push({
        dayNumber: day,
        isRestDay,
        languages: dayLangs,
      });
    }

    return daysArray;
  }, [currentDate, activeStudyDays, selectedLanguageIds]);

  return (
    <div className="flex flex-col w-full items-center">
      {/* Зелений бейдж успіху */}
      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
        PLAN GENERATED
      </div>

      {/* Заголовок з емодзі */}
      <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 text-center font-['Encode_Sans_Expanded',_sans-serif]">
        YOUR PERSONALIZED PLAN IS READY! 🎉
      </h1>

      {/* Блок з підсумком конфігурації */}
      <div className="w-full bg-[#F5F3FF] border border-indigo-100 rounded-2xl p-3.5 mb-5 flex items-center gap-3">
        <div className="p-2.5 bg-white rounded-xl text-[#5046E5] shadow-2xs">
          <Award className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900">
            {languagesCount} Languages • {dailyMinutes} min/day
          </span>
          <span className="text-xs font-medium text-slate-500">
            {strategyName} • Low Interference Risk
          </span>
        </div>
      </div>

      {/* Контейнер Місячного Календаря */}
      <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs mb-6">
        {/* Заголовок календаря та перемикач місяця */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            MONTHLY SCHEDULE PREVIEW ({monthName})
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Заголовки днів тижня (Mon, Tue...) */}
        <div className="grid grid-cols-7 gap-1 mb-1 text-center">
          {DAYS_HEADER.map((day) => (
            <span key={day} className="text-[11px] font-bold text-slate-400">
              {day}
            </span>
          ))}
        </div>

        {/* Сітка днів місяця */}
        <div className="grid grid-cols-7 gap-1.5">
          {monthDays.map((cell, idx) => {
            if (!cell) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-14 rounded-xl bg-slate-50/50"
                />
              );
            }

            return (
              <div
                key={`day-${cell.dayNumber}`}
                className={`h-14 rounded-xl p-1 flex flex-col justify-between border transition-all ${
                  cell.isRestDay
                    ? "bg-slate-50/70 border-slate-100"
                    : "bg-white border-slate-200/80 hover:border-indigo-200"
                }`}
              >
                {/* Номер дня */}
                <span className="text-[10px] font-bold text-slate-500 leading-none">
                  {cell.dayNumber}
                </span>

                {/* Вміст дня: Мовні теги або Rest */}
                <div className="flex flex-col gap-0.5 my-auto">
                  {cell.isRestDay ? (
                    <span className="text-[9px] font-semibold text-slate-300 text-center uppercase tracking-tight">
                      Rest
                    </span>
                  ) : (
                    cell.languages.map((langId, lIdx) => {
                      const badge = LANGUAGE_BADGES[langId] || DEFAULT_BADGE;
                      return (
                        <div
                          key={`${cell.dayNumber}-${langId}-${lIdx}`}
                          className={`text-[9px] font-black py-0.5 rounded text-center leading-none ${badge.bgClass} ${badge.colorClass}`}
                        >
                          {badge.code}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Кнопки дій */}
      <div className="flex flex-col gap-2.5 w-full">
        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={onGoToDashboard}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold text-sm font-['Encode_Sans_Expanded',_sans-serif]"
        >
          Go to Dashboard
        </Button>

        {onAdjustParameters && (
          <button
            type="button"
            onClick={onAdjustParameters}
            className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-3 px-4 rounded-xl border border-slate-200 transition-all text-xs flex items-center justify-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Adjust Parameters</span>
          </button>
        )}
      </div>
    </div>
  );
}
