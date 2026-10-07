"use client";

import React, { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Пресети часу в хвилинах
const TIME_PRESETS = [
  { value: 15, label: "15 хв" },
  { value: 30, label: "30 хв" },
  { value: 45, label: "45 хв" },
  { value: 60, label: "60 хв" },
  { value: 90, label: "90 хв" },
];

export interface DailyTimeBudgetSelection {
  dailyMinutes: number;
  isCustom: boolean;
}

interface Step7DailyTimeBudgetProps {
  selectedLanguagesCount?: number;
  selectedLanguageNames?: string[];
  hasDeadlineLanguage?: boolean; // Чи є принаймні одна мова з конкретним дедлайном
  onNext: (data: DailyTimeBudgetSelection) => void;
  onBack?: () => void;
  initialMinutes?: number;
  data?: any;
}

export default function Step7DailyTimeBudget({
  selectedLanguagesCount = 3,
  selectedLanguageNames = ["Англійська", "Німецька", "Іспанська"],
  hasDeadlineLanguage = true,
  onNext,
  onBack,
  initialMinutes = 60,
  data,
}: Step7DailyTimeBudgetProps) {
  const [selectedMinutes, setSelectedMinutes] =
    useState<number>(initialMinutes);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(
    !TIME_PRESETS.some((p) => p.value === initialMinutes)
  );
  const [customValue, setCustomValue] = useState<string>(
    !TIME_PRESETS.some((p) => p.value === initialMinutes)
      ? String(initialMinutes)
      : ""
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

  // Розрахунок достатності часу (Евристична валідація розкладу)
  const validationStatus = useMemo(() => {
    const minMaintenancePerLang = 10; // Мін. 10 хв на мову для режимів підтримки
    const focusMinMinutes = hasDeadlineLanguage ? 40 : 20; // Мін. 40 хв на мову з дедлайном

    // Мін. необхідний час = (1 фокусна мова) + (решта мов * 10 хв)
    const minRequired =
      selectedLanguagesCount > 1
        ? focusMinMinutes + (selectedLanguagesCount - 1) * minMaintenancePerLang
        : focusMinMinutes;

    const isInsufficient = selectedMinutes < minRequired;

    return {
      isInsufficient,
      minRequired,
      maintenanceMins: minMaintenancePerLang,
      focusMins: focusMinMinutes,
      formattedLangList: selectedLanguageNames.join(", "),
    };
  }, [selectedMinutes, selectedLanguagesCount, selectedLanguageNames, hasDeadlineLanguage]);

  const handleSubmit = () => {
    if (onNext) {
      onNext(
        data || {
          dailyMinutes: selectedMinutes,
          isCustom: isCustomMode,
        }
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок українською */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Скільки часу ви можете приділяти у день навчання?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Вкажіть ваш загальний щоденний часовий бюджет для всіх обраних мов.
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

        {/* Кнопка / Поле "Інше" (Custom) */}
        <div className="relative">
          {isCustomMode ? (
            <input
              type="number"
              min="5"
              max="480"
              placeholder="хв"
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
              Своє значення
            </button>
          )}
        </div>
      </div>

      {/* Динамічні повідомлення валідації часу */}
      {!validationStatus.isInsufficient ? (
        /* Зелений банер успішної конфігурації */
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 mb-6 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            <span className="font-bold">Чудово!</span> {selectedMinutes} хв/день
            достатньо для збалансованого вивчення {selectedLanguagesCount} обраних
            мов ({validationStatus.formattedLangList}).
          </p>
        </div>
      ) : (
        /* Помаранчеве застереження про дефіцит часу */
        <div className="p-3.5 bg-amber-50/90 border border-amber-200/90 rounded-2xl text-xs text-amber-900 mb-6 flex items-start gap-2.5 transition-all">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            <span className="font-bold">⚠️ Увага щодо часового бюджету:</span>{" "}
            Обраного часу ({selectedMinutes} хв/день) недостатньо для якісного
            вивчення {selectedLanguagesCount} мов одночасно. Щоб підтримувати
            мовні навички, потрібно мінімум 10 хв на мову, а для мови з чітким
            дедлайном необхідно принаймні 40 хв. Для вашого поточного розкладу
            рекомендований мінімум —{" "}
            <strong>{validationStatus.minRequired} хвилин на добу</strong>.
          </div>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        {onBack && (
          <Button
            variant="primary"
            type="button"
            fullWidth
            onClick={onBack}
          >
            Назад
          </Button>
        )}

        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={handleSubmit}
        >
          Продовжити
        </Button>
      </div>
    </div>
  );
}