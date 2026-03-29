"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpenseChartProps {
  expenseData: any[];
}

function formatIDR(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
  if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)}rb`;
  return `Rp ${value.toLocaleString('id-ID')}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', borderRadius: 16, padding: '12px 16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: 'none' }}>
        <p style={{ fontWeight: 700, color: '#334155', marginBottom: 6 }}>{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color, fontSize: 13, margin: '2px 0' }}>
            {entry.name}: <strong>Rp {Number(entry.value).toLocaleString('id-ID')}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ExpenseChart({ expenseData }: ExpenseChartProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex-1"
    >
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-sm md:text-lg font-bold text-slate-800">Income vs Expenses</h3>
        <select className="bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expenseData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{fill: '#94a3b8', fontSize: 11}}
              tickFormatter={formatIDR}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
            <Bar dataKey="earn" name="Earned" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="spend" name="Spent" fill="#355872" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
