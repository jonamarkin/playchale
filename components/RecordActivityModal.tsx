
import React, { useState, useEffect } from 'react';
import { X, Trophy, MapPin, Calendar, Hash, Zap, Timer } from 'lucide-react';
import { SportType } from '../types';

interface RecordActivityModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const SPORT_SPECIFIC_FIELDS: Record<string, string[]> = {
  [SportType.FOOTBALL]: ['Goals', 'Assists', 'Tackles', 'Pass Accuracy'],
  [SportType.BASKETBALL]: ['Points', 'Rebounds', 'Assists', 'Steals'],
  [SportType.TENNIS]: ['Sets Won', 'Aces', 'Double Faults'],
  [SportType.ATHLETICS]: ['Event (100m/200m)', 'Personal Best?', 'Start Reaction', 'Wind Speed'],
  [SportType.GAMING]: ['Kills', 'Rank Earned', 'MVP Count', 'Win Streak'],
  [SportType.CHESS]: ['Pieces Captured', 'Moves Count', 'Accuracy %'],
};

const RecordActivityModal: React.FC<RecordActivityModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    sport: SportType.FOOTBALL,
    eventName: '',
    date: new Date().toISOString().split('T')[0],
    score: '',
    outcome: 'WIN' as 'WIN' | 'LOSS' | 'DRAW',
    dynamicStats: {} as Record<string, string>,
  });

  useEffect(() => {
    const fields = SPORT_SPECIFIC_FIELDS[formData.sport] || [];
    const initial = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
    setFormData(prev => ({ ...prev, dynamicStats: initial }));
  }, [formData.sport]);

  const handleDynamicChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dynamicStats: { ...prev.dynamicStats, [field]: value }
    }));
  };

  const isIndividualSport = formData.sport === SportType.ATHLETICS || formData.sport === SportType.CHESS;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Record {formData.sport}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Add verified metrics to your sports card.</p>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form className="p-8 space-y-6 overflow-y-auto flex-grow" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Select Identity</label>
              <select 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold outline-orange-500 appearance-none"
                value={formData.sport}
                onChange={(e) => setFormData({...formData, sport: e.target.value as SportType})}
              >
                {Object.values(SportType).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
             <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                {formData.sport === SportType.ATHLETICS ? 'Time/Mark' : 'Match Score'}
              </label>
              <div className="relative">
                {formData.sport === SportType.ATHLETICS ? <Timer className="absolute left-4 top-4 w-5 h-5 text-slate-400" /> : <Hash className="absolute left-4 top-4 w-5 h-5 text-slate-400" />}
                <input 
                  type="text"
                  placeholder={formData.sport === SportType.ATHLETICS ? "e.g. 10.82s" : "e.g. 3 - 2"}
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  value={formData.score}
                  onChange={(e) => setFormData({...formData, score: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Event / Meet Name</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="e.g. Saturday Soccer Kotobabi, Track Open"
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                value={formData.eventName}
                onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Dynamic Stats Section */}
          {(SPORT_SPECIFIC_FIELDS[formData.sport] || []).length > 0 && (
            <div className="bg-orange-50/50 dark:bg-orange-900/10 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/20">
              <h3 className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Professional Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {SPORT_SPECIFIC_FIELDS[formData.sport].map((field) => (
                  <div key={field}>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{field}</label>
                    <input 
                      type="text"
                      className="w-full bg-white dark:bg-slate-900 border border-orange-100 dark:border-orange-900/30 rounded-xl p-3 text-sm text-slate-900 dark:text-white font-bold outline-orange-500"
                      value={formData.dynamicStats[field] || ''}
                      onChange={(e) => handleDynamicChange(field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Competition Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  type="date"
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Official Result</label>
            <div className="flex gap-3">
              {(isIndividualSport ? ['WIN', 'PB', 'LOG'] : ['WIN', 'LOSS', 'DRAW']).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData({...formData, outcome: (opt === 'PB' || opt === 'LOG' ? 'WIN' : opt) as any})}
                  className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                    formData.outcome === opt || (opt === 'PB' && formData.outcome === 'WIN')
                      ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-lg'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-600 text-white font-black py-5 rounded-[20px] shadow-2xl shadow-orange-600/20 hover:bg-orange-500 transition-all sticky bottom-0"
          >
            Sync with Sports Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordActivityModal;
