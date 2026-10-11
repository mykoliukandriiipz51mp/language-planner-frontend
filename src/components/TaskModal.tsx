"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  MessageSquare,
  BookOpen,
  Headphones,
  PenTool,
  FileText,
  Sparkles,
  Plus,
  Paperclip,
  Check,
} from "lucide-react";

// 1. Розширений інтерфейс завдання з усіма параметрами з макета
export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category:
    | "Grammar"
    | "Vocabulary"
    | "Speaking"
    | "Listening"
    | "Writing"
    | "Reading";
  skills: (
    | "Speaking"
    | "Reading"
    | "Listening"
    | "Writing"
    | "Grammar"
    | "Vocab"
  )[];
  minutes: number;
  status: "todo" | "in_progress" | "review" | "completed";
  languages: string[]; // Наприклад: ["English", "Spanish"]
  curricula: string[]; // Наприклад: ["English B1 Curriculum", "Business English"]
  topics: string[]; // Наприклад: ["Grammar Fundamentals", "Conversation Practice"]
  sources: string[]; // Наприклад: ["Audio Dialogue Pack"]
}

// Структури для випадаючих списків (у реальному додатку підтягуються з бекенду/кокстексту)
export interface SelectOption {
  id: string;
  label: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<TaskItem>) => void;
  initialTask?: TaskItem | null; // Якщо передано — режим редагування, якщо null — створення
  availableLanguages?: SelectOption[];
  availableCurricula?: SelectOption[];
  availableTopics?: SelectOption[];
}

const ALL_SKILLS: {
  id: TaskItem["skills"][number];
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "Speaking",
    label: "Speaking",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
  },
  {
    id: "Reading",
    label: "Reading",
    icon: <BookOpen className="w-3.5 h-3.5" />,
  },
  {
    id: "Listening",
    label: "Listening",
    icon: <Headphones className="w-3.5 h-3.5" />,
  },
  {
    id: "Writing",
    label: "Writing",
    icon: <PenTool className="w-3.5 h-3.5" />,
  },
  {
    id: "Grammar",
    label: "Grammar",
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  { id: "Vocab", label: "Vocab", icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  initialTask,
  availableLanguages = [
    { id: "en", label: "English" },
    { id: "es", label: "Spanish" },
    { id: "de", label: "German" },
  ],
  availableCurricula = [
    { id: "c1", label: "English B1 Curriculum" },
    { id: "c2", label: "Business English" },
    { id: "c3", label: "Spanish Basics" },
  ],
  availableTopics = [
    { id: "t1", label: "Grammar Fundamentals" },
    { id: "t2", label: "Conversation Practice" },
    { id: "t3", label: "Contract Terminology" },
  ],
}: TaskModalProps) {
  // Активна вкладка (Базові / Просунуті)
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");

  // Стан полів форми
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minutes, setMinutes] = useState(15);
  const [selectedSkills, setSelectedSkills] = useState<TaskItem["skills"]>([
    "Listening",
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "English",
  ]);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>(["Audio Dialogue Pack"]);

  // Синхронізація стану при відкритті модалки (Створення / Редагування)
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setMinutes(initialTask.minutes || 15);
      setSelectedSkills(initialTask.skills || ["Listening"]);
      setSelectedLanguages(initialTask.languages || ["English"]);
      setSelectedCurricula(initialTask.curricula || []);
      setSelectedTopics(initialTask.topics || []);
      setSources(initialTask.sources || []);
    } else {
      // Скидання форми для нового завдання
      setTitle("");
      setDescription("");
      setMinutes(15);
      setSelectedSkills(["Listening"]);
      setSelectedLanguages(["English"]);
      setSelectedCurricula([]);
      setSelectedTopics([]);
      setSources([]);
    }
    setActiveTab("basic");
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  // Хендлери перемикання навичок
  const toggleSkill = (skillId: TaskItem["skills"][number]) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId],
    );
  };

  // Хендлери мультиселекту для списків
  const handleAddLanguage = (langLabel: string) => {
    if (langLabel && !selectedLanguages.includes(langLabel)) {
      setSelectedLanguages([...selectedLanguages, langLabel]);
    }
  };

  const handleRemoveLanguage = (langLabel: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== langLabel));
  };

  const handleAddCurriculum = (currLabel: string) => {
    if (currLabel && !selectedCurricula.includes(currLabel)) {
      setSelectedCurricula([...selectedCurricula, currLabel]);
    }
  };

  const handleRemoveCurriculum = (currLabel: string) => {
    setSelectedCurricula(selectedCurricula.filter((c) => c !== currLabel));
  };

  const handleAddTopic = (topicLabel: string) => {
    if (topicLabel && !selectedTopics.includes(topicLabel)) {
      setSelectedTopics([...selectedTopics, topicLabel]);
    }
  };

  const handleRemoveTopic = (topicLabel: string) => {
    setSelectedTopics(selectedTopics.filter((t) => t !== topicLabel));
  };

  const handleAddCustomSource = () => {
    const sourceName = prompt("Введіть назву або посилання на джерело:");
    if (sourceName && sourceName.trim()) {
      setSources([...sources, sourceName.trim()]);
    }
  };

  const handleRemoveSource = (sourceName: string) => {
    setSources(sources.filter((s) => s !== sourceName));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({
      id: initialTask?.id || Date.now().toString(),
      title,
      description,
      minutes,
      skills: selectedSkills,
      languages: selectedLanguages,
      curricula: selectedCurricula,
      topics: selectedTopics,
      sources,
      category: (selectedSkills[0] as TaskItem["category"]) || "Grammar",
      status: initialTask?.status || "todo",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Шапка модального вікна */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 font-['Encode_Sans_Expanded',_sans-serif]">
            {initialTask ? "Редагувати завдання" : "Створити нове завдання"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Перемикач розділів (Базові налаштування / Просунуті зв'язки) */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "basic"
                ? "bg-white text-[#5046E5] shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            1. Базові налаштування
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("advanced")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "advanced"
                ? "bg-white text-[#5046E5] shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            2. Контекст та джерела
          </button>
        </div>

        {/* ТІЛО ФОРМИ: БАЗОВІ НАЛАШТУВАННЯ */}
        {activeTab === "basic" && (
          <div className="flex flex-col gap-4 text-xs font-bold">
            {/* Назва завдання */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                НАЗВА ЗАВДАННЯ *
              </label>
              <input
                type="text"
                placeholder="наприклад: Огляд ключових дієслів контракту"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800"
              />
            </div>

            {/* Опис та нотатки */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                ОПИС ТА НОТАТКИ
              </label>
              <textarea
                rows={3}
                placeholder="Додайте опис завдання, інструкції або нотатки..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-800 resize-none"
              />
            </div>

            {/* Орієнтовний час */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                ОРІЄНТОВНИЙ ЧАС
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-2.5 w-36">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(parseInt(e.target.value, 10) || 0)
                  }
                  className="w-full text-slate-800 font-extrabold focus:outline-none"
                />
                <span className="text-slate-400 font-medium text-[11px]">
                  хв
                </span>
              </div>
            </div>

            {/* Цільові навички (TARGET SKILLS) */}
            <div>
              <label className="text-slate-600 mb-1.5 block uppercase tracking-wider text-[10px]">
                ЦІЛЬОВІ НАВИЧКИ
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map((s) => {
                  const isSelected = selectedSkills.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSkill(s.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border transition-all ${
                        isSelected
                          ? "bg-[#5046E5] text-white border-[#5046E5] shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ТІЛО ФОРМИ: ПРОСУНУТІ ЗВ'ЯЗКИ ТА ДЖЕРЕЛА */}
        {activeTab === "advanced" && (
          <div className="flex flex-col gap-4 text-xs font-bold">
            {/* 1. Вибір мови (LANGUAGE) */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                МОВА (LANGUAGE)
              </label>
              <select
                onChange={(e) => {
                  handleAddLanguage(e.target.value);
                  e.target.value = "";
                }}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700 bg-white"
              >
                <option value="">Оберіть мову...</option>
                {availableLanguages.map((l) => (
                  <option key={l.id} value={l.label}>
                    {l.label}
                  </option>
                ))}
              </select>

              {/* Обрані мови у вигляді тегів */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white font-extrabold rounded-full text-[11px]"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(lang)}
                      className="hover:opacity-80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Прив'язаний навчальний план (CONNECTED CURRICULUM) */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                ПРИВ'ЯЗАНИЙ НАВЧАЛЬНИЙ ПЛАН
              </label>
              <select
                onChange={(e) => {
                  handleAddCurriculum(e.target.value);
                  e.target.value = "";
                }}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700 bg-white"
              >
                <option value="">Оберіть навчальний план...</option>
                {availableCurricula.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedCurricula.map((curr) => (
                  <span
                    key={curr}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white font-extrabold rounded-full text-[11px]"
                  >
                    <span>{curr}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCurriculum(curr)}
                      className="hover:opacity-80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Прив'язана тема (CONNECTED TOPIC) */}
            <div>
              <label className="text-slate-600 mb-1 block uppercase tracking-wider text-[10px]">
                ПРИВ'ЯЗАНА ТЕМА
              </label>
              <select
                onChange={(e) => {
                  handleAddTopic(e.target.value);
                  e.target.value = "";
                }}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700 bg-white"
              >
                <option value="">Оберіть тему...</option>
                {availableTopics.map((t) => (
                  <option key={t.id} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedTopics.map((top) => (
                  <span
                    key={top}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600/90 text-white font-extrabold rounded-full text-[11px]"
                  >
                    <span>{top}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(top)}
                      className="hover:opacity-80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Джерела та навчальні матеріали (LEARNING SOURCES) */}
            <div>
              <label className="text-slate-600 mb-2 block uppercase tracking-wider text-[10px]">
                ДЖЕРЕЛА ТА НАВЧАЛЬНІ МАТЕРІАЛИ
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddCustomSource}
                  className="w-full p-3 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-between text-slate-700 font-bold transition-all bg-white"
                >
                  <span className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-indigo-600" />
                    <span>Додати власне джерело (посилання/файл)</span>
                  </span>
                  <Plus className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Теги доданих джерел */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {sources.map((src) => (
                  <span
                    key={src}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-xl text-[11px]"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{src}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSource(src)}
                      className="hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* НИЖНЯ ПАНЕЛЬ ДІЙ */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs transition-all"
          >
            Скасувати
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#5046E5] hover:bg-[#4338CA] text-white rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{initialTask ? "Зберегти зміни" : "Зберегти завдання"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
