export const LANG_COLOUR_CLASSES = {
  EN: "bg-indigo-100 text-indigo-800",
  DE: "bg-amber-100 text-amber-800",
  ES: "bg-emerald-100 text-emerald-800",
  KO: "bg-violet-100 text-violet-800",
};

export interface CalendarDayCell {
  dayNumber: number | null; // null для пустих комірок на початку/кінці місяця
  dateString?: string;      // Формат "YYYY-MM-DD" для прив'язки завдань
  badges: string[];         // Коди мов, наприклад: ["EN", "DE"]
  isToday: boolean;
}

// Функція генерації сітки місяця за реальним роком і місяцем
export function generateMonthSchedule(
  year: number,
  month: number, // 0 - Січень, 1 - Лютий, ... 7 - Серпень (корисна дата: Серпень 2026)
  languageMapping: Record<number, string[]> = {} // Мапінг днів до мовних бейджів (з імітації бекенду)
): CalendarDayCell[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  // Поправка на понеділок як перший день тижня (0 - Пн, 6 - Нд)
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6; 

  const calendarCells: CalendarDayCell[] = [];
  const today = new Date();

  // Додаємо пусті комірки для вирівнювання днів тижня на початку місяця
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarCells.push({ dayNumber: null, badges: [], isToday: false });
  }

  // Заповнюємо дні місяця
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const dateString = currentDate.toISOString().split("T")[0];
    
    // Перевірка, чи це сьогоднішня дата (порівнюємо з реальним часом системи)
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    // Підтягуємо бейджі з мапінгу (або залишаємо пустими)
    const badges = languageMapping[day] || [];

    calendarCells.push({
      dayNumber: day,
      dateString,
      badges,
      isToday,
    });
  }

  return calendarCells;
}

export const SCHEDULE = [
  { day: 1, badges: ["EN", "DE"] },
  { day: 2, badges: [] },
  { day: 3, badges: ["EN"] },
  { day: 4, badges: ["DE"] },
  { day: 5, badges: ["EN"] },
  { day: 6, badges: ["DE"] },
  { day: 7, badges: ["ES"] },
  { day: 8, badges: [] },
  { day: 9, badges: [] },
  { day: 10, badges: ["EN"] },
  { day: 11, badges: ["DE"] },
  { day: 12, badges: ["EN"] },
  { day: 13, badges: ["DE"] },
  { day: 14, badges: ["ES"] },
  { day: 15, badges: [] },
  { day: 16, badges: [] },
  { day: 17, badges: ["EN", "KO"], isToday: true },
  { day: 18, badges: ["DE"] },
  { day: 19, badges: ["EN"] },
  { day: 20, badges: ["DE"] },
  { day: 21, badges: ["ES"] },
  { day: 22, badges: [] },
];
