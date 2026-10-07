"use client";

import React, { useState, useMemo } from "react";
import { Sliders, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Мапа даних для відображення мов
const LANGUAGE_META: Record<string, { name: string; flag: string }> = {
  en: { name: "Англійська", flag: "🇬🇧" },
  de: { name: "Німецька", flag: "🇩🇪" },
  es: { name: "Іспанська", flag: "🇪🇸" },
  fr: { name: "Французька", flag: "🇫🇷" },
  it: { name: "Італійська", flag: "🇮🇹" },
  pt: { name: "Португальська", flag: "🇵🇹" },
  pl: { name: "Польська", flag: "🇵🇱" },
  uk: { name: "Українська", flag: "🇺🇦" },
  ja: { name: "Японська", flag: "🇯🇵" },
  ko: { name: "Корейська", flag: "🇰🇷" },
  zh: { name: "Китайська", flag: "🇨🇳" },
};

// Палітра кольорів для графічного відображення мов у прогрес-барі
const COLOR_PALETTE = [
  "bg-[#5046E5]", // Основний індиго
  "bg-[#10B981]", // Смарагдовий
  "bg-[#F59E0B]", // Бурштиновий
  "bg-[#EC4899]", // Рожевий
  "bg-[#06B6D4]", // Блакитний
  "bg-[#8B5CF6]", // Фіолетовий
];

export interface LanguagePrioritySelection {
  languageId: string;
  percentageShare: number;
  roleLabel: string;
}

interface Step5LanguagePrioritiesProps {
  selectedLanguageIds?: string[];
  onNext: (priorities: LanguagePrioritySelection[]) => void;
  onBack?: () => void;
  data?: any;
}

export default function Step5LanguagePriorities({
  selectedLanguageIds = ["en", "de", "es"],
  onNext,
  onBack,
  data,
}: Step5LanguagePrioritiesProps) {
  // Початковий рівномірний розподіл відсотків між обраними мовами
  const [shares, setShares] = useState<Record<string, number>>(() => {
    const initialShares: Record<string, number> = {};
    const count = selectedLanguageIds.length;
    if (count === 0) return initialShares;

    const baseShare = Math.floor(100 / count);
    let remainder = 100 - baseShare * count;

    selectedLanguageIds.forEach((id, idx) => {
      initialShares[id] = baseShare + (idx === 0 ? remainder : 0);
    });

    return initialShares;
  });

  // Функція визначення семантичної ролі на основі обраного відсотка
  const getFocusRole = (percentage: number, isHighest: boolean) => {
    if (percentage >= 50) {
      return {
        label: "Максимальний фокус",
        badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
        description: "Основний вектор навчання (понад 50% часу)",
      };
    }
    if (percentage >= 25) {
      return {
        label: isHighest ? "Основний фокус" : "Високий фокус (2-й пріоритет)",
        badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Активне вивчення з регулярними сесіями",
      };
    }
    if (percentage >= 15) {
      return {
        label: "Базовий фокус",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Помірний темп засвоєння матеріалу",
      };
    }
    return {
      label: "Режим підтримки",
      badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
      description: "Підтримання навичок та повторення (Maintenance)",
    };
  };

  // Зміна значення через слайдер або числовий інпут
  const handleValueChange = (changedId: string, rawValue: number) => {
    const val = isNaN(rawValue) ? 0 : rawValue;
    const clampedValue = Math.min(100, Math.max(0, val));
    setShares((prev) => ({
      ...prev,
      [changedId]: clampedValue,
    }));
  };

  // Підрахунок загальної суми відсотків
  const totalPercentage = useMemo(() => {
    return Object.values(shares).reduce((sum, val) => sum + (val || 0), 0);
  }, [shares]);

  // Перевірка придатності: сума має дорівнювати точно 100%
  const isValidTotal = totalPercentage === 100;

  // Знаходження максимальної частки для підказок
  const maxShareValue = useMemo(() => {
    return Math.max(...Object.values(shares), 0);
  }, [shares]);

  const handleSubmit = () => {
    if (!isValidTotal) return;

    const result: LanguagePrioritySelection[] = selectedLanguageIds.map(
      (id) => {
        const pct = shares[id] || 0;
        const role = getFocusRole(pct, pct === maxShareValue);
        return {
          languageId: id,
          percentageShare: pct,
          roleLabel: role.label,
        };
      },
    );

    if (onNext) {
      onNext(data || result);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Заголовок та опис */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Налаштуйте пріоритети для обраних мов
      </h1>
      <p className="text-xs md:text-sm text-slate-400 mb-6 font-medium leading-relaxed">
        Використовуйте повзунки або вводьте точні відсотки в поля. Сумарна
        пріоритетність по всіх мовах має дорівнювати 100%.
      </p>

      {/* Список мов зі слайдерами та числовими інпутами */}
      <div className="flex flex-col gap-4 mb-6">
        {selectedLanguageIds.map((id, index) => {
          const meta = LANGUAGE_META[id] || {
            name: id.toUpperCase(),
            flag: "🌐",
          };
          const currentShare = shares[id] ?? 0;
          const isHighest = currentShare === maxShareValue && currentShare > 0;
          const role = getFocusRole(currentShare, isHighest);

          return (
            <div
              key={id}
              className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:border-slate-300 transition-all flex flex-col gap-3"
            >
              {/* Верхній рядок: Прапор, назва, бейдж ролі та Інпут для відсотків */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{meta.flag}</span>
                  <span className="text-sm font-bold text-slate-800">
                    {meta.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold border ${role.badgeBg}`}
                  >
                    {role.label}
                  </span>

                  {/* Числовий інпут з символом % */}
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentShare === 0 ? "" : currentShare}
                      onChange={(e) =>
                        handleValueChange(id, parseInt(e.target.value, 10))
                      }
                      placeholder="0"
                      className="w-20 px-2 py-1 text-right text-sm font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none pr-6"
                    />
                    <span className="absolute right-2 text-xs font-bold text-slate-400 pointer-events-none">
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Інтерактивний повзунок (Slider) */}
              <div className="relative flex items-center w-full my-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentShare}
                  onChange={(e) =>
                    handleValueChange(id, parseInt(e.target.value, 10))
                  }
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#5046E5] focus:outline-none"
                />
              </div>

              {/* Опис ролі */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{role.description}</span>
                <span>0% — 100%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Загальний візуальний прогрес-бар */}
      <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            <span>Загальний баланс розкладу</span>
          </span>
          <span
            className={`text-xs font-extrabold ${
              isValidTotal ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            Сума: {totalPercentage}% / 100%
          </span>
        </div>

        {/* Прогрес-бар із сегментами */}
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex mb-3 shadow-inner">
          {selectedLanguageIds.map((id, index) => {
            const share = shares[id] || 0;
            const colorClass = COLOR_PALETTE[index % COLOR_PALETTE.length];
            if (share === 0) return null;
            return (
              <div
                key={id}
                style={{ width: `${share}%` }}
                className={`h-full ${colorClass} transition-all duration-200`}
                title={`${LANGUAGE_META[id]?.name || id}: ${share}%`}
              />
            );
          })}
        </div>

        {/* Легенда з відсотками */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedLanguageIds.map((id, index) => {
            const share = shares[id] || 0;
            const meta = LANGUAGE_META[id] || { name: id };
            const colorClass = COLOR_PALETTE[index % COLOR_PALETTE.length];

            return (
              <div key={id} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
                <span className="text-xs font-medium text-slate-600">
                  {meta.name}:{" "}
                  <strong className="text-slate-800">{share}%</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Повідомлення-попередження про валідацію суми */}
      {!isValidTotal ? (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 mb-6 flex items-start gap-2.5 transition-all">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold">
              Сумарна пріоритетність по всіх мовах має дорівнювати 100%
            </span>
            <span className="text-[11px] opacity-90 mt-0.5 font-medium">
              Поточна сума становить <strong>{totalPercentage}%</strong>.{" "}
              {totalPercentage > 100
                ? `Зменшіть пріоритетність на ${totalPercentage - 100}%.`
                : `Додайте ще ${100 - totalPercentage}% до обраних мов.`}
            </span>
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 mb-6 flex items-center gap-2.5 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            Ідеально! Сума пріоритетів дорівнює 100%. Можна продовжувати.
          </span>
        </div>
      )}

      {/* Навігаційні кнопки */}
      <div className="flex items-center gap-3 mt-auto">
        {onBack && (
          <Button variant="primary" type="button" fullWidth onClick={onBack}>
            Назад
          </Button>
        )}

        <Button
          variant="primary"
          type="button"
          fullWidth
          disabled={!isValidTotal}
          onClick={handleSubmit}
        >
          Продовжити
        </Button>
      </div>
    </div>
  );
}
