"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardsProps {
  totalEarned: number;
  totalSpent: number;
  budgetLimit: number;
}

export default function KpiCards({ totalEarned, totalSpent, budgetLimit }: KpiCardsProps) {
  const percentSpentOfBudget = Math.round((totalSpent / budgetLimit) * 100);
  const totalBalance = totalEarned - totalSpent; // simple calc

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Total Balance</p>
            <h3 className="text-3xl font-bold text-slate-800">${totalBalance.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-primary-50 rounded-2xl text-primary-600">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center text-emerald-500 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +2.5%
          </span>
          <span className="text-slate-400">vs last month</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Earned This Month</p>
            <h3 className="text-3xl font-bold text-slate-800">${totalEarned.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-full"></div>
        </div>
        <p className="text-xs text-slate-400 mt-2">Excellent performance</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Spent This Month</p>
            <h3 className="text-3xl font-bold text-slate-800">${totalSpent.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-red-50 rounded-2xl text-red-500">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentSpentOfBudget}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full rounded-full ${percentSpentOfBudget > 80 ? 'bg-red-500' : 'bg-amber-400'}`}
          />
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-slate-500">{percentSpentOfBudget}% of limit</span>
          <span className="text-slate-400">${budgetLimit.toLocaleString()} limit</span>
        </div>
      </motion.div>
    </div>
  );
}
