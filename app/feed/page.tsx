"use client";

import React from 'react';
import { Calendar, Clock, History, LayoutGrid, Users, Zap } from 'lucide-react';
import { usePlayChale } from '@/components/PlayChaleProvider';
import { GameStatus, SportType } from '@/types';
import OrganizeGameModal from '@/components/OrganizeGameModal';
import UpcomingGameDetailModal from '@/components/UpcomingGameDetailModal';
import FinalizeGameModal from '@/components/FinalizeGameModal';
import Navigation from '@/components/Navigation';

export default function FeedPage() {
  const { 
    user, upcomingGames, feedView, setFeedView, 
    handleCreateGame, handleJoinGame, handleApprovePlayer, handleRejectPlayer, handleFinalizeGame,
    isOrganizeModalOpen, setIsOrganizeModalOpen, isFinalizeModalOpen, setIsFinalizeModalOpen,
    editingGame, setEditingGame, selectedGame, setSelectedGame, allPlayersSimulated
  } = usePlayChale();

  const filteredFeedGames = React.useMemo(() => {
    if (feedView === 'active') {
      return upcomingGames.filter(g => g.status === GameStatus.OPEN);
    }
    return upcomingGames.filter(g => g.status === GameStatus.COMPLETED);
  }, [upcomingGames, feedView]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 md:pt-24 pt-20 pb-32 md:pb-8 selection:bg-orange-500/20">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar Action Block (Desktop) */}
           <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-slate-900 rounded-[32px] p-8 text-white overflow-hidden relative group">
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-2 italic">Lead the Field</h4>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed">Organize a session, find players, and build community data.</p>
                  <button 
                    onClick={() => {
                      setEditingGame(null);
                      setIsOrganizeModalOpen(true);
                    }}
                    className="w-full bg-white text-slate-900 py-4 rounded-2xl text-sm font-black transition-all hover:bg-orange-500 hover:text-white"
                  >
                    Post Open Game
                  </button>
                </div>
                <Users className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
              </div>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">Community Playground</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {feedView === 'active' ? 'Real-world sessions happening now.' : 'Past triumphs and recorded history.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <button 
                      onClick={() => setFeedView('active')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        feedView === 'active' ? 'bg-slate-950 dark:bg-slate-700 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">Active</span>
                    </button>
                    <button 
                      onClick={() => setFeedView('history')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        feedView === 'history' ? 'bg-slate-950 dark:bg-slate-700 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      <History className="w-4 h-4" /> <span className="hidden sm:inline">History</span>
                    </button>
                  </div>
              </div>

               {/* Mobile Create Button */}
               <div className="lg:hidden mb-6">
                  <button 
                      onClick={() => {
                        setEditingGame(null);
                        setIsOrganizeModalOpen(true);
                      }}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl text-sm font-black transition-all hover:bg-orange-500"
                    >
                      Post Open Game
                    </button>
               </div>

                {filteredFeedGames.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800 p-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      {feedView === 'active' ? <Zap className="w-8 h-8 text-slate-300 dark:text-slate-600" /> : <History className="w-8 h-8 text-slate-300 dark:text-slate-600" />}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 italic">Nothing to show yet</h3>
                    <p className="text-slate-400 dark:text-slate-500 font-medium mb-8">
                      {feedView === 'active' 
                        ? "There are no open sessions right now. Why not host one?" 
                        : "No games have been finalized yet. Records will appear here after completion."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredFeedGames.map(game => (
                      <div 
                        key={game.id} 
                        onClick={() => setSelectedGame(game)}
                        className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className={`p-8 md:w-56 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors ${game.status === GameStatus.COMPLETED ? 'bg-slate-800' : 'bg-slate-900'}`}>
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 to-transparent"></div>
                            <div className="text-5xl mb-3 relative z-10 drop-shadow-lg">
                              {game.sport === SportType.FOOTBALL ? '⚽' : game.sport === SportType.BASKETBALL ? '🏀' : game.sport === SportType.TENNIS ? '🎾' : '🎮'}
                            </div>
                            <div className="text-white font-black text-xl relative z-10 italic uppercase tracking-tighter">{game.sport}</div>
                            {game.status === GameStatus.COMPLETED && (
                               <div className="mt-4 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-lg text-[8px] font-black text-green-400 uppercase tracking-widest relative z-10">Archive</div>
                            )}
                          </div>
                          <div className="flex-1 p-8 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{game.venue}</h3>
                                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mt-2 font-black uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-orange-500" /> {game.date}</div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-500" /> {game.time}</div>
                                  </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                  game.status === GameStatus.COMPLETED ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                                }`}>
                                  {game.status === GameStatus.COMPLETED ? `Result: ${game.results?.finalScore}` : (game.contribution || 'Free')}
                                </div>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium line-clamp-2 italic text-sm">
                                "{game.description}"
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                              <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                  {game.currentPlayers.slice(0, 4).map((pId, idx) => (
                                    <img 
                                      key={idx} 
                                      src={`https://picsum.photos/seed/${pId}/40`} 
                                      className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 shadow-sm" 
                                      alt="Player"
                                    />
                                  ))}
                                  {game.currentPlayers.length > 4 && (
                                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-900 dark:bg-slate-700 text-[10px] text-white flex items-center justify-center font-black">
                                      +{game.currentPlayers.length - 4}
                                    </div>
                                  )}
                                  {game.pendingPlayers.length > 0 && game.status !== GameStatus.COMPLETED && (
                                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-orange-500 text-[10px] text-white flex items-center justify-center font-black animate-pulse">
                                      +{game.pendingPlayers.length}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-black text-slate-900 dark:text-white leading-none">
                                    {game.currentPlayers.length} / {game.maxPlayers}
                                  </span>
                                  <span className="text-[10px] font-black uppercase text-slate-300 dark:text-slate-500 tracking-widest mt-1">Confirmed</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {game.organizerId === user.id && game.status !== GameStatus.COMPLETED ? (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedGame(game); }}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:bg-slate-800"
                                  >
                                    Manage
                                  </button>
                                ) : (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedGame(game); }}
                                    className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
                                      game.status === GameStatus.COMPLETED 
                                      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' 
                                      : game.currentPlayers.includes(user.id)
                                      ? 'bg-green-500 text-white'
                                      : 'bg-orange-600 text-white hover:bg-orange-500'
                                    }`}
                                  >
                                    {game.status === GameStatus.COMPLETED ? 'View Stats' : game.currentPlayers.includes(user.id) ? 'Joined' : 'Details'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
           </div>
        </div>
      </main>

      {isOrganizeModalOpen && (
        <OrganizeGameModal 
          onClose={() => {
            setIsOrganizeModalOpen(false);
            setEditingGame(null);
          }}
          onSave={handleCreateGame}
          initialData={editingGame || undefined}
        />
      )}

      {selectedGame && (
        <UpcomingGameDetailModal 
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onJoin={handleJoinGame}
          onApprove={handleApprovePlayer}
          onReject={handleRejectPlayer}
          onEdit={() => {
            setEditingGame(selectedGame);
            setIsOrganizeModalOpen(true);
          }}
          onFinalize={() => setIsFinalizeModalOpen(true)}
          currentUserId={user.id}
          allAthletes={allPlayersSimulated}
        />
      )}

      {isFinalizeModalOpen && selectedGame && (
        <FinalizeGameModal 
          game={selectedGame}
          participants={selectedGame.currentPlayers.map(pId => {
            const p = allPlayersSimulated.find(u => u.id === pId);
            return { id: pId, name: p?.name || 'Athlete', avatar: p?.avatar || '' };
          })}
          onClose={() => setIsFinalizeModalOpen(false)}
          onFinalize={handleFinalizeGame}
        />
      )}
    </div>
  );
}
