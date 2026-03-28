import React from "react";
import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between shrink-0 z-10 gap-2">
      <h1 className="text-xl md:text-2xl font-semibold text-black tracking-tight truncate">
        PineFinance
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
        <button className="relative p-2 text-black bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-primary-600"></span>
        </button>
      </div>
    </header>
  );
}
