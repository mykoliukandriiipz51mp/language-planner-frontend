import { DayLocalization, MonthLocalization } from "./mock-types";

export type TargetSkill =
  | "Speaking"
  | "Reading"
  | "Listening"
  | "Writing"
  | "Grammar"
  | "Vocab";

export interface DashboardTask {
  id: string;
  title: string;
  description: string; // Нове поле: опис та нотатки
  durationMinutes: number; // Орієнтовний час у хвилинах
  skills: TargetSkill[]; // Цільові навички з форми (наприклад: ["Grammar", "Vocab"])

  // Контекст та джерела з кроку 2
  languages: string[]; // Наприклад: ["English", "Spanish"]
  languageCode: "EN" | "DE" | "ES" | "KO"; // Для швидкої візуалізації прапорців у UI
  flag: string;
  curricula: string[]; // Прив'язані навчальні плани
  topics: string[]; // Прив'язані теми
  sources: string[]; // Джерела та навчальні матеріали

  // Системні параметри стану та стилізації UI
  category: string; // Основна категорія для бейджа
  categoryBadgeClass: string;
  status: "todo" | "in_progress" | "review" | "completed";
  isCompleted?: boolean;
}

export interface LanguageItem {
  id: string;
  code: "EN" | "DE" | "ES" | "KO";
  name: string;
  flag: string;
  color: string; // HEX для індикаторів
  badgeClass: string; // Tailwind класи для бейджів
  focusType: string; // Наприклад: "(Головний фокус)", "(Підтримка)"
  weightPercentage: number; // Ваговий коефіцієнт для стратегії
  progress: {
    currentLevel: string;
    targetLevel: string;
    completedHours: number;
    totalEstimatedHours: number;
    percent: number;
  };
}

export const LANGUAGES_MOCK: LanguageItem[] = [
  {
    id: "lang-en",
    code: "EN",
    name: "Англійська",
    flag: "🇬🇧",
    color: "#5046E5",
    badgeClass: "bg-indigo-100 text-indigo-800",
    focusType: "Головний фокус",
    weightPercentage: 35,
    progress: {
      currentLevel: "B2",
      targetLevel: "C1",
      completedHours: 340,
      totalEstimatedHours: 500,
      percent: 68,
    },
  },
  {
    id: "lang-de",
    code: "DE",
    name: "Німецька",
    flag: "🇩🇪",
    color: "#F59E0B",
    badgeClass: "bg-amber-100 text-amber-800",
    focusType: "Другий пріоритет",
    weightPercentage: 25,
    progress: {
      currentLevel: "A1",
      targetLevel: "B2",
      completedHours: 90,
      totalEstimatedHours: 600,
      percent: 20,
    },
  },
  {
    id: "lang-es",
    code: "ES",
    name: "Іспанська",
    flag: "🇪🇸",
    color: "#10B981",
    badgeClass: "bg-emerald-100 text-emerald-800",
    focusType: "Підтримка",
    weightPercentage: 20,
    progress: {
      currentLevel: "A2",
      targetLevel: "B1",
      completedHours: 110,
      totalEstimatedHours: 250,
      percent: 45,
    },
  },
  {
    id: "lang-ko",
    code: "KO",
    name: "Корейська",
    flag: "🇰🇷",
    color: "#8B5CF6",
    badgeClass: "bg-violet-100 text-violet-800",
    focusType: "Підтримка",
    weightPercentage: 20,
    progress: {
      currentLevel: "Beginner",
      targetLevel: "A2",
      completedHours: 45,
      totalEstimatedHours: 450,
      percent: 10,
    },
  },
];

export const MONTHS_OF_YEAR: MonthLocalization[] = [
  {
    id: "january",
    short: {
      en: "Jan",
      ua: "Січ",
    },
    full: {
      en: "January",
      ua: "Січень",
    },
  },
  {
    id: "february",
    short: {
      en: "Feb",
      ua: "Лют",
    },
    full: {
      en: "February",
      ua: "Лютий",
    },
  },
  {
    id: "march",
    short: {
      en: "Mar",
      ua: "Бер",
    },
    full: {
      en: "March",
      ua: "Березень",
    },
  },
  {
    id: "april",
    short: {
      en: "Apr",
      ua: "Квіт",
    },
    full: {
      en: "April",
      ua: "Квітень",
    },
  },
  {
    id: "may",
    short: {
      en: "May",
      ua: "Трав",
    },
    full: {
      en: "May",
      ua: "Травень",
    },
  },
  {
    id: "june",
    short: {
      en: "Jun",
      ua: "Черв",
    },
    full: {
      en: "June",
      ua: "Червень",
    },
  },
  {
    id: "july",
    short: {
      en: "Jul",
      ua: "Лип",
    },
    full: {
      en: "July",
      ua: "Липень",
    },
  },
  {
    id: "august",
    short: {
      en: "Aug",
      ua: "Серп",
    },
    full: {
      en: "August",
      ua: "Серпень",
    },
  },
  {
    id: "september",
    short: {
      en: "Sep",
      ua: "Вер",
    },
    full: {
      en: "September",
      ua: "Вересень",
    },
  },
  {
    id: "october",
    short: {
      en: "Oct",
      ua: "Жовт",
    },
    full: {
      en: "October",
      ua: "Жовтень",
    },
  },
  {
    id: "november",
    short: {
      en: "Nov",
      ua: "Лист",
    },
    full: {
      en: "November",
      ua: "Листопад",
    },
  },
  {
    id: "december",
    short: {
      en: "Dec",
      ua: "Груд",
    },
    full: {
      en: "December",
      ua: "Грудень",
    },
  },
];

export const DAYS_OF_WEEK: DayLocalization[] = [
  {
    id: "monday",
    short: {
      en: "Mon",
      ua: "Пн",
    },
    full: {
      en: "Monday",
      ua: "Понеділок",
    },
  },
  {
    id: "tuesday",
    short: {
      en: "Tue",
      ua: "Вт",
    },
    full: {
      en: "Tuesday",
      ua: "Вівторок",
    },
  },
  {
    id: "wednesday",
    short: {
      en: "Wed",
      ua: "Ср",
    },
    full: {
      en: "Wednesday",
      ua: "Середа",
    },
  },
  {
    id: "thursday",
    short: {
      en: "Thu",
      ua: "Чт",
    },
    full: {
      en: "Thursday",
      ua: "Четвер",
    },
  },
  {
    id: "friday",
    short: {
      en: "Fri",
      ua: "Пт",
    },
    full: {
      en: "Friday",
      ua: "П'ятниця",
    },
  },
  {
    id: "saturday",
    short: {
      en: "Sat",
      ua: "Сб",
    },
    full: {
      en: "Saturday",
      ua: "Субота",
    },
  },
  {
    id: "sunday",
    short: {
      en: "Sun",
      ua: "Нд",
    },
    full: {
      en: "Sunday",
      ua: "Неділя",
    },
  },
];

export const DASHBOARD_TASKS_MOCK: DashboardTask[] = [
  {
    id: "t1",
    title: "Практика минулого тривалого часу (Past Continuous)",
    description:
      "Оглянути використання Past Continuous у складних реченнях із сполучниками 'while' та 'when'. Виконати 10 письмових вправ.",
    durationMinutes: 20,
    skills: ["Grammar", "Writing"],
    languages: ["English"],
    languageCode: "EN",
    flag: "🇬🇧",
    curricula: ["English B1 Curriculum", "Business English"],
    topics: ["Grammar Fundamentals", "Tense Review"],
    sources: ["Grammar Guide v2 (System)", "Custom PDF Link"],
    category: "Граматика",
    categoryBadgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    status: "todo",
    isCompleted: false,
  },
  {
    id: "t2",
    title: "Вивчити 15 медичних термінів",
    description:
      "Опрацювати лексику за темою 'Анатомія та симптоми'. Скласти кастомні картки для інтервального повторення.",
    durationMinutes: 25,
    skills: ["Vocab", "Reading"],
    languages: ["German"],
    languageCode: "DE",
    flag: "🇩🇪",
    curricula: ["German Conversational"],
    topics: ["Medical Vocabulary"],
    sources: ["Anki Flashcard Deck"],
    category: "Словник",
    categoryBadgeClass: "bg-amber-50 text-amber-700 border-amber-200/60",
    status: "todo",
    isCompleted: false,
  },
  {
    id: "t3",
    title: "Записати 2-хвилинне аудіо про свій день",
    description:
      "Сформулювати розповідь у теперішньому часі (Presente de Indicativo). Звернути увагу на правильну вимову дієслів із відхиленнями.",
    durationMinutes: 10,
    skills: ["Speaking"],
    languages: ["Spanish"],
    languageCode: "ES",
    flag: "🇪🇸",
    curricula: ["Spanish Basics"],
    topics: ["Daily Conversation", "Pronunciation Practice"],
    sources: ["Voice Recorder Integrated"],
    category: "Говоріння",
    categoryBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    status: "review",
    isCompleted: false,
  },
  {
    id: "t4",
    title: "Огляд суфіксів ввічливості (존댓말)",
    description:
      "Проаналізувати різницю між ступенями ввічливості -하십시오 та -해요. Виписати 5 прикладів діалогів.",
    durationMinutes: 15,
    skills: ["Grammar", "Reading"],
    languages: ["Korean"],
    languageCode: "KO",
    flag: "🇰🇷",
    curricula: ["Korean Basics"],
    topics: ["Hangul Foundations", "Honorifics"],
    sources: ["Audio Dialogue Pack"],
    category: "Письмо",
    categoryBadgeClass: "bg-purple-50 text-purple-700 border-purple-200/60",
    status: "in_progress",
    isCompleted: false,
  },
  {
    id: "t5",
    title: "Прослухати 10-хвилинний репортаж BBC",
    description:
      "Сприйняття на слух новинного подкасту про економіку. Занотувати 5 незнайомих ідіом або фразових дієслів.",
    durationMinutes: 15,
    skills: ["Listening", "Vocab"],
    languages: ["English"],
    languageCode: "EN",
    flag: "🇬🇧",
    curricula: ["Business English"],
    topics: ["Listening Comprehension"],
    sources: ["BBC Audio Clip"],
    category: "Аудіювання",
    categoryBadgeClass: "bg-slate-200 text-slate-700",
    status: "completed",
    isCompleted: true,
  },
  {
    id: "t6",
    title: "Повторити прийменники Akkusativ",
    description:
      "Закріпити прийменники durch, für, gegen, ohne, um. Виконати тестові вправи на автоматизм використання правильних артиклів.",
    durationMinutes: 15,
    skills: ["Grammar"],
    languages: ["German"],
    languageCode: "DE",
    flag: "🇩🇪",
    curricula: ["German Conversational"],
    topics: ["Case System"],
    sources: ["Grammar Exercises Sheet"],
    category: "Граматика",
    categoryBadgeClass: "bg-slate-200 text-slate-700",
    status: "completed",
    isCompleted: true,
  },
];
