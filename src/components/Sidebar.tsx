import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutGrid, Plus, Settings, StickyNote } from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { to: "/", icon: LayoutGrid, label: "All Notes" },
  { to: "/notes/create", icon: Plus, label: "Create Note" },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden w-64 flex-col md:flex py-4 pl-4"
    >
      <div className="flex-1 flex flex-col bg-card/50 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl h-[calc(100vh-2rem)]">
        <div className="p-6">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-foreground/80">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl shadow-lg shadow-primary/20">
              <StickyNote className="w-5 h-5" />
            </div>
            <span>Notes</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-black/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <link.icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="rounded-xl bg-gradient-to-br from-white/50 to-white/10 border border-white/20 p-4 backdrop-blur-md">
            <p className="text-xs font-semibold text-foreground/70">Pro Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-border/50 font-mono text-[10px] shadow-sm">
                Ctrl+K
              </kbd>{" "}
              to search
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
