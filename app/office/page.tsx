"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Palette, Code, BookOpen, Maximize2, Minimize2, Cherry } from "lucide-react";

// Yuki HQ Office - Japanese-inspired layout
const officeAgents = [
  { id: "1", name: "Yuki", role: "CEO/Commander", x: 50, y: 40, status: "working", color: "#E07A5F", icon: Sparkles },
  { id: "2", name: "Mika", role: "Developer", x: 20, y: 30, status: "working", color: "#6B8DD6", icon: Code },
  { id: "3", name: "Sakura", role: "Content", x: 80, y: 35, status: "working", color: "#F4A5AE", icon: PenTool },
  { id: "4", name: "Hana", role: "Designer", x: 30, y: 70, status: "idle", color: "#81B29A", icon: Palette },
  { id: "5", name: "Rin", role: "Research", x: 70, y: 75, status: "idle", color: "#E8B86D", icon: BookOpen },
];

// Japanese-inspired zone names
const zones = [
  { id: "dev", name: "Mika's Lab", x: 10, y: 15, color: "#6B8DD6", description: "Technical Hub" },
  { id: "content", name: "Sakura's Garden", x: 65, y: 20, color: "#F4A5AE", description: "Content Studio" },
  { id: "design", name: "Hana's Studio", x: 20, y: 55, color: "#81B29A", description: "Creative Space" },
  { id: "research", name: "Rin's Library", x: 60, y: 60, color: "#E8B86D", description: "Intelligence Center" },
  { id: "command", name: "Yuki's Court", x: 40, y: 30, color: "#E07A5F", description: "Command Center" },
];

export default function OfficePage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof officeAgents[0] | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Header - Yuki HQ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 pb-4"
      >
        <div className="flex items-center justify-between"
      >
          <div>
            <div className="flex items-center gap-2 mb-2"
          >
              <Cherry className="w-6 h-6 text-[#E07A5F]" />
              <h1 className="text-3xl font-bold text-[#292524]">Office</h1>
            </div>
            <p className="text-[#78716C]">Visual overview of your team at work.</p>
          </div>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-3 bg-white border border-[#E7E5E4] rounded-xl hover:bg-[#F5F5F4] transition-colors elastic-button"
          >
            {isZoomed ? (
              <Minimize2 className="w-5 h-5 text-[#78716C]" />
            ) : (
              <Maximize2 className="w-5 h-5 text-[#78716C]" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Office Floor Plan - Japanese-inspired */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 pt-4 relative overflow-hidden"
      >
        <div
          className={`
            relative w-full h-full bg-[#F5F5F4] rounded-3xl border border-[#E7E5E4] overflow-hidden
            transition-transform duration-500
            ${isZoomed ? "scale-110" : "scale-100"}
          `}
        >
          {/* Grid Pattern - Subtle tatami-inspired */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #E7E5E4 1px, transparent 1px),
                linear-gradient(to bottom, #E7E5E4 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Japanese-style decorative elements */}
          <div className="absolute top-4 left-4 w-24 h-24 border-2 border-dashed border-[#E07A5F]/20 rounded-full" />
          <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-dashed border-[#F4A5AE]/20 rounded-full" />

          {/* Zones - Japanese-inspired areas */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute rounded-2xl border-2 border-dashed p-4 transition-all hover:border-solid"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: "28%",
                height: "32%",
                borderColor: `${zone.color}40`,
                backgroundColor: `${zone.color}08`,
              }}
            >
              <div className="flex flex-col h-full justify-between"
          >
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: zone.color }}
                  >
                    {zone.name}
                  </span>
                  <p className="text-[10px] text-[#78716C] mt-1">{zone.description}</p>
                </div>
                <div 
                  className="w-8 h-1 rounded-full opacity-30"
                  style={{ backgroundColor: zone.color }}
                />
              </div>
            </div>
          ))}

          {/* Agents at their desks */}
          {officeAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="absolute"
                style={{
                  left: `${agent.x}%`,
                  top: `${agent.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Desk setup */}
                <div className="relative"
          >
                  {/* Tatami-style desk */}
                  <div className="w-28 h-20 bg-white rounded-xl border-2 border-[#E7E5E4] shadow-sm flex items-center justify-center relative overflow-hidden"
          >
                    {/* Desk surface detail */}
                    <div className="absolute inset-2 bg-[#F5F5F4] rounded-lg border border-[#E7E5E4]/50" />
                    <div className="w-14 h-8 bg-white rounded-md border border-[#E7E5E4] shadow-sm relative z-10"
          >
                      {/* Monitor glow effect for working agents */}
                      {agent.status === "working" && (
                        <div 
                          className="absolute inset-0 rounded-md animate-pulse"
                          style={{ 
                            backgroundColor: `${agent.color}10`,
                            boxShadow: `0 0 20px ${agent.color}30`
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Agent Avatar */}
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAgent(agent)}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 elastic-button"
                  >
                    <div
                      className={`
                        w-14 h-14 rounded-full flex items-center justify-center
                        border-4 border-white shadow-lg relative
                        ${agent.status === "working" ? "ring-2 ring-[#81B29A]/50" : ""}
                      `}
                      style={{ backgroundColor: agent.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      
                      {/* Working indicator */}
                      {agent.status === "working" && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            boxShadow: [
                              `0 0 0 0px ${agent.color}00`,
                              `0 0 0 8px ${agent.color}20`,
                              `0 0 0 0px ${agent.color}00`,
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Status Indicator */}
                    <div
                      className={`
                        absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center
                        ${agent.status === "working" ? "bg-[#81B29A]" : "bg-[#78716C]"}
                      `}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-white ${agent.status === "working" ? "animate-pulse" : ""}`} />
                    </div>
                  </motion.button>

                  {/* Name Tag */}
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
                    <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-[#E7E5E4]"
          >
                      <p className="text-xs font-bold text-[#292524]">{agent.name}</p>
                    </div>
                  </div>

                  {/* Working Animation Bars */}
                  {agent.status === "working" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-3 right-0"
                    >
                      <div className="flex gap-0.5"
          >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: [4, 12, 4],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="w-1 rounded-full"
                            style={{ backgroundColor: agent.color }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Decorative Elements - Japanese-inspired */}
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-2xl border-2 border-[#E7E5E4] flex items-center justify-center card-hover"
          >
            <div className="w-8 h-8 rounded-full bg-[#E07A5F]/20 flex items-center justify-center"
          >
              <div className="w-4 h-4 rounded-full bg-[#E07A5F]" />
            </div>
          </div>

          <div className="absolute top-8 right-8 w-20 h-12 bg-white rounded-xl border-2 border-[#E7E5E4] card-hover" />
        </div>
      </motion.div>

      {/* Agent Detail Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 pt-0"
      >
        {selectedAgent ? (
          <div className="bg-white rounded-2xl p-6 border border-[#E7E5E4] flex items-center gap-6 card-hover"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: selectedAgent.color }}
            >
              {(() => {
                const Icon = selectedAgent.icon;
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </div>
            <div className="flex-1"
          >
              <h3 className="text-xl font-bold text-[#292524]">{selectedAgent.name}</h3>
              <p className="text-[#78716C]">{selectedAgent.role}</p>
            </div>
            <div className="flex items-center gap-3"
          >
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedAgent.status === "working" ? "bg-[#81B29A] animate-pulse" : "bg-[#78716C]"
                }`}
              />
              <span className="text-sm font-medium text-[#292524] capitalize"
              >
                {selectedAgent.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-[#F5F5F4] rounded-2xl p-6 border border-dashed border-[#E7E5E4] text-center"
          >
            <p className="text-[#78716C]">Click on a team member to see details</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
