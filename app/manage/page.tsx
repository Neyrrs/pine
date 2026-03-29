"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useDashboardData } from "../../hooks/useDashboardData";
import { PlusCircle, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ManageDataPage() {
  const [isClient, setIsClient] = useState(false);
  const { addTransaction } = useDashboardData();

  // Finance form state
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  if (!isClient) return null;

  const handleFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a transaction name.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Saving transaction...");

    try {
      await addTransaction({
        name,
        amount: parseFloat(amount),
        type,
        date: new Date(date).toISOString(),
      });

      toast.success(
        `${type === "income" ? "Pemasukan" : "Pengeluaran"} added!`,
        {
          id: toastId,
          description: `"${name}" — Rp ${parseFloat(amount).toLocaleString("id-ID")} saved successfully.`,
        }
      );

      // Reset form
      setName("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
      <Sidebar currentPath="/manage" />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-br from-primary-600 to-primary-900 pointer-events-none -z-10 rounded-b-[4rem] opacity-90 shadow-2xl" />

        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 px-4 md:px-8 pb-24 md:pb-12 z-10 mx-auto w-full"
        >
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <PlusCircle className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-bold text-slate-800">Add New Entry</h3>
            </div>

            <form onSubmit={handleFinanceSubmit} className="space-y-6">
              {/* Entry Type Toggle */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Type of Entry
                </label>
                <div className="grid md:grid-rows-1 grid-rows-2 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold ${
                      type === "expense"
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Pengeluaran (Expense)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold ${
                      type === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    Pemasukan (Income)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Transaction Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Groceries, Salary, Electric Bill"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Amount (Rp)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow font-mono"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow text-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-primary-200 transition-all hover:shadow-primary-300 transform hover:-translate-y-0.5"
              >
                {loading ? "Saving..." : `Save ${type === "income" ? "Pemasukan" : "Pengeluaran"}`}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
