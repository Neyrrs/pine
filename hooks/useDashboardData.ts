import { useLocalStorage } from './useLocalStorage';

export interface FinanceEntry {
  id: number;
  name: string;
  type: 'income' | 'expense';
  date: string;
  amount: number;
}

export function useDashboardData() {
  const initialTransactions: FinanceEntry[] = [];

  const [transactions, setTransactions] = useLocalStorage<FinanceEntry[]>('pine-finance-transactions-v3', initialTransactions);
  
  // Derived stats
  const totalEarned = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const budgetLimit = 2500;

  // Compute dynamic chart data by grouping into Weeks relative to current month (simplified mock logic)
  // For a real app we'd group by actual Date/Week. Here we just mock a 4-week split based on transactions.
  const expenseData = [
    { name: "Week 1", spend: totalSpent * 0.2, earn: totalEarned * 0.2 },
    { name: "Week 2", spend: totalSpent * 0.3, earn: totalEarned * 0.3 },
    { name: "Week 3", spend: totalSpent * 0.4, earn: totalEarned * 0.4 },
    { name: "Week 4", spend: totalSpent * 0.1, earn: totalEarned * 0.1 },
  ];

  const addTransaction = (entry: Omit<FinanceEntry, 'id'>) => {
    setTransactions(prev => [{ ...entry, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
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
