"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Calendar, User, X, FileText, Sparkles } from "lucide-react";

const initialMemories = [
  {
    id: "1",
    title: "Yuki HQ Concept",
    content: "The Yuki HQ dashboard is a reimagined Mission Control with Japanese-inspired aesthetics. Key features include: Task Board, Content Pipeline, Calendar, Memory Archive, Team management, and Office View. Named after Yuki (snow/purity), the main commander.",
    category: "Ideas",
    agentId: "Yuki",
    createdAt: "2026-02-18",
  },
  {
    id: "2",
    title: "Animation Philosophy",
    content: "Tasteful animations that respect performance: Elastic button presses for satisfying interaction feedback, Hover Lift for card depth perception, Staggered List Reveal for content discovery, and Shimmer loading states instead of spinners.",
    category: "Design",
    agentId: "Hana",
    createdAt: "2026-02-18",
  },
  {
    id: "3",
    title: "Team Structure - Yuki HQ",
    content: "Yuki (CEO/Commander) - coral/rose, Sakura (Content/Writer) - cherry blossom pink, Hana (Designer) - moss green, Mika (Developer) - indigo, Rin (Researcher) - amber. Each with distinct roles and color coding.",
    category: "Team",
    agentId: "Yuki",
    createdAt: "2026-02-17",
  },
  {
    id: "4",
    title: "Performance Guidelines",
    content: "CSS-only animations where possible. Framer Motion only for complex sequences. No scroll-based animations. prefers-reduced-motion support mandatory. 60fps target on all interactions.",
    category: "Research",
    agentId: "Rin",
    createdAt: "2026-02-16",
  },
  {
    id: "5",
    title: "Content Strategy Notes",
    content: "Content pillars: 1) AI workflow tutorials featuring Yuki HQ, 2) OpenClaw tips and tricks, 3) Behind-the-scenes team dynamics. Post 2-3x per week with Sakura leading content creation.",
    category: "Strategy",
    agentId: "Sakura",
    createdAt: "2026-02-15",
  },
];

const categories = ["All", "Ideas", "Research", "Design", "Strategy", "Team"];

// Agent colors
const agentColors: Record<string, string> = {
  Yuki: "#E07A5F",
  Sakura: "#F4A5AE",
  Hana: "#81B29A",
  Mika: "#6B8DD6",
  Rin: "#E8B86D",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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
              <Sparkles className="w-6 h-6 text-[#81B29A]" />
              <h1 className="text-3xl font-bold text-[#292524]">Memories</h1>
            </div>
            <p className="text-[#78716C]">Your digital memory archive.</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E07A5F]/20 flex items-center justify-center"
          >
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
        <div className="relative"
          >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search memories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-all"
          />
        </div>

        {/* Category Filter - Elastic Buttons */}
        <div className="flex flex-wrap gap-2"
          >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all elastic-button
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
      <p className="text-sm text-[#78716C] mb-4"
      >
        {filteredMemories.length} memory{filteredMemories.length !== 1 ? "ies" : ""}
      </p>

      {/* Memory Grid with Staggered Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((memory) => (
            <motion.div
              key={memory.id}
              layout
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedMemory(memory)}
              className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4"
          >
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]"
          >
                  {memory.category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#E07A5F]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
                  <FileText className="w-4 h-4 text-[#E07A5F]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#292524] mb-2 line-clamp-2"
          >
                {memory.title}
              </h3>

              {/* Preview */}
              <p className="text-sm text-[#78716C] line-clamp-3 mb-4"
          >
                {memory.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-[#78716C]"
          >
                <div className="flex items-center gap-1"
          >
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ backgroundColor: agentColors[memory.agentId] || "#78716C" }}
                  >
                    {memory.agentId[0]}
                  </div>
                  <span>{memory.agentId}</span>
                </div>
                <div className="flex items-center gap-1"
          >
                  <Calendar className="w-3 h-3" />
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
              <div className="flex items-start justify-between mb-6"
          >
                <div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]"
          >
                    {selectedMemory.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[#292524] mt-3">{selectedMemory.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors elastic-button"
                >
                  <X className="w-5 h-5 text-[#78716C]" />
                </button>
              </div>

              <div className="prose prose-stone max-w-none"
          >
                <p className="text-[#292524] whitespace-pre-wrap leading-relaxed"
          >
                  {selectedMemory.content}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#E7E5E4] text-sm text-[#78716C]"
          >
                <div className="flex items-center gap-2"
          >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: agentColors[selectedMemory.agentId] || "#78716C" }}
                  >
                    {selectedMemory.agentId[0]}
                  </div>
                  <span>Created by {selectedMemory.agentId}</span>
                </div>
                <div className="flex items-center gap-1"
          >
                  <Calendar className="w-4 h-4" />
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
