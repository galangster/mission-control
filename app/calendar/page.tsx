"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, CalendarDays, Sparkles } from "lucide-react";

const events = [
  { id: "1", title: "Team Sync", date: "2026-02-18", type: "event", time: "09:00", agent: "Yuki" },
  { id: "2", title: "Sakura Content Review", date: "2026-02-18", type: "task", time: "11:00", agent: "Sakura" },
  { id: "3", title: "Mika Deploy", date: "2026-02-18", type: "task", time: "14:00", agent: "Mika" },
  { id: "4", title: "Hana Design Review", date: "2026-02-18", type: "event", time: "16:00", agent: "Hana" },
  { id: "5", title: "Cron: Daily Backup", date: "2026-02-18", type: "cron", time: "23:00", agent: "System" },
  { id: "6", title: "Rin Research Sync", date: "2026-02-19", type: "event", time: "10:00", agent: "Rin" },
  { id: "7", title: "Deploy Updates", date: "2026-02-20", type: "task", time: "16:00", agent: "Mika" },
  { id: "8", title: "Weekly Review", date: "2026-02-21", type: "event", time: "15:00", agent: "Yuki" },
];

// Agent colors
const agentColors: Record<string, string> = {
  Yuki: "#E07A5F",
  Sakura: "#F4A5AE",
  Hana: "#81B29A",
  Mika: "#6B8DD6",
  Rin: "#E8B86D",
  System: "#78716C",
};

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date("2026-02-18"));
  const [view, setView] = useState<"month" | "list">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const getEventColor = (type: string, agent: string) => {
    return agentColors[agent] || "#78716C";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header - Yuki HQ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between"
      >
          <div>
            <div className="flex items-center gap-2 mb-2"
          >
              <Sparkles className="w-6 h-6 text-[#E8B86D]" />
              <h1 className="text-3xl font-bold text-[#292524]">Calendar</h1>
            </div>
            <p className="text-[#78716C]">Scheduled tasks, cron jobs, and team events.</p>
          </div>
          <div className="flex items-center gap-2"
          >
            <div className="flex bg-[#F5F5F4] rounded-xl p-1"
          >
              <button
                onClick={() => setView("month")}
                className={`px-4 py-2 rounded-lg font-medium transition-all elastic-button ${
                  view === "month" ? "bg-white text-[#292524] shadow-sm" : "text-[#78716C]"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg font-medium transition-all elastic-button ${
                  view === "list" ? "bg-white text-[#292524] shadow-sm" : "text-[#78716C]"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Month Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-[#E7E5E4] elastic-button"
        >
          <ChevronLeft className="w-5 h-5 text-[#78716C]" />
        </button>
        <h2 className="text-xl font-semibold text-[#292524]">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-[#E7E5E4] elastic-button"
        >
          <ChevronRight className="w-5 h-5 text-[#78716C]" />
        </button>
      </motion.div>

      {view === "month" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden"
        >
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-[#E7E5E4]"
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-4 text-center text-sm font-medium text-[#78716C]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7"
          >
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <motion.div 
                key={`empty-${i}`} 
                variants={itemVariants}
                className="min-h-[120px] border-b border-r border-[#E7E5E4] bg-[#FAFAF9]/50" 
              />
            ))}

            {/* Days */}
            {Array.from({ length: days }).map((_, day) => {
              const dayNumber = day + 1;
              const dayEvents = getEventsForDay(dayNumber);
              const isToday = dayNumber === 18 && month === 1 && year === 2026;

              return (
                <motion.div
                  key={dayNumber}
                  variants={itemVariants}
                  className={`
                    min-h-[120px] p-2 border-b border-r border-[#E7E5E4]
                    ${isToday ? "bg-[#E07A5F]/5" : ""}
                  `}
                >
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-2
                    ${isToday ? "bg-[#E07A5F] text-white" : "text-[#292524]"}
                  `}>
                    {dayNumber}
                  </div>
                  <div className="space-y-1"
          >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1.5 rounded-lg truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
                        style={{
                          backgroundColor: `${getEventColor(event.type, event.agent)}15`,
                          color: getEventColor(event.type, event.agent),
                        }}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getEventColor(event.type, event.agent) }}
                        />
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="bg-white rounded-xl p-4 border border-[#E7E5E4] card-hover"
            >
              <div className="flex items-center justify-between"
          >
                <div className="flex items-center gap-4"
          >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: getEventColor(event.type, event.agent) }}
                  >
                    {event.agent[0]}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#292524]">{event.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-[#78716C]"
          >
                      <span className="flex items-center gap-1"
          >
                        <CalendarDays className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1"
          >
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2"
          >
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: getEventColor(event.type, event.agent) }}
                  >
                    {event.agent}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C] uppercase"
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
