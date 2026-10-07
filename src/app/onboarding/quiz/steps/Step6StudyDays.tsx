"use client";

import React, { useState } from "react";
import { Check, Calendar, Repeat, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type ScheduleScheduleMode = "fixed_days" | "interval_cycle";

interface DayOption {
  id: DayOfWeek;
  label: string;
}

const DAYS_OF_WEEK: DayOption[] = [
  { id: "Mon", label: "Пн" },
  { id: "Tue", label: "Вт" },
  { id: "Wed", label: "Ср" },
  { id: "Thu", label: "Чт" },
  { id: "Fri", label: "Пт" },
  { id: "Sat", label: "Сб" },
  { id: "Sun", label: "Нд" },
];

export interface StudyDaysSelection {
  mode: ScheduleScheduleMode;
  // Для режиму fixed_days
  activeDays?: DayOfWeek[];
  // Для режиму interval_cycle
  studyDaysInterval?: number;
  restDaysInterval?: number;
  studyDaysCount: number;
  restDaysCount: number;
}

interface Step6StudyDaysProps {
  onComplete?: (data: StudyDaysSelection) => void;
  onBack?: () => void;
  onNext?: (data: any) => void;
  data?: any;
  initialDays?: DayOfWeek[];
}

export default function Step6StudyDays({
  onComplete,
  onBack,
  onNext,
  data,
  initialDays = ["Mon", "Tue", "Wed", "Thu", "Fri"],
}: Step6StudyDaysProps) {
  // Режим вибору: фіксовані дні або періодичність
  const [scheduleMode, setScheduleMode] =
    useState<ScheduleScheduleMode>("fixed_days");

  // Стан для режиму fixed_days
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(initialDays);

  // Стан для режиму interval_cycle (наприклад, 3 дні навчання / 2 дні відпочинку)
  const [studyInterval, setStudyInterval] = useState<number>(3);
  const [restInterval, setRestInterval] = useState<number>(2);

  // Перемикання дня тижня
  const toggleDay = (dayId: DayOfWeek) => {
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length === 1) return; // Мінімум 1 день
      setSelectedDays(selectedDays.filter((d) => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  // Пресети для фіксованих днів
  const handlePresetEveryday = () => {
    setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  };

  const handlePresetWeekdays = () => {
    setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  };

  const handlePresetRecommended = () => {
    setSelectedDays(["Mon", "Tue", "Thu", "Fri", "Sat"]);
  };

  // Перевірки активності пресетів
  const isWeekdaysOnly =
    selectedDays.length === 5 &&
    ["Mon", "Tue", "Wed", "Thu", "Fri"].every((d) =>
      selectedDays.includes(d as DayOfWeek),
    );

  const isEveryday = selectedDays.length === 7;

  // Підрахунок для статистики
  const studyDaysCount =
    scheduleMode === "fixed_days"
      ? selectedDays.length
      : Math.round((studyInterval / (studyInterval + restInterval)) * 7);

  const restDaysCount =
    scheduleMode === "fixed_days"
      ? 7 - selectedDays.length
      : Math.round((restInterval / (studyInterval + restInterval)) * 7);

  const handleSubmit = () => {
    const payload: StudyDaysSelection = {
      mode: scheduleMode,
      ...(scheduleMode === "fixed_days"
        ? { activeDays: selectedDays }
        : {
            studyDaysInterval: studyInterval,
            restDaysInterval: restInterval,
          }),
      studyDaysCount,
      restDaysCount,
    };

    if (onComplete) {
      onComplete(payload);
    } else if (onNext) {
      onNext(data || payload);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        У які дні ви плануєте навчатися?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-5 font-medium leading-relaxed">
        Оберіть зручний формат: конкретні дні тижня або скользячий цикл навчання
        та відпочинку.
      </p>

      {/* Перемикач режимів (Fixed Days vs Cyclic Interval) */}
      <div className="grid grid-cols-2 gap-2.5 mb-6 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
        <button
          type="button"
          onClick={() => setScheduleMode("fixed_days")}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            scheduleMode === "fixed_days"
              ? "bg-white text-[#5046E5] shadow-xs"
              : "text-slate-500 hover:text-slate-700 bg-transparent"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Дні тижня</span>
        </button>

        <button
          type="button"
          onClick={() => setScheduleMode("interval_cycle")}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            scheduleMode === "interval_cycle"
              ? "bg-white text-[#5046E5] shadow-xs"
              : "text-slate-500 hover:text-slate-700 bg-transparent"
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Циклічна періодичність</span>
        </button>
      </div>

      {/* ВАРІАНТ 1: Дні тижня */}
      {scheduleMode === "fixed_days" && (
        <>
          <div className="grid grid-cols-7 gap-2 mb-5">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDays.includes(day.id);

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={`flex flex-col items-center justify-center py-3.5 px-1 rounded-2xl border-2 transition-all select-none min-h-[76px] ${
                    isSelected
                      ? "bg-[#5046E5] border-[#5046E5] text-white shadow-xs"
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  }`}
                >
                  <span className="text-xs font-bold mb-1">{day.label}</span>
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-tighter">
                      Відпочинок
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <button
              type="button"
              onClick={handlePresetEveryday}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                isEveryday
                  ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              Щодня
            </button>

            <button
              type="button"
              onClick={handlePresetWeekdays}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                isWeekdaysOnly
                  ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              Тільки в будні
            </button>

            <button
              type="button"
              onClick={handlePresetRecommended}
              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-all"
            >
              5 днів (рекомендовано)
            </button>
          </div>
        </>
      )}

      {/* ВАРІАНТ 2: Циклічна періодичність (наприклад, 3 дні вчитись / 2 відпочивати) */}
      {scheduleMode === "interval_cycle" && (
        <div className="flex flex-col gap-4 mb-6">
          <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col gap-4">
            {/* Дні навчання */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">
                  Днів навчання поспіль:
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Тривалість активної фази
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={`study-${num}`}
                    type="button"
                    onClick={() => setStudyInterval(num)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      studyInterval === num
                        ? "bg-[#5046E5] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Дні відпочинку */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">
                  Днів відпочинку поспіль:
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Фаза відновлення та закріплення
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={`rest-${num}`}
                    type="button"
                    onClick={() => setRestInterval(num)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                      restInterval === num
                        ? "bg-[#5046E5] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Швидкі пресети періодичності */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { study: 3, rest: 1, label: "3 через 1" },
              { study: 3, rest: 2, label: "3 через 2" },
              { study: 2, rest: 1, label: "2 через 1" },
            ].map((preset) => (
              <button
                key={`${preset.study}-${preset.rest}`}
                type="button"
                onClick={() => {
                  setStudyInterval(preset.study);
                  setRestInterval(preset.rest);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  studyInterval === preset.study && restInterval === preset.rest
                    ? "border-[#5046E5] bg-white text-[#5046E5] ring-2 ring-indigo-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Інформаційний банер підсумку */}
      <div className="p-3.5 bg-emerald-100/60 border border-emerald-200/80 rounded-2xl text-xs font-bold text-emerald-900 mb-8 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {scheduleMode === "fixed_days"
            ? `Обрано: ${studyDaysCount} навчальних днів • ${restDaysCount} днів відпочинку на тиждень`
            : `Цикл: ${studyInterval} дн. навчання ➔ ${restInterval} дн. відпочинку (~${studyDaysCount} дн/тиж)`}
        </span>
      </div>

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto">
        {onBack && (
          <Button variant="primary" type="button" fullWidth onClick={onBack}>
            Назад
          </Button>
        )}

        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={handleSubmit}
        >
          Завершити опитування
        </Button>
      </div>
    </div>
  );
}
