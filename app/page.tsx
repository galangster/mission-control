"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  PenTool,
  Calendar,
  Users,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      ease: [0.22, 1, 0.36, 1],
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
    color: "#81B29A",
  },
  {
    label: "Upcoming Events",
    value: "5",
    change: "Today",
    icon: Calendar,
    href: "/calendar",
    color: "#F4A896",
  },
  {
    label: "Team Members",
    value: "4",
    change: "1 working",
    icon: Users,
    href: "/team",
    color: "#A8D5C3",
  },
];

const recentActivity = [
  { id: 1, text: "Completed task: Review Q1 metrics", time: "2 hours ago", type: "task" },
  { id: 2, text: "Created content idea: AI Workflow Tutorial", time: "4 hours ago", type: "content" },
  { id: 3, text: "Scheduled: Team sync tomorrow 9am", time: "5 hours ago", type: "calendar" },
  { id: 4, text: "Yuki completed: Draft blog post", time: "8 hours ago", type: "agent" },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#292524] mb-2">Dashboard</h1>
        <p className="text-[#78716C]">Welcome back. Here's what's happening with your OpenClaw.</p>
      </motion.div>

      {/* Stats Grid */}
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
                <div className="bg-white rounded-2xl p-6 border border-[#E7E5E4] card-hover cursor-pointer">
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
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F5F5F4] text-[#78716C]">
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
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-[#E7E5E4]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#292524]">Today's Priority</h2>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#E07A5F] text-white">
                Revenue
              </span>
            </div>
            <div className="p-4 bg-[#F5F5F4] rounded-xl border border-[#E7E5E4]">
              <h3 className="font-medium text-[#292524] mb-2">Finalize Mission Control Dashboard</h3>
              <p className="text-sm text-[#78716C] mb-4">
                Complete the dashboard implementation with all 6 core features: Task Board,
                Content Pipeline, Calendar, Memories, Team, and Office View.
              </p>
              <div className="flex items-center gap-4 text-sm text-[#78716C]">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Due today</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#81B29A]/20 text-[#81B29A] text-xs font-medium">
                  In Progress
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-[#E7E5E4]">
            <h2 className="text-lg font-semibold text-[#292524] mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`
                    w-2 h-2 rounded-full mt-2 flex-shrink-0
                    ${activity.type === "task" ? "bg-[#E07A5F]" :
                      activity.type === "content" ? "bg-[#81B29A]" :
                      activity.type === "calendar" ? "bg-[#F4A896]" :
                      "bg-[#A8D5C3]"}
                  `} />
                  <div>
                    <p className="text-sm text-[#292524]">{activity.text}</p>
                    <p className="text-xs text-[#78716C]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
