"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Step2BirthYearProps {
  onNext: (data: {
    birthYear: number;
    calculatedAge: number;
    recommendedSessionMin: number;
  }) => void;
  onBack?: () => void;
  defaultYear?: number;
  data?: object;
}

export default function Step2BirthYear({
  onNext,
  onBack,
  defaultYear = 2002,
  data,
}: Step2BirthYearProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  // Розрахунок віку
  const calculatedAge = currentYear - selectedYear;

  //   // Визначення рекомендації щодо сесії за віковими категоріями з вашої дисертації
  //   const getAgeCategoryRecommendation = (age: number) => {
  //     if (age < 6) {
  //       return {
  //         valid: false,
  //         text: "Застосунок розрахований на користувачів від 6 років.",
  //         sessionMin: 0,
  //         badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
  //       };
  //     }
  //     if (age >= 6 && age <= 8) {
  //       return {
  //         valid: true,
  //         text: "Рекомендований сесійний блок: 15–20 хвилин (Дитячий фокус)",
  //         sessionMin: 20,
  //         badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  //       };
  //     }
  //     if (age >= 9 && age <= 12) {
  //       return {
  //         valid: true,
  //         text: "Рекомендований сесійний блок: 20–30 хвилин (Підлітковий фокус)",
  //         sessionMin: 30,
  //         badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  //       };
  //     }
  //     return {
  //       valid: true,
  //       text: "Рекомендований сесійний блок: 30–45 хвилин (Глибока концентрація)",
  //       sessionMin: 45,
  //       badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  //     };
  //   };

  //   const recommendation = getAgeCategoryRecommendation(calculatedAge);

  // Список років для вибору (від поточного року назад до 1940)
  const years = Array.from(
    { length: currentYear - 1940 + 1 },
    (_, i) => currentYear - i,
  );

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!recommendation.valid) return;

  //     onNext({
  //       birthYear: selectedYear,
  //       calculatedAge: calculatedAge,
  //       recommendedSessionMin: recommendation.sessionMin,
  //     });
  //   };

  return (
    <form
      onSubmit={() => {
        // handleSubmit
        onNext(data);
      }}
      className="flex flex-col w-full"
    >
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Вкажіть рік вашого народження
      </h1>
      <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">
        Це допоможе алгоритму персоналізувати тривалість навчальних блоків
        відповідно до фізіологічних норм уваги.
      </p>

      {/* Основний блок вибору року */}
      <div className="flex flex-col items-center justify-center my-4 p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <label
          htmlFor="birthYear"
          className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
        >
          Рік народження
        </label>

        <select
          id="birthYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-48 bg-white border-2 border-indigo-500 rounded-2xl px-4 py-3 text-2xl font-black text-slate-800 text-center focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer shadow-xs font-['Encode_Sans_Expanded',_sans-serif]"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Відображення розрахованого віку та динамічного фідбеку */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <span className="text-sm font-extrabold text-slate-800">
            Вам: <span className="text-indigo-600">{calculatedAge}</span>{" "}
            {getAgePlural(calculatedAge)}
          </span>

          {/* <div
            className={`mt-1 px-3 py-1.5 rounded-xl border text-xs font-semibold text-center transition-all ${recommendation.badgeBg}`}
          >
            {recommendation.text}
          </div> */}
        </div>
      </div>

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-transparent hover:bg-slate-100 text-slate-700 font-bold py-3.5 px-4 rounded-xl border border-slate-200 transition-all text-sm"
          >
            Назад
          </button>
        )}
        <Button
          variant="primary"
          type="submit"
          fullWidth
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold disabled:bg-slate-200 disabled:text-slate-400"
        >
          Продовжити
        </Button>
      </div>
    </form>
  );
}

// Допоміжна функція для відмінювання слова "рік/роки/років"
function getAgePlural(age: number): string {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "років";
  if (lastDigit === 1) return "рік";
  if (lastDigit >= 2 && lastDigit <= 4) return "роки";
  return "років";
}
