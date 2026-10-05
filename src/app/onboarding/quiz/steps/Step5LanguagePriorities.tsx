"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";

// Варіанти пріоритетів та їхні вагові коефіцієнти для алгоритму
export type PriorityLevel = "high" | "medium" | "low";

interface PriorityOption {
  id: PriorityLevel;
  label: string;
  weight: number;
  colorClass: string;
  badgeBg: string;
}

const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    id: "high",
    label: "High Focus",
    weight: 3,
    colorClass: "bg-[#5046E5] text-white",
    badgeBg: "bg-[#5046E5]",
  },
  {
    id: "medium",
    label: "Medium Focus",
    weight: 2,
    colorClass: "bg-[#F59E0B] text-white",
    badgeBg: "bg-[#F59E0B]",
  },
  {
    id: "low",
    label: "Low Focus",
    weight: 1,
    colorClass: "bg-[#10B981] text-white",
    badgeBg: "bg-[#10B981]",
  },
];

// Мапа даних для відображення мов
const LANGUAGE_META: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  de: { name: "German", flag: "🇩🇪" },
  es: { name: "Spanish", flag: "🇪🇸" },
  fr: { name: "French", flag: "🇫🇷" },
  it: { name: "Italian", flag: "🇮🇹" },
  pt: { name: "Portuguese", flag: "🇵🇹" },
  pl: { name: "Polish", flag: "🇵🇱" },
  uk: { name: "Ukrainian", flag: "🇺🇦" },
  ja: { name: "Japanese", flag: "🇯🇵" },
  ko: { name: "Korean", flag: "🇰🇷" },
  zh: { name: "Chinese", flag: "🇨🇳" },
};

export interface LanguagePrioritySelection {
  languageId: string;
  priority: PriorityLevel;
  percentageShare: number;
}

interface Step5LanguagePrioritiesProps {
  selectedLanguageIds?: string[];
  onNext: (priorities: LanguagePrioritySelection[]) => void;
  onBack?: () => void;
  initialPriorities?: Record<string, PriorityLevel>;
}

export default function Step5LanguagePriorities({
  selectedLanguageIds = ["en", "de", "es"],
  onNext,
  onBack,
  initialPriorities = { en: "high", de: "medium", es: "low" },
  data,
}: Step5LanguagePrioritiesProps) {
  // Стан пріоритетів для кожної мови
  const [priorities, setPriorities] = useState<Record<string, PriorityLevel>>(
    () => {
      const initialState: Record<string, PriorityLevel> = {};
      selectedLanguageIds.forEach((id, idx) => {
        // Значення за замовчуванням, якщо не передано
        if (initialPriorities[id]) {
          initialState[id] = initialPriorities[id];
        } else {
          initialState[id] = idx === 0 ? "high" : idx === 1 ? "medium" : "low";
        }
      });
      return initialState;
    },
  );

  // Зміна пріоритету для вибраної мови
  const handlePriorityChange = (langId: string, level: PriorityLevel) => {
    setPriorities((prev) => ({
      ...prev,
      [langId]: level,
    }));
  };

  // Розрахунок нормованих відсоткових часток розкладу (Calculated Schedule Share)
  const calculatedShares = useMemo(() => {
    let totalWeight = 0;
    const weights: {
      langId: string;
      weight: number;
      priority: PriorityLevel;
    }[] = [];

    selectedLanguageIds.forEach((id) => {
      const priority = priorities[id] || "medium";
      const option = PRIORITY_OPTIONS.find((p) => p.id === priority);
      const weight = option ? option.weight : 2;
      totalWeight += weight;
      weights.push({ langId: id, weight, priority });
    });

    return weights.map((item) => {
      const percentage = Math.round((item.weight / totalWeight) * 100);
      return {
        languageId: item.langId,
        priority: item.priority,
        percentageShare: percentage,
      };
    });
  }, [selectedLanguageIds, priorities]);

  const handleSubmit = () => {
    // onNext(calculatedShares);
    onNext(data);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та опис */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Set priorities for your target languages
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        This determines how your total study time is divided across your
        schedule.
      </p>

      {/* Список мов з перемикачами пріоритетів */}
      <div className="flex flex-col gap-3 mb-6">
        {selectedLanguageIds.map((id) => {
          const meta = LANGUAGE_META[id] || {
            name: id.toUpperCase(),
            flag: "🌐",
          };
          const currentPriority = priorities[id] || "medium";

          return (
            <div
              key={id}
              className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:border-slate-300 transition-all"
            >
              {/* Мова та прапор */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{meta.flag}</span>
                <span className="text-sm font-bold text-slate-800">
                  {meta.name}
                </span>
              </div>

              {/* Сегментований перемикач (Segmented Control) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {PRIORITY_OPTIONS.map((option) => {
                  const isSelected = currentPriority === option.id;

                  // Індивідуальні назви кнопок залежно від обраного стану як у Figma
                  let displayLabel = option.label;
                  if (!isSelected) {
                    displayLabel =
                      option.id === "high"
                        ? "High"
                        : option.id === "medium"
                          ? "Medium"
                          : "Low";
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handlePriorityChange(id, option.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? `${option.colorClass} shadow-xs`
                          : "text-slate-500 hover:text-slate-700 bg-transparent"
                      }`}
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Блок з динамічним розподілом часу (Calculated Schedule Share) */}
      <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700">
            Calculated Schedule Share
          </span>
          <span className="text-[11px] font-semibold text-indigo-600">
            Dynamic distribution
          </span>
        </div>

        {/* Прогрес-бар з колірними сегментами */}
        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex mb-3">
          {calculatedShares.map((share) => {
            const option = PRIORITY_OPTIONS.find(
              (p) => p.id === share.priority,
            );
            return (
              <div
                key={share.languageId}
                style={{ width: `${share.percentageShare}%` }}
                className={`h-full ${option?.badgeBg || "bg-indigo-500"} transition-all duration-300`}
              />
            );
          })}
        </div>

        {/* Легенда розподілу */}
        <div className="flex flex-wrap items-center gap-4">
          {calculatedShares.map((share) => {
            const meta = LANGUAGE_META[share.languageId] || {
              name: share.languageId,
            };
            const option = PRIORITY_OPTIONS.find(
              (p) => p.id === share.priority,
            );

            return (
              <div key={share.languageId} className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${option?.badgeBg || "bg-indigo-500"}`}
                />
                <span className="text-xs font-medium text-slate-600">
                  {meta.name}{" "}
                  <span className="font-bold text-slate-800">
                    ({share.percentageShare}%)
                  </span>
                </span>
              </div>
            );
          })}
        </div>
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
          Continue
        </Button>
      </div>
    </div>
  );
}
