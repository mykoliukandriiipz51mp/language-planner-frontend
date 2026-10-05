"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BlueLoadingMascot from "@/assets/brand/blue-loading.png";

// Науково обґрунтовані фази обчислення розкладу
const LOADING_STAGES = [
  {
    title: "Structuring Cognitive Pathways...",
    subtitle:
      "Calculating cognitive interference factors and balancing active retrieval slots.",
  },
  {
    title: "Optimizing Time-Bucket Distribution...",
    subtitle:
      "Applying time budget quantization models based on your focus priorities.",
  },
  {
    title: "Preventing Cognitive Overload...",
    subtitle:
      "Aligning study days and rest periods to maximize memory consolidation.",
  },
  {
    title: "Finalizing Polyglot Schedule...",
    subtitle: "Generating your personalized adaptive learning matrix.",
  },
];

interface Step9LoadingScreenProps {
  onComplete?: () => void;
  /** Тривалість демонстрації завантаження в мілісекундах (за замовчуванням 4000мс) */
  duration?: number;
}

export default function Step9LoadingScreen({
  onComplete,
  onNext,
  data,
  duration = 4000,
}: Step9LoadingScreenProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const stageIntervalTime = duration / LOADING_STAGES.length;

    // Інтервал зміни текстових фаз
    const stageInterval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < LOADING_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stageIntervalTime);

    // Таймер завершення завантаження
    const completionTimer = setTimeout(() => {
      if (onComplete) {
        // onComplete();
        onNext(data);
      }
    }, duration);

    return () => {
      clearInterval(stageInterval);
      clearTimeout(completionTimer);
    };
  }, [duration, onComplete]);

  useEffect(() => {
    if (currentStageIndex === 3) {
      setTimeout(() => {
        onNext(data);
      }, 2000);
    }
  }, [currentStageIndex]);

  const currentStage = LOADING_STAGES[currentStageIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full py-6 text-center select-none">
      {/* Анімований блок із маскотом (папуга) та круговим лоадером */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        {/* Круговий спінер загрузки */}
        <div className="absolute inset-0 w-full h-full rounded-full border-4 border-indigo-100 border-t-[#5046E5] animate-spin" />

        {/* Контейнер зображення маскота (папуга Полі) */}

        <Image
          src={BlueLoadingMascot} // Шлях до вашого зображення папуги
          alt="Polyglot Parrot Mascot"
          width={72}
          height={72}
          className="rounded-full w-30 h-30"
          priority
        />

        {/* Маленький іконка-індикатор процесу */}
        <div className="absolute -bottom-1 -right-1 bg-[#5046E5] text-white p-2 rounded-full shadow-md">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      {/* Динамічний заголовок та опис фази */}
      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2 min-h-[32px] transition-all duration-300 font-['Encode_Sans_Expanded',_sans-serif]">
        {currentStage.title}
      </h2>
      <p className="text-xs md:text-sm text-slate-400 font-medium max-w-sm mx-auto mb-8 min-h-[40px] leading-relaxed transition-all duration-300">
        {currentStage.subtitle}
      </p>

      {/* Індикатори прогресу (3 крапки) */}
      <div className="flex items-center justify-center gap-2">
        {LOADING_STAGES.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStageIndex
                ? "w-6 bg-[#5046E5]"
                : "w-2 bg-indigo-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
