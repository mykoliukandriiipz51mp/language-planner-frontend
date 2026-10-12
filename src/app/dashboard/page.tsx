"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/Button";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import LanguageDetailView from "@/components/LanguageDetailView";
import { PagesLayout } from "@/components/layouts/PagesLayout";

// Метадані мов
const LANGUAGES = [
  { id: "all", name: "Панель", flag: "📊" },
  { id: "en", name: "Англійська", flag: "🇬🇧", color: "#5046E5" },
  { id: "de", name: "Німецька", flag: "🇩🇪", color: "#F59E0B" },
  { id: "es", name: "Іспанська", flag: "🇪🇸", color: "#10B981" },
  { id: "ko", name: "Корейська", flag: "🇰🇷", color: "#8B5CF6" },
];

export default function FluentFlowDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <PagesLayout>
      {/* 2. Селектор мовних фільтрів (Language Filter Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveTab(lang.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-bold transition-all whitespace-nowrap ${
              activeTab === lang.id
                ? "bg-[#5046E5] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {activeTab === "all" && <Dashboard LANGUAGES={LANGUAGES} />}
      {activeTab !== "all" &&
        LANGUAGES.filter((item) => item.id === activeTab).map((lang) => (
          <LanguageDetailView
            key={lang.id}
            languageName={lang.name}
            languageFlag={lang.flag}
          />
        ))}
    </PagesLayout>
  );
}
