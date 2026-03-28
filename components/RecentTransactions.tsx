"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, Trash2 } from 'lucide-react';
import { FinanceEntry } from '../hooks/useDashboardData';

interface RecentTransactionsProps {
  transactions: FinanceEntry[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1 flex flex-col min-h-[400px]"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {transactions.length === 0 ? (
           <div className="text-center py-6 text-slate-400 text-sm">No transactions yet</div>
        ) : (
          transactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tx.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{tx.name}</p>
                  <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-800'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
