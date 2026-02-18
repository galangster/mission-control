"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Bot, Code, Palette, PenTool, X, Check, Search, BookOpen, Sparkles } from "lucide-react";

// Yuki HQ Team - Japanese names with roles and colors
const initialAgents = [
  {
    id: "1",
    name: "Yuki",
    role: "CEO/Commander",
    avatar: "Y",
    status: "working",
    currentTask: "Overseeing Yuki HQ operations",
    description: "Main AI assistant and strategic commander. Coordinates the entire team and makes high-level decisions.",
    color: "#E07A5F",
    icon: Sparkles,
  },
  {
    id: "2",
    name: "Sakura",
    role: "Content/Writer",
    avatar: "S",
    status: "working",
    currentTask: "Drafting AI Workflow Tutorial",
    description: "Creative wordsmith specializing in scripts, blog posts, and marketing copy with cherry blossom flair.",
    color: "#F4A5AE",
    icon: PenTool,
  },
  {
    id: "3",
    name: "Hana",
    role: "Designer",
    avatar: "H",
    status: "idle",
    currentTask: null,
    description: "Visual artist handling UI/UX, thumbnails, and brand aesthetics with nature-inspired creativity.",
    color: "#81B29A",
    icon: Palette,
  },
  {
    id: "4",
    name: "Mika",
    role: "Developer",
    avatar: "M",
    status: "working",
    currentTask: "Building animation components",
    description: "Technical architect specializing in software development, debugging, and system architecture.",
    color: "#6B8DD6",
    icon: Code,
  },
  {
    id: "5",
    name: "Rin",
    role: "Researcher",
    avatar: "R",
    status: "idle",
    currentTask: null,
    description: "Intelligence gatherer focused on deep research, data analysis, and competitive intelligence.",
    color: "#E8B86D",
    icon: BookOpen,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function TeamPage() {
  const [agents, setAgents] = useState(initialAgents);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAgent, setNewAgent] = useState({
    name: "",
    role: "",
    description: "",
    color: "#E07A5F",
  });

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const createAgent = () => {
    if (!newAgent.name || !newAgent.role) return;
    
    const agent = {
      id: Date.now().toString(),
      ...newAgent,
      avatar: newAgent.name[0],
      status: "idle" as const,
      currentTask: null,
      icon: Bot,
    };
    
    setAgents((prev) => [...prev, agent]);
    setNewAgent({ name: "", role: "", description: "", color: "#E07A5F" });
    setIsCreating(false);
  };

  const updateAgent = (id: string, updates: Partial<typeof agents[0]>) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    setEditingId(null);
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
            <h1 className="text-3xl font-bold text-[#292524] mb-2">Team</h1>
            <p className="text-[#78716C]">Your AI workforce at Yuki HQ.</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E07A5F] text-white rounded-xl font-medium hover:bg-[#C45A3F] transition-colors elastic-button"
          >
            <Plus className="w-4 h-4" />
            Add Agent
          </button>
        </div>
      </motion.div>

      {/* Team Grid with Staggered Reveal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {agents.map((agent) => {
          const Icon = agent.icon || Bot;
          const isEditing = editingId === agent.id;

          return (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              layout
              className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover"
            >
              {isEditing ? (
                <div className="space-y-4"
          >
                  <input
                    type="text"
                    defaultValue={agent.name}
                    onChange={(e) => updateAgent(agent.id, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    defaultValue={agent.role}
                    onChange={(e) => updateAgent(agent.id, { role: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    placeholder="Role"
                  />
                  <textarea
                    defaultValue={agent.description}
                    onChange={(e) => updateAgent(agent.id, { description: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] resize-none"
                    rows={2}
                    placeholder="Description"
                  />
                  <div className="flex gap-2"
          >
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 bg-[#F5F5F4] rounded-lg text-[#78716C] hover:bg-[#E7E5E4] transition-colors elastic-button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 bg-[#81B29A] text-white rounded-lg hover:bg-[#6B9A84] transition-colors elastic-button"
                    >
                      <Check className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4"
          >
                    <div className="flex items-center gap-3"
          >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                        style={{ backgroundColor: agent.color }}
                      >
                        {agent.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#292524]">{agent.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-[#78716C]"
          >
                          <Icon className="w-3 h-3" />
                          <span>{agent.role}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1"
          >
                      <button
                        onClick={() => setEditingId(agent.id)}
                        className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors elastic-button"
                      >
                        <Edit2 className="w-4 h-4 text-[#78716C]" />
                      </button>
                      <button
                        onClick={() => deleteAgent(agent.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors elastic-button"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-[#78716C] mb-4">{agent.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E7E5E4]"
          >
                    <div className="flex items-center gap-2"
          >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          agent.status === "working"
                            ? "bg-[#81B29A] animate-pulse"
                            : "bg-[#78716C]"
                        }`}
                      />
                      <span className="text-sm text-[#78716C] capitalize">{agent.status}</span>
                    </div>
                    
                    {agent.currentTask && (
                      <span className="text-xs text-[#78716C] bg-[#F5F5F4] px-2 py-1 rounded-lg truncate max-w-[150px]"
                      >
                        {agent.currentTask}
                      </span>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreating(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6"
          >
                <h2 className="text-xl font-bold text-[#292524]">Add New Agent</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors elastic-button"
                >
                  <X className="w-5 h-5 text-[#78716C]" />
                </button>
              </div>

              <div className="space-y-4"
          >
                <div>
                  <label className="block text-sm font-medium text-[#292524] mb-1">Name</label>
                  <input
                    type="text"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    placeholder="e.g., Bot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#292524] mb-1">Role</label>
                  <input
                    type="text"
                    value={newAgent.role}
                    onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                    placeholder="e.g., Research Analyst"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#292524] mb-1">Description</label>
                  <textarea
                    value={newAgent.description}
                    onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F] resize-none"
                    rows={3}
                    placeholder="What does this agent do?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#292524] mb-2">Color</label>
                  <div className="flex gap-2"
          >
                    {["#E07A5F", "#F4A5AE", "#81B29A", "#6B8DD6", "#E8B86D", "#78716C", "#292524"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewAgent({ ...newAgent, color })}
                        className={`w-8 h-8 rounded-lg transition-transform ${
                          newAgent.color === color ? "ring-2 ring-offset-2 ring-[#292524] scale-110" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={createAgent}
                  disabled={!newAgent.name || !newAgent.role}
                  className="w-full py-3 bg-[#E07A5F] text-white rounded-xl font-medium hover:bg-[#C45A3F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors elastic-button"
                >
                  Create Agent
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
