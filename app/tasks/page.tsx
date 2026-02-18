"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreHorizontal, User, Bot, Calendar } from "lucide-react";

const initialTasks = [
  { id: "1", title: "Review Q1 metrics", description: "Analyze performance data", status: "todo", assignee: "me", dueDate: "2026-02-20" },
  { id: "2", title: "Update documentation", description: "API docs need refresh", status: "todo", assignee: "agent", dueDate: "2026-02-21" },
  { id: "3", title: "Fix navigation bug", description: "Mobile menu broken", status: "in-progress", assignee: "me", dueDate: "2026-02-19" },
  { id: "4", title: "Write blog post", description: "AI workflow tutorial", status: "in-progress", assignee: "agent", dueDate: "2026-02-22" },
  { id: "5", title: "Deploy to production", description: "v2.0 release", status: "done", assignee: "me", dueDate: "2026-02-18" },
  { id: "6", title: "Update dependencies", description: "Security patches", status: "done", assignee: "agent", dueDate: "2026-02-17" },
];

const columns = [
  { id: "todo", label: "To Do", color: "#78716C" },
  { id: "in-progress", label: "In Progress", color: "#E07A5F" },
  { id: "done", label: "Done", color: "#81B29A" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "me" | "agent">("all");

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.assignee === filter
  );

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as any } : t))
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#292524] mb-2">Task Board</h1>
            <p className="text-[#78716C]">Track what we're working on.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#E07A5F] text-white rounded-xl font-medium hover:bg-[#C45A3F] transition-colors">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </motion.div>

      {/* Filters */}
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
              px-4 py-2 rounded-xl font-medium transition-all
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter((t) => t.status === column.id);

          return (
            <div key={column.id} className="bg-[#F5F5F4] rounded-2xl p-4">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <span className="font-semibold text-[#292524]">{column.label}</span>
                  <span className="text-sm text-[#78716C] bg-white px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <button className="p-1 hover:bg-white rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-[#78716C]" />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
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
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-[#292524]">{task.title}</h3>
                        {task.assignee === "me" ? (
                          <div className="w-6 h-6 rounded-full bg-[#E07A5F]/20 flex items-center justify-center">
                            <User className="w-3 h-3 text-[#E07A5F]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[#81B29A]/20 flex items-center justify-center">
                            <Bot className="w-3 h-3 text-[#81B29A]" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#78716C] mb-3">{task.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#78716C]">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        
                        {/* Quick status change */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          {column.id !== "todo" && (
                            <button
                              onClick={() => moveTask(task.id, "todo")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#F5F5F4] hover:bg-[#E7E5E4] transition-colors"
                            >
                              ← Todo
                            </button>
                          )}
                          {column.id !== "in-progress" && (
                            <button
                              onClick={() => moveTask(task.id, "in-progress")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#E07A5F]/20 text-[#E07A5F] hover:bg-[#E07A5F]/30 transition-colors"
                            >
                              In Progress
                            </button>
                          )}
                          {column.id !== "done" && (
                            <button
                              onClick={() => moveTask(task.id, "done")}
                              className="px-2 py-1 text-xs rounded-lg bg-[#81B29A]/20 text-[#81B29A] hover:bg-[#81B29A]/30 transition-colors"
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
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
