"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Trophy, LayoutGrid, Sun, Moon } from 'lucide-react';
import { usePlayChale } from '@/components/PlayChaleProvider';
import { useTheme } from '@/components/ThemeProvider';

export default function Navigation() {
  const { setIsSearchModalOpen } = usePlayChale();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { href: '/feed', icon: LayoutGrid, label: 'Feed' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { href: '/profile', icon: Home, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        
        {/* Brand/Logo */}
        <Link href="/feed" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-2xl">P</span>
          </div>
          <span className="text-xl font-black tracking-tighter dark:text-white hidden sm:block italic">PlayChale</span>
        </Link>

        {/* Center: Main Nav Items */}
        <div className="flex items-center bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2.5 text-slate-400 hover:text-orange-600 dark:text-slate-500 dark:hover:text-orange-400 transition-all"
            title="Search Games"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-all"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </nav>
  );
}
