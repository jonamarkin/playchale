
import React from 'react';
import { X, Sword, Trophy, Zap, ShieldCheck } from 'lucide-react';
import { UserProfile, SportType, SportStat } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';

interface CompareModalProps {
  userA: UserProfile;
  userB: UserProfile;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ userA, userB, onClose }) => {
  // Find a common sport to compare, otherwise use primary
  const commonSport = userA.stats.find(s1 => userB.stats.some(s2 => s2.sport === s1.sport))?.sport || userA.primarySport;
  
  const statA = userA.stats.find(s => s.sport === commonSport) || userA.stats[0];
  const statB = userB.stats.find(s => s.sport === commonSport) || userB.stats[0];

  // Prepare data for the overlapping radar chart
  const attributeKeys = Array.from(new Set([
    ...Object.keys(statA.attributes),
    ...Object.keys(statB.attributes)
  ])).slice(0, 6);

  const chartData = attributeKeys.map(key => ({
    subject: key.toUpperCase(),
    A: statA.attributes[key] || 0,
    B: statB.attributes[key] || 0,
    fullMark: 100,
  }));

  // Added key prop to the inline type definition to satisfy TypeScript when mapping components
  const ComparisonRow = ({ label, valA, valB, inverse = false }: { label: string, valA: any, valB: any, inverse?: boolean, key?: React.Key }) => {
    const isANumber = typeof valA === 'number';
    const isBNumber = typeof valB === 'number';
    const winner = isANumber && isBNumber ? (inverse ? (valA < valB ? 'A' : 'B') : (valA > valB ? 'A' : 'B')) : null;

    return (
      <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
        <div className={`w-1/3 text-lg font-black tracking-tighter ${winner === 'A' ? 'text-orange-600' : 'text-slate-400 dark:text-slate-500'}`}>
          {valA}
        </div>
        <div className="w-1/3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-600">
          {label}
        </div>
        <div className={`w-1/3 text-right text-lg font-black tracking-tighter ${winner === 'B' ? 'text-orange-600' : 'text-slate-400 dark:text-slate-500'}`}>
          {valB}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[160] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-5xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <Sword className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tight">H2H Analytics: {commonSport}</h2>
          </div>
          <button onClick={onClose} className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl transition-all border border-slate-100 dark:border-slate-700">
            <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          {/* Top User Cards */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={userA.avatar} className="w-24 h-24 rounded-[32px] border-4 border-orange-100 dark:border-orange-900/30 shadow-xl object-cover" alt={userA.name} />
                <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-xl shadow-lg ring-4 ring-white dark:ring-slate-900">
                  <span className="text-lg font-black leading-none">{statA.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">{userA.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{userA.handle}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={userB.avatar} className="w-24 h-24 rounded-[32px] border-4 border-slate-100 dark:border-slate-800 shadow-xl object-cover" alt={userB.name} />
                <div className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-slate-700 text-white p-2 rounded-xl shadow-lg ring-4 ring-white dark:ring-slate-900">
                  <span className="text-lg font-black leading-none">{statB.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">{userB.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{userB.handle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Radar Overlay */}
            <div className="bg-slate-900 rounded-[40px] p-8 aspect-square relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 to-transparent"></div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 10, fontWeight: 900 }} />
                  <Radar
                    name={userA.name.split(' ')[0]}
                    dataKey="A"
                    stroke="#ea580c"
                    fill="#ea580c"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name={userB.name.split(' ')[0]}
                    dataKey="B"
                    stroke="#ffffff"
                    fill="#ffffff"
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Performance Overlay</div>
            </div>

            {/* Metric Comparison */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-8 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-orange-500" /> KPI Breakdown
              </h4>
              <div className="space-y-2">
                <ComparisonRow label="Rating" valA={statA.rating} valB={statB.rating} />
                <ComparisonRow label="Win Rate" 
                  valA={`${Math.round((statA.wins / statA.gamesPlayed) * 100)}%`} 
                  valB={`${Math.round((statB.wins / statB.gamesPlayed) * 100)}%`} 
                />
                <ComparisonRow label="Sessions" valA={statA.gamesPlayed} valB={statB.gamesPlayed} />
                <ComparisonRow label="Trust Score" valA={userA.trustScore} valB={userB.trustScore} />
                
                {statA.highlightStats.map((h, i) => (
                  <ComparisonRow 
                    key={i}
                    label={h.label} 
                    valA={h.value} 
                    valB={statB.highlightStats.find(sh => sh.label === h.label)?.value || 'N/A'} 
                  />
                ))}
              </div>

              <div className="mt-12 flex gap-4">
                 <button className="flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-600/20 hover:bg-orange-500 active:scale-95 transition-all">
                    Challenge {userB.name.split(' ')[0]}
                 </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900 flex justify-center items-center gap-8">
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Data Integrity Guaranteed</span>
           </div>
           <div className="w-px h-4 bg-white/10"></div>
           <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">PlayChale Verified Hub</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;