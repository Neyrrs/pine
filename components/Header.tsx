"use client";

import React, { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading("Signing you out...");
    await supabase.auth.signOut();
    toast.success("Signed out successfully!", {
      id: toastId,
      description: "See you next time! 👋",
      duration: 2000,
    });
    setTimeout(() => router.push("/login"), 1000);
  };

  const confirmLogout = () => {
    toast.error("Ready to leave?", {
      description: "Are you sure you want to sign out?",
      action: {
        label: "Yes, Sign out",
        onClick: () => handleLogout(),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between shrink-0 z-10 gap-2">
      <h1 className="text-xl md:text-2xl font-semibold text-black tracking-tight truncate">
        Pine
      </h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white placeholder:text-white/60 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 w-48 md:w-64 backdrop-blur-sm"
          />
        </div>
        {user?.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-white/20"
          />
        )}
        <button
          onClick={confirmLogout}
          className="p-2 bg-white/10 cursor-pointer hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-black" />
        </button>
      </div>
    </header>
  );
}
