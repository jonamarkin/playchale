
import React from 'react';
import { UserProfile, SportStat, SportType } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Trophy, Zap, Share2, Medal } from 'lucide-react';

interface SportsCardProps {
  user: UserProfile;
  selectedStat: SportStat;
}

const THEMES: Record<string, { gradient: string; accent: string; badge: string; shadow: string }> = {
  [SportType.FOOTBALL]: { 
    gradient: 'linear-gradient(135deg, #064e3b 0%, #020617 100%)', 
    accent: '#10b981',
    badge: 'PITCH ELITE',
    shadow: 'shadow-emerald-900/40'
  },
  [SportType.ATHLETICS]: { 
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #020617 100%)', 
    accent: '#ef4444',
    badge: 'TRACK LEGEND',
    shadow: 'shadow-red-900/40'
  },
  [SportType.BASKETBALL]: { 
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #020617 100%)', 
    accent: '#f97316',
    badge: 'HOOP PRO',
    shadow: 'shadow-orange-900/40'
  },
  [SportType.GAMING]: { 
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #020617 100%)', 
    accent: '#a855f7',
    badge: 'APEX DIGITAL',
    shadow: 'shadow-purple-900/40'
  }
};

const SportsCard: React.FC<SportsCardProps> = ({ user, selectedStat }) => {
  const [shared, setShared] = React.useState(false);

  const theme = THEMES[selectedStat.sport] || {
    gradient: 'linear-gradient(135deg, #1e293b 0%, #020617 100%)',
    accent: '#f97316',
    badge: 'ATHLETE',
    shadow: 'shadow-slate-900/40'
  };

  const chartData = Object.entries(selectedStat.attributes).map(([key, value]) => ({
    subject: key.toUpperCase(),
    A: value,
    fullMark: 100,
  }));

  const primaryHighlight = selectedStat.highlightStats[0];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div 
      style={{ background: theme.gradient }}
      className={`w-full max-w-sm sm:max-w-md rounded-[32px] sm:rounded-[44px] p-5 sm:p-7 text-white ${theme.shadow} shadow-2xl relative overflow-hidden group border border-white/10 transition-all duration-500 hover:ring-2 hover:ring-white/20 mx-auto`}
    >
      {/* Visual Design Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none"></div>
      <div style={{ backgroundColor: theme.accent }} className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[90px] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header: Global Score & Status */}
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div className="flex flex-col">
            <div style={{ color: theme.accent }} className="text-5xl sm:text-7xl font-black italic tracking-tighter leading-none drop-shadow-2xl">
              {selectedStat.rating}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{selectedStat.sport}</span>
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
              <div className="text-[9px] sm:text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {user.trustScore}% VERIFIED
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className={`p-2 rounded-xl backdrop-blur-md border border-white/10 transition-all ${shared ? 'bg-green-500 border-green-400' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/80">{theme.badge}</span>
              </div>
            </div>
            {primaryHighlight && (
              <div className="text-right">
                <div className="text-[8px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">{primaryHighlight.label}</div>
                <div className="text-lg font-black tracking-tighter leading-none" style={{ color: theme.accent }}>{primaryHighlight.value}</div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Identity Section */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="relative">
             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[28px] overflow-hidden border-2 border-white/20 shadow-xl p-0.5" style={{ background: `linear-gradient(45deg, ${theme.accent}, #020617)` }}>
                <img src={user.avatar} className="w-full h-full object-cover rounded-[18px] sm:rounded-[24px]" alt={user.name} />
             </div>
             <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-white text-slate-950 p-1 sm:p-1.5 rounded-lg sm:rounded-xl shadow-lg border-2 border-slate-900">
                <Medal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none truncate">
              {user.name.split(' ')[0]}<br/>
              <span style={{ color: theme.accent }}>{user.name.split(' ')[1] || ''}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(selectedStat.traits || ['VERSATILE']).slice(0, 2).map(trait => (
                <span key={trait} className="text-[8px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter text-white/70">
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attribute Radar Module */}
        <div className="h-36 sm:h-44 w-full bg-black/40 rounded-[28px] sm:rounded-[36px] border border-white/5 mb-4 sm:mb-6 overflow-hidden relative backdrop-blur-sm">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#ffffff15" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff44', fontSize: 7, fontWeight: 900 }} />
              <Radar
                name="Stats"
                dataKey="A"
                stroke={theme.accent}
                fill={theme.accent}
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="absolute top-2 sm:top-3 left-4 text-[7px] font-black uppercase tracking-widest opacity-20 italic">Validated Bio-Metrics</div>
        </div>

        {/* The Pro-Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {selectedStat.highlightStats.slice(0, 3).map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-[20px] sm:rounded-[24px] p-2 sm:p-3 text-center transition-all hover:bg-white/10 group-hover:scale-[1.02]">
              <div className="text-lg sm:text-xl font-black tracking-tighter leading-none mb-1">{stat.value}</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* History & Status Footer */}
        <div className="flex items-center justify-between bg-black/50 rounded-[24px] sm:rounded-[28px] px-4 sm:px-5 py-2 sm:py-3 border border-white/5 backdrop-blur-xl">
           <div className="flex flex-col">
              <span className="text-[7px] font-black uppercase tracking-widest opacity-40 mb-1">Recent Form</span>
              <div className="flex gap-1">
                {(selectedStat.form || ['W', 'W', 'L']).map((res, i) => (
                  <div key={i} className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${res === 'W' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : res === 'L' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-500'}`}></div>
                ))}
              </div>
           </div>
           <div className="text-right">
              <div className="text-[10px] sm:text-xs font-black italic tracking-tighter">{selectedStat.gamesPlayed} SESSIONS</div>
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40">RANKED GHANA #4</div>
           </div>
        </div>
      </div>

      {shared && (
        <div className="absolute inset-0 bg-green-500/10 backdrop-blur-md flex items-center justify-center pointer-events-none animate-in fade-in duration-300">
           <div className="bg-white text-green-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">
              Sharable Link Copied
           </div>
        </div>
      )}
    </div>
  );
};

export default SportsCard;
