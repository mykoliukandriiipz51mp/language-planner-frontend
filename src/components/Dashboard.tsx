"use client";

import {
  Flame,
  Calendar as CalendarIcon,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Globe,
  Award,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Mic,
  Headphones,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard({ LANGUAGES }) {
  return (
    <>
      {/* 3. Привітальний баннер (Welcome Banner) */}
      <section className="p-6 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-white border border-indigo-100 rounded-3xl shadow-2xs">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 font-['Encode_Sans_Expanded',_sans-serif]">
          З поверненням, Олексію! 👋
        </h1>
        <p className="text-base md:text-sm text-slate-500 font-medium">
          Ваш щоденний поліглотний план підготовлено. На сьогодні заплановано 7
          навчальних завдань.
        </p>
      </section>

      {/* 4. Основна сітка панелі: Календар + Щоденні завдання */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ЛІВА КОЛОНКА: Календар розкладу (5 колонок) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
            {/* Заголовок календаря та навігація */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                Серпень 2026
              </h2>
              <div className="flex items-center gap-2">
                <Link
                  href="/edit-schedule"
                  className="px-3 py-1.5 text-base font-bold bg-indigo-50 text-[#5046E5] hover:bg-indigo-100 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати розклад</span>
                </Link>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Дні тижня */}
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
              <span>Нд</span>
              <span>Пн</span>
              <span>Вт</span>
              <span>Ср</span>
              <span>Чт</span>
              <span>Пт</span>
              <span>Сб</span>
            </div>

            {/* Сітка днів місяця */}
            <div className="grid grid-cols-7 gap-1.5 text-base font-bold">
              {/* 1 число */}
              <div className="h-12 border border-slate-100 rounded-xl p-1 flex flex-col items-center justify-between bg-slate-50/50">
                <span className="text-slate-400">1</span>
                <span className="text-[9px] px-1 bg-emerald-100 text-emerald-800 rounded font-black">
                  ES
                </span>
              </div>
              {/* Дні 2-22 */}
              {[
                { day: 2 },
                { day: 3, badge: "EN", bg: "bg-indigo-100 text-indigo-800" },
                { day: 4, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                { day: 5, badge: "EN", bg: "bg-indigo-100 text-indigo-800" },
                { day: 6, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                {
                  day: 7,
                  badge: "ES",
                  bg: "bg-emerald-100 text-emerald-800",
                },
                { day: 8 },
                { day: 9 },
                { day: 10, badge: "EN", bg: "bg-indigo-100 text-indigo-800" },
                { day: 11, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                { day: 12, badge: "EN", bg: "bg-indigo-100 text-indigo-800" },
                { day: 13, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                {
                  day: 14,
                  badge: "ES",
                  bg: "bg-emerald-100 text-emerald-800",
                },
                { day: 15 },
                { day: 16 },
                {
                  day: 17,
                  badge: "EN KO",
                  bg: "bg-indigo-600 text-white",
                  isToday: true,
                },
                { day: 18, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                { day: 19, badge: "EN", bg: "bg-indigo-100 text-indigo-800" },
                { day: 20, badge: "DE", bg: "bg-amber-100 text-amber-800" },
                {
                  day: 21,
                  badge: "ES",
                  bg: "bg-emerald-100 text-emerald-800",
                },
                { day: 22 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`h-12 border rounded-xl p-1 flex flex-col items-center justify-between transition-all ${
                    item.isToday
                      ? "border-[#5046E5] bg-indigo-50/40 ring-2 ring-indigo-100"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <span
                    className={
                      item.isToday
                        ? "text-[#5046E5] font-black"
                        : "text-slate-600"
                    }
                  >
                    {item.day}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 rounded font-black tracking-tighter ${item.bg}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Легенда мовних днів */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-500">
              {LANGUAGES.map((item) => {
                if (item.name !== "Панель") {
                  return (
                    <span key={item.id} className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full bg-[${item.color}]`}
                      />{" "}
                      {item.name}
                    </span>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА: Щоденні завдання (7 колонок) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
            {/* Заголовок та прогрес використання бюджету */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                СЬОГОДНІШНІ ЗАВДАННЯ
              </h2>
              <Link href="task-manager" className="text-base font-bold text-[#5046E5] hover:underline">
                Переглянути всі завдання
              </Link>
            </div>

            {/* Прогрес виконання завдань за день */}
            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl mb-5">
              <div className="flex items-center justify-between text-base font-bold text-slate-700 mb-1.5">
                <span>Прогрес денної цілі</span>
                <span>5 / 7 завдань виконано • 45 / 60 хв</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] w-[75%] transition-all duration-300" />
              </div>
            </div>

            {/* Список завдань з групуванням за статусами */}
            <div className="flex flex-col gap-4">
              {/* СЕКЦІЯ: ЗРОБИТИ (TO DO) */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  Зробити
                </span>
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500"
                      />
                      <span className="text-base">🇬🇧</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-md">
                        Граматика
                      </span>
                      <span className="text-base font-bold text-slate-800">
                        Практика минулого тривалого часу (Past Continuous)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <button className="p-1 hover:bg-slate-100 rounded-lg">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500"
                      />
                      <span className="text-base">🇩🇪</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-md">
                        Словник
                      </span>
                      <span className="text-base font-bold text-slate-800">
                        Вивчити 15 медичних термінів
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <button className="p-1 hover:bg-slate-100 rounded-lg">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* СЕКЦІЯ: НА ПОВТОРЕННЯ (TO REVIEW) */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  На повторення
                </span>
                <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500"
                    />
                    <span className="text-base">🇪🇸</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-md">
                      Говоріння
                    </span>
                    <span className="text-base font-bold text-slate-800">
                      Записати 2-хвилинне аудіо про свій день
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <button className="p-1 hover:bg-slate-100 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* СЕКЦІЯ: В ПРОЦЕСІ (IN PROGRESS) */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  В процесі
                </span>
                <div className="p-3 bg-amber-50/40 border border-amber-200/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-[#5046E5] focus:ring-indigo-500"
                    />
                    <span className="text-base">🇰🇷</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200/60 rounded-md">
                      Письмо
                    </span>
                    <span className="text-base font-bold text-slate-800">
                      Огляд суфіксів ввічливості (존댓말)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <button className="p-1 hover:bg-slate-100 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* СЕКЦІЯ: ЗАВЕРШЕНО (COMPLETED) */}
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block">
                  Завершено
                </span>
                <div className="flex flex-col gap-2 opacity-75">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 line-through text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-base">🇬🇧</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                        Аудіювання
                      </span>
                      <span className="text-base font-bold">
                        Прослухати 10-хвилинний репортаж BBC
                      </span>
                    </div>
                    <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 line-through text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-base">🇩🇪</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                        Граматика
                      </span>
                      <span className="text-base font-bold">
                        Повторити прийменники Akkusativ
                      </span>
                    </div>
                    <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Нижня сітка: Розподіл пріоритетів + Захист від когнітивної інтерференції */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Розподіл пріоритетів мов (5 колонок) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4 font-['Encode_Sans_Expanded',_sans-serif]">
            РОЗПОДІЛ ПРІОРИТЕТІВ МОВ
          </h3>

          <div className="flex flex-col gap-3.5 mb-4">
            <div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>
                  Англійська{" "}
                  <span className="text-slate-400 font-medium">
                    (Головний фокус)
                  </span>
                </span>
                <span className="text-indigo-600">35%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#5046E5] w-[35%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>
                  Німецька{" "}
                  <span className="text-slate-400 font-medium">
                    (Другий пріоритет)
                  </span>
                </span>
                <span className="text-amber-600">25%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#F59E0B] w-[25%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>
                  Іспанська{" "}
                  <span className="text-slate-400 font-medium">
                    (Підтримка)
                  </span>
                </span>
                <span className="text-emerald-600">20%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] w-[20%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>
                  Корейська{" "}
                  <span className="text-slate-400 font-medium">
                    (Підтримка)
                  </span>
                </span>
                <span className="text-purple-600">20%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#8B5CF6] w-[20%]" />
              </div>
            </div>
          </div>

          <button className="text-base font-bold text-[#5046E5] hover:underline text-left">
            Налаштувати вагові коефіцієнти стратегії ➔
          </button>
        </div>

        {/* Захист від когнітивної інтерференції (Cognitive Interference Guard) (7 колонок) */}
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

          <p className="text-base text-slate-600 font-medium leading-relaxed mb-4">
            Ваш розклад на сьогодні поєднує <strong>Англійську</strong> та{" "}
            <strong>Корейську</strong>. Завдяки високій структурно-типологічній
            відстані між цими мовами ризик міжмовної інтерференції мінімальний.
          </p>

          {/* Порада щодо скидання контексту (Smart Context Reset) */}
          <div className="p-3.5 bg-white border border-indigo-100 rounded-2xl flex items-start gap-3 shadow-xs">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-base">
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

      {/* 6. Останні досягнення (Latest Achievements) */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs mb-8">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4 font-['Encode_Sans_Expanded',_sans-serif]">
          ОСТАННІ ДОСЯГНЕННЯ
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            {
              title: "7 днів поспіль",
              icon: <Flame className="w-5 h-5 text-amber-500" />,
              bg: "bg-amber-50",
              unlocked: true,
            },
            {
              title: "Поліглот Дует",
              icon: <Globe className="w-5 h-5 text-indigo-500" />,
              bg: "bg-indigo-50",
              unlocked: true,
            },
            {
              title: "Майстер слів",
              icon: <Award className="w-5 h-5 text-emerald-500" />,
              bg: "bg-emerald-50",
              unlocked: true,
            },
            {
              title: "Щит від плутанини",
              icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
              bg: "bg-rose-50",
              unlocked: true,
            },
            {
              title: "Спринт 4-х мов",
              icon: <Zap className="w-5 h-5 text-slate-400" />,
              bg: "bg-slate-100",
              unlocked: false,
            },
            {
              title: "Граматичний ніндзя",
              icon: <BookOpen className="w-5 h-5 text-slate-400" />,
              bg: "bg-slate-100",
              unlocked: false,
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
              <span className="text-base font-bold text-slate-800 line-clamp-1">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
