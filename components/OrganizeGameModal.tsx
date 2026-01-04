
import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock, Users, Banknote } from 'lucide-react';
import { SportType, UpcomingGame } from '../types';

interface OrganizeGameModalProps {
  onClose: () => void;
  onSave: (game: Partial<UpcomingGame>) => void;
  initialData?: UpcomingGame;
}

const OrganizeGameModal: React.FC<OrganizeGameModalProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    sport: initialData?.sport || SportType.FOOTBALL,
    venue: initialData?.venue || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    maxPlayers: initialData?.maxPlayers || 10,
    contribution: initialData?.contribution || '',
    description: initialData?.description || ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        sport: initialData.sport,
        venue: initialData.venue,
        date: initialData.date,
        time: initialData.time,
        maxPlayers: initialData.maxPlayers,
        contribution: initialData.contribution || '',
        description: initialData.description
      });
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{initialData ? 'Update Game' : 'Host a Game'}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{initialData ? 'Update your session details.' : 'Find teammates and competitors locally.'}</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Sport</label>
              <select 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold outline-orange-500 appearance-none"
                value={formData.sport}
                onChange={(e) => setFormData({...formData, sport: e.target.value as SportType})}
              >
                {Object.values(SportType).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Max Players</label>
              <div className="relative">
                <Users className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  type="number"
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500"
                  value={formData.maxPlayers}
                  onChange={(e) => setFormData({...formData, maxPlayers: parseInt(e.target.value)})}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Venue / Park Name</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="e.g. Kotobabi Park, East Legon Court"
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  type="date"
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  type="time"
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Contribution (Optional)</label>
            <div className="relative">
              <Banknote className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="e.g. GHS 20 for park booking"
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-slate-900 dark:text-white font-bold outline-orange-500 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                value={formData.contribution}
                onChange={(e) => setFormData({...formData, contribution: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Game Details</label>
            <textarea 
              rows={3}
              placeholder="Tell players what to expect... Skill level, jerseys, etc."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-bold outline-orange-500 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-5 rounded-2xl shadow-2xl hover:bg-slate-900 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
          >
            {initialData ? 'Update Game Details' : 'Post Open Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizeGameModal;
