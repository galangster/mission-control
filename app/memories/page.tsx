"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Calendar, User, X, FileText } from "lucide-react";

const initialMemories = [
  {
    id: "1",
    title: "Mission Control Concept",
    content: "The Mission Control dashboard idea came from Alex Finn's tweet. It's a central hub for tracking OpenClaw activities. Key features include: Task Board, Content Pipeline, Calendar, Memory Screen, Team management, and Office View.",
    category: "Ideas",
    agentId: "Yuki",
    createdAt: "2026-02-17",
  },
  {
    id: "2",
    title: "Claude vs Kimi Comparison",
    content: "After testing both models: Claude excels at nuanced reasoning and long-context tasks. Kimi is faster and great for coding. For this project, we're using Kimi with a refined editorial aesthetic.",
    category: "Research",
    agentId: "Yuki",
    createdAt: "2026-02-16",
  },
  {
    id: "3",
    title: "Design System Decisions",
    content: "Went with a warm minimal palette instead of the typical dark cyberpunk. Colors: coral (#E07A5F) for primary actions, sage (#81B29A) for success states, warm grays for surfaces. Typography: Plus Jakarta Sans + JetBrains Mono.",
    category: "Design",
    agentId: "Yuki",
    createdAt: "2026-02-15",
  },
  {
    id: "4",
    title: "Content Strategy Notes",
    content: "Content pillars for the channel: 1) AI workflow tutorials, 2) OpenClaw tips, 3) Behind-the-scenes builds. Post 2-3x per week. Focus on practical, actionable content.",
    category: "Strategy",
    agentId: "Yuki",
    createdAt: "2026-02-14",
  },
  {
    id: "5",
    title: "Team Structure",
    content: "Current team: Yuki (main assistant), Code Assistant (development), Content Writer (scripts), Designer (visuals). Each has distinct responsibilities and can work in parallel.",
    category: "Team",
    agentId: "Yuki",
    createdAt: "2026-02-13",
  },
];

const categories = ["All", "Ideas", "Research", "Design", "Strategy", "Team"];

export default function MemoriesPage() {
  const [memories] = useState(initialMemories);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMemory, setSelectedMemory] = useState<typeof memories[0] | null>(null);

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.title.toLowerCase().includes(search.toLowerCase()) ||
      memory.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || memory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-3xl font-bold text-[#292524] mb-2">Memories</h1>
            <p className="text-[#78716C]">Your digital memory archive.</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E07A5F]/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-[#E07A5F]" />
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all
                ${selectedCategory === category
                  ? "bg-[#292524] text-white"
                  : "bg-white text-[#78716C] border border-[#E7E5E4] hover:border-[#292524]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <p className="text-sm text-[#78716C] mb-4">
        {filteredMemories.length} memory{filteredMemories.length !== 1 ? "ies" : ""}
      </p>

      {/* Memory Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedMemory(memory)}
              className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]">
                  {memory.category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FileText className="w-4 h-4 text-[#E07A5F]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#292524] mb-2 line-clamp-2">
                {memory.title}
              </h3>

              {/* Preview */}
              <p className="text-sm text-[#78716C] line-clamp-3 mb-4">
                {memory.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-[#78716C]">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" /
                  <span>{memory.agentId}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /
                  <span>{memory.createdAt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]">
                    {selectedMemory.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[#292524] mt-3">{selectedMemory.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#78716C]" />
                </button>
              </div>

              <div className="prose prose-stone max-w-none">
                <p className="text-[#292524] whitespace-pre-wrap leading-relaxed">
                  {selectedMemory.content}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#E7E5E4] text-sm text-[#78716C]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#81B29A] flex items-center justify-center">
                    <span className="text-white font-medium">{selectedMemory.agentId[0]}</span>
                  </div>
                  <span>Created by {selectedMemory.agentId}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /
                  <span>{selectedMemory.createdAt}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
