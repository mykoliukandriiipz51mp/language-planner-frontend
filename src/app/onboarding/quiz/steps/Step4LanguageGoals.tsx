"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Специфікація рівнів CEFR з оцінкою накопичувальних годин (FSI/CEFR Model)
const PROFICIENCY_LEVELS = [
  { id: "A1", label: "A1 Beginner", hours: 100 },
  { id: "A2", label: "A2 Elementary", hours: 200 },
  { id: "B1", label: "B1 Intermediate", hours: 400 },
  { id: "B2", label: "B2 Upper Int", hours: 700 },
  { id: "C1", label: "C1 Advanced", hours: 1000 },
  { id: "C2", label: "C2 Mastery", hours: 1400 },
];

const GOAL_OPTIONS = [
  { id: "career", label: "Кар'єра та робота", icon: "💼" },
  { id: "exam", label: "Підготовка до екзаменів", icon: "🎓" },
  { id: "travel", label: "Подорожі", icon: "✈️" },
  { id: "academic", label: "Академічні дослідження", icon: "📚" },
  { id: "casual", label: "Невимушена розмова", icon: "🗣️" },
];

const LANGUAGE_MAP: Record<string, { name: string; flag: string }> = {
  en: { name: "Англійська", flag: "🇬🇧" },
  es: { name: "Іспанська", flag: "🇪🇸" },
  de: { name: "Німецька", flag: "🇩🇪" },
  fr: { name: "Французька", flag: "🇫🇷" },
  it: { name: "Італійська", flag: "🇮🇹" },
  pt: { name: "Португальська", flag: "🇵🇹" },
  pl: { name: "Польська", flag: "🇵🇱" },
  uk: { name: "Українська", flag: "🇺🇦" },
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
  languageId?: string;
  onSave?: (data: LanguageGoalData) => void;
  onBack?: () => void;
  onNext?: (data: any) => void;
  data?: any;
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

  const [currentLevel, setCurrentLevel] = useState<string>(
    initialData?.currentLevel || "B1",
  );
  const [targetLevel, setTargetLevel] = useState<string>(
    initialData?.targetLevel || "C2",
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
    initialData?.targetDate || "2026-10-18",
  );

  // Коригування рівнів
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

  // Рекомендація за мети
  const getRecommendation = () => {
    switch (primaryGoal) {
      case "exam":
        return "З огляду на вашу мету (підготовка до іспиту), ми рекомендуємо досягти рівня B2/C1, щоб впевнено його скласти.";
      case "career":
        return "Для професійного середовища орієнтація на рівні B2/C1 гарантує вільне володіння мовою в ділових ситуаціях.";
      case "academic":
        return "Академічні дослідження зазвичай вимагають рівня C1/C2 для повного розуміння спеціалізованих матеріалів.";
      case "travel":
        return "Рівні A1/A2 чудово підходять для базового спілкування, тоді як рівень B1 дозволить вільно спілкуватися під час подорожей.";
      case "casual":
        return "Рівень B1/B2 рекомендований для ведення спонтанних і вільних повсякденних розмов.";
      default:
        return "Встановіть цільовий рівень відповідно до ваших особистих прагнень.";
    }
  };

  // Евристичний розрахунок фідбеку щодо дедлайну (Замокаплена бекенд-логіка)
  const deadlineFeedback = useMemo(() => {
    // Кейс 1: Без дедлайну
    if (deadlineType === "no_deadline") {
      return {
        type: "no_deadline",
        bg: "bg-blue-50/80 border-blue-200 text-blue-900",
        icon: <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
        text: "У нас є весь час світу для досягнення вашої мети! Навчайтеся у власному комфортному темпі без зайвого стресу.",
      };
    }

    if (!targetDate) return null;

    // Розрахунок різниці днів та необхідних годин
    const now = new Date();
    const selectedDate = new Date(targetDate);
    const diffTime = selectedDate.getTime() - now.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const currObj = PROFICIENCY_LEVELS.find((l) => l.id === currentLevel);
    const targetObj = PROFICIENCY_LEVELS.find((l) => l.id === targetLevel);

    const neededHours = Math.max(
      20,
      (targetObj?.hours || 400) - (currObj?.hours || 100),
    );

    // Необхідно хвилин на день
    const requiredDailyMinutes = Math.round((neededHours * 60) / diffDays);
    const requiredWeeklyMinutes = Math.round((neededHours * 60 * 7) / diffDays);
    const diffYears = +(diffDays / 365).toFixed(1);

    // Кейс 4: Нереалістичний дедлайн (> 3 годин / 180 хв на день)
    if (requiredDailyMinutes > 180) {
      const hoursPerDay = (requiredDailyMinutes / 60).toFixed(1);
      return {
        type: "unrealistic",
        bg: "bg-amber-50/90 border-amber-200/90 text-amber-900",
        icon: (
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        ),
        text: `Це надвиклик! Для досягнення рівня ${targetLevel} до обраної дати вам потрібно буде виділяти ~${hoursPerDay} год/день (${requiredDailyMinutes} хв/день). Ви впевнені, що бажаєте продовжити з обраними цілями?`,
      };
    }

    // Кейс 2: Довгий дедлайн (≥ 3 років або ≤ 15 хв/день)
    if (diffYears >= 3 || requiredDailyMinutes <= 15) {
      const yearsText = diffYears >= 1 ? `${diffYears} р.` : `${diffDays} днів`;
      return {
        type: "long",
        bg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
        icon: (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        ),
        text: `Чудовий запас часу! У нас є ${yearsText} для досягнення нового рівня. Навіть витрачаючи всього ~15 хв на день, ви гарантовано вкладетесь у запланований графік.`,
      };
    }

    // Кейс 3: Нормативний/реалістичний дедлайн
    return {
      type: "optimal",
      bg: "bg-[#F5F3FF] border-indigo-100 text-indigo-950",
      icon: <Clock className="w-4 h-4 text-[#5046E5] shrink-0 mt-0.5" />,
      text: `Для досягнення рівня ${targetLevel} вам знадобиться витрачати близько ${requiredWeeklyMinutes} хв на тиждень (~${requiredDailyMinutes} хв/день). Це чудовий виклик, який вам точно під силу!`,
    };
  }, [deadlineType, targetDate, currentLevel, targetLevel]);

  const isTargetValid =
    PROFICIENCY_LEVELS.findIndex((l) => l.id === targetLevel) >=
    PROFICIENCY_LEVELS.findIndex((l) => l.id === currentLevel);

  const handleSave = () => {
    if (onSave) {
      onSave({
        languageId,
        currentLevel,
        targetLevel,
        primaryGoal,
        customGoal: primaryGoal === "custom" ? customGoal : undefined,
        deadlineType,
        targetDate: deadlineType === "target_date" ? targetDate : undefined,
      });
    } else if (onNext) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 font-['Encode_Sans_Expanded',_sans-serif] flex items-center gap-2">
        Розкажіть про свої цілі щодо {langInfo.name} {langInfo.flag}
      </h1>

      {/* 1. Поточний рівень */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          Який ваш поточний рівень володіння?
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
          Яка ваша основна мета?
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

        <input
          type="text"
          placeholder="Або введіть власну ціль..."
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
          Який ваш цільовий рівень?
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

      {/* Блок із порадою */}
      <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-xs text-indigo-900 mb-6 flex items-start gap-2">
        <span className="text-sm">💡</span>
        <p className="leading-relaxed font-medium">{getRecommendation()}</p>
      </div>

      {/* 4. Термін виконання */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-800 mb-2.5">
          Бажаний термін виконання
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
            <span>Цільова дата</span>
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
            <span>Без кінцевої дати</span>
          </button>
        </div>

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

      {/* ДИНАМІЧНИЙ БЛОК ПІДКАЗКИ ДЕДЛАЙНУ (4 Кейси) */}
      {deadlineFeedback && (
        <div
          className={`p-3.5 rounded-2xl border text-xs mb-6 transition-all flex items-start gap-2.5 ${deadlineFeedback.bg}`}
        >
          {deadlineFeedback.icon}
          <p className="leading-relaxed font-medium">{deadlineFeedback.text}</p>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto">
        <Button variant="primary" type="button" fullWidth onClick={onBack}>
          Назад
        </Button>

        <Button
          variant="primary"
          type="button"
          fullWidth
          onClick={handleSave}
          disabled={!isTargetValid}
        >
          {isLastLanguage
            ? "Зберегти і продовжити"
            : "Зберегти і перейти до наступної мови"}
        </Button>
      </div>
    </div>
  );
}
