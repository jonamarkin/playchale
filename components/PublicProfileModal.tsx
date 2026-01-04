
import React, { useState } from 'react';
import { X, MapPin, Calendar, Award, ShieldCheck, Zap, BarChart2 } from 'lucide-react';
import { UserProfile, SportType } from '../types';
import SportsCard from './SportsCard';

interface PublicProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onCompare?: (user: UserProfile) => void;
}

const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ user, onClose, onCompare }) => {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const activeStat = user.stats[activeSportIndex];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Identity Card */}
        <div className="md:w-[400px] bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center border-r border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex gap-2 overflow-x-auto w-full no-scrollbar justify-center">
            {user.stats.map((s, idx) => (
              <button
                key={s.sport}
                onClick={() => setActiveSportIndex(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeSportIndex === idx 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                  : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800'
                }`}
              >
                {s.sport}
              </button>
            ))}
          </div>
          
          <SportsCard user={user} selectedStat={activeStat} />
          
          <div className="mt-8 flex flex-col gap-3 w-full">
            <button className="w-full bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-orange-600/20 hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Challenge Athlete
            </button>
            <button 
              onClick={() => onCompare?.(user)}
              className="w-full bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <BarChart2 className="w-4 h-4" /> Compare Stats
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Stats */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{user.name}</h1>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-1 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-bold">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" /> {user.location}
                </span>
                <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" /> Joined {user.joinedDate}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all">
              <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4">Athletic Bio</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 italic">
              "{user.bio}"
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Career Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.achievements.map((ach) => (
                <div key={ach.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] shadow-sm hover:border-orange-200 dark:hover:border-orange-900 transition-colors">
                  <div className="text-3xl">{ach.icon}</div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-white leading-tight">{ach.title}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">{ach.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Verified Trust Level</h3>
             <div className="bg-slate-950 rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <div className="text-4xl font-black">{user.trustScore}%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Community Reliability</div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest bg-green-500 px-3 py-1.5 rounded-full">Elite Peer Rating</div>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-green-500" style={{ width: `${user.trustScore}%` }}></div>
                </div>
                <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileModal;
