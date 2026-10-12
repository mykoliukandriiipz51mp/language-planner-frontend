import React from "react";
import {
  Flame,
  Clock,
  Globe,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Settings,
  Trophy,
  BookOpen,
  Award,
} from "lucide-react";
import Header from "./Header";

export default function UserProfile() {
  // Дані активних мов користувача, що зв'язані з нашим алгоритмом розрахунку часу
  const activeLanguages = [
    {
      id: 1,
      name: "Англійська",
      code: "en",
      currentLevel: "B2",
      targetLevel: "C1",
      progressPercent: 68,
      completedHours: 340,
      totalEstimatedHours: 500,
      strategy: "Паралельна стратегія",
      interferenceStatus: "safe", // 'safe' або 'warning'
      shieldMessage: "Активний оптимальний інтервал повторення",
    },
    {
      id: 2,
      name: "Іспанська",
      code: "es",
      currentLevel: "A2",
      targetLevel: "B1",
      progressPercent: 45,
      completedHours: 110,
      totalEstimatedHours: 250,
      strategy: "Паралельна стратегія",
      interferenceStatus: "warning",
      shieldMessage:
        "Високий ризик інтерференції з португальською (рекомендовано буфер відпочинку)",
    },
    {
      id: 3,
      name: "Німецька",
      code: "de",
      currentLevel: "A1",
      targetLevel: "B2",
      progressPercent: 20,
      completedHours: 90,
      totalEstimatedHours: 600,
      strategy: "Фокус-спринт",
      interferenceStatus: "safe",
      shieldMessage: "Ізольована синтаксична структура",
    },
    {
      id: 4,
      name: "Корейська",
      code: "ko",
      currentLevel: "Початківець",
      targetLevel: "A2",
      progressPercent: 10,
      completedHours: 45,
      totalEstimatedHours: 450,
      strategy: "Режим підтримки",
      interferenceStatus: "safe",
      shieldMessage: "Питеньовий бар'єр (Хангиль) пройдено",
    },
  ];

  return (
    <>
      {/* Верхня картка інформації про користувача */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-indigo-600 text-white text-2xl font-bold rounded-2xl flex items-center justify-center shadow-md">
              ОШ
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  Олена Шевченко
                </h1>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">
                  Дослідник-поліглот • Рівень 28
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Учасник з січня 2026 року
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Налаштування</span>
          </button>
        </div>

        {/* Прогрес-бар до Рівня 29 */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Прогрес до рівня 29</span>
            <span>1,250 / 2,000 XP (62%)</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full w-[62%] transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Основна сітка розділів */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Ліва колонка: Загальна статистика поліглота */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Загальна статистика поліглота
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Час навчання
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                142 Години
              </div>
              <span className="text-xs text-slate-500">Загалом накопичено</span>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
              <div className="flex items-center space-x-2 text-amber-600 mb-2">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700/60">
                  Поточний стрик
                </span>
              </div>
              <div className="text-2xl font-extrabold text-amber-900">
                7 Днів
              </div>
              <span className="text-xs text-amber-700/70">
                Особистий рекорд: 24
              </span>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700/60">
                  Активні цілі
                </span>
              </div>
              <div className="text-2xl font-extrabold text-indigo-950">
                4 Мови
              </div>
              <span className="text-xs text-indigo-700/70 truncate block">
                En • Es • De • Ko
              </span>
            </div>

            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
              <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700/60">
                  Мікро-завдання
                </span>
              </div>
              <div className="text-2xl font-extrabold text-emerald-950">
                348 Завдань
              </div>
              <span className="text-xs text-emerald-700/70">
                Успішно завершено
              </span>
            </div>
          </div>
        </div>

        {/* Права колонка: Активні мовні цілі та прогрес */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Активні мовні цілі та прогрес
            </h2>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Модель Grambank та CEFR
            </span>
          </div>

          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
            {activeLanguages.map((lang) => (
              <div
                key={lang.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">
                      {lang.name}
                    </span>
                    <span className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
                      {lang.currentLevel} → {lang.targetLevel}
                    </span>
                  </div>
                </div>

                {/* Прогрес-бар оціночних годин */}
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>
                    Прогрес часу: {lang.completedHours}г /{" "}
                    {lang.totalEstimatedHours}г
                  </span>
                  <span className="font-bold text-slate-700">
                    {lang.progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${lang.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Секція досягнень */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Досягнення та трофеї
          </h2>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            12 / 24 Розблоковано (50%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-3">
              <Flame className="w-6 h-6 fill-rose-500" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Серія 7 днів</h3>
            <p className="text-xs text-slate-500 mt-1">
              Розблоковано 20 Сер 2026
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-3">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Дует поліглотів
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Розблоковано 20 Сер 2026
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Майстер лексики
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Розблоковано 20 Сер 2026
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Щит інтерференції
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Розблоковано 20 Сер 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
