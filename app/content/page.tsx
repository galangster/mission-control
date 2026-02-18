"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight, FileText, Image as ImageIcon, Video, CheckCircle, Sparkles } from "lucide-react";

const initialContent = [
  { id: "1", title: "AI Workflow Tutorial", description: "How I use AI agents daily", stage: "ideas", createdAt: "2026-02-18", agent: "Sakura" },
  { id: "2", title: "Yuki HQ Setup Guide", description: "Complete setup from scratch", script: "In this video, I'll show you how to set up Yuki HQ...", stage: "script", createdAt: "2026-02-17", agent: "Sakura" },
  { id: "3", title: "Animation Deep Dive", description: "Elastic buttons and hover effects", script: "Let me show you the new animations...", thumbnailUrl: "https://picsum.photos/seed/mission/400/300", stage: "thumbnail", createdAt: "2026-02-16", agent: "Mika" },
  { id: "4", title: "Design Philosophy", description: "Japanese-inspired aesthetics", script: "The Yuki HQ theme draws from...", thumbnailUrl: "https://picsum.photos/seed/design/400/300", stage: "filming", createdAt: "2026-02-15", agent: "Hana" },
  { id: "5", title: "My First AI App", description: "Building with Claude", thumbnailUrl: "https://picsum.photos/seed/first/400/300", stage: "published", createdAt: "2026-02-10", agent: "Mika" },
];

const stages = [
  { id: "ideas", label: "Ideas", icon: Plus, color: "#78716C" },
  { id: "script", label: "Script", icon: FileText, color: "#E07A5F" },
  { id: "thumbnail", label: "Thumbnail", icon: ImageIcon, color: "#F4A5AE" },
  { id: "filming", label: "Filming", icon: Video, color: "#81B29A" },
  { id: "published", label: "Published", icon: CheckCircle, color: "#6B8DD6" },
];

// Agent colors
const agentColors: Record<string, string> = {
  Sakura: "#F4A5AE",
  Hana: "#81B29A",
  Mika: "#6B8DD6",
  Rin: "#E8B86D",
  Yuki: "#E07A5F",
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

export default function ContentPage() {
  const [content, setContent] = useState(initialContent);
  const [selectedItem, setSelectedItem] = useState<typeof content[0] | null>(null);

  const moveStage = (itemId: string, direction: "prev" | "next") => {
    const item = content.find((c) => c.id === itemId);
    if (!item) return;

    const currentIndex = stages.findIndex((s) => s.id === item.stage);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < stages.length) {
      setContent((prev) =>
        prev.map((c) =>
          c.id === itemId ? { ...c, stage: stages[newIndex].id } : c
        )
      );
    }
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
              <Sparkles className="w-6 h-6 text-[#F4A5AE]" />
              <h1 className="text-3xl font-bold text-[#292524]">Content Pipeline</h1>
            </div>
            <p className="text-[#78716C]">Ideas → Scripts → Thumbnails → Filming → Published.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#E07A5F] text-white rounded-xl font-medium hover:bg-[#C45A3F] transition-colors elastic-button"
          >
            <Plus className="w-4 h-4" />
            New Idea
          </button>
        </div>
      </motion.div>

      {/* Pipeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-4 overflow-x-auto pb-4"
      >
        {stages.map((stage, index) => {
          const stageContent = content.filter((c) => c.stage === stage.id);
          const Icon = stage.icon;

          return (
            <motion.div 
              key={stage.id} 
              variants={itemVariants}
              className="flex-shrink-0 w-72"
            >
              {/* Stage Header */}
              <div className="flex items-center gap-2 mb-4"
          >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stage.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stage.color }} />
                </div>
                <span className="font-semibold text-[#292524]">{stage.label}</span>
                <span className="text-sm text-[#78716C] bg-[#F5F5F4] px-2 py-0.5 rounded-full"
          >
                  {stageContent.length}
                </span>
                {index < stages.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#E7E5E4] ml-auto" />
                )}
              </div>

              {/* Content Cards */}
              <div className="space-y-3"
          >
                <AnimatePresence mode="popLayout">
                  {stageContent.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setSelectedItem(item)}
                      className="bg-white rounded-xl p-4 border border-[#E7E5E4] card-hover cursor-pointer"
                    >
                      {/* Thumbnail */}
                      {item.thumbnailUrl && (
                        <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-[#F5F5F4]"
          >
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-2"
          >
                        <h3 className="font-medium text-[#292524]">{item.title}</h3>
                      </div>
                      
                      <p className="text-sm text-[#78716C] mb-3">{item.description}</p>

                      {/* Agent Badge */}
                      <div className="flex items-center gap-2 mb-3"
          >
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ backgroundColor: agentColors[item.agent] || "#78716C" }}
                        >
                          {item.agent[0]}
                        </div>
                        <span className="text-xs text-[#78716C]">{item.agent}</span>
                      </div>

                      {/* Stage Controls */}
                      <div className="flex items-center justify-between"
          >
                        <span className="text-xs text-[#78716C]">{item.createdAt}</span>
                        <div className="flex gap-1"
          >
                          {index > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStage(item.id, "prev");
                              }}
                              className="p-1 rounded-lg hover:bg-[#F5F5F4] transition-colors elastic-button"
                            >
                              <ChevronLeft className="w-4 h-4 text-[#78716C]" />
                            </button>
                          )}
                          {index < stages.length - 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStage(item.id, "next");
                              }}
                              className="p-1 rounded-lg hover:bg-[#F5F5F4] transition-colors elastic-button"
                            >
                              <ChevronRight className="w-4 h-4 text-[#78716C]" />
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4"
          >
                <div>
                  <div className="flex items-center gap-2 mb-2"
          >
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C] uppercase"
                    >
                      {selectedItem.stage}
                    </span>
                    <div className="flex items-center gap-1"
          >
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                        style={{ backgroundColor: agentColors[selectedItem.agent] || "#78716C" }}
                      >
                        {selectedItem.agent[0]}
                      </div>
                      <span className="text-xs text-[#78716C]">{selectedItem.agent}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#292524]">{selectedItem.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors elastic-button"
                >
                  ✕
                </button>
              </div>

              <p className="text-[#78716C] mb-6">{selectedItem.description}</p>

              {selectedItem.thumbnailUrl && (
                <div className="mb-6 rounded-xl overflow-hidden"
          >
                  <img
                    src={selectedItem.thumbnailUrl}
                    alt={selectedItem.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}

              {selectedItem.script && (
                <div className="bg-[#F5F5F4] rounded-xl p-4"
          >
                  <h3 className="font-semibold text-[#292524] mb-2 flex items-center gap-2"
          >
                    <FileText className="w-4 h-4" />
                    Script
                  </h3>
                  <p className="text-[#292524] whitespace-pre-wrap font-mono text-sm">{selectedItem.script}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
