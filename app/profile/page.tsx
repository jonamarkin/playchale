"use client";

import React from 'react';
import SportsCard from '@/components/SportsCard';
import ActivityFeed from '@/components/ActivityFeed';
import { Plus, Sparkles, TrendingUp, Award, Zap, Loader2 } from 'lucide-react';
import { usePlayChale } from '@/components/PlayChaleProvider';
import { VerificationStatus } from '@/types';
import RecordActivityModal from '@/components/RecordActivityModal';
import Navigation from '@/components/Navigation';

export default function ProfilePage() {
  const { 
    user, activeSportStat, filteredActivities, handleAddActivity, handleVerify, 
    handleRunAnalysis, isRecordModalOpen, setIsRecordModalOpen, scoutingReport, isAnalyzing,
    selectedSport, setSelectedSport
  } = usePlayChale();

  const formatReport = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-black text-slate-900">$1</span>')
      .replace(/\*(.*?)\*/g, '<span class="italic text-slate-700">$1</span>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 md:pt-24 pt-20 pb-24 md:pb-8 selection:bg-orange-500/20 overflow-x-hidden">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
             <div className="lg:sticky lg:top-24">
               {/* Sports Selector */}
              <div className="mb-6 flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                {Object.values(user.stats.map(s => s.sport)).map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSport(s)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedSport === s 
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                      : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

               <SportsCard user={user} selectedStat={activeSportStat} />
               
               {/* AI Scout Section */}
               <div className="mt-6 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[80px] -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-orange-600 rounded-xl shadow-lg shadow-orange-200">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">AI Performance Scout</h3>
                  </div>

                  {!scoutingReport && !isAnalyzing ? (
                    <div className="text-center py-6 bg-slate-50 rounded-[24px] border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 font-bold mb-4">Ready to analyze your trajectory?</p>
                      <button 
                        onClick={handleRunAnalysis}
                        className="bg-slate-950 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl"
                      >
                        Generate {selectedSport} Report
                      </button>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-orange-600 animate-spin mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reviewing Session Data...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div 
                        className="text-sm text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-100 italic"
                        dangerouslySetInnerHTML={{ __html: formatReport(scoutingReport!) }}
                      />
                      <button 
                        onClick={handleRunAnalysis}
                        className="text-[9px] font-black uppercase tracking-widest text-orange-600 hover:underline flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3" /> Re-Scan History
                      </button>
                    </div>
                  )}
                </div>
              </div>
             </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">{selectedSport} Hub</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Your trajectory in this sport.</p>
                  </div>
                  <button 
                    onClick={() => setIsRecordModalOpen(true)}
                    className="bg-orange-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-orange-600/20 hover:bg-orange-500 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-black">Log Win</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-green-200 dark:hover:border-green-800 transition-all">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                      {activeSportStat.gamesPlayed > 0 ? Math.round((activeSportStat.wins / activeSportStat.gamesPlayed) * 100) : 0}%
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">Win Rate</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm group hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                      {filteredActivities.filter(a => a.status === VerificationStatus.VERIFIED).length}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">Verified Feats</div>
                  </div>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-[28px] p-6 shadow-sm group hover:bg-slate-800 dark:hover:bg-slate-700 transition-all text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-3xl font-black">
                      {activeSportStat.gamesPlayed * 10}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Effort Score</div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-2xl text-slate-900 dark:text-white">Performance Log</h3>
                  </div>
                  <ActivityFeed activities={filteredActivities} onVerify={handleVerify} />
                </div>
            </div>
          </div>
        </div>
      </main>

      {isRecordModalOpen && (
        <RecordActivityModal 
          onClose={() => setIsRecordModalOpen(false)} 
          onSave={handleAddActivity} 
        />
      )}
    </div>
  );
}
