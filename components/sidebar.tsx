"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  LayoutDashboard,
  Receipt,
  Settings,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav config ──────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [{ label: "Dashboard", href: "/", icon: BarChart3 }],
  },
  {
    title: "Management",
    items: [
      { label: "Employee", href: "/employees", icon: Users },
      { label: "Projects", href: "/projects", icon: LayoutDashboard },
      { label: "Expenses", href: "/expenses", icon: Receipt },
    ],
  },

];

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-background transition-all duration-200",
        collapsed ? "w-14" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-border px-3",
          collapsed ? "justify-center" : "gap-2.5"
        )}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
          <Building2 size={14} />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight">CompanyHub</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-2 pt-3">
        {navGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {group.title && !collapsed && (
              <p className="mb-1 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon
                    size={16}
                    className={cn(
                      "shrink-0",
                      isActive
                        ? "text-background"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Toggle */}
      <div className={cn("border-t border-border p-2", collapsed && "flex justify-center")}>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground",
            "hover:bg-muted hover:text-foreground transition-colors w-full",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? (
            <PanelLeftOpen size={15} />
          ) : (
            <>
              <PanelLeftClose size={15} />
              <span>접기</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}