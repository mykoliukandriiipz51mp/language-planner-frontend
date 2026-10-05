"use client";

import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showStepText?: boolean;
  showStepDots?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  showStepText = true,
  showStepDots = false,
}) => {
  // Розрахунок відсотка виконання
  const progressPercentage = Math.min(
    Math.max((currentStep / totalSteps) * 100, 0),
    100,
  );

  return (
    <div className="w-full flex flex-col gap-2 mb-6">
      {/* Верхній рядок з лічильником кроків */}
      {showStepText && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-400 font-medium">
            Прогрес налаштування
          </span>
          <span className="text-indigo-600 font-bold font-['Encode_Sans_Expanded',_sans-serif]">
            Крок {currentStep} of {totalSteps}
          </span>
        </div>
      )}

      {/* Контейнер смужки прогресу */}
      <div className="relative w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#5046E5] h-full rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Опціональні точкові індикатори (Dots) для кожного кроку */}
      {showStepDots && (
        <div className="flex justify-between items-center px-1 mt-1">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={stepNumber}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-[#5046E5] scale-125 ring-4 ring-indigo-100"
                    : isCompleted
                      ? "bg-[#5046E5]"
                      : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
