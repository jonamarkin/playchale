
import React from 'react';
// Added Trophy to the list of lucide-react icon imports
import { X, Calendar, MapPin, Clock, Users, Banknote, ShieldCheck, Share2, UserCheck, UserPlus, Check, Trophy, Trash2, Edit2, CheckCircle, Award, Frown, Minus, Hash } from 'lucide-react';
import { UpcomingGame, SportType, GameStatus, UserProfile } from '../types';

interface UpcomingGameDetailModalProps {
  game: UpcomingGame;
  onClose: () => void;
  onJoin: (gameId: string) => void;
  onApprove?: (gameId: string, playerId: string) => void;
  onReject?: (gameId: string, playerId: string) => void;
  onEdit?: () => void;
  onFinalize?: () => void;
  currentUserId: string;
  allAthletes?: UserProfile[];
}

const SPORT_EMOJIS: Record<string, string> = {
  [SportType.FOOTBALL]: '⚽',
  [SportType.BASKETBALL]: '🏀',
  [SportType.TENNIS]: '🎾',
  [SportType.GAMING]: '🎮',
  [SportType.ATHLETICS]: '🏃',
  [SportType.CHESS]: '♟️',
};

const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const UpcomingGameDetailModal: React.FC<UpcomingGameDetailModalProps> = ({ 
  game, onClose, onJoin, onApprove, onReject, onEdit, onFinalize, currentUserId, allAthletes 
}) => {
  const isOrganizer = game.organizerId === currentUserId;
  const isJoined = game.currentPlayers.includes(currentUserId);
  const isPending = game.pendingPlayers.includes(currentUserId);
  const isCompleted = game.status === GameStatus.COMPLETED;
  const isPerformanceSport = game.sport === SportType.ATHLETICS;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Visual Summary */}
        <div className={`md:w-1/3 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors ${isCompleted ? 'bg-slate-800 dark:bg-slate-950' : 'bg-slate-950'}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-500/20 to-transparent"></div>
          <div className="text-7xl mb-4 relative z-10 drop-shadow-2xl">{SPORT_EMOJIS[game.sport] || '🏅'}</div>
          <h2 className="text-white text-2xl font-black tracking-tight relative z-10 uppercase italic">{game.sport}</h2>
          
          <div className={`mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white relative z-10 shadow-lg ${
            isCompleted ? 'bg-green-600 shadow-green-600/40' : 'bg-orange-600 shadow-orange-600/40'
          }`}>
            {isCompleted ? 'Archive: Finalized' : isOrganizer ? 'Managing Session' : 'Open Session'}
          </div>
          
          <div className="mt-auto pt-8 flex flex-col items-center">
             <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Organizer</div>
             <img src={`https://picsum.photos/seed/${game.organizerId}/80`} className="w-12 h-12 rounded-2xl border-2 border-white/20 mb-2" alt={game.organizerName} />
             <div className="text-white font-bold text-sm">{game.organizerName}</div>
             <div className="flex items-center gap-1 text-green-400 text-[10px] font-black uppercase tracking-tighter mt-1">
               <ShieldCheck className="w-3 h-3" /> PlayChale Verified
             </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{game.venue}</h1>
              <p className="text-orange-600 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Venue Location
              </p>
            </div>
            <div className="flex gap-2">
              {isOrganizer && !isCompleted && (
                <button 
                  onClick={onEdit} 
                  className="p-3 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded-2xl transition-all border border-orange-100 dark:border-orange-800 group"
                  title="Edit Game"
                >
                  <Edit2 className="w-6 h-6 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform" />
                </button>
              )}
              <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all">
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
              <Calendar className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Date</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{game.date}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
              <Clock className="w-5 h-5 text-orange-500 mb-2" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Time</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{game.time}</div>
            </div>
            <div className={`p-4 rounded-3xl border col-span-2 sm:col-span-1 ${isCompleted ? 'bg-slate-900 dark:bg-slate-950 text-white border-slate-800 dark:border-slate-800' : 'bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900/30'}`}>
              <div className="flex items-center gap-2 mb-2">
                 {isCompleted ? <Award className="w-5 h-5 text-orange-500" /> : <Banknote className="w-5 h-5 text-orange-600" />}
                 <div className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-white/40' : 'text-orange-400'}`}>
                    {isCompleted ? (isPerformanceSport ? 'Event Result' : 'Box Score') : 'Fee'}
                 </div>
              </div>
              <div className="text-sm font-bold">{isCompleted ? game.results?.finalScore : (game.contribution || 'Free')}</div>
            </div>
          </div>

          {isCompleted && game.results && (
             <div className="mb-10 bg-slate-50 dark:bg-slate-950 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
                   <Trophy className="w-4 h-4 text-orange-500" /> Performer Breakdown
                </h3>
                <div className="space-y-3">
                   {game.currentPlayers.map(pId => {
                      const athlete = allAthletes?.find(a => a.id === pId);
                      const resultObj = game.results?.playerOutcomes[pId];
                      const outcome = resultObj?.outcome || 'DRAW';
                      const rank = resultObj?.rank;
                      
                      return (
                        <div key={pId} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                           <div className="flex items-center gap-3">
                              <img src={athlete?.avatar || `https://picsum.photos/seed/${pId}/40`} className="w-10 h-10 rounded-xl border-2 border-slate-50 dark:border-slate-800" alt="Athlete" />
                              <div>
                                 <div className="text-sm font-black text-slate-900 dark:text-white">{athlete?.name || 'Athlete'}</div>
                                 <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Verified Identity</div>
                              </div>
                           </div>
                           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${
                              outcome === 'WIN' || (outcome === 'RANKED' && rank === 1) ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                              outcome === 'LOSS' || (outcome === 'RANKED' && rank && rank > 3) ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 
                              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                           }`}>
                              {isPerformanceSport && rank ? (
                                <><Hash className="w-3 h-3" /> {getOrdinal(rank)}</>
                              ) : (
                                <>{outcome === 'WIN' ? <Trophy className="w-3 h-3" /> : outcome === 'LOSS' ? <Frown className="w-3 h-3" /> : <Minus className="w-3 h-3" />} {outcome}</>
                              )}
                           </div>
                        </div>
                      );
                   })}
                </div>
             </div>
          )}

          {!isCompleted && (
            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4">Game Intent</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 italic">
                "{game.description}"
              </p>
            </div>
          )}

          {/* Organizer Dashboard Section */}
          {isOrganizer && !isCompleted && (
            <div className="mb-10 animate-in slide-in-from-top-4 duration-500">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" /> Pending Requests ({game.pendingPlayers.length})
              </h3>
              <div className="space-y-3">
                {game.pendingPlayers.length === 0 ? (
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 italic py-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center border border-dashed border-slate-200 dark:border-slate-800">
                    No new requests at the moment.
                  </div>
                ) : (
                  game.pendingPlayers.map((pId) => (
                    <div key={pId} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={`https://picsum.photos/seed/${pId}/40`} className="w-10 h-10 rounded-2xl border-2 border-slate-50 dark:border-slate-800" alt="Applicant" />
                        <div>
                          <div className="text-sm font-black text-slate-900 dark:text-white">Player Profile</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trust Score: 92%</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onApprove?.(game.id, pId)}
                          className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onReject?.(game.id, pId)}
                          className="p-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {isCompleted ? 'Past Participant Squad' : 'Confirmed Squad'}
              </h3>
              <span className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black">{game.currentPlayers.length} / {game.maxPlayers}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {game.currentPlayers.map((pId, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-2 rounded-2xl shadow-sm">
                  <img src={`https://picsum.photos/seed/${pId}/40`} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700" alt="Player" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{pId === currentUserId ? 'You' : 'Member'}</span>
                </div>
              ))}
              {!isCompleted && Array.from({ length: Math.max(0, game.maxPlayers - game.currentPlayers.length) }).map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600">
                  <UserPlus className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {isCompleted ? (
               <div className="flex-1 bg-slate-900 border border-slate-800 rounded-[24px] p-6 flex flex-col items-center text-center">
                  <CheckCircle className="w-8 h-8 text-orange-500 mb-2" />
                  <h4 className="text-lg font-black text-white leading-tight italic">Records Archived</h4>
                  <p className="text-xs text-white/40 font-medium">This session is locked in history. All stats have been synced to participant profiles.</p>
               </div>
            ) : !isOrganizer ? (
              <button 
                onClick={() => onJoin(game.id)}
                disabled={isJoined || isPending}
                className={`flex-1 py-5 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  isJoined 
                  ? 'bg-green-500 text-white cursor-default shadow-green-200' 
                  : isPending
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-default shadow-none'
                  : 'bg-orange-600 text-white hover:bg-orange-500 shadow-orange-600/30 active:scale-95'
                }`}
              >
                {isJoined ? <UserCheck className="w-6 h-6" /> : isPending ? <Clock className="w-6 h-6 animate-pulse" /> : null}
                {isJoined ? 'Confirmed to Play' : isPending ? 'Request Pending' : 'Request to Join'}
              </button>
            ) : (
              <button 
                onClick={onFinalize}
                className="flex-1 py-5 rounded-[24px] font-black text-lg bg-orange-600 text-white hover:bg-orange-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-600/20 active:scale-95"
              >
                <CheckCircle className="w-6 h-6" />
                Finalize Session
              </button>
            )}
            <button className="p-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[24px] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm group flex-shrink-0">
              <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingGameDetailModal;
