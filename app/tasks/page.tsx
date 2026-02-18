"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, User, Bot, Calendar, Sparkles } from "lucide-react";

const initialTasks = [
  { id: "1", title: "Review Q1 metrics", description: "Analyze performance data", status: "todo", assignee: "yuki", dueDate: "2026-02-20" },
  { id: "2", title: "Draft blog post", description: "AI workflow tutorial", status: "todo", assignee: "sakura", dueDate: "2026-02-21" },
  { id: "3", title: "Fix navigation bug", description: "Mobile menu broken", status: "in-progress", assignee: "mika", dueDate: "2026-02-19" },
  { id: "4", title: "Design new thumbnails", description: "YouTube series", status: "in-progress", assignee: "hana", dueDate: "2026-02-22" },
  { id: "5", title: "Research competitors", description: "AI dashboard space", status: "in-progress", assignee: "rin", dueDate: "2026-02-20" },
  { id: "6", title: "Deploy Yuki HQ", description: "v2.0 release", status: "done", assignee: "mika", dueDate: "2026-02-18" },
  { id: "7", title: "Update animations", description: "Add elastic buttons", status: "done", assignee: "mika", dueDate: "2026-02-18" },
];

const columns = [
  { id: "todo", label: "To Do", color: "#78716C" },
  { id: "in-progress", label: "In Progress", color: "#E07A5F" },
  { id: "done", label: "Done", color: "#81B29A" },
];

// Agent colors for assignee badges
const agentColors: Record<string, string> = {
  yuki: "#E07A5F",
  sakura: "#F4A5AE",
  hana: "#81B29A",
  mika: "#6B8DD6",
  rin: "#E8B86D",
  me: "#E07A5F",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "me" | "agent">("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : filter === "me" ? task.assignee === "me" : task.assignee !== "me"
  );

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as any } : t))
    );
  };

  const getAssigneeInitial = (assignee: string) => {
    return assignee.charAt(0).toUpperCase();
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
              <Sparkles className="w-6 h-6 text-[#E07A5F]" />
              <h1 className="text-3xl font-bold text-[#292524]">Task Board</h1>
            </div>
            <p className="text-[#78716C]">Track what the team is working on.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#E07A5F] text-white rounded-xl font-medium hover:bg-[#C45A3F] transition-colors elastic-button"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </motion.div>

      {/* Filters with Elastic Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2 mb-6"
      >
        {(["all", "me", "agent"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-xl font-medium transition-all elastic-button
              ${filter === f
                ? "bg-[#292524] text-white"
                : "bg-white text-[#78716C] border border-[#E7E5E4] hover:border-[#292524]"
              }
            `}
          >
            {f === "all" ? "All Tasks" : f === "me" ? "My Tasks" : "Agent Tasks"}
          </button>
        ))}
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter((t) => t.status === column.id);

          return (
            <motion.div 
              key={column.id} 
              variants={itemVariants}
              className="bg-[#F5F5F4] rounded-2xl p-4"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4"
          >
                <div className="flex items-center gap-2"
          >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <span className="font-semibold text-[#292524]">{column.label}</span>
                  <span className="text-sm text-[#78716C] bg-white px-2 py-0.5 rounded-full"
          >
                    {columnTasks.length}
                  </span>
                </div>
                <button className="p-1 hover:bg-white rounded-lg transition-colors elastic-button"
          >
                  <MoreHorizontal className="w-4 h-4 text-[#78716C]" />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-3"
          >
                <AnimatePresence mode="popLayout">
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-xl p-4 border border-[#E7E5E4] card-hover cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2"
          >
                        <h3 className="font-medium text-[#292524]">{task.title}</h3>
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: agentColors[task.assignee] || "#78716C" }}
                        >
                          {getAssigneeInitial(task.assignee)}
                        </div>
                      </div>
                      <p className="text-sm text-[#78716C] mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between"
          >
                        <div className="flex items-center gap-1 text-xs text-[#78716C]"
          >
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        
                        {/* Quick status change */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
          >
                          {column.id !== "todo" && (
                            <button
                              onClick={() => moveTask(task.id, "todo")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#F5F5F4] hover:bg-[#E7E5E4] transition-colors elastic-button"
                            >
                              ← Todo
                            </button>
                          )}
                          {column.id !== "in-progress" && (
                            <button
                              onClick={() => moveTask(task.id, "in-progress")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#E07A5F]/20 text-[#E07A5F] hover:bg-[#E07A5F]/30 transition-colors elastic-button"
                            >
                              In Progress
                            </button>
                          )}
                          {column.id !== "done" && (
                            <button
                              onClick={() => moveTask(task.id, "done")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#81B29A]/20 text-[#81B29A] hover:bg-[#81B29A]/30 transition-colors elastic-button"
                            >
                              Done →
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
