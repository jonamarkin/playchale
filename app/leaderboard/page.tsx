"use client";

import React from 'react';
import { Trophy } from 'lucide-react';
import { usePlayChale } from '@/components/PlayChaleProvider';
import PublicProfileModal from '@/components/PublicProfileModal';
import CompareModal from '@/components/CompareModal';
import Navigation from '@/components/Navigation';

export default function LeaderboardPage() {
  const { 
    user, leaderboardData, selectedSport, setSelectedSport,
    viewedProfile, setViewedProfile, comparingUser, setComparingUser,
    handleProfileCompare
  } = usePlayChale();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 md:pt-24 pt-20 pb-24 md:pb-8 selection:bg-orange-500/20">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">{selectedSport} Rankings</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Top performing {selectedSport} athletes in Ghana.</p>
                </div>
            </div>

            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                {user.stats.map(s => s.sport).map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedSport === s 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-slate-900/50' 
                      : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 border border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden">
                {leaderboardData.map((player, idx) => (
                <div 
                    key={player.id} 
                    onClick={() => setViewedProfile(player)}
                    className="flex items-center justify-between p-8 border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group"
                >
                    <div className="flex items-center gap-8">
                    <div className={`w-10 text-3xl font-black italic tracking-tighter ${idx === 0 ? 'text-orange-500' : 'text-slate-200 dark:text-slate-700'}`}>
                        0{idx + 1}
                    </div>
                    <div className="relative">
                        <img src={player.avatar} className="w-16 h-16 rounded-[22px] border-4 border-white dark:border-slate-800 shadow-xl object-cover group-hover:scale-110 transition-transform" alt={player.name} />
                        {idx === 0 && (
                        <div className="absolute -top-3 -right-3 bg-orange-500 text-white p-1.5 rounded-xl shadow-lg ring-2 ring-white dark:ring-slate-900">
                            <Trophy className="w-4 h-4" />
                        </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900 dark:text-white block tracking-tight">{player.name}</span>
                            {player.id === user.id && <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full">You</span>}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
                        {player.handle} • {player.trustScore}% Trust • {player.activeSportStat.gamesPlayed} Gms
                        </span>
                    </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                    <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">{player.score}</div>
                    <div className="w-32 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-50 dark:border-slate-700">
                        <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-full shadow-lg transition-all duration-1000" 
                        style={{ width: `${player.score}%` }}
                        ></div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </main>

      {viewedProfile && (
        <PublicProfileModal 
          user={viewedProfile}
          onClose={() => setViewedProfile(null)}
          onCompare={handleProfileCompare}
        />
      )}

      {comparingUser && (
        <CompareModal 
          userA={user}
          userB={comparingUser}
          onClose={() => setComparingUser(null)}
        />
      )}
    </div>
  );
}
