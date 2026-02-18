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
  Sparkles,
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

export function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#F5F5F4] border-r border-[#E7E5E4] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#E7E5E4]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E07A5F] to-[#F4A896] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[#292524] text-lg leading-tight">Mission Control</h1>
            <p className="text-xs text-[#78716C]">OpenClaw HQ</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
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
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E7E5E4]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#E7E5E4]">
          <div className="w-8 h-8 rounded-full bg-[#81B29A] flex items-center justify-center">
            <span className="text-white text-sm font-medium">Y</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#292524]">Yuki</p>
            <p className="text-xs text-[#78716C]">Online</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#81B29A] animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
}
