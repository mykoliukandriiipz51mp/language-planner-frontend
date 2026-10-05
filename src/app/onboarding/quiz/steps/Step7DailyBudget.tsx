"use client";

import React, { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Пресети часу в хвилинах
const TIME_PRESETS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
  { value: 90, label: "90 min" },
];

export interface DailyTimeBudgetSelection {
  dailyMinutes: number;
  isCustom: boolean;
}

interface Step7DailyTimeBudgetProps {
  selectedLanguagesCount?: number;
  selectedLanguageNames?: string[];
  onNext: (data: DailyTimeBudgetSelection) => void;
  onBack?: () => void;
  initialMinutes?: number;
}

export default function Step7DailyTimeBudget({
  selectedLanguagesCount = 3,
  selectedLanguageNames = ["English", "German", "Spanish"],
  onNext,
  onBack,
  initialMinutes = 60,
  data,
}: Step7DailyTimeBudgetProps) {
  const [selectedMinutes, setSelectedMinutes] =
    useState<number>(initialMinutes);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(
    !TIME_PRESETS.some((p) => p.value === initialMinutes),
  );
  const [customValue, setCustomValue] = useState<string>(
    !TIME_PRESETS.some((p) => p.value === initialMinutes)
      ? String(initialMinutes)
      : "",
  );

  // Обробка вибору пресету
  const handleSelectPreset = (minutes: number) => {
    setSelectedMinutes(minutes);
    setIsCustomMode(false);
    setCustomValue("");
  };

  // Обробка введення кастомного значення
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    setIsCustomMode(true);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedMinutes(parsed);
    }
  };

  // Аналіз достатності часу на основі кількості обраних мов
  const validationStatus = useMemo(() => {
    const minRecommendedPerLang = 15; // Мінімальний орієнтир 15 хв на мову
    const totalRecommended = selectedLanguagesCount * minRecommendedPerLang;

    const isInsufficient = selectedMinutes < totalRecommended;

    return {
      isInsufficient,
      recommendedMinutes: totalRecommended,
      formattedLangList: selectedLanguageNames.join(", "),
    };
  }, [selectedMinutes, selectedLanguagesCount, selectedLanguageNames]);

  const handleSubmit = () => {
    // onNext({
    //   dailyMinutes: selectedMinutes,
    //   isCustom: isCustomMode,
    // });
    onNext(data);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        How much time can you dedicate per study day?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Set your total combined daily time budget.
      </p>

      {/* Сітка варіантів вибору часу */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {TIME_PRESETS.map((preset) => {
          const isSelected = !isCustomMode && selectedMinutes === preset.value;
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => handleSelectPreset(preset.value)}
              className={`py-3.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {preset.label}
            </button>
          );
        })}

        {/* Кнопка / Поле Custom */}
        <div className="relative">
          {isCustomMode ? (
            <input
              type="number"
              min="5"
              max="480"
              placeholder="Mins"
              value={customValue}
              onChange={handleCustomChange}
              autoFocus
              className="w-full h-full py-3.5 px-3 rounded-xl text-xs font-bold text-center border border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50 focus:outline-none"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(true);
                if (!customValue) setCustomValue(String(selectedMinutes));
              }}
              className="w-full h-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            >
              Custom
            </button>
          )}
        </div>
      </div>

      {/* Зелений банер успішної конфігурації */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 mb-3 flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <span className="font-bold">Great!</span> {selectedMinutes} mins is
          sufficient to balance your {selectedLanguagesCount} selected languages
          effectively.
        </p>
      </div>

      {/* Помаранчеве застереження при критично малому часі */}
      {validationStatus.isInsufficient && (
        <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs text-amber-900 mb-6 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            <span className="font-bold">⚠️ Time Warning:</span>{" "}
            {selectedMinutes} minutes per day is tight for learning{" "}
            {selectedLanguagesCount} languages simultaneously (
            {validationStatus.formattedLangList}). We recommend at least{" "}
            {validationStatus.recommendedMinutes} minutes, or setting 2
            languages to Low Maintenance mode.
          </div>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto pt-4">
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
          Continue
        </Button>
      </div>
    </div>
  );
}
