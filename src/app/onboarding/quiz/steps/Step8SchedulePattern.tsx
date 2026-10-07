"use client";

import React, { useState } from "react";
import { Shuffle, Calendar, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type PatternType = "interleaved" | "alternating" | "sprints";
export type SprintPeriodType =
  | "1_week"
  | "2_weeks"
  | "3_weeks"
  | "1_month"
  | "custom";

export interface PatternConfig {
  pattern: PatternType;
  // Параметри для Interleaved
  maxLanguagesPerDay?: number;
  // Параметри для Focus Sprints
  sprintPeriod?: SprintPeriodType;
  customSprintDays?: number;
}

interface Step7SchedulePatternProps {
  dailyMinutes?: number;
  selectedLanguagesCount?: number;
  onComplete?: (config: PatternConfig) => void;
  onBack?: () => void;
  onNext?: (data: any) => void;
  data?: any;
  initialConfig?: Partial<PatternConfig>;
}

export default function Step7SchedulePattern({
  dailyMinutes = 30,
  selectedLanguagesCount = 3,
  onComplete,
  onBack,
  onNext,
  data,
  initialConfig,
}: Step7SchedulePatternProps) {
  const [pattern, setPattern] = useState<PatternType>(
    initialConfig?.pattern || "interleaved"
  );

  // Стан для Interleaved
  const [maxLangsPerDay, setMaxLangsPerDay] = useState<number>(
    initialConfig?.maxLanguagesPerDay || Math.min(2, selectedLanguagesCount)
  );

  // Стан для Focus Sprints
  const [sprintPeriod, setSprintPeriod] = useState<SprintPeriodType>(
    initialConfig?.sprintPeriod || "1_week"
  );
  const [customSprintDays, setCustomSprintDays] = useState<string>(
    initialConfig?.customSprintDays
      ? String(initialConfig.customSprintDays)
      : "10"
  );

  // Перевірка потенційного когнітивного конфлікту для Interleaved
  const isInterleavedConflict =
    pattern === "interleaved" && dailyMinutes / maxLangsPerDay < 15;

  const handleComplete = () => {
    const configPayload: PatternConfig = {
      pattern,
      ...(pattern === "interleaved" && { maxLanguagesPerDay: maxLangsPerDay }),
      ...(pattern === "sprints" && {
        sprintPeriod,
        customSprintDays:
          sprintPeriod === "custom"
            ? parseInt(customSprintDays, 10) || 7
            : undefined,
      }),
    };

    if (onComplete) {
      onComplete(configPayload);
    } else if (onNext) {
      onNext(data || configPayload);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Оберіть паттерн поліглотного розкладу
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Визначте, як саме завдання будуть структуровані у вашому навчальному
        календарі.
      </p>

      {/* Варіанти паттернів */}
      <div className="flex flex-col gap-3.5 mb-6">
        {/* 1. Interleaved / Змішана ротація */}
        <div
          onClick={() => setPattern("interleaved")}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
            pattern === "interleaved"
              ? "border-[#5046E5] bg-indigo-50/20 ring-2 ring-indigo-50"
              : "border-slate-200/80 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl ${
                pattern === "interleaved"
                  ? "bg-[#5046E5] text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-bold text-slate-800">
                Інтерлівінг / Змішана ротація
              </span>
              <span className="text-xs text-slate-400 font-medium leading-relaxed mt-0.5">
                Вивчення кількох мов впродовж одного дня з короткими перервами.
              </span>

              {/* Динамічні налаштування для Interleaved */}
              {pattern === "interleaved" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3.5 pt-3 border-t border-indigo-100 flex items-center justify-between"
                >
                  <label className="text-xs font-bold text-slate-700">
                    Макс. мов на день:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => {
                      if (num > selectedLanguagesCount) return null;
                      const isNumSelected = maxLangsPerDay === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setMaxLangsPerDay(num)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            isNumSelected
                              ? "bg-[#5046E5] text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Alternating Block Days */}
        <div
          onClick={() => setPattern("alternating")}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
            pattern === "alternating"
              ? "border-[#5046E5] bg-indigo-50/20 ring-2 ring-indigo-50"
              : "border-slate-200/80 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl ${
                pattern === "alternating"
                  ? "bg-[#5046E5] text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">
                Чергування за днями (Блочний режим)
              </span>
              <span className="text-xs text-slate-400 font-medium leading-relaxed mt-0.5">
                Пн/Ср — Мова A; Вт/Чт — Мова B (послідовна зміна днів).
              </span>
            </div>
          </div>
        </div>

        {/* 3. Immersive Focus Sprints */}
        <div
          onClick={() => setPattern("sprints")}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
            pattern === "sprints"
              ? "border-[#5046E5] bg-indigo-50/20 ring-2 ring-indigo-50"
              : "border-slate-200/80 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-xl ${
                pattern === "sprints"
                  ? "bg-[#5046E5] text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-bold text-slate-800">
                Імерсивні фокус-спринти
              </span>
              <span className="text-xs text-slate-400 font-medium leading-relaxed mt-0.5">
                Чергування головної мови (75% часу) + підтримка інших навичок.
              </span>

              {/* Динамічні налаштування періоду для Focus Sprints */}
              {pattern === "sprints" && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3.5 pt-3 border-t border-indigo-100 flex flex-col gap-2"
                >
                  <label className="text-xs font-bold text-slate-700">
                    Період спринту для основної мови:
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: "1_week", label: "1 тиждень" },
                      { id: "2_weeks", label: "2 тижні" },
                      { id: "3_weeks", label: "3 тижні" },
                      { id: "1_month", label: "1 місяць" },
                      { id: "custom", label: "Свій варіант" },
                    ].map((period) => {
                      const isPeriodSelected = sprintPeriod === period.id;
                      return (
                        <button
                          key={period.id}
                          type="button"
                          onClick={() =>
                            setSprintPeriod(period.id as SprintPeriodType)
                          }
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isPeriodSelected
                              ? "bg-[#5046E5] text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {period.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Поле введення при виборі Custom періоду */}
                  {sprintPeriod === "custom" && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        Тривалість:
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={customSprintDays}
                        onChange={(e) => setCustomSprintDays(e.target.value)}
                        className="w-20 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                      <span className="text-xs text-slate-500 font-medium">
                        днів
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Попередження про конфлікт розкладу (Schedule Conflict Warning) */}
      {isInterleavedConflict && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs text-amber-900 mb-6 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            <span className="font-bold">⚠️ Конфлікт у розкладі:</span> Стратегія
            інтерлівінгу з {maxLangsPerDay} мовами вимагає більше щоденного
            часу, щоб уникнути втрати концентрації при перемиканні. З вашим
            лімітом у {dailyMinutes} хв/день рекомендуємо обрати{" "}
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setPattern("alternating")}
            >
              Чергування за днями
            </span>.
          </div>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        {onBack && (
          <Button
            type="button"
            onClick={onBack}
          >
            Назад
          </Button>
        )}

        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={handleComplete}
        >
          Згенерувати розклад 🚀
        </Button>
      </div>
    </div>
  );
}