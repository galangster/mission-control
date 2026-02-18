"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  PenTool,
  Calendar,
  Brain,
  Users,
  Building2,
  Cherry,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/content", label: "Content", icon: PenTool },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/memories", label: "Memories", icon: Brain },
  { href: "/team", label: "Team", icon: Users },
  { href: "/office", label: "Office", icon: Building2 },
];

// Yuki HQ Team with Japanese names
const teamMembers = [
  { id: "yuki", name: "Yuki", role: "CEO/Commander", color: "#E07A5F", initial: "Y" },
  { id: "sakura", name: "Sakura", role: "Content", color: "#F4A5AE", initial: "S" },
  { id: "hana", name: "Hana", role: "Design", color: "#81B29A", initial: "H" },
  { id: "mika", name: "Mika", role: "Dev", color: "#6B8DD6", initial: "M" },
  { id: "rin", name: "Rin", role: "Research", color: "#E8B86D", initial: "R" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#F5F5F4] border-r border-[#E7E5E4] flex flex-col">
      {/* Logo - Yuki HQ Branding */}
      <div className="p-6 border-b border-[#E7E5E4]">
        <Link href="/" className="flex items-center gap-3 group hover-lift">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E07A5F] via-[#F4A5AE] to-[#F4A896] flex items-center justify-center shadow-sm">
            <Cherry className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[#292524] text-lg leading-tight">Yuki HQ</h1>
            <p className="text-xs text-[#78716C]">Command Center</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.li 
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? "bg-white text-[#E07A5F] shadow-sm border border-[#E7E5E4]"
                      : "text-[#78716C] hover:text-[#292524] hover:bg-white/50"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-[#E07A5F] rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#E07A5F]" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Team Avatars */}
      <div className="px-4 pb-4">
        <p className="text-xs font-medium text-[#78716C] uppercase tracking-wider mb-3 px-4">Team</p>
        <div className="flex flex-wrap gap-2 px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="group relative"
              title={`${member.name} — ${member.role}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:scale-110 transition-transform elastic-button"
                style={{ backgroundColor: member.color }}
              >
                {member.initial}
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#292524] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {member.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#292524]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer - Yuki Online */}
      <div className="p-4 border-t border-[#E7E5E4]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#E7E5E4] card-hover">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#F4A5AE] flex items-center justify-center">
            <span className="text-white text-sm font-bold">Y</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#292524]">Yuki</p>
            <p className="text-xs text-[#78716C]">Commander Online</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#81B29A] animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
}
