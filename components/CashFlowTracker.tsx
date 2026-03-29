"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CashFlowTrackerProps {
  totalEarned: number;
  totalSpent: number;
}

export default function CashFlowTracker({ totalEarned, totalSpent }: CashFlowTrackerProps) {
  const percentSpentOfEarned = Math.min(100, Math.round((totalEarned > 0 ? (totalSpent / totalEarned) * 100 : 0)));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-4 md:gap-8"
    >
      <div className="relative w-28 h-28 md:w-40 md:h-40 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#f1f5f9" 
            strokeWidth="12" 
          />
          <circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#10b981" 
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={0}
          />
          <motion.circle 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            stroke="#f43f5e" 
            strokeWidth="12" 
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: (2 * Math.PI * 40) * (1 - percentSpentOfEarned / 100) }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg md:text-2xl font-bold text-slate-800">{percentSpentOfEarned}%</span>
          <span className="text-[9px] md:text-[10px] text-slate-400 font-medium uppercase tracking-wider">Spent</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 md:space-y-4 w-full">
        <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-0.5 md:mb-1">Monthly Cash Flow Tracker</h3>
        <p className="text-xs md:text-sm text-slate-500">You have spent {percentSpentOfEarned}% of your total earnings this month. Keep it under 80% to maintain a healthy savings rate.</p>
        
        <div className="grid grid-cols-2 gap-2 md:gap-4 mt-2 md:mt-4">
          <div className="bg-emerald-50 rounded-xl md:rounded-2xl p-3 md:p-4">
            <p className="text-emerald-600 text-[10px] md:text-xs font-semibold mb-0.5 md:mb-1 uppercase tracking-wider">Earned</p>
            <p className="text-emerald-700 font-bold text-sm md:text-xl">Rp {totalEarned.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-red-50 rounded-xl md:rounded-2xl p-3 md:p-4">
            <p className="text-red-600 text-[10px] md:text-xs font-semibold mb-0.5 md:mb-1 uppercase tracking-wider">Spent</p>
            <p className="text-red-700 font-bold text-sm md:text-xl">Rp {totalSpent.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
