"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KpiCards from "../components/KpiCards";
import CashFlowTracker from "../components/CashFlowTracker";
import ExpenseChart from "../components/ExpenseChart";
import TodoList from "../components/TodoList";
import RecentTransactions from "../components/RecentTransactions";
import { useDashboardData } from "../hooks/useDashboardData";

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const { 
    expenseData, transactions, totalEarned, totalSpent, budgetLimit 
  } = useDashboardData();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
      <Sidebar currentPath="/" />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-br from-primary-600 to-primary-900 pointer-events-none -z-10 rounded-b-[4rem] opacity-90 shadow-2xl" />
        
        <Header />

        <div className="flex-1 px-4 md:px-8 pb-24 md:pb-12 z-10">
          <KpiCards totalEarned={totalEarned} totalSpent={totalSpent} budgetLimit={budgetLimit} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <CashFlowTracker totalEarned={totalEarned} totalSpent={totalSpent} />
              <ExpenseChart expenseData={expenseData} />
            </div>

            <div className="flex flex-col gap-6">
              <TodoList />
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
