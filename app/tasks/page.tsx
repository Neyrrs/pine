"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TodoList from "../../components/TodoList";

export default function TasksPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex overflow-hidden font-sans">
      <Sidebar currentPath="/tasks" />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full relative">
        <div className="absolute top-0 left-0 w-full h-80 bg-linear-to-br from-primary-600 to-primary-900 pointer-events-none -z-10 rounded-b-[4rem] opacity-90 shadow-2xl" />

        <Header />

        <div className="flex-1 px-4 md:px-8 pb-24 md:pb-12 z-10 mx-auto w-full">
          <TodoList />
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />
    </div>
  );
}
