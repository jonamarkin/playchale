
import React, { useState } from 'react';
import { X, Search, User, BarChart2, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { MOCK_LEADERBOARD_USERS, INITIAL_USER } from '../constants';

interface SearchModalProps {
  onClose: () => void;
  onViewProfile: (user: UserProfile) => void;
  onCompare: (user: UserProfile) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onViewProfile, onCompare }) => {
  const [query, setQuery] = useState('');
  
  const allUsers = [INITIAL_USER, ...MOCK_LEADERBOARD_USERS];
  const filteredUsers = query.length > 1 
    ? allUsers.filter(u => 
        u.name.toLowerCase().includes(query.toLowerCase()) || 
        u.handle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[150] flex items-start justify-center p-4 pt-20">
      <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center gap-4">
          <Search className="w-6 h-6 text-slate-400" />
          <input 
            autoFocus
            type="text"
            placeholder="Search athletes by name or handle..."
            className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-slate-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[60vh] p-4">
          {query.length <= 1 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Start typing to find athletes</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-400 font-bold italic">No athletes found matching "{query}"</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map(user => (
                <div 
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} className="w-12 h-12 rounded-xl border-2 border-white shadow-sm" alt={user.name} />
                    <div>
                      <h4 className="font-black text-slate-900">{user.name}</h4>
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{user.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewProfile(user)}
                      className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                      <User className="w-4 h-4" /> Profile
                    </button>
                    <button 
                      onClick={() => onCompare(user)}
                      className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg"
                    >
                      <BarChart2 className="w-4 h-4" /> Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t flex justify-center">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Global PlayChale Search Engine</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
