"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Home,
  CreditCard,
  PieChart as PieChartIcon,
  CheckSquare,
  PlusCircle,
  GitBranch,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = "/" }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 relative z-10 hover:shadow-lg transition-shadow">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <img
              src="/icon-app.png"
              alt="Pine Logo"
              className="w-6 h-6 object-contain"
            />
            <span>Pine</span>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <NavItem
            href="/"
            icon={<Home />}
            label="Dashboard"
            active={currentPath === "/"}
          />
          <NavItem
            href="/transactions"
            icon={<CreditCard />}
            label="Transactions"
            active={currentPath === "/transactions"}
          />
          <NavItem
            href="/analytics"
            icon={<PieChartIcon />}
            label="Analytics"
            active={currentPath === "/analytics"}
          />
          <NavItem
            href="/tasks"
            icon={<CheckSquare />}
            label="Tasks"
            active={currentPath === "/tasks"}
          />
          <NavItem
            href="/manage"
            icon={<PlusCircle />}
            label="Add Data"
            active={currentPath === "/manage"}
          />
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-9 h-9 rounded-full border-2 border-slate-100 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name + GitHub */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {displayName}
              </p>
              <Link
                href="https://github.com/Neyrrs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors mt-0.5"
              >
                <GitBranch className="w-3 h-3" />
                <span>Github dev repo: Neyrrs</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around z-50 px-2 pb-safe">
        <MobileNavItem
          href="/"
          icon={<Home />}
          active={currentPath === "/"}
          label="Home"
        />
        <MobileNavItem
          href="/transactions"
          icon={<CreditCard />}
          active={currentPath === "/transactions"}
          label="Txns"
        />
        <MobileNavItem
          href="/manage"
          icon={<PlusCircle />}
          active={currentPath === "/manage"}
          label="Add"
          isPrimary
        />
        <MobileNavItem
          href="/analytics"
          icon={<PieChartIcon />}
          active={currentPath === "/analytics"}
          label="Stats"
        />
        <MobileNavItem
          href="/tasks"
          icon={<CheckSquare />}
          active={currentPath === "/tasks"}
          label="Tasks"
        />
      </nav>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 w-full text-left
      ${
        active
          ? "bg-primary-50 text-primary-700 font-medium shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }
    `}
    >
      <div className={`${active ? "text-primary-600" : "text-slate-400"}`}>
        {React.cloneElement(icon as React.ReactElement<any>, {
          className: "w-5 h-5",
        })}
      </div>
      <span className="text-sm font-semibold tracking-wide">{label}</span>
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  label,
  active = false,
  isPrimary = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isPrimary?: boolean;
}) {
  if (isPrimary) {
    return (
      <Link
        href={href}
        className="relative -top-5 flex flex-col items-center justify-center gap-1 group"
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-primary-200 transition-transform active:scale-95 ${active ? "bg-primary-700" : "bg-primary-600"}`}
        >
          <div className="text-white">
            {React.cloneElement(icon as React.ReactElement<any>, {
              className: "w-6 h-6",
            })}
          </div>
        </div>
        <span className="text-[10px] font-bold text-primary-600">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${active ? "text-primary-600" : "text-slate-400 hover:text-slate-600"}`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, {
        className: "w-6 h-6 mb-0.5",
      })}
      <span className="text-[10px] font-medium leading-none">{label}</span>
      {active && (
        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-600" />
      )}
    </Link>
  );
}
