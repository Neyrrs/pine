import React from "react";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
      <div className="flex items-center gap-2">
        <img src="/icon-app.png" alt="Pine Logo" className="w-4 h-4 object-contain opacity-50" />
        <span className="font-semibold text-slate-500">Pine</span>
      </div>
      <p>© 2026 Ezwan. All rights reserved.</p>
    </footer>
  );
}
