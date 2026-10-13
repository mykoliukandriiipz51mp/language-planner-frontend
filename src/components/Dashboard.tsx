"use client";

import {
  Flame,
  Calendar as CalendarIcon,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Zap,
  Globe,
  Award,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import Modal from "./ui/ModalWindow";
import { useState } from "react";
import Step5LanguagePriorities from "@/app/onboarding/quiz/steps/Step5LanguagePriorities";
import { DashboardTask, DAYS_OF_WEEK, MONTHS_OF_YEAR } from "@/mockups/labels"; // Додано MONTHS_OF_YEAR для перекладу місяців
import { LANG_COLOUR_CLASSES } from "@/mockups/dasboard";
import { LANGUAGES_MOCK } from "@/mockups/labels";
import { DASHBOARD_TASKS_MOCK } from "@/mockups/labels";
import { generateMonthSchedule } from "@/mockups/dasboard";

export default function Dashboard({ LANGUAGES = LANGUAGES_MOCK, lang = "ua" }) {
  const [isPrioritiesModalOpen, setIsPrioritiesModalOpen] = useState(false);
  const [tasks, setTasks] = useState<DashboardTask[]>(DASHBOARD_TASKS_MOCK);

  // Динамічний стан дати: беремо поточний місяць та рік за допомогою об'єкта Date
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth(); // 0-11

  // Функції перемикання місяців у календарній сітці
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, monthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, monthIndex + 1, 1));
  };

  // Знаходимо назву поточного місяця з наших локалізованих мокапів
  const currentMonthObj = MONTHS_OF_YEAR.find((m) => {
    const monthIds = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    return m.id === monthIds[monthIndex];
  });
  const monthTitle = currentMonthObj ? currentMonthObj.full[lang as "en" | "ua"] || currentMonthObj.full.ua : "";

  // Імітація мапінгу мовних бейджів до днів місяця (динамічно за числами)
  const backendScheduleMapping: Record<number, string[]> = {
    1: ["EN", "DE"],
    3: ["EN"],
    4: ["DE"],
    5: ["EN"],
    6: ["DE"],
    7: ["ES"],
    10: ["EN"],
    11: ["DE"],
    12: ["EN"],
    13: ["DE"],
    14: ["ES"],
    17: ["EN", "KO"],
    18: ["DE"],
    19: ["EN"],
    20: ["DE"],
    21: ["ES"],
  };

  // Генеруємо сітку днів місяця на основі реальної обраної дати
  const monthScheduleCells = generateMonthSchedule(
    year,
    monthIndex,
    backendScheduleMapping
  );

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "completed" ? "todo" : "completed",
              isCompleted: !t.isCompleted,
            }
          : t
      )
    );
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const reviewTasks = tasks.filter((t) => t.status === "review");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const completedCount = completedTasks.length;
  const totalCount = tasks.length;

  return (
    <>
      {/* 3. Привітальний баннер */}
      <section className="p-6 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 rounded-3xl shadow-2xs">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 font-['Encode_Sans_Expanded',_sans-serif]">
          З поверненням, Олексію! 👋
        </h1>
        <p className="text-base md:text-sm text-slate-500 font-medium">
          Ваш щоденний поліглотний план підготовлено. На сьогодні заплановано {totalCount}{" "}
          навчальних завдань.
        </p>
      </section>

      {/* 4. Основна сітка панелі: Календар + Щоденні завдання */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ЛІВА КОЛОНКА: Динамічний Календар реальних дат */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
            {/* Заголовок календаря та навігація */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                {monthTitle} {year}
              </h2>
              <div className="flex items-center gap-2">
                <Link
                  href="/edit-schedule"
                  className="px-3 py-1.5 text-xs font-bold bg-indigo-50 text-[#5046E5] hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати розклад</span>
                </Link>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Дні тижня */}
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
              {DAYS_OF_WEEK.map((day) => (
                <span key={day.id}>{day.short[lang as "en" | "ua"] || day.short.ua}</span>
              ))}
            </div>

            {/* Динамічна сітка днів місяця */}
            <div className="grid grid-cols-7 gap-1.5 text-base font-bold">
              {monthScheduleCells.map((cell, idx) => {
                if (cell.dayNumber === null) {
                  return <div key={`empty-${idx}`} className="min-h-12 border border-transparent" />;
                }

                return (
                  <div
                    key={cell.dateString || idx}
                    className={`min-h-12 border rounded-xl p-1 flex flex-col items-center justify-between transition-all ${
                      cell.isToday
                        ? "border-[#5046E5] bg-indigo-50/40 ring-2 ring-indigo-100"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    <span
                      className={
                        cell.isToday
                          ? "text-[#5046E5] font-black"
                          : "text-slate-600"
                      }
                    >
                      {cell.dayNumber}
                    </span>
                    <div className="flex flex-wrap gap-1 items-center justify-center">
                      {cell.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className={`text-[9px] px-1 rounded font-black tracking-tighter ${
                            LANG_COLOUR_CLASSES[badge as keyof typeof LANG_COLOUR_CLASSES] || ""
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Легенда мовних днів */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
              {LANGUAGES.map((item: any) => {
                if (item.name !== "Панель") {
                  return (
                    <span key={item.id} className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />{" "}
                      {item.name}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА: Щоденні завдання */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between overflow-y-auto h-[440px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                Завдання на сьогодні
              </h2>
              <Link
                href="task-manager"
                className="text-xs font-bold text-[#5046E5] hover:underline"
              >
                Переглянути всі завдання
              </Link>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Прогрес денної цілі</span>
                <span>
                  {completedCount} / {totalCount} завдань виконано
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {todoTasks.length > 0 && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                    Зробити
                  </span>
                  <div className="flex flex-col gap-2">
                    {todoTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-base">{task.flag}</span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-md ${task.categoryBadgeClass}`}
                          >
                            {task.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">~{task.durationMinutes}хв</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reviewTasks.length > 0 && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                    На повторення
                  </span>
                  <div className="flex flex-col gap-2">
                    {reviewTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-base">{task.flag}</span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-md ${task.categoryBadgeClass}`}
                          >
                            {task.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">~{task.durationMinutes}хв</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inProgressTasks.length > 0 && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                    В процесі
                  </span>
                  <div className="flex flex-col gap-2">
                    {inProgressTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-amber-50/40 border border-amber-200/80 rounded-2xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-base">{task.flag}</span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-md ${task.categoryBadgeClass}`}
                          >
                            {task.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">~{task.durationMinutes}хв</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {completedTasks.length > 0 && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                    Завершено
                  </span>
                  <div className="flex flex-col gap-2 opacity-75">
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 line-through text-slate-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-base">{task.flag}</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                            {task.category}
                          </span>
                          <span className="text-xs font-bold">{task.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">~{task.durationMinutes}хв</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Нижня сітка: Пріоритети + Інтерференція */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 font-['Encode_Sans_Expanded',_sans-serif]">
            РОЗПОДІЛ ПРІОРИТЕТІВ МОВ
          </h3>

          <div className="flex flex-col gap-3.5 mb-4">
            {LANGUAGES_MOCK.map((langItem) => (
              <div key={langItem.id}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>
                    {langItem.name}{" "}
                    <span className="text-slate-400 font-medium">
                      ({langItem.focusType})
                    </span>
                  </span>
                  <span style={{ color: langItem.color }}>
                    {langItem.weightPercentage}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${langItem.weightPercentage}%`,
                      backgroundColor: langItem.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsPrioritiesModalOpen(true)}
            className="text-xs font-bold text-[#5046E5] hover:underline text-left cursor-pointer"
          >
            Налаштувати вагові коефіцієнти стратегії ➔
          </button>
        </div>

        <div className="lg:col-span-7 bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-white border border-indigo-100 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                ЗАХИСТ ВІД КОГНІТИВНОЇ ІНТЕРФЕРЕНЦІЇ
              </h3>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              Низький ризик інтерференції
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
            Ваш розклад на сьогодні поєднує <strong>Англійську</strong> та{" "}
            <strong>Корейську</strong>. Завдяки високій структурно-типологічній
            відстані між цими мовами ризик міжмовної інтерференції мінімальний.
          </p>

          <div className="p-3.5 bg-white border border-indigo-100 rounded-2xl flex items-start gap-3 shadow-xs">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-slate-800">
                Порада щодо зміни контексту (Context Reset):
              </span>
              <span className="text-slate-500 font-medium leading-relaxed mt-0.5">
                Зробіть 15-хвилинну повну перерву від екрану між сесією
                говоріння англійською та вивченням корейської граматики для
                консолідації нейронних зв'язків.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Досягнення */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs my-6">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4 font-['Encode_Sans_Expanded',_sans-serif]">
          ОСТАННІ ДОСЯГНЕННЯ
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            {
              title: "7 днів поспіль",
              icon: <Flame className="w-5 h-5 text-amber-500" />,
              bg: "bg-amber-50",
            },
            {
              title: "Поліглот Дует",
              icon: <Globe className="w-5 h-5 text-indigo-500" />,
              bg: "bg-indigo-50",
            },
            {
              title: "Майстер слів",
              icon: <Award className="w-5 h-5 text-emerald-500" />,
              bg: "bg-emerald-50",
            },
            {
              title: "Щит від плутанини",
              icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
              bg: "bg-rose-50",
            },
            {
              title: "Спринт 4-х мов",
              icon: <Zap className="w-5 h-5 text-slate-400" />,
              bg: "bg-slate-100",
            },
            {
              title: "Граматичний ніндзя",
              icon: <BookOpen className="w-5 h-5 text-slate-400" />,
              bg: "bg-slate-100",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl text-center hover:border-slate-200 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-2`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-800 line-clamp-1">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Modal
        isOpen={isPrioritiesModalOpen}
        onClose={() => setIsPrioritiesModalOpen(false)}
      >
        <Step5LanguagePriorities onNext={() => setIsPrioritiesModalOpen(false)} />
      </Modal>
    </>
  );
}