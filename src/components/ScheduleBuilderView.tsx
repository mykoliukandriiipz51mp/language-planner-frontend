"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  Calendar as CalendarIcon,
  Check,
  Plus,
  Trash2,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Lock,
} from "lucide-react";
import Header from "@/components/Header";
import { BackBtn } from "./ui/BackBtn";

export interface BackendLanguage {
  id: string;
  code: string;
  name: string;
  flag: string;
  color: string;
  targetMinutesPerWeek: number;
}

export interface ScheduledSession {
  instanceId: string;
  langId: string;
  durationMinutes: number;
}

const MOCK_BACKEND_LANGUAGES: BackendLanguage[] = [
  {
    id: "lang-en",
    code: "en",
    name: "Англійська",
    flag: "🇬🇧",
    color: "bg-indigo-600 text-white border-indigo-700",
    targetMinutesPerWeek: 180,
  },
  {
    id: "lang-de",
    code: "de",
    name: "Німецька",
    flag: "🇩🇪",
    color: "bg-amber-500 text-white border-amber-600",
    targetMinutesPerWeek: 120,
  },
  {
    id: "lang-es",
    code: "es",
    name: "Іспанська",
    flag: "🇪🇸",
    color: "bg-emerald-500 text-white border-emerald-600",
    targetMinutesPerWeek: 90,
  },
  {
    id: "lang-rest",
    code: "rest",
    name: "Відпочинок",
    flag: "☕",
    color: "bg-slate-600 text-white border-slate-700",
    targetMinutesPerWeek: 0,
  },
];

const DAYS_OF_WEEK = [
  { id: "mon", name: "Понеділок", short: "Пн" },
  { id: "tue", name: "Вівторок", short: "Вт" },
  { id: "wed", name: "Середа", short: "Ср" },
  { id: "thu", name: "Четвер", short: "Чт" },
  { id: "fri", name: "П'ятниця", short: "Пт" },
  { id: "sat", name: "Субота", short: "Сб" },
  { id: "sun", name: "Неділя", short: "Нд" },
];

const MONTH_NAMES_UA = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

interface ScheduleBuilderProps {
  onBack?: () => void;
  availableLanguages?: BackendLanguage[];
}

export default function ScheduleBuilderView({
  availableLanguages = MOCK_BACKEND_LANGUAGES,
}: ScheduleBuilderProps) {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [repeatWeekly, setRepeatWeekly] = useState(true);

  // --- СТАН ЧАСОВОЇ НАВІГАЦІЇ (Базова дата відліку) ---
  const [currentReferenceDate, setCurrentReferenceDate] = useState<Date>(
    new Date(),
  );

  // Стан перетягуваного об'єкта
  const [draggedLang, setDraggedLang] = useState<BackendLanguage | null>(null);

  // Стан розкладу
  const [schedule, setSchedule] = useState<Record<string, ScheduledSession[]>>({
    mon: [
      { instanceId: "s1", langId: "lang-en", durationMinutes: 30 },
      { instanceId: "s2", langId: "lang-de", durationMinutes: 20 },
    ],
    tue: [{ instanceId: "s3", langId: "lang-de", durationMinutes: 45 }],
    wed: [{ instanceId: "s4", langId: "lang-es", durationMinutes: 30 }],
    fri: [{ instanceId: "s5", langId: "lang-en", durationMinutes: 60 }],
  });

  // --- ЛОГІКА РОЗРАХУНКУ ДІАПАЗОНУ ДАТ ТА ПЕРЕВІРКИ МИНУЛОГО ПЕРІОДУ ---
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Границі поточного тижня (Пн - Нд)
  const weekRange = useMemo(() => {
    const d = new Date(currentReferenceDate);
    const day = d.getDay();
    const diffToMon = d.getDate() - day + (day === 0 ? -6 : 1);

    const startOfWeek = new Date(d.setDate(diffToMon));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  }, [currentReferenceDate]);

  // Границі поточного місяця
  const monthRange = useMemo(() => {
    const year = currentReferenceDate.getFullYear();
    const month = currentReferenceDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

    return { startOfMonth, endOfMonth, year, month };
  }, [currentReferenceDate]);

  // Чи є обраний період минулим (порівняно з поточною датою)
  const isPastPeriod = useMemo(() => {
    if (viewMode === "weekly") {
      return weekRange.endOfWeek < today;
    } else {
      return monthRange.endOfMonth < today;
    }
  }, [viewMode, weekRange, monthRange, today]);

  // Форматована назва діапазону для шапки
  const dateRangeLabel = useMemo(() => {
    if (viewMode === "weekly") {
      const formatDate = (date: Date) =>
        `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
      return `${formatDate(weekRange.startOfWeek)} – ${formatDate(weekRange.endOfWeek)}`;
    } else {
      return `${MONTH_NAMES_UA[monthRange.month]} ${monthRange.year}`;
    }
  }, [viewMode, weekRange, monthRange]);

  // --- ХЕНДЛЕРИ НАВІГАЦІЇ В ЧАСІ ---
  const handleNavigatePrevious = () => {
    setCurrentReferenceDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === "weekly") {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const handleNavigateNext = () => {
    setCurrentReferenceDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === "weekly") {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleNavigateToCurrent = () => {
    setCurrentReferenceDate(new Date());
  };

  // --- ХЕНДЛЕРИ DRAG & DROP ТА МОДИФІКАЦІЇ ---
  const handleDragStart = (lang: BackendLanguage) => {
    if (isPastPeriod) return; // Блокування перетягування у минулому
    setDraggedLang(lang);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isPastPeriod) return;
    e.preventDefault();
  };

  const handleDrop = (dayKey: string) => {
    if (isPastPeriod || !draggedLang) return;

    const newSession: ScheduledSession = {
      instanceId: `session-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      langId: draggedLang.id,
      durationMinutes: 30,
    };

    setSchedule((prev) => ({
      ...prev,
      [dayKey]: [...(prev[dayKey] || []), newSession],
    }));

    setDraggedLang(null);
  };

  const handleDurationChange = (
    dayKey: string,
    instanceId: string,
    newMinutes: number,
  ) => {
    if (isPastPeriod) return;
    const validMinutes = Math.max(5, Math.min(480, newMinutes || 0));
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: (prev[dayKey] || []).map((s) =>
        s.instanceId === instanceId
          ? { ...s, durationMinutes: validMinutes }
          : s,
      ),
    }));
  };

  const handleRemoveSession = (dayKey: string, instanceId: string) => {
    if (isPastPeriod) return;
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: (prev[dayKey] || []).filter((s) => s.instanceId !== instanceId),
    }));
  };

  // --- СТАТИСТИКА НАНАВАНТАЖЕННЯ ---
  const languageStats = useMemo(() => {
    const totals: Record<string, number> = {};

    Object.values(schedule).forEach((daySessions) => {
      daySessions.forEach((session) => {
        totals[session.langId] =
          (totals[session.langId] || 0) + session.durationMinutes;
      });
    });

    const isMonthly = viewMode === "monthly";
    const multiplier = isMonthly ? 4 : 1;

    return availableLanguages
      .filter((l) => l.code !== "rest")
      .map((lang) => {
        const plannedMinutes = totals[lang.id] || 0;
        const targetMinutes = lang.targetMinutesPerWeek * multiplier;
        const diff = plannedMinutes - targetMinutes;

        return {
          ...lang,
          plannedMinutes,
          targetMinutes,
          diff,
          isUnder: diff < 0,
          isOver: diff > 60,
        };
      });
  }, [schedule, availableLanguages, viewMode]);

  const hasInterferenceWarning = useMemo(() => {
    return Object.values(schedule).some((sessions) => {
      const activeLangs = sessions.filter((s) => s.langId !== "lang-rest");
      return activeLangs.length > 1;
    });
  }, [schedule]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-800">
      <Header />

      <main className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Верхній блок навігації та дій */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BackBtn link="/dashboard" text="Назад до панелі" />

          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
            РУЧНИЙ КОНСТРУКТОР РОЗКЛАДУ
          </h1>

          <button
            disabled={isPastPeriod}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline disabled:opacity-40 disabled:no-underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Скинути до авто-плану</span>
          </button>
        </div>

        {/* Панель керування переглядом та Часової Навігації */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          {/* Перемикач тиждень / місяць */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "weekly"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-500"
              }`}
            >
              Тижнева сітка
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "monthly"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-500"
              }`}
            >
              Огляд місяця
            </button>
          </div>

          {/* Стрілкова навігація та швидка кнопка "Поточний тиждень/місяць" */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleNavigatePrevious}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all"
              title="Попередній період"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl">
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              <span>{dateRangeLabel}</span>
            </div>
            <button
              onClick={handleNavigateNext}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all"
              title="Наступний період"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNavigateToCurrent}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-xl transition-all"
            >
              {viewMode === "weekly" ? "Поточний тиждень" : "Поточний місяць"}
            </button>
          </div>

          {/* Чекбокс повторення */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">
              {repeatWeekly
                ? "Повторювати щотижня"
                : "Тільки для цього періоду"}
            </span>
            <button
              disabled={isPastPeriod}
              onClick={() => setRepeatWeekly(!repeatWeekly)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${
                repeatWeekly
                  ? "bg-indigo-600 justify-end"
                  : "bg-slate-300 justify-start"
              } disabled:opacity-50`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Панель прогресу та цілей */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col gap-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-['Encode_Sans_Expanded',_sans-serif]">
            ПЛАНУВАННЯ ЧАСУ {viewMode === "weekly" ? "НА ТИЖДЕНЬ" : "НА МІСЯЦЬ"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {languageStats.map((stat) => (
              <div
                key={stat.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <span>{stat.flag}</span>
                    <span>{stat.name}</span>
                  </span>
                  <span className="text-xs font-black text-slate-700">
                    {stat.plannedMinutes} / {stat.targetMinutes} хв
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      stat.isUnder
                        ? "bg-amber-500"
                        : stat.isOver
                          ? "bg-rose-500"
                          : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (stat.plannedMinutes / (stat.targetMinutes || 1)) * 100,
                      )}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold">
                  {stat.isUnder && (
                    <span className="text-amber-600 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" /> Недостатньо (-
                      {Math.abs(stat.diff)} хв)
                    </span>
                  )}
                  {stat.isOver && (
                    <span className="text-rose-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Перевантаження (+
                      {stat.diff} хв)
                    </span>
                  )}
                  {!stat.isUnder && !stat.isOver && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ідеально за ціллю
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ОСНОВНА СІТКА КАЛЕНДАРЯ (З підтримкою Grayscale та Modal для минулого часу) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Доступні блоки для перетягування */}
          <div
            className={`lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col gap-3 transition-all ${
              isPastPeriod
                ? "grayscale opacity-50 pointer-events-none select-none"
                : ""
            }`}
          >
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
              ДОСТУПНІ НАВЧАЛЬНІ БЛОКИ
            </h3>
            <p className="text-[11px] text-slate-400 font-medium -mt-2 mb-1">
              Перетягніть блок у потрібний день розкладу
            </p>
            {availableLanguages.map((block) => (
              <div
                key={block.id}
                draggable={!isPastPeriod}
                onDragStart={() => handleDragStart(block)}
                className={`p-3.5 rounded-2xl ${block.color} font-bold text-xs flex items-center justify-between cursor-grab active:cursor-grabbing shadow-xs transition-transform hover:scale-[1.02] active:scale-95`}
              >
                <div className="flex items-center gap-2">
                  <span>{block.flag}</span>
                  <span>{block.name}</span>
                </div>
                <span className="text-[10px] opacity-75">:::</span>
              </div>
            ))}
          </div>

          {/* Інтерактивна сітка Календаря (Тиждень / Місяць) */}
          <div
            className={`lg:col-span-9 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs overflow-x-auto relative transition-all ${
              isPastPeriod
                ? "grayscale blur-[1px] select-none pointer-events-none"
                : ""
            }`}
          >
            {viewMode === "weekly" ? (
              /* ТИЖНЕВА СІТКА */
              <div className="grid grid-cols-7 gap-2 min-w-[650px]">
                {DAYS_OF_WEEK.map((day) => {
                  const daySessions = schedule[day.id] || [];
                  return (
                    <div
                      key={day.id}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(day.id)}
                      className="flex flex-col gap-2 min-h-[260px] bg-slate-50/60 border border-slate-200/60 rounded-2xl p-2 transition-colors hover:bg-indigo-50/20"
                    >
                      <span className="text-center text-xs font-extrabold text-slate-700 py-1 border-b border-slate-200">
                        {day.short}
                      </span>

                      <div className="flex flex-col gap-2 flex-1">
                        {daySessions.map((session) => {
                          const langObj = availableLanguages.find(
                            (l) => l.id === session.langId,
                          );
                          if (!langObj) return null;

                          return (
                            <div
                              key={session.instanceId}
                              className={`p-2 rounded-xl text-[11px] font-extrabold ${langObj.color} flex flex-col gap-1.5 shadow-xs group`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span>{langObj.flag}</span>
                                  <span>{langObj.code.toUpperCase()}</span>
                                </div>
                                {!isPastPeriod && (
                                  <button
                                    onClick={() =>
                                      handleRemoveSession(
                                        day.id,
                                        session.instanceId,
                                      )
                                    }
                                    className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
                                <Clock className="w-3 h-3 text-white/80 shrink-0" />
                                <input
                                  type="number"
                                  disabled={isPastPeriod}
                                  min="5"
                                  max="480"
                                  value={session.durationMinutes}
                                  onChange={(e) =>
                                    handleDurationChange(
                                      day.id,
                                      session.instanceId,
                                      parseInt(e.target.value, 10),
                                    )
                                  }
                                  className="w-full bg-transparent text-white text-[10px] font-bold text-center focus:outline-none disabled:opacity-80"
                                />
                                <span className="text-[9px] text-white/80 pr-1">
                                  хв
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {!isPastPeriod && (
                        <button
                          onClick={() => handleDrop(day.id)}
                          className="w-full py-1.5 border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Додати</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* СІТКА НА МІСЯЦЬ */
              <div className="flex flex-col gap-3 min-w-[700px]">
                <div className="grid grid-cols-7 text-center text-xs font-extrabold text-slate-400 border-b border-slate-100 pb-2">
                  <span>Пн</span>
                  <span>Вт</span>
                  <span>Ср</span>
                  <span>Чт</span>
                  <span>Пт</span>
                  <span>Сб</span>
                  <span>Нд</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(
                    (dateNum) => {
                      const dayKey = `2026-08-${String(dateNum).padStart(2, "0")}`;
                      const daySessions = schedule[dayKey] || [];

                      return (
                        <div
                          key={dateNum}
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(dayKey)}
                          className="min-h-[85px] bg-slate-50/60 border border-slate-200/60 rounded-xl p-1.5 flex flex-col justify-between hover:bg-indigo-50/20 transition-colors"
                        >
                          <span className="text-[10px] font-extrabold text-slate-500">
                            {dateNum}
                          </span>

                          <div className="flex flex-col gap-1 my-1">
                            {daySessions.map((session) => {
                              const langObj = availableLanguages.find(
                                (l) => l.id === session.langId,
                              );
                              if (!langObj) return null;

                              return (
                                <div
                                  key={session.instanceId}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${langObj.color} flex items-center justify-between truncate`}
                                >
                                  <span className="truncate">
                                    {langObj.flag} {session.durationMinutes}хв
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </div>

          {/* МОДАЛЬНЕ ПОВІДОМЛЕННЯ-ОБЕРЕЖНО НАКЛАДАЄТЬСЯ НА МИНУЛИЙ ПЕРІОД */}
          {isPastPeriod && (
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] rounded-3xl flex items-center justify-center p-6 z-30">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-md text-center flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-200">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                  Редагування минулого часу заборонено
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Цей період уже минув. Для збереження точності аналітики
                  навчання та історії прогресу редагування завершених тижнів та
                  місяців обмежено.
                </p>
                <button
                  onClick={handleNavigateToCurrent}
                  className="mt-2 bg-[#5046E5] hover:bg-[#4338CA] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Перейти до поточного періоду ➔
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Попередження та статуси */}
        {!isPastPeriod && (
          <div className="flex flex-col gap-3">
            {hasInterferenceWarning && (
              <div className="p-4 bg-amber-50 border border-amber-200/90 rounded-2xl text-xs text-amber-900 flex items-start gap-3 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed font-medium">
                  <span className="font-bold">
                    ⚠️ Застереження про когнітивну інтерференцію:
                  </span>{" "}
                  Ви запланували вивчення кількох мов в один день. Для
                  запобігання міжмовної інтерференції робіть перерву не менше
                  15–30 хвилин між сесіями.
                </div>
              </div>
            )}
          </div>
        )}
        {languageStats.some((s) => s.isUnder || s.isOver) && (
          <div className="p-4 bg-indigo-50 border border-indigo-200/90 rounded-2xl text-xs text-indigo-900 flex items-start gap-3 shadow-2xs">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">
              <span className="font-bold">
                💡 Валідація тижневого навантаження:
              </span>{" "}
              У вас є мови з невиконаною або перевищеною цільовою нормою часу.
              Відкоригуйте тривалість сесій в інпутах або перетягніть додаткові
              блоки.
            </div>
          </div>
        )}

        {/* Плаваюча панель збереження змін (ховається для минулого часу) */}
        {!isPastPeriod && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-6 z-50">
            <span className="text-xs font-bold text-slate-300">
              Статус:{" "}
              <span className="text-amber-400">Є незбережені зміни</span>
            </span>
            <div className="flex items-center gap-3">
              <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                Скасувати
              </button>
              <button className="bg-[#5046E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md">
                <Check className="w-4 h-4" />
                <span>Зберегти та застосувати розклад 🚀</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
