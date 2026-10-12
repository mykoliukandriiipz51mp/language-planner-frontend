"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  X,
  Layers,
  Edit3,
} from "lucide-react";
import Header from "@/components/Header";

interface CurriculumPlan {
  id: string;
  title: string;
  language: string;
  flag: string;
  level: string;
  category: string;
  progress: number;
  isActive?: boolean;
  isCustom?: boolean;
}

const SAMPLE_PLANS: CurriculumPlan[] = [
  {
    id: "1",
    title: "Англійська для кар'єри та бізнесу",
    language: "Англійська",
    flag: "🇬🇧",
    level: "B2 ➔ C1",
    category: "Бізнес",
    progress: 62,
    isActive: true,
  },
  {
    id: "2",
    title: "Практична розмовна англійська",
    language: "Англійська",
    flag: "🇬🇧",
    level: "A2 ➔ B2",
    category: "Розмовна",
    progress: 40,
  },
  {
    id: "3",
    title: "Французьке академічне письмо",
    language: "Французька",
    flag: "🇫🇷",
    level: "B1 ➔ C1",
    category: "Академічна",
    progress: 0,
  },
  {
    id: "4",
    title: "Іспанський юридичний та діловий словник",
    language: "Іспанська",
    flag: "🇪🇸",
    level: "B2 ➔ C1",
    category: "Бізнес",
    progress: 15,
    isCustom: true,
  },
  {
    id: "5",
    title: "Підготовка до іспиту IELTS",
    language: "Англійська",
    flag: "🇬🇧",
    level: "B1 ➔ C1",
    category: "Іспити",
    progress: 28,
  },
];

export default function CurriculumHubView() {
  const [plans, setPlans] = useState<CurriculumPlan[]>(SAMPLE_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Стан форми створення нового кастомного плану
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("Іспанська");
  const [category, setCategory] = useState("Бізнес");
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([
    { id: "t1", name: "Тема 1: Юридична термінологія та ділові дієслова" },
  ]);
  const [newTopicInput, setNewTopicInput] = useState("");

  const handleAddTopic = () => {
    if (!newTopicInput.trim()) return;
    setTopics([...topics, { id: Date.now().toString(), name: newTopicInput }]);
    setNewTopicInput("");
  };

  const handleCreatePlan = () => {
    if (!title.trim()) return;
    const newPlan: CurriculumPlan = {
      id: Date.now().toString(),
      title,
      language,
      flag: language === "Іспанська" ? "🇪🇸" : "🇬🇧",
      level: "A1 ➔ B2",
      category,
      progress: 0,
      isCustom: true,
    };
    setPlans([newPlan, ...plans]);
    setIsModalOpen(false);
    setTitle("");
  };

  return (
    <>
      {/* Шапка секції */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
            НАВЧАЛЬНІ ПЛАНИ ТА ПРОГРАМИ
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Перемикайтеся між структурованими курсами або створюйте власні
            плани.
          </p>
        </div>

        {/* Створення власного курсу (не для mvp) */}
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5046E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Створити власний навчальний план</span>
        </button> */}
      </div>

      {/* Картка Активного Плану */}
      {plans.find((p) => p.isActive) && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/20 backdrop-blur-md rounded-full self-start">
              Поточний активний план
            </span>
            <div>
              <span className="text-sm">🇬🇧</span>
              <h2 className="text-xl font-extrabold mt-1">
                Англійська для кар'єри та бізнесу
              </h2>
              <p className="text-xs text-white/80 mt-1">
                Прогрес: 62% Завершено (18/29 тем)
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold text-slate-800">
                Зміст плану (Теми та Завдання)
              </span>
              <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Редагувати теми</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700">
                <span>1. Реєстрація в аеропорту та готелі</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  В процесі
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700">
                <span>2. Переговори та укладання угод</span>
                <span className="text-slate-400">До вивчення</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Фільтрація та Сітка Всіх Планів */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              "Всі плани",
              // "Мвої власні",
              "Рекомендовані",
              "Бізнес",
              "Подорожі",
            ].map((cat, i) => (
              <button
                key={i}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  i === 0
                    ? "bg-[#5046E5] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Пошук навчальних планів..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between gap-4 hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs">{plan.flag}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md uppercase">
                    {plan.category}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {plan.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-bold block mt-1">
                  Рівень: {plan.level}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">
                  Прогрес: {plan.progress}%
                </span>
                <button
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    plan.isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`}
                >
                  {plan.isActive ? "Активний" : "Обрати план"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* МОДАЛЬНЕ ВІКНО: Створення власного плану навчання */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                ✨ Створити власний навчальний план
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs font-bold">
              <div>
                <label className="text-slate-600 mb-1 block">Назва плану</label>
                <input
                  type="text"
                  placeholder="наприклад: Іспанська для медиків"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 mb-1 block">Мова</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option>Іспанська</option>
                    <option>Англійська</option>
                    <option>Німецька</option>
                    <option>Французька</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 mb-1 block">Категорія</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option>Бізнес</option>
                    <option>Розмовна</option>
                    <option>Академічна</option>
                    <option>Іспити</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-600 mb-1 block">
                  Теми та розділи плану
                </label>
                <div className="flex flex-col gap-2 mb-2">
                  {topics.map((t) => (
                    <div
                      key={t.id}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-700"
                    >
                      <span>{t.name}</span>
                      <button
                        onClick={() =>
                          setTopics(topics.filter((top) => top.id !== t.id))
                        }
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Додати нову тему..."
                    value={newTopicInput}
                    onChange={(e) => setNewTopicInput(e.target.value)}
                    className="flex-1 p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTopic}
                    className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-1/3 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs"
              >
                Скасувати
              </button>
              <button
                onClick={handleCreatePlan}
                className="w-2/3 py-3 bg-[#5046E5] hover:bg-[#4338CA] text-white rounded-xl font-bold text-xs shadow-md"
              >
                Зберегти та активувати 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
