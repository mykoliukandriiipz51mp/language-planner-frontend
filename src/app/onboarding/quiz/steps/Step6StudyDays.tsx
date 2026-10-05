"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

interface DayOption {
  id: DayOfWeek;
  label: string;
}

const DAYS_OF_WEEK: DayOption[] = [
  { id: "Mon", label: "Mon" },
  { id: "Tue", label: "Tue" },
  { id: "Wed", label: "Wed" },
  { id: "Thu", label: "Thu" },
  { id: "Fri", label: "Fri" },
  { id: "Sat", label: "Sat" },
  { id: "Sun", label: "Sun" },
];

export interface StudyDaysSelection {
  activeDays: DayOfWeek[];
  studyDaysCount: number;
  restDaysCount: number;
}

interface Step6StudyDaysProps {
  onComplete: (data: StudyDaysSelection) => void;
  onBack?: () => void;
  initialDays?: DayOfWeek[];
}

export default function Step6StudyDays({
  onComplete,
  onBack,
  data,
  initialDays = ["Mon", "Tue", "Wed", "Thu", "Fri"],
}: Step6StudyDaysProps) {
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(initialDays);

  // Перемикання окремого дня
  const toggleDay = (dayId: DayOfWeek) => {
    if (selectedDays.includes(dayId)) {
      // Забороняємо знімати всі дні (мінімум 1 день навчання)
      if (selectedDays.length === 1) return;
      setSelectedDays(selectedDays.filter((d) => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  // Пресети
  const handlePresetEveryday = () => {
    setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  };

  const handlePresetWeekdays = () => {
    setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  };

  const handlePresetRecommended = () => {
    // 5 оптимальних днів (наприклад, Пн, Вт, Чт, Пт, Сб)
    setSelectedDays(["Mon", "Tue", "Thu", "Fri", "Sat"]);
  };

  // Перевірка активності пресету "Weekdays Only"
  const isWeekdaysOnly =
    selectedDays.length === 5 &&
    ["Mon", "Tue", "Wed", "Thu", "Fri"].every((d) =>
      selectedDays.includes(d as DayOfWeek),
    );

  const isEveryday = selectedDays.length === 7;

  const studyDaysCount = selectedDays.length;
  const restDaysCount = 7 - studyDaysCount;

  const handleSubmit = () => {
    // onComplete({
    //   activeDays: selectedDays,
    //   studyDaysCount,
    //   restDaysCount,
    // });
    onComplete(data);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Which days do you plan to study?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Select your active days. Rest days freeze schedule generation to prevent
        burnout.
      </p>

      {/* Дні тижня (Картки вибору) */}
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
                  Rest
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Перемикачі пресетів (Quick Presets) */}
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
          Everyday
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
          Weekdays Only
        </button>

        <button
          type="button"
          onClick={handlePresetRecommended}
          className="py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-all"
        >
          5 Days (Recommended)
        </button>
      </div>

      {/* Інформаційний зелений банер підсумку */}
      <div className="p-3.5 bg-emerald-100/60 border border-emerald-200/80 rounded-2xl text-xs font-bold text-emerald-900 mb-8 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          Selected: {studyDaysCount} Study Days • {restDaysCount} Rest Days
        </span>
      </div>

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-transparent hover:bg-slate-100 text-slate-700 font-bold py-3.5 px-4 rounded-xl border border-slate-200 transition-all text-sm"
          >
            Back
          </button>
        )}
        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={handleSubmit}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold font-['Encode_Sans_Expanded',_sans-serif]"
        >
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
}
