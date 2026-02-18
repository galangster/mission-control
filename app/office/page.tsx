"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Code, Palette, PenTool, Maximize2, Minimize2 } from "lucide-react";

const officeAgents = [
  { id: "1", name: "Yuki", role: "Chief Assistant", x: 50, y: 40, status: "working", color: "#E07A5F", icon: Bot },
  { id: "2", name: "Code", role: "Developer", x: 20, y: 30, status: "idle", color: "#81B29A", icon: Code },
  { id: "3", name: "Scribe", role: "Writer", x: 80, y: 35, status: "idle", color: "#F4A896", icon: PenTool },
  { id: "4", name: "Pixel", role: "Designer", x: 35, y: 70, status: "idle", color: "#A8D5C3", icon: Palette },
];

const zones = [
  { id: "dev", name: "Development", x: 15, y: 20, color: "#81B29A" },
  { id: "content", name: "Content", x: 70, y: 25, color: "#F4A896" },
  { id: "design", name: "Design", x: 25, y: 60, color: "#A8D5C3" },
  { id: "command", name: "Command", x: 40, y: 30, color: "#E07A5F" },
];

export default function OfficePage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof officeAgents[0] | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 pb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#292524] mb-2">Office</h1>
            <p className="text-[#78716C]">Visual overview of your team at work.</p>
          </div>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-3 bg-white border border-[#E7E5E4] rounded-xl hover:bg-[#F5F5F4] transition-colors"
          >
            {isZoomed ? (
              <Minimize2 className="w-5 h-5 text-[#78716C]" />
            ) : (
              <Maximize2 className="w-5 h-5 text-[#78716C]" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Office Floor Plan */}
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
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #E7E5E4 1px, transparent 1px),
                linear-gradient(to bottom, #E7E5E4 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Zones */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute rounded-2xl border-2 border-dashed p-4"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: "25%",
                height: "30%",
                borderColor: `${zone.color}40`,
                backgroundColor: `${zone.color}08`,
              }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: zone.color }}
              >
                {zone.name}
              </span>
            </div>
          ))}

          {/* Furniture - Desks */}
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
                {/* Desk */}
                <div className="relative">
                  <div className="w-24 h-16 bg-white rounded-xl border-2 border-[#E7E5E4] shadow-sm flex items-center justify-center">
                    <div className="w-12 h-8 bg-[#F5F5F4] rounded-lg border border-[#E7E5E4]" />
                  </div>

                  {/* Agent Avatar */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAgent(agent)}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        border-4 border-white shadow-lg
                        ${agent.status === "working" ? "animate-pulse" : ""}
                      `}
                      style={{ backgroundColor: agent.color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Status Indicator */}
                    <div
                      className={`
                        absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
                        ${agent.status === "working" ? "bg-[#81B29A]" : "bg-[#78716C]"}
                      `}
                    />
                  </motion.button>

                  {/* Name Tag */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white rounded-lg px-2 py-1 shadow-sm border border-[#E7E5E4]">
                      <p className="text-xs font-medium text-[#292524]">{agent.name}</p>
                    </div>
                  </div>

                  {/* Working Animation */}
                  {agent.status === "working" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-2 right-0"
                    >
                      <div className="flex gap-0.5">
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
                            className="w-1 bg-[#81B29A] rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Decorative Elements */}
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-2xl border-2 border-[#E7E5E4] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#E07A5F]/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#E07A5F]" />
            </div>
          </div>

          <div className="absolute top-8 right-8 w-20 h-12 bg-white rounded-xl border-2 border-[#E7E5E4]" />
        </div>
      </motion.div>

      {/* Agent Detail Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 pt-0"
      >
        {selectedAgent ? (
          <div className="bg-white rounded-2xl p-6 border border-[#E7E5E4] flex items-center gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: selectedAgent.color }}
            >
              {(() => {
                const Icon = selectedAgent.icon;
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#292524]">{selectedAgent.name}</h3>
              <p className="text-[#78716C]">{selectedAgent.role}</p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedAgent.status === "working" ? "bg-[#81B29A] animate-pulse" : "bg-[#78716C]"
                }`}
              />
              <span className="text-sm font-medium text-[#292524] capitalize">
                {selectedAgent.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-[#F5F5F4] rounded-2xl p-6 border border-dashed border-[#E7E5E4] text-center">
            <p className="text-[#78716C]">Click on an agent to see details</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
