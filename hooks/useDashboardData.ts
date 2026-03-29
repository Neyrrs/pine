import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export interface FinanceEntry {
  id: string; // Updated to string for UUID from Supabase
  name: string;
  type: 'income' | 'expense';
  date: string;
  amount: number;
}

export function useDashboardData() {
  const [transactions, setTransactions] = useState<FinanceEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchTransactions(data.user.id);
    });
  }, []);

  const fetchTransactions = async (userId: string) => {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (data) setTransactions(data);
  };

  // Derived stats
  const totalEarned = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const budgetLimit = 5_000_000;

  const expenseData = [
    { name: "Week 1", spend: totalSpent * 0.2, earn: totalEarned * 0.2 },
    { name: "Week 2", spend: totalSpent * 0.3, earn: totalEarned * 0.3 },
    { name: "Week 3", spend: totalSpent * 0.4, earn: totalEarned * 0.4 },
    { name: "Week 4", spend: totalSpent * 0.1, earn: totalEarned * 0.1 },
  ];

  const addTransaction = async (entry: Omit<FinanceEntry, 'id'>) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...entry, user_id: user.id }])
      .select()
      .single();
    
    if (data && !error) {
      setTransactions(prev => [data, ...prev]);
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (!error) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  return {
    expenseData,
    transactions,
    addTransaction,
    deleteTransaction,
    totalEarned,
    totalSpent,
    budgetLimit
  };
}
