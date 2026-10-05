"use client";

import React, { useState, useMemo } from "react";
import { Check, Search, Sparkles, AlertCircle } from "lucide-react";

// Інтерфейс мови
export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  category: "Popular" | "European" | "Asian" | "Other";
}

// Список доступних мов (розширюваний)
const LANGUAGES_DATA: Language[] = [
  {
    id: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    category: "Popular",
  },
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    category: "Popular",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    category: "Popular",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    category: "European",
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    category: "European",
  },
  {
    id: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    category: "European",
  },
  {
    id: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    category: "European",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    category: "Asian",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    category: "Asian",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    category: "Asian",
  },
  {
    id: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇦🇪",
    category: "Other",
  },
  {
    id: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    category: "Other",
  },
  {
    id: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
    category: "European",
  },
  {
    id: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    category: "European",
  },
  {
    id: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    category: "European",
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
  data,
  initialSelected = ["en", "es", "de"],
}: Step1LanguagesProps) {
  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>(initialSelected);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "All" | "Popular" | "European" | "Asian"
  >("All");

  const MAX_LANGUAGES = 15;

  // Тогль вибору мови з валідацією максимуму (до 15)
  const toggleLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== id));
    } else {
      if (selectedLanguages.length >= MAX_LANGUAGES) return;
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  // Фільтрація за кастомним пошуком та категоріями
  const filteredLanguages = useMemo(() => {
    return LANGUAGES_DATA.filter((lang) => {
      const matchesSearch =
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeTab === "All" || lang.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeTab]);

  // Генерація підказки залежно від кількості обраних мов (Cognitive Feedback)
  const getCognitiveFeedback = () => {
    const count = selectedLanguages.length;
    if (count === 0) return null;
    if (count === 1) {
      return {
        bg: "bg-blue-50 border-blue-200 text-blue-800",
        icon: <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />,
        title: `Selected: 1 Language`,
        subtitle:
          "Single-language focus mode. Maximum efficiency for fast progress.",
      };
    }
    if (count <= 3) {
      return {
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />,
        title: `Selected: ${count} Languages`,
        subtitle:
          "Optimal polyglot load. The scheduler will interleave tasks to prevent mental fatigue.",
      };
    }
    return {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
      title: `Selected: ${count} Languages (High Load)`,
      subtitle:
        "High polyglot volume. System will help divide these into Core Target vs Maintenance modes.",
    };
  };

  const feedback = getCognitiveFeedback();

  const handleContinue = () => {
    // if (selectedLanguages.length > 0) {
    //   onNext(selectedLanguages);
    // }
    onNext(data);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та підзаголовок */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Which languages do you want to study?
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Select all languages you want to learn simultaneously (up to{" "}
        {MAX_LANGUAGES}). You can configure individual goals for each next.
      </p>

      {/* Пошуковий рядок */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search languages (e.g., Spanish, German)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Фільтри за регіонами / категоріями */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {(["All", "Popular", "European", "Asian"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Сітка картки вибору мов */}
      <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 mb-5 custom-scrollbar">
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLanguages.includes(lang.id);
          const isMaxReached =
            selectedLanguages.length >= MAX_LANGUAGES && !isSelected;

          return (
            <div
              key={lang.id}
              onClick={() => !isMaxReached && toggleLanguage(lang.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                isSelected
                  ? "bg-indigo-50/40 border-[#5046E5] shadow-xs"
                  : isMaxReached
                    ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {lang.name}
                  </span>
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

      {/* Блок з когнітивним зворотним зв'язком (Smart Cognitive Feedback) */}
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
        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedLanguages.length === 0}
          className="flex-1 bg-[#5046E5] hover:bg-[#4338CA] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 font-['Encode_Sans_Expanded',_sans-serif]"
        >
          <span>
            Continue to Language Goals ({selectedLanguages.length} Selected)
          </span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
}
