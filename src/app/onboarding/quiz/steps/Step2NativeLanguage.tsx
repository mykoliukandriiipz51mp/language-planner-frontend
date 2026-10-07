"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

// Інтерфейс для мови
interface LanguageOption {
  id: string;
  name: string;
  flag: string;
}

// Доступні мови
const LANGUAGES: LanguageOption[] = [
  { id: "en", name: "English", flag: "🇬🇧" },
  { id: "es", name: "Español", flag: "🇪🇸" },
  { id: "fr", name: "Français", flag: "🇫🇷" },
  { id: "de", name: "Deutsch", flag: "🇩🇪" },
  { id: "pl", name: "Polski", flag: "🇵🇱" },
  { id: "uk", name: "Українська", flag: "🇺🇦" },
];

// Рівні володіння мовою
const PROFICIENCY_LEVELS = [
  { value: "A1", label: "A1 — Початківець" },
  { value: "A2", label: "A2 — Елементарний" },
  { value: "B1", label: "B1 — Середній" },
  { value: "B2", label: "B2 — Вище середнього" },
  { value: "C1", label: "C1 — Просунутий" },
  { value: "C2", label: "C2 — Досконалий" },
  { value: "NATIVE", label: "Рідна (Native)" },
];

export default function OnboardingStep1Page({ onNext, data, onBack }) {
  const [searchQuery, setSearchQuery] = useState("");
  // Стан для збереження обраних мов та їх рівнів: { "en": "C1", "uk": "NATIVE" }
  const [selectedLanguages, setSelectedLanguages] = useState<
    Record<string, string>
  >({});

  // Підрахунок кількості обраних рідних мов
  const nativeCount = Object.values(selectedLanguages).filter(
    (level) => level === "NATIVE",
  ).length;

  // Фільтрація мов за пошуковим запитом
  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Перемикання вибору мови
  const handleToggleLanguage = (langId: string) => {
    setSelectedLanguages((prev) => {
      const next = { ...prev };
      if (next[langId]) {
        delete next[langId]; // Якщо мова вже обрана — знімаємо вибір
      } else {
        next[langId] = "B1"; // Дефолтний рівень при першому виборі
      }
      return next;
    });
  };

  // Зміна рівня володіння мовою
  const handleLevelChange = (langId: string, level: string) => {
    if (
      level === "NATIVE" &&
      nativeCount >= 3 &&
      selectedLanguages[langId] !== "NATIVE"
    ) {
      alert("Ви можете обрати максимум 3 рідні мови.");
      return;
    }
    setSelectedLanguages((prev) => ({
      ...prev,
      [langId]: level,
    }));
  };

  return (
    <>
      {/* Заголовок та Опис */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Якими мовами ви володієте?
      </h1>
      <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
        Оберіть мови та вкажіть ваш рівень володіння. Це допоможе адаптувати
        інструкції та точно розрахувати лексичну подібність.
      </p>

      {/* Поле пошуку */}
      <div className="relative mb-4">
        <svg
          className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Пошук мови..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
        />
      </div>

      {/* Список мов */}
      <div className="grid md:grid-cols-2 items-start gap-3 max-h-[320px] overflow-y-auto pr-1 mb-6">
        {filteredLanguages.map((lang) => {
          const isSelected = Boolean(selectedLanguages[lang.id]);
          const currentLevel = selectedLanguages[lang.id];

          return (
            <div
              key={lang.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/30 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleLanguage(lang.id)}
                  className="flex items-center gap-3 text-left flex-1"
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-bold text-slate-800">
                    {lang.name}
                  </span>
                </button>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleLanguage(lang.id)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              {/* Селектор рівня володіння (відображається лише якщо мова обрана) */}
              {isSelected && (
                <div className="mt-1 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Рівень володіння:
                  </span>
                  <select
                    value={currentLevel}
                    onChange={(e) => handleLevelChange(lang.id, e.target.value)}
                    className="max-w-[100px] bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    {PROFICIENCY_LEVELS.map((lvl) => (
                      <option
                        key={lvl.value}
                        value={lvl.value}
                        disabled={
                          lvl.value === "NATIVE" &&
                          nativeCount >= 3 &&
                          currentLevel !== "NATIVE"
                        }
                      >
                        {lvl.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-[30px]">
        <Button
          variant="primary"
          fullWidth
          onClick={onBack}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold disabled:bg-slate-200 disabled:text-slate-400"
        >
          Назад
        </Button>

        <Button
          variant="primary"
          fullWidth
          onClick={onNext}
          disabled={Object.keys(selectedLanguages).length === 0}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold disabled:bg-slate-200 disabled:text-slate-400"
        >
          Продовжити
        </Button>
      </div>
    </>
  );
}
