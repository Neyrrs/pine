"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import RecentTransactions from "../../components/RecentTransactions";
import { useDashboardData } from "../../hooks/useDashboardData";

export default function TransactionsPage() {
  const [isClient, setIsClient] = useState(false);
  const { transactions } = useDashboardData();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
      <Sidebar currentPath="/transactions" />
      
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-br from-primary-600 to-primary-900 pointer-events-none -z-10 rounded-b-[4rem] opacity-90 shadow-2xl" />
        
        <Header />

        <div className="flex-1 px-4 md:px-8 pb-24 md:pb-12 z-10">
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 min-h-[600px]">
             <h2 className="text-2xl font-bold text-slate-800 mb-6">All Transactions</h2>
             <RecentTransactions transactions={transactions} />
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
