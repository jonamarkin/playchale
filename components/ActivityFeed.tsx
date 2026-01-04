
import React from 'react';
import { ActivityRecord, VerificationStatus, SportType } from '../types';
import { CheckCircle2, Clock, ShieldAlert, Users, TrendingUp } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityRecord[];
  onVerify?: (id: string) => void;
}

const SPORT_EMOJIS: Record<string, string> = {
  [SportType.FOOTBALL]: '⚽',
  [SportType.BASKETBALL]: '🏀',
  [SportType.TENNIS]: '🎾',
  [SportType.GAMING]: '🎮',
  [SportType.ATHLETICS]: '🏃',
  [SportType.CHESS]: '♟️',
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, onVerify }) => {
  return (
    <div className="space-y-6">
      {activities.map((act) => (
        <div key={act.id} className="bg-white dark:bg-slate-900 rounded-[28px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-900 group">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-orange-50 group-hover:scale-110 transition-all">
                 {SPORT_EMOJIS[act.sport] || '🏅'}
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-lg leading-tight">{act.eventName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(act.date).toLocaleDateString()}</p>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <p className="text-xs text-orange-500 font-bold uppercase tracking-widest">{act.sport}</p>
                </div>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${
              act.status === VerificationStatus.VERIFIED ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : 
              act.status === VerificationStatus.PENDING ? 'bg-yellow-50 text-yellow-700 border border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30' : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
            }`}>
              {act.status === VerificationStatus.VERIFIED ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              {act.status}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800 mb-5">
             <div className="flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-50 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Match Score</span>
                <span className="font-mono text-xl font-black text-slate-900 dark:text-white">{act.score}</span>
             </div>
             <div className={`flex items-center justify-between p-4 rounded-2xl border ${
               act.outcome === 'WIN' ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/10 dark:border-green-900/30 dark:text-green-400' : 
               act.outcome === 'LOSS' ? 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400' : 'bg-slate-50 border-slate-100 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
             }`}>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Result</span>
                <span className="text-xl font-black">{act.outcome}</span>
             </div>
          </div>

          {/* Render Dynamic Stats if available */}
          {act.dynamicStats && Object.keys(act.dynamicStats).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {Object.entries(act.dynamicStats).map(([key, val]) => (
                <div key={key} className="bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{key}:</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/${act.id}${i}/40`} alt="Verifier" />
                  </div>
                ))}
                {act.verifiers.length > 3 && (
                  <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-900 dark:bg-slate-700 text-[10px] text-white flex items-center justify-center font-black">
                    +{act.verifiers.length - 3}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Authenticated by Peers</span>
            </div>
            
            {act.status === VerificationStatus.PENDING && onVerify && (
              <button 
                onClick={() => onVerify(act.id)}
                className="bg-slate-950 text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
              >
                Vouch Performance
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
