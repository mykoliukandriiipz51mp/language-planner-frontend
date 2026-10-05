"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

// Специфікація рівнів CEFR
const PROFICIENCY_LEVELS = [
  { id: "A1", label: "A1 Beginner" },
  { id: "A2", label: "A2 Elementary" },
  { id: "B1", label: "B1 Intermediate" },
  { id: "B2", label: "B2 Upper Int" },
  { id: "C1", label: "C1 Advanced" },
  { id: "C2", label: "C2 Mastery" },
];

// Типові цілі
const GOAL_OPTIONS = [
  { id: "career", label: "Career & Work", icon: "💼" },
  { id: "exam", label: "Exam Prep (IELTS/DELE)", icon: "🎓" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "academic", label: "Academic Research", icon: "📚" },
  { id: "casual", label: "Casual Conversation", icon: "🗣️" },
];

// Мапа мов для відображення прапорів та назв
const LANGUAGE_MAP: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Spanish", flag: "🇪🇸" },
  de: { name: "German", flag: "🇩🇪" },
  fr: { name: "French", flag: "🇫🇷" },
  it: { name: "Italian", flag: "🇮🇹" },
  pt: { name: "Portuguese", flag: "🇵🇹" },
  pl: { name: "Polish", flag: "🇵🇱" },
  uk: { name: "Ukrainian", flag: "🇺🇦" },
};

export interface LanguageGoalData {
  languageId: string;
  currentLevel: string;
  targetLevel: string;
  primaryGoal: string;
  customGoal?: string;
  deadlineType: "target_date" | "no_deadline";
  targetDate?: string;
}

interface Step4LanguageGoalsProps {
  languageId: string; // Наприклад, 'en', 'es', 'de'
  onSave: (data: LanguageGoalData) => void;
  onBack?: () => void;
  isLastLanguage?: boolean;
  initialData?: Partial<LanguageGoalData>;
}

export default function Step4LanguageGoals({
  languageId = "en",
  onSave,
  onBack,
  onNext,
  data,
  isLastLanguage = false,
  initialData,
}: Step4LanguageGoalsProps) {
  const langInfo = LANGUAGE_MAP[languageId] || { name: "Language", flag: "🌐" };

  // Локальний стан полів форми
  const [currentLevel, setCurrentLevel] = useState<string>(
    initialData?.currentLevel || "B1",
  );
  const [targetLevel, setTargetLevel] = useState<string>(
    initialData?.targetLevel || "B1",
  );
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    initialData?.primaryGoal || "exam",
  );
  const [customGoal, setCustomGoal] = useState<string>(
    initialData?.customGoal || "",
  );
  const [deadlineType, setDeadlineType] = useState<
    "target_date" | "no_deadline"
  >(initialData?.deadlineType || "target_date");
  const [targetDate, setTargetDate] = useState<string>(
    initialData?.targetDate || "",
  );

  // Автоматичне коригування цільового рівня, якщо він виявиться нижчим за поточний
  useEffect(() => {
    const currentIndex = PROFICIENCY_LEVELS.findIndex(
      (l) => l.id === currentLevel,
    );
    const targetIndex = PROFICIENCY_LEVELS.findIndex(
      (l) => l.id === targetLevel,
    );

    if (targetIndex < currentIndex) {
      setTargetLevel(currentLevel);
    }
  }, [currentLevel, targetLevel]);

  // Розрахунок рекомендованого рівня залежно від обраної мети
  const getRecommendation = () => {
    switch (primaryGoal) {
      case "exam":
        return "Based on your goal (Exam Prep), we recommend reaching B2/C1 to confidently pass.";
      case "career":
        return "For professional environments, aiming for B2/C1 ensures fluency in business contexts.";
      case "academic":
        return "Academic research typically requires a C1/C2 mastery level for technical comprehension.";
      case "travel":
        return "A1/A2 is great for basic interactions, while B1 will unlock comfortable travel communication.";
      case "casual":
        return "B1/B2 is recommended to hold spontaneous and fluent everyday conversations.";
      default:
        return "Set your target level to align with your personal milestones.";
    }
  };

  // Перевірка придатності форми
  const isTargetValid =
    PROFICIENCY_LEVELS.findIndex((l) => l.id === targetLevel) >=
    PROFICIENCY_LEVELS.findIndex((l) => l.id === currentLevel);

  const handleSave = () => {
    // onSave({
    //   languageId,
    //   currentLevel,
    //   targetLevel,
    //   primaryGoal,
    //   customGoal: primaryGoal === "custom" ? customGoal : undefined,
    //   deadlineType,
    //   targetDate: deadlineType === "target_date" ? targetDate : undefined,
    // });
    onNext(data);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Динамічний заголовок з прапором та назвою мови */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 font-['Encode_Sans_Expanded',_sans-serif] flex items-center gap-2">
        Tell us about your {langInfo.flag} {langInfo.name} journey
      </h1>

      {/* 1. Поточний рівень володіння */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          What is your current proficiency level?
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {PROFICIENCY_LEVELS.map((level) => {
            const isSelected = currentLevel === level.id;
            return (
              <button
                key={`current-${level.id}`}
                type="button"
                onClick={() => setCurrentLevel(level.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Основна мета */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          What is your primary goal?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = primaryGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setPrimaryGoal(goal.id)}
                className={`py-2 px-3 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{goal.icon}</span>
                <span>{goal.label}</span>
              </button>
            );
          })}
        </div>

        {/* Поле для кастомної мети */}
        <input
          type="text"
          placeholder="Or type your custom goal..."
          value={customGoal}
          onChange={(e) => {
            setCustomGoal(e.target.value);
            setPrimaryGoal("custom");
          }}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
        />
      </div>

      {/* 3. Цільовий рівень */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          What is your target level?
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {PROFICIENCY_LEVELS.map((level, idx) => {
            const isSelected = targetLevel === level.id;
            const currentIndex = PROFICIENCY_LEVELS.findIndex(
              (l) => l.id === currentLevel,
            );
            const isDisabled = idx < currentIndex;

            return (
              <button
                key={`target-${level.id}`}
                type="button"
                disabled={isDisabled}
                onClick={() => setTargetLevel(level.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? "border-[#5046E5] bg-[#5046E5]/5 text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                    : isDisabled
                      ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Блок із порадою (Recommendation Banner) */}
      <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-xs text-indigo-900 mb-6 flex items-start gap-2">
        <span className="text-sm">💡</span>
        <p className="leading-relaxed font-medium">{getRecommendation()}</p>
      </div>

      {/* 4. Налаштування дедлайну */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          Deadline preference
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDeadlineType("target_date")}
            className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
              deadlineType === "target_date"
                ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span>📅</span>
            <span>Target Date</span>
          </button>

          <button
            type="button"
            onClick={() => setDeadlineType("no_deadline")}
            className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
              deadlineType === "no_deadline"
                ? "border-[#5046E5] bg-white text-[#5046E5] shadow-xs ring-2 ring-indigo-50"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span className="text-sm">∞</span>
            <span>No deadline</span>
          </button>
        </div>

        {/* Календарний вибір (з'являється при обраному Target Date) */}
        {deadlineType === "target_date" && (
          <div className="mt-3">
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        )}
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
          onClick={handleSave}
          disabled={!isTargetValid}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold disabled:bg-slate-200 disabled:text-slate-400 font-['Encode_Sans_Expanded',_sans-serif]"
        >
          {isLastLanguage ? "Save & Continue" : "Save & Next Language"}
        </Button>
      </div>
    </div>
  );
}
