"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  PenTool,
  Calendar,
  Users,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

const stats = [
  {
    label: "Active Tasks",
    value: "12",
    change: "+3",
    icon: CheckSquare,
    href: "/tasks",
    color: "#E07A5F",
  },
  {
    label: "Content Pipeline",
    value: "8",
    change: "2 filming",
    icon: PenTool,
    href: "/content",
    color: "#F4A5AE",
  },
  {
    label: "Upcoming Events",
    value: "5",
    change: "Today",
    icon: Calendar,
    href: "/calendar",
    color: "#81B29A",
  },
  {
    label: "Team Members",
    value: "5",
    change: "2 working",
    icon: Users,
    href: "/team",
    color: "#6B8DD6",
  },
];

// Updated activity with Japanese names
const recentActivity = [
  { id: 1, text: "Mika deployed: Mission Control v2.0", time: "30 mins ago", type: "dev", agent: "Mika", agentColor: "#6B8DD6" },
  { id: 2, text: "Sakura drafted: AI Workflow Tutorial", time: "1 hour ago", type: "content", agent: "Sakura", agentColor: "#F4A5AE" },
  { id: 3, text: "Hana designed: New dashboard cards", time: "2 hours ago", type: "design", agent: "Hana", agentColor: "#81B29A" },
  { id: 4, text: "Rin researched: Animation libraries", time: "3 hours ago", type: "research", agent: "Rin", agentColor: "#E8B86D" },
  { id: 5, text: "Yuki approved: Content calendar", time: "4 hours ago", type: "command", agent: "Yuki", agentColor: "#E07A5F" },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header - Yuki HQ Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E07A5F] via-[#F4A5AE] to-[#F4A896] flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#292524]">Yuki HQ</h1>
        </div>
        <p className="text-[#78716C]">Welcome back, Commander. Here's the status of your AI workforce.</p>
      </motion.div>

      {/* Stats Grid with Hover Lift */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={itemVariants}>
              <Link href={stat.href}>
                <div className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#78716C]" />
                  </div>
                  <p className="text-3xl font-bold text-[#292524] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#78716C] mb-2">{stat.label}</p>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]"
                  >
                    {stat.change}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Priority */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover"
          >
            <div className="flex items-center justify-between mb-6"
          >
              <h2 className="text-lg font-semibold text-[#292524]">Today's Priority</h2>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#E07A5F] text-white"
              >
                High Priority
              </span>
            </div>
            <div className="p-4 bg-[#F5F5F4] rounded-xl border border-[#E7E5E4]"
          >
              <h3 className="font-medium text-[#292524] mb-2">Complete Yuki HQ Rebrand</h3>
              <p className="text-sm text-[#78716C] mb-4">
                Finalize the dashboard upgrade with Yuki HQ theme: Japanese-inspired design,
                tasteful animations, and agent rebrand to Yuki, Sakura, Hana, Mika, and Rin.
              </p>
              <div className="flex items-center gap-4 text-sm text-[#78716C]"
          >
                <div className="flex items-center gap-1"
          >
                  <Clock className="w-4 h-4" />
                  <span>Due today</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] text-xs font-medium"
                >
                  In Progress
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activity with Agent Colors */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover"
          >
            <h2 className="text-lg font-semibold text-[#292524] mb-6">Recent Activity</h2>
            <div className="space-y-4"
          >
              {recentActivity.map((activity, index) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="flex items-start gap-3"
          >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: activity.agentColor }}
                  >
                    {activity.agent[0]}
                  </div>
                  <div className="flex-1"
          >
                    <p className="text-sm text-[#292524]">{activity.text}</p>
                    <p className="text-xs text-[#78716C]">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Team Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <motion.div variants={itemVariants}
        >
          <h2 className="text-lg font-semibold text-[#292524] mb-4">Team Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { name: "Yuki", role: "Commander", status: "working", color: "#E07A5F" },
              { name: "Sakura", role: "Content", status: "working", color: "#F4A5AE" },
              { name: "Hana", role: "Design", status: "idle", color: "#81B29A" },
              { name: "Mika", role: "Developer", status: "working", color: "#6B8DD6" },
              { name: "Rin", role: "Research", status: "idle", color: "#E8B86D" },
            ].map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-[#E7E5E4] card-hover flex items-center gap-3"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: agent.color }}
                >
                  {agent.name[0]}
                </div>
                <div className="flex-1"
          >
                  <p className="font-medium text-[#292524] text-sm">{agent.name}</p>
                  <p className="text-xs text-[#78716C]">{agent.role}</p>
                </div>
                <div 
                  className={`w-2 h-2 rounded-full ${
                    agent.status === "working" ? "bg-[#81B29A] animate-pulse" : "bg-[#78716C]"
                  }`} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
