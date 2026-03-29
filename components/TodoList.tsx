"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, CalendarIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface TodoItem {
  id: string; // Updated to match Supabase UUID
  text: string;
  completed: boolean;
  created_at?: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        fetchTodos(data.user.id);
      }
    });
  }, []);

  const fetchTodos = async (userId: string) => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setTodos(data);
  };

  const toggleTodo = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    
    if (!user) return;
    const { error } = await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id);
    if (error) {
      // Revert on failure
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: currentStatus } : todo));
      toast.error('Failed to update task.');
    } else {
      toast.success(!currentStatus ? 'Task completed! 🎉' : 'Task reopened.');
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) {
      toast.error('Please enter a task name.');
      return;
    }
    if (!user) return;
    
    const toastId = toast.loading('Adding task...');
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text: newTodoName, completed: false, user_id: user.id }])
      .select()
      .single();
    
    if (data && !error) {
      setTodos([data, ...todos]);
      toast.success('Task added!', { id: toastId, description: newTodoName });
    } else {
      toast.error('Failed to add task.', { id: toastId });
    }
    
    setNewTodoName('');
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete task.');
      if (todo) setTodos(prev => [todo, ...prev]);
    } else {
      toast.success('Task deleted.', { description: todo?.text });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col max-h-[500px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800">Tasks</h3>
        <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">
          {todos.filter(t => !t.completed).length} pending
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1 custom-scrollbar">
        <AnimatePresence>
          {todos.map(todo => (
            <motion.div 
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`group flex items-center justify-between p-3 rounded-2xl transition-all ${todo.completed ? 'bg-slate-50' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <button 
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    todo.completed ? 'bg-primary-500 border-primary-500' : 'border-slate-300 hover:border-primary-500'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className={`text-sm truncate transition-all ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                    {todo.text}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {todos.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-sm">
            All tasks completed! 🎉
          </div>
        )}
      </div>

      <form onSubmit={addTodo} className="mt-auto bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            placeholder="Add a new task..." 
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button 
            type="submit"
            disabled={!newTodoName.trim()}
            className="p-2 shrink-0 bg-primary-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
