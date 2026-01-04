
import React, { useState } from 'react';
import { X, Trophy, CheckCircle, AlertCircle, User, Star, Hash } from 'lucide-react';
import { UpcomingGame, UserProfile, SportType } from '../types';

interface FinalizeGameModalProps {
  game: UpcomingGame;
  participants: { id: string, name: string, avatar: string }[];
  onClose: () => void;
  onFinalize: (results: {
    finalScore: string,
    playerOutcomes: Record<string, { outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED', rank?: number, stats?: Record<string, any> }>
  }) => void;
}

const FinalizeGameModal: React.FC<FinalizeGameModalProps> = ({ game, participants, onClose, onFinalize }) => {
  const [finalScore, setFinalScore] = useState('');
  
  const isPerformanceSport = game.sport === SportType.ATHLETICS;

  const [playerOutcomes, setPlayerOutcomes] = useState<Record<string, { outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED', rank?: number, stats?: Record<string, any> }>>(
    participants.reduce((acc, p) => ({ 
      ...acc, 
      [p.id]: isPerformanceSport ? { outcome: 'RANKED', rank: 1 } : { outcome: 'WIN' } 
    }), {})
  );

  const handleOutcomeChange = (pId: string, outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED') => {
    setPlayerOutcomes(prev => ({
      ...prev,
      [pId]: { ...prev[pId], outcome }
    }));
  };

  const handleRankChange = (pId: string, rank: number) => {
    setPlayerOutcomes(prev => ({
      ...prev,
      [pId]: { ...prev[pId], rank }
    }));
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Finalize {game.sport} Session</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Submit the final result to update participant profiles.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-grow">
          <div className="mb-8">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              {isPerformanceSport ? 'Event Result (e.g. Meet Avg)' : 'Final Score / Mark'}
            </label>
            <input 
              type="text"
              placeholder={isPerformanceSport ? "e.g. 100m Finals" : "e.g. 4 - 2 or 10.8s"}
              className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-xl font-black text-slate-900 dark:text-white outline-orange-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
              value={finalScore}
              onChange={(e) => setFinalScore(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Member Outcomes</label>
            {participants.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={p.avatar} className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 shadow-sm" alt={p.name} />
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">{p.name}</div>
                    <div className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">Athlete ID: {p.id}</div>
                  </div>
                </div>

                {isPerformanceSport ? (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pos:</span>
                    <input 
                      type="number"
                      min="1"
                      className="w-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-center font-black text-slate-900 dark:text-white outline-orange-500"
                      value={playerOutcomes[p.id]?.rank || 1}
                      onChange={(e) => handleRankChange(p.id, parseInt(e.target.value) || 1)}
                    />
                  </div>
                ) : (
                  <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-800">
                    {(['WIN', 'LOSS', 'DRAW'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOutcomeChange(p.id, opt)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                          playerOutcomes[p.id]?.outcome === opt 
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                          : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <button 
            disabled={!finalScore}
            onClick={() => onFinalize({ finalScore, playerOutcomes })}
            className="w-full bg-orange-600 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-orange-600/20 hover:bg-orange-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-6 h-6" />
            Publish Results & Sync Profiles
          </button>
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
            <AlertCircle className="w-3 h-3" /> Results will be locked after publishing
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalizeGameModal;
