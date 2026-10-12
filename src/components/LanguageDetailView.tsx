"use client";

import React, { useState } from "react";
import {
  Smile,
  Zap,
  Battery,
  ChevronDown,
  ChevronUp,
  Plus,
  Eye,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Flame,
  BookOpen,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export interface CurriculumTask {
  id: string;
  title: string;
  category:
    | "Vocabulary"
    | "Listening"
    | "Grammar"
    | "Speaking"
    | "Writing"
    | "Reading";
  completed?: boolean;
}

export interface CurriculumModule {
  id: string;
  title: string;
  categories: (
    | "Vocabulary"
    | "Listening"
    | "Grammar"
    | "Speaking"
    | "Writing"
    | "Reading"
  )[];
  status: "In Progress" | "Completed" | "To Study";
  estimatedMinutes: number;
  tasks?: CurriculumTask[];
}

interface LanguageDetailViewProps {
  languageName?: string;
  languageFlag?: string;
  currentLevel?: string;
  targetLevel?: string;
  goalLabel?: string;
  userLevel?: number;
  progressPercentage?: number;
  onBackToDashboard?: () => void;
}

export default function LanguageDetailView({
  languageName = "Англійська",
  languageFlag = "🇬🇧",
  currentLevel = "B1",
  targetLevel = "C1",
  goalLabel = "Подорожі та Робота",
  userLevel = 28,
  progressPercentage = 60,
}: LanguageDetailViewProps) {
  // Стан вибору рівня енергії / самопочуття
  const [energyState, setEnergyState] = useState<"low" | "normal" | "high">(
    "normal",
  );

  // Стан розкриття списку завдань для першого модуля
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    "mod-1",
  );

  // Приклад даних навчальної програми (Curriculum)
  const curriculumModules: CurriculumModule[] = [
    {
      id: "mod-1",
      title: "Реєстрація в аеропорту та готелі",
      categories: ["Vocabulary", "Listening"],
      status: "In Progress",
      estimatedMinutes: 30,
      tasks: [
        {
          id: "t1",
          title: "Практика слів для реєстрації",
          category: "Vocabulary",
        },
        { id: "t2", title: "Тест на розуміння на слух", category: "Listening" },
        { id: "t3", title: "Діалог у готелі (Вправа)", category: "Vocabulary" },
      ],
    },
    {
      id: "mod-2",
      title: "Словник для подорожей",
      categories: ["Vocabulary"],
      status: "Completed",
      estimatedMinutes: 25,
    },
    {
      id: "mod-3",
      title: "Базова структура речення",
      categories: ["Grammar"],
      status: "Completed",
      estimatedMinutes: 35,
    },
    {
      id: "mod-4",
      title: "Контекстний словниковий запас",
      categories: ["Vocabulary", "Writing"],
      status: "In Progress",
      estimatedMinutes: 30,
    },
    {
      id: "mod-5",
      title: "Ввічливість та стиль спілкування",
      categories: ["Speaking", "Grammar"],
      status: "To Study",
      estimatedMinutes: 40,
    },
    {
      id: "mod-6",
      title: "Призначення зустрічі",
      categories: ["Speaking", "Listening"],
      status: "To Study",
      estimatedMinutes: 35,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 text-slate-800 font-sans p-4 md:p-6">
      {/* 1. Верхній шар: Назва мови, рівень, мета та прогрес */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{languageFlag}</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
                {languageName.toUpperCase()}
              </h1>
              <span className="text-xs px-2.5 py-0.5 bg-indigo-50 text-[#5046E5] font-extrabold rounded-full border border-indigo-200/60">
                {currentLevel} ➔ Ціль: {targetLevel}
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 font-extrabold rounded-full">
                Ціль: {goalLabel}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-0.5">
              Рівень {userLevel} • {progressPercentage}% до наступного рубежу
            </span>
          </div>
        </div>
      </div>

      {/* 2. Секція опитування самопочуття (How are you feeling today?) */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs">
        <h2 className="text-sm font-extrabold text-slate-900 mb-3 font-['Encode_Sans_Expanded',_sans-serif]">
          Як ви почуваєтеся сьогодні?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Варіант 1: Втомлений / Низький рівень енергії */}
          <button
            type="button"
            onClick={() => setEnergyState("low")}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
              energyState === "low"
                ? "border-[#5046E5] bg-indigo-50/30 ring-2 ring-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">😴</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">
                Втомлений / Низька енергія
              </span>
              <span className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                Легка 30-хвилинна сесія. Пасивне навчання, повторення карток,
                словник.
              </span>
            </div>
          </button>

          {/* Варіант 2: Нормальний / Звичайний темп */}
          <button
            type="button"
            onClick={() => setEnergyState("normal")}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
              energyState === "normal"
                ? "border-[#5046E5] bg-indigo-50/30 ring-2 ring-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">😇</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">
                Нормальний / Стійкий темп
              </span>
              <span className="text-[11px] text-indigo-600 font-semibold leading-normal mt-0.5">
                Стандартна 60-хв сесія. Збалансовано по всіх 6 навичках.
              </span>
            </div>
          </button>

          {/* Варіант 3: Проактивний / Висока енергія */}
          <button
            type="button"
            onClick={() => setEnergyState("high")}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
              energyState === "high"
                ? "border-[#5046E5] bg-indigo-50/30 ring-2 ring-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xl">⚡</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">
                Проактивний / Висока енергія
              </span>
              <span className="text-[11px] text-slate-400 font-medium leading-normal mt-0.5">
                Інтенсивна 75-хв сесія. Активне говоріння, написання есе,
                поглиблена граматика.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Основна сітка: Навчальна програма + Баланс навичок */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ЛІВА КОЛОНКА: Навчальна програма (STUDY CURRICULUM) (6 колонок) */}
        {/* 4. Секція сьогоднішніх мікро-завдань (TODAY'S MICRO-TASKS) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
              СЬОГОДНІШНІ МІКРО-ЗАВДАННЯ
            </h2>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
              <span>4 / 6 Завдань виконано (67%)</span>
              <span>45 / 60 хв використано</span>
            </div>
          </div>

          {/* Прогрес-бари мікро-завдань */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5046E5] w-[67%]" />
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5046E5] w-[75%]" />
            </div>
          </div>

          <Button
            variant="primary"
            className="bg-[#5046E5] hover:bg-[#4338CA] text-xs py-2 px-3.5 font-bold rounded-xl self-start flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Додати завдання</span>
          </Button>

          {/* Список завдань з групуванням */}
          <div className="flex flex-col gap-3 mt-2">
            {/* ЗРОБИТИ */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Зробити
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500"
                  />
                  <span className="text-xs">🇬🇧</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                    Граматика
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Практика минулого тривалого часу (Past Progressive)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* НА ПОВТОРЕННЯ */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">
                На повторення
              </span>
              <span className="text-xs text-slate-400 font-medium italic">
                Немає призначених завдань
              </span>
            </div>

            {/* В ПРОЦЕСІ */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">
                В процесі
              </span>
              <span className="text-xs text-slate-400 font-medium italic">
                Немає призначених завдань
              </span>
            </div>

            {/* ЗАВЕРШЕНО */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Завершено
              </span>
              <div className="flex flex-col gap-2 opacity-75">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3 line-through text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs">🇬🇧</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                      Аудіювання
                    </span>
                    <span className="text-xs font-bold">
                      Прослухати 10-хвилинний репортаж BBC
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3 line-through text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs">🇩🇪</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                      Граматика
                    </span>
                    <span className="text-xs font-bold">
                      Повторити прийменники Akkusativ
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА: Баланс навичок (SKILLS BALANCE RADAR) (6 колонок) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                БАЛАНС НАВИЧОК
              </h2>
              <span className="text-xs font-bold text-slate-400">
                Радарний вигляд
              </span>
            </div>

            {/* Векторний графік радара навичок (SVG Radar Representation) */}
            <div className="w-full flex items-center justify-center relative my-2">
              <svg viewBox="0 0 300 240" className="w-full h-full">
                {/* Павутина ліній радара */}
                <polygon
                  points="150,30 230,80 230,160 150,210 70,160 70,80"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <polygon
                  points="150,60 200,95 200,145 150,180 100,145 100,95"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />

                {/* Осі */}
                <line
                  x1="150"
                  y1="30"
                  x2="150"
                  y2="210"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <line
                  x1="70"
                  y1="80"
                  x2="230"
                  y2="160"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <line
                  x1="70"
                  y1="160"
                  x2="230"
                  y2="80"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />

                {/* Полігон заповнення навичок користувача */}
                <polygon
                  points="150,45 220,90 200,150 150,175 90,155 100,85"
                  fill="#5046E5"
                  fillOpacity="0.15"
                  stroke="#5046E5"
                  strokeWidth="2.5"
                />

                {/* Підписи навичок */}
                <text
                  x="150"
                  y="20"
                  textAnchor="middle"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Граматика
                </text>
                <text
                  x="240"
                  y="85"
                  textAnchor="start"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Аудіювання
                </text>
                <text
                  x="240"
                  y="165"
                  textAnchor="start"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Читання
                </text>
                <text
                  x="150"
                  y="225"
                  textAnchor="middle"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Говоріння
                </text>
                <text
                  x="60"
                  y="165"
                  textAnchor="end"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Письмо
                </text>
                <text
                  x="60"
                  y="85"
                  textAnchor="end"
                  className="text-[10px] font-extrabold fill-slate-600"
                >
                  Словник
                </text>
              </svg>
            </div>
          </div>

          {/* Синій інформаційний банер про корекцію розкладу */}
          <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-900">
            <Info className="w-4 h-4 text-[#5046E5] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              Навичка <strong>Говоріння</strong> перебуває на рівні 45% (нижче
              цільового значення). Планувальник автоматично додав 15 хвилин
              усної практики до сьогоднішнього списку завдань.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif] flex items-center">
              НАВЧАЛЬНА ПРОГРАМА &nbsp;
              <span className="text-xs font-extrabold text-[#5046E5]  ml-4">
                65% Завершено
              </span>
            </h2>{" "}
            <Link
              href="/curriculum-hub"
              className=" text-indigo-500 font-bold text-xs"
            >
              (Більше навчальних програм &rarr;)
            </Link>
          </div>

          {/* Прогрес-бар програми */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#5046E5] w-[65%]" />
          </div>

          {/* Список модулів */}
          <div className="overflow-y-auto flex flex-col gap-3 h-120">
            {curriculumModules.map((module) => {
              const isExpanded = expandedModuleId === module.id;
              return (
                <div
                  key={module.id}
                  className="p-3.5 border border-slate-200/80 rounded-2xl bg-white flex flex-col gap-2 transition-all hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      {module.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {module.status === "In Progress" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-[#5046E5] rounded-md">
                          В процесі
                        </span>
                      )}
                      {module.status === "Completed" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
                          Завершено
                        </span>
                      )}
                      {module.status === "To Study" && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                          До вивчення
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-400">
                        ~{module.estimatedMinutes} хв
                      </span>
                    </div>
                  </div>

                  {/* Категорії модуля */}
                  <div className="flex items-center gap-1.5">
                    {module.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
                      >
                        {cat === "Vocabulary"
                          ? "Словник"
                          : cat === "Listening"
                            ? "Аудіювання"
                            : cat === "Grammar"
                              ? "Граматика"
                              : cat === "Speaking"
                                ? "Говоріння"
                                : cat === "Writing"
                                  ? "Письмо"
                                  : "Читання"}
                      </span>
                    ))}
                  </div>

                  {/* Кнопка розгортання завдань */}
                  {module.tasks && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedModuleId(isExpanded ? null : module.id)
                      }
                      className="text-[11px] font-bold text-[#5046E5] hover:underline self-start mt-1"
                    >
                      {isExpanded ? "Сховати завдання" : "Переглянути завдання"}
                    </button>
                  )}

                  {/* Підзавдання розгорнутого модуля */}
                  {isExpanded && module.tasks && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                      {module.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-2 bg-slate-50 rounded-xl flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-slate-700">
                            {task.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-[#5046E5] rounded">
                              {task.category === "Vocabulary"
                                ? "Словник"
                                : "Аудіювання"}
                            </span>
                            <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button className="text-xs font-bold text-[#5046E5] hover:underline">
            [ Переглянути більше модулів ]
          </button>
          <Button
            variant="primary"
            className="bg-[#5046E5] hover:bg-[#4338CA] text-xs py-2 px-3.5 font-bold rounded-xl flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Додати власну тему</span>
          </Button>
        </div>
      </div>

      {/* 5. Нижні блоки: Статус ризику інтерференції + Досягнення мови */}

      {/* Досягнення конкретної мови (7 колонок) */}
      <div className=" bg-white border border-slate-200/80 rounded-3xl p-4 flex flex-col justify-between">
        <h3 className="text-xs font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
          ДОСЯГНЕННЯ МОВИ
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
            <Award className="w-4 h-4 text-[#5046E5] shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
              Майстер слів
            </span>
          </div>
          <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
              7 днів поспіль
            </span>
          </div>
          <div className="p-2 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 opacity-60">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
              Граматичний ніндзя
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
