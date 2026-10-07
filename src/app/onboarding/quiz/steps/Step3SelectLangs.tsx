"use client";

import React, { useState, useMemo } from "react";
import { Check, Search, Sparkles, AlertCircle, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Рівні складності за шкалою FSI
export type DifficultyLevel = "easy" | "moderate" | "difficult" | "ultra";

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  category:
    | "Усі"
    | "Популярні"
    | "Європейські"
    | "Азійські"
    | "Американські"
    | "Інші"
    | "Африканські";
  difficulty: DifficultyLevel;
  hoursToFluency: number; // Оціночна кількість годин за FSI
}

// Легенда складності мов
const DIFFICULTY_LEGEND: Record<
  DifficultyLevel,
  {
    label: string;
    dotColor: string;
    cardBg: string;
    cardBorder: string;
    badgeBg: string;
    textColor: string;
  }
> = {
  easy: {
    label: "Легка",
    dotColor: "bg-emerald-500",
    cardBg: "bg-emerald-50/40 hover:bg-emerald-50/70",
    cardBorder: "border-emerald-200",
    badgeBg: "bg-emerald-100 text-emerald-800",
    textColor: "text-emerald-700",
  },
  moderate: {
    label: "Середня",
    dotColor: "bg-amber-400",
    cardBg: "bg-amber-50/40 hover:bg-amber-50/70",
    cardBorder: "border-amber-200",
    badgeBg: "bg-amber-100 text-amber-800",
    textColor: "text-amber-700",
  },
  difficult: {
    label: "Складна",
    dotColor: "bg-orange-500",
    cardBg: "bg-orange-50/40 hover:bg-orange-50/70",
    cardBorder: "border-orange-200",
    badgeBg: "bg-orange-100 text-orange-800",
    textColor: "text-orange-700",
  },
  ultra: {
    label: "Надскладна",
    dotColor: "bg-rose-500",
    cardBg: "bg-rose-50/40 hover:bg-rose-50/70",
    cardBorder: "border-rose-200",
    badgeBg: "bg-rose-100 text-rose-800",
    textColor: "text-rose-700",
  },
};

// База даних мов із закладеною складністю FSI
const LANGUAGES_DATA: Language[] = [
  {
    id: "en",
    name: "Англійська",
    nativeName: "English",
    flag: "🇬🇧",
    category: "Популярні",
    difficulty: "easy",
    hoursToFluency: 600,
  },
  {
    id: "es",
    name: "Іспанська",
    nativeName: "Español",
    flag: "🇪🇸",
    category: "Популярні",
    difficulty: "easy",
    hoursToFluency: 600,
  },
  {
    id: "de",
    name: "Німецька",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    category: "Популярні",
    difficulty: "moderate",
    hoursToFluency: 900,
  },
  {
    id: "fr",
    name: "Французька",
    nativeName: "Français",
    flag: "🇫🇷",
    category: "Європейські",
    difficulty: "easy",
    hoursToFluency: 750,
  },
  {
    id: "it",
    name: "Італійська",
    nativeName: "Italiano",
    flag: "🇮🇹",
    category: "Європейські",
    difficulty: "easy",
    hoursToFluency: 600,
  },
  {
    id: "pt",
    name: "Португальська",
    nativeName: "Português",
    flag: "🇵🇹",
    category: "Європейські",
    difficulty: "easy",
    hoursToFluency: 600,
  },
  {
    id: "pl",
    name: "Польська",
    nativeName: "Polski",
    flag: "🇵🇱",
    category: "Європейські",
    difficulty: "difficult",
    hoursToFluency: 1100,
  },
  {
    id: "ja",
    name: "Японська",
    nativeName: "日本語",
    flag: "🇯🇵",
    category: "Азійські",
    difficulty: "ultra",
    hoursToFluency: 2200,
  },
  {
    id: "ko",
    name: "Корейська",
    nativeName: "한국어",
    flag: "🇰🇷",
    category: "Азійські",
    difficulty: "ultra",
    hoursToFluency: 2200,
  },
  {
    id: "zh",
    name: "Китайська",
    nativeName: "中文",
    flag: "🇨🇳",
    category: "Азійські",
    difficulty: "ultra",
    hoursToFluency: 2200,
  },
  {
    id: "ar",
    name: "Арабська",
    nativeName: "العربية",
    flag: "🇦🇪",
    category: "Інші",
    difficulty: "ultra",
    hoursToFluency: 2200,
  },
  {
    id: "tr",
    name: "Турецька",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    category: "Інші",
    difficulty: "difficult",
    hoursToFluency: 1100,
  },
  {
    id: "uk",
    name: "Українська",
    nativeName: "Українська",
    flag: "🇺🇦",
    category: "Європейські",
    difficulty: "difficult",
    hoursToFluency: 1100,
  },
  {
    id: "nl",
    name: "Нідерландська",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    category: "Європейські",
    difficulty: "easy",
    hoursToFluency: 600,
  },
  {
    id: "sv",
    name: "Шведська",
    nativeName: "Svenska",
    flag: "🇸🇪",
    category: "Європейські",
    difficulty: "easy",
    hoursToFluency: 600,
  },
];

interface Step1LanguagesProps {
  onNext: (selectedIds: string[]) => void;
  onBack?: () => void;
  initialSelected?: string[];
}

export default function Step1Languages({
  onNext,
  onBack,
  initialSelected = ["en", "es", "de"],
}: Step1LanguagesProps) {
  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "Усі"
    | "Популярні"
    | "Європейські"
    | "Азійські"
    | "Американські"
    | "Африканські"
    | "Інші"
  >("Усі");

  const MAX_LANGUAGES = 15;

  // Перемикач вибору мови з обмеженням до 15
  const toggleLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== id));
    } else {
      if (selectedLanguages.length >= MAX_LANGUAGES) return;
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  // Фільтрація мов за пошуком та категорією
  const filteredLanguages = useMemo(() => {
    return LANGUAGES_DATA.filter((lang) => {
      const matchesSearch =
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeTab === "Усі" || lang.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  // Підрахунок загальної кількості годин для обраних мов
  const totalHoursData = useMemo(() => {
    const selectedObjs = LANGUAGES_DATA.filter((l) =>
      selectedLanguages.includes(l.id)
    );
    const sumHours = selectedObjs.reduce(
      (acc, curr) => acc + curr.hoursToFluency,
      0
    );
    return {
      totalHours: sumHours,
      languages: selectedObjs,
    };
  }, [selectedLanguages]);

  // Розрахунок когнітивного зворотного зв'язку
  const getCognitiveFeedback = () => {
    const count = selectedLanguages.length;
    if (count === 0) return null;
    if (count === 1) {
      return {
        bg: "bg-blue-50 border-blue-200 text-blue-800",
        icon: <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />,
        title: `Вибрано: 1 мова`,
        subtitle:
          "Фокусний режим однієї мови. Максимальна ефективність для швидкого досягнення результату.",
      };
    }
    if (count <= 3) {
      return {
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
        title: `Вибрано: ${count} мови`,
        subtitle:
          "Оптимальне поліглотне навантаження. Алгоритм чергуватиме сесії для запобігання ментальній втомі.",
      };
    }
    return {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
      title: `Вибрано: ${count} мов (Високе навантаження)`,
      subtitle:
        "Великий обсяг завдань. Система допоможе розділити мови на основні цілі та режим підтримки.",
    };
  };

  const feedback = getCognitiveFeedback();

  const handleContinue = () => {
    if (selectedLanguages.length > 0) {
      onNext(selectedLanguages);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Які мови ви вивчаєте / хочете вивчати?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-5 font-medium leading-relaxed">
        Виберіть усі мови, які ви плануєте вивчати одночасно (до {MAX_LANGUAGES}).
        Для кожної мови буде розраховано власну систему навантаження.
      </p>

      {/* Пошуковий рядок */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук мов (наприклад, Іспанська, Німецька)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Легенда складності мов */}
      <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl mb-4">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-700">
          <Info className="w-3.5 h-3.5 text-indigo-600" />
          <span>Складність засвоєння (шкала FSI):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(DIFFICULTY_LEGEND) as DifficultyLevel[]).map((level) => {
            const item = DIFFICULTY_LEGEND[level];
            return (
              <div key={level} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
                <span className="text-[11px] font-semibold text-slate-600">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Фільтри за категоріями */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {(
          [
            "Усі",
            "Популярні",
            "Європейські",
            "Азійські",
            "Американські",
            "Африканські",
            "Інші",
          ] as const
        ).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Сітка карток вибору мов */}
      <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1 mb-4 custom-scrollbar">
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLanguages.includes(lang.id);
          const isMaxReached =
            selectedLanguages.length >= MAX_LANGUAGES && !isSelected;
          const diffConfig = DIFFICULTY_LEGEND[lang.difficulty];

          return (
            <div
              key={lang.id}
              onClick={() => !isMaxReached && toggleLanguage(lang.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer select-none relative overflow-hidden ${
                isSelected
                  ? "bg-indigo-50/50 border-[#5046E5] shadow-xs ring-1 ring-indigo-200"
                  : isMaxReached
                  ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed"
                  : `${diffConfig.cardBg}${diffConfig.cardBorder}`
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {lang.name}
                    </span>
                    {/* Точка рівня складності */}
                    <span
                      className={`w-2 h-2 rounded-full ${diffConfig.dotColor}`}
                      title={`Складність: ${diffConfig.label}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    {lang.nativeName}
                  </span>
                </div>
              </div>

              {/* Індикатор стану (Checkbox) */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? "bg-[#5046E5] border-[#5046E5] text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Блок з когнітивним зворотним зв'язком */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl border text-xs mb-5 transition-all ${feedback.bg}`}
        >
          <div className="flex items-start gap-2.5">
            {feedback.icon}
            <div className="flex flex-col">
              <span className="font-bold leading-snug">{feedback.title}</span>
              <span className="text-[11px] opacity-90 mt-0.5 leading-relaxed font-medium">
                {feedback.subtitle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex gap-3 mt-auto">
        {onBack && (
          <Button variant="primary" onClick={onBack} fullWidth>
            Назад
          </Button>
        )}

        <Button
          variant="primary"
          onClick={handleContinue}
          fullWidth
          disabled={selectedLanguages.length === 0}
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5 font-bold font-['Encode_Sans_Expanded',_sans-serif]"
        >
          <span>Продовжити ({selectedLanguages.length} мов)</span>
          <span className="text-base ml-1">→</span>
        </Button>
      </div>
    </div>
  );
}