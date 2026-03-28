"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, CalendarIcon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface TodoItem {
  id: number;
  name: string;
  date: string;
  deadline: string;
  completed: boolean;
}

export default function TodoList() {
  const initialTodos: TodoItem[] = [];

  const [todos, setTodos] = useLocalStorage<TodoItem[]>("pine-finance-todos-v3", initialTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoDeadline, setNewTodoDeadline] = useState("");

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;
    
    // Default deadline to 1 day from now if not specified
    const deadlineVal = newTodoDeadline 
      ? new Date(newTodoDeadline).toISOString() 
      : new Date(Date.now() + 86400000).toISOString();

    setTodos([...todos, { 
      id: Date.now(), 
      name: newTodoName, 
      date: new Date().toISOString(), 
      deadline: deadlineVal,
      completed: false 
    }]);
    
    setNewTodoName("");
    setNewTodoDeadline("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
                  onClick={() => toggleTodo(todo.id)}
                  className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    todo.completed ? 'bg-primary-500 border-primary-500' : 'border-slate-300 hover:border-primary-500'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex flex-col flex-1 overflow-hidden">
                  <span className={`text-sm truncate transition-all ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                    {todo.name}
                  </span>
                  <div className={`flex items-center gap-1 text-[10px] mt-0.5 ${todo.completed ? 'text-slate-300' : 'text-slate-400'}`}>
                    <CalendarIcon className="w-3 h-3" />
                    <span>Due: {new Date(todo.deadline).toLocaleDateString()}</span>
                  </div>
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
        <div className="space-y-2 mb-2">
          <input 
            type="text" 
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            placeholder="Task name..." 
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={newTodoDeadline}
              onChange={(e) => setNewTodoDeadline(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none text-slate-500 focus:ring-2 focus:ring-primary-500"
            />
            <button 
              type="submit"
              disabled={!newTodoName.trim()}
              className="p-2 shrink-0 bg-primary-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
