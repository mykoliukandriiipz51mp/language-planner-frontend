"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Globe,
  RotateCcw,
  ShieldCheck,
  Bell,
  Sliders,
  Check,
  AlertTriangle,
  Download,
  Trash2,
} from "lucide-react";
import Header from "@/components/Header";
import { PagesLayout } from "@/components/layouts/PagesLayout";

export default function SettingsView({ onBack }: { onBack?: () => void }) {
  // Стан налаштувань
  const [name, setName] = useState("Олена Шевченко");
  const [email, setEmail] = useState("olena.shevchenko@fluentflow.app");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [interferenceStrictness, setInterferenceStrictness] = useState<
    "strict" | "balanced" | "relaxed"
  >("balanced");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    setSuccessMessage("Налаштування успішно збережено!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleResetQuiz = () => {
    setIsResetModalOpen(false);
    alert("Квіз налаштування профілю скинуто. Перенаправлення на онбординг...");
  };

  return (
    <PagesLayout>
      <main className="max-w-7xl mx-auto flex flex-col gap-6 w-full">
        {/* Шапка сторінки */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
              НАЛАШТУВАННЯ СИСТЕМИ
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Керуйте параметрами профілю, алгоритмами інтерференції та станом
              навчання.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="bg-[#5046E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Зберегти зміни</span>
          </button>
        </div>

        {/* Сповіщення про успіх */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* РОЗДІЛ 1: Профіль та обліковий запис */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-[#5046E5]" />
              <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                1. Профіль та ідентифікація
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium -mt-2">
              Причина: Забезпечує персоналізацію інтерфейсу та збереження
              досягнень на серверах платформи.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
              <div>
                <label className="text-slate-600 mb-1 block">Повне ім'я</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-600 mb-1 block">
                  Електронна пошта
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* РОЗДІЛ 2: Алгоритмічний захист від інтерференції */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#5046E5]" />
              <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                2. Захист від міжмовної інтерференції
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium -mt-2">
              Причина: Регулює чутливість алгоритму до паралельного вивчення
              лексично споріднених мов (наприклад, іспанської та
              португальської), виставляючи часові буфери.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: "strict",
                  title: "Суворий режим",
                  desc: "Автоматично блокує паралельні сесії споріднених мов без 30-хв буфера.",
                },
                {
                  id: "balanced",
                  title: "Збалансований (Рекомендовано)",
                  desc: "Попереджає про ризики та пропонує оптимальні перерви.",
                },
                {
                  id: "relaxed",
                  title: "Вільний режим",
                  desc: "Мінімальні обмеження, для досвідчених поліглотів.",
                },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setInterferenceStrictness(mode.id as any)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-1.5 ${
                    interferenceStrictness === mode.id
                      ? "border-[#5046E5] bg-indigo-50/40 ring-2 ring-indigo-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900">
                    {mode.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {mode.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* РОЗДІЛ 3: Перезапуск адаптивного квізу */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                3. Перезапуск діагностичного квізу
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium -mt-2">
              Причина: Якщо ваші мовні навички суттєво змінитися або ви бажаєте
              змінити початкові цілі CEFR, повне проходження квізу оновить
              параметри планувальника.
            </p>

            <div className="flex items-center justify-between bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-amber-900">
                  Повторне калібрування рівня знань
                </span>
                <span className="text-[11px] text-amber-800 font-medium">
                  Це опрацює поточний статус і перерахує часові бюджети завдань.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                Пройти квіз знову
              </button>
            </div>
          </div>

          {/* РОЗДІЛ 4: Безпека та конфіденційність */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Lock className="w-5 h-5 text-[#5046E5]" />
              <h2 className="text-sm font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
                4. Безпека даних та експорт
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-medium -mt-2">
              Причина: Захист облікового запису та можливість експортувати
              навчальну аналітику відповідно до академічних вимог.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Експортувати дані навчання (JSON)</span>
              </button>

              <button
                type="button"
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Видалити акаунт та дані</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* МОДАЛЬНЕ ВІКНО ПІДТВЕРДЖЕННЯ СКИДАННЯ КВІЗУ */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl w-fit">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
              Скинути результати онбордингу?
            </h3>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Ви знову пройдете діагностичний квіз оцінки рівня знань. Ваш
              поточний розклад та цілі будуть тимчасово архівовані до завершення
              калібрування.
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="w-1/2 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs cursor-pointer"
              >
                Скасувати
              </button>
              <button
                type="button"
                onClick={handleResetQuiz}
                className="w-1/2 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold text-xs shadow-md cursor-pointer"
              >
                Так, перезапустити
              </button>
            </div>
          </div>
        </div>
      )}
    </PagesLayout>
  );
}
