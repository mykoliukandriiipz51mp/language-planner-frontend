"use client";

import React, { useState } from "react";
import {
  Plus,
  Clock,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  AlertCircle,
  GripVertical,
} from "lucide-react";
import Header from "@/components/Header";
import TaskModal from "./TaskModal";

export interface TaskItem {
  id: string;
  title: string;
  language: string;
  flag: string;
  category: "Grammar" | "Vocabulary" | "Speaking" | "Listening" | "Writing";
  minutes: number;
  status: "todo" | "in_progress" | "review" | "completed";
  curriculumName?: string; // Якщо немає — завдання є самостійним (standalone)
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "1",
    title: "Практика минулого тривалого часу",
    language: "Англійська",
    flag: "🇬🇧",
    category: "Grammar",
    minutes: 20,
    status: "todo",
    curriculumName: "Business English",
  },
  {
    id: "2",
    title: "Вивчити 15 медичних термінів",
    language: "Німецька",
    flag: "🇩🇪",
    category: "Vocabulary",
    minutes: 25,
    status: "todo",
  },
  {
    id: "3",
    title: "Записати 2-хвилинне аудіо",
    language: "Іспанська",
    flag: "🇪🇸",
    category: "Speaking",
    minutes: 10,
    status: "in_progress",
  },
  {
    id: "4",
    title: "Прослухати 10-хвилинний репортаж BBC",
    language: "Англійська",
    flag: "🇬🇧",
    category: "Listening",
    minutes: 15,
    status: "completed",
  },
];

export default function TaskManagerKanbanView() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [activeLangFilter, setActiveLangFilter] = useState<string>("all"); // 1. Стан модалки у TaskManagerKanbanView:
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  // Стан для відстеження перетягуваної картки та активної колонки
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  // Форма нового завдання
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskLang, setNewTaskLang] = useState("Англійська");
  const [newTaskCategory, setNewTaskCategory] =
    useState<TaskItem["category"]>("Grammar");
  const [newTaskMinutes, setNewTaskMinutes] = useState(15);
  const [newTaskCurriculum, setNewTaskCurriculum] = useState("");

  // 2. Хендлер відкриття для нового завдання:
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // 3. Хендлер відкриття для редагування наявного завдання:
  const handleOpenEditModal = (task: TaskItem) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 4. Збереження (Створення або Оновлення):
  const handleSaveTask = (savedTaskData: Partial<TaskItem>) => {
    if (editingTask) {
      // Оновлення наявного завдання
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...savedTaskData } : t,
        ),
      );
    } else {
      // Створення нового
      setTasks((prev) => [...prev, savedTaskData as TaskItem]);
    }
  };

  const handleMoveStatus = (id: string, newStatus: TaskItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // --- HTML5 DRAG & DROP HANDLERS ---
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    setDraggedTaskId(id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumnId(null);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== colId) {
      setDragOverColumnId(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, colId: string) => {
    // Відкидаємо підсвітку тільки якщо курсор вийшов за межі контейнера колонки
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverColumnId === colId) {
      setDragOverColumnId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, newStatus: TaskItem["status"]) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggedTaskId;
    if (id) {
      handleMoveStatus(id, newStatus);
    }
    setDraggedTaskId(null);
    setDragOverColumnId(null);
  };

  const filteredTasks = tasks.filter(
    (t) => activeLangFilter === "all" || t.language === activeLangFilter,
  );

  const columns: { id: TaskItem["status"]; title: string; count: number }[] = [
    {
      id: "todo",
      title: "Зробити",
      count: filteredTasks.filter((t) => t.status === "todo").length,
    },
    {
      id: "in_progress",
      title: "В процесі",
      count: filteredTasks.filter((t) => t.status === "in_progress").length,
    },
    {
      id: "review",
      title: "На повторення",
      count: filteredTasks.filter((t) => t.status === "review").length,
    },
    {
      id: "completed",
      title: "Завершено",
      count: filteredTasks.filter((t) => t.status === "completed").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-800">
      <Header />

      <main className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Шапка менеджера завдань */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-['Encode_Sans_Expanded',_sans-serif]">
              МЕНЕДЖЕР ЗАВДАНЬ (KANBAN)
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Управляйте завданнями за курсами або окремими вправами.
            </p>
          </div>

          <button
            onClick={() => handleOpenCreateModal()}
            className="bg-[#5046E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Створити нове завдання</span>
          </button>
        </div>

        {/* Фільтри за мовою */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", name: "Всі мови" },
            { id: "Англійська", name: "Англійська 🇬🇧" },
            { id: "Німецька", name: "Німецька 🇩🇪" },
            { id: "Іспанська", name: "Іспанська 🇪🇸" },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLangFilter(lang.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeLangFilter === lang.id
                  ? "bg-[#5046E5] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const isColumnHovered = dragOverColumnId === col.id;

            return (
              <div
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={(e) => handleDragLeave(e, col.id)}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`border rounded-3xl p-4 flex flex-col gap-3 min-h-[500px] transition-all duration-200 ${
                  isColumnHovered
                    ? "bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200/50"
                    : "bg-slate-100/70 border-slate-200/80"
                }`}
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider font-['Encode_Sans_Expanded',_sans-serif]">
                    {col.title}
                  </span>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-white text-slate-600 rounded-full border border-slate-200">
                    {col.count}
                  </span>
                </div>

                {/* Зона карток завдань */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {filteredTasks
                    .filter((t) => t.status === col.id)
                    .map((task) => {
                      const isBeingDragged = draggedTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onDragEnd={handleDragEnd}
                          className={`bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-2xs flex flex-col gap-2 transition-all cursor-grab active:cursor-grabbing hover:border-slate-300 hover:shadow-xs ${
                            isBeingDragged
                              ? "opacity-40 scale-95 border-dashed border-indigo-400"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
                              <span className="text-xs">{task.flag}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                                {task.category}
                              </span>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-slate-300 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className="text-xs font-bold text-slate-800 leading-snug">
                            {task.title}
                          </h4>

                          {/* Тіг прив'язки до курсу чи Standalone */}
                          <span className="text-[10px] font-medium text-slate-400">
                            {task.curriculumName ? (
                              `Курс: ${task.curriculumName}`
                            ) : (
                              <span className="text-amber-600 font-bold">
                                Окреме завдання
                              </span>
                            )}
                          </span>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> ~{task.minutes} хв
                            </span>

                            {/* Селект збережено для мобільної/клавіатурної доступності */}
                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleMoveStatus(
                                  task.id,
                                  e.target.value as TaskItem["status"],
                                )
                              }
                              className="text-[10px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-1.5 py-0.5 text-slate-600 focus:outline-none"
                            >
                              <option value="todo">Зробити</option>
                              <option value="in_progress">В процесі</option>
                              <option value="review">Повторення</option>
                              <option value="completed">Завершено</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}

                  {/* Пуста зона підказки при Drag-over */}
                  {filteredTasks.filter((t) => t.status === col.id).length ===
                    0 && (
                    <div className="flex-1 border-2 border-dashed border-slate-200/60 rounded-2xl flex items-center justify-center p-4 text-[11px] font-medium text-slate-400 text-center min-h-[120px]">
                      Перетягніть завдання сюди
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ВІКНО СТВОРЕННЯ ТАСКИ */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
}
