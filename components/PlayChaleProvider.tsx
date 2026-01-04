"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { INITIAL_USER, INITIAL_ACTIVITIES, INITIAL_UPCOMING_GAMES, MOCK_LEADERBOARD_USERS } from '@/constants';
import { VerificationStatus, ActivityRecord, UpcomingGame, SportType, UserProfile, GameStatus } from '@/types';
import { analyzeProfile } from '@/services/geminiService';

interface PlayChaleContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  activeSportStat: any;
  activities: ActivityRecord[];
  upcomingGames: UpcomingGame[];
  leaderboardUsers: UserProfile[];
  selectedSport: SportType;
  setSelectedSport: (sport: SportType) => void;
  feedView: 'active' | 'history';
  setFeedView: (view: 'active' | 'history') => void;
  leaderboardData: any[];
  filteredActivities: ActivityRecord[];
  allPlayersSimulated: UserProfile[];
  
  // Modal States
  isRecordModalOpen: boolean;
  setIsRecordModalOpen: (val: boolean) => void;
  isOrganizeModalOpen: boolean;
  setIsOrganizeModalOpen: (val: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (val: boolean) => void;
  isFinalizeModalOpen: boolean;
  setIsFinalizeModalOpen: (val: boolean) => void;
  
  // Selections
  editingGame: UpcomingGame | null;
  setEditingGame: (game: UpcomingGame | null) => void;
  selectedGame: UpcomingGame | null;
  setSelectedGame: (game: UpcomingGame | null) => void;
  viewedProfile: UserProfile | null;
  setViewedProfile: (profile: UserProfile | null) => void;
  comparingUser: UserProfile | null;
  setComparingUser: (user: UserProfile | null) => void;
  
  // AI Analysis
  scoutingReport: string | null;
  isAnalyzing: boolean;
  handleRunAnalysis: () => Promise<void>;
  
  // Actions
  handleAddActivity: (data: any) => void;
  handleCreateGame: (data: any) => void;
  handleFinalizeGame: (results: any) => void;
  handleVerify: (id: string) => void;
  handleJoinGame: (gameId: string) => void;
  handleApprovePlayer: (gameId: string, playerId: string) => void;
  handleRejectPlayer: (gameId: string, playerId: string) => void;
  handleSearchProfile: (profile: UserProfile) => void;
  handleSearchCompare: (profile: UserProfile) => void;
  handleProfileCompare: (profile: UserProfile) => void;
}

const PlayChaleContext = createContext<PlayChaleContextType | undefined>(undefined);

export const PlayChaleProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedView, setFeedView] = useState<'active' | 'history'>('active');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isOrganizeModalOpen, setIsOrganizeModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [comparingUser, setComparingUser] = useState<UserProfile | null>(null);
  
  const [editingGame, setEditingGame] = useState<UpcomingGame | null>(null);
  const [selectedGame, setSelectedGame] = useState<UpcomingGame | null>(null);
  const [viewedProfile, setViewedProfile] = useState<UserProfile | null>(null);
  
  const [user, setUser] = useState(INITIAL_USER);
  const [leaderboardUsers, setLeaderboardUsers] = useState<UserProfile[]>(MOCK_LEADERBOARD_USERS);
  const [selectedSport, setSelectedSport] = useState<SportType>(user.primarySport);
  const [activities, setActivities] = useState<ActivityRecord[]>(INITIAL_ACTIVITIES);
  const [upcomingGames, setUpcomingGames] = useState<UpcomingGame[]>(INITIAL_UPCOMING_GAMES);
  
  const [scoutingReport, setScoutingReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const allPlayersSimulated = useMemo(() => [user, ...leaderboardUsers], [user, leaderboardUsers]);

  const leaderboardData = useMemo(() => {
    return allPlayersSimulated.map(p => {
      const sportStat = p.stats.find(s => s.sport === selectedSport) || p.stats[0];
      return {
        ...p,
        activeSportStat: sportStat,
        score: sportStat.rating
      };
    }).sort((a, b) => b.score - a.score);
  }, [selectedSport, allPlayersSimulated]);

  const activeSportStat = useMemo(() => {
    return user.stats.find(s => s.sport === selectedSport) || user.stats[0];
  }, [selectedSport, user.stats]);

  const filteredActivities = useMemo(() => {
    return activities.filter(a => a.sport === selectedSport);
  }, [activities, selectedSport]);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const report = await analyzeProfile(user, filteredActivities);
    setScoutingReport(report || "Scout report generation failed. Play more games!");
    setIsAnalyzing(false);
  };

  const handleAddActivity = (data: any) => {
    const newAct: ActivityRecord = {
      id: `act-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      sport: data.sport,
      eventName: data.eventName,
      date: data.date,
      score: data.score,
      outcome: data.outcome,
      status: VerificationStatus.PENDING,
      verifiers: [],
      dynamicStats: data.dynamicStats
    };
    setActivities([newAct, ...activities]);
    setIsRecordModalOpen(false);
    
    // Update local user rating/stats simulation
    setUser(prev => ({
      ...prev,
      stats: prev.stats.map(s => s.sport === data.sport ? {
        ...s,
        gamesPlayed: s.gamesPlayed + 1,
        wins: data.outcome === 'WIN' ? s.wins + 1 : s.wins,
        form: [...(s.form || []).slice(-4), data.outcome === 'WIN' ? 'W' : data.outcome === 'LOSS' ? 'L' : 'D'] as any,
        rating: Math.min(99, s.rating + (data.outcome === 'WIN' ? 1 : -0.5))
      } : s)
    }));

    if (data.sport !== selectedSport) {
        setSelectedSport(data.sport);
    }
  };

  const handleCreateGame = (data: any) => {
    if (editingGame) {
      setUpcomingGames(prev => prev.map(g => 
        g.id === editingGame.id ? { ...g, ...data } : g
      ));
      if (selectedGame && selectedGame.id === editingGame.id) {
        setSelectedGame(prev => prev ? ({ ...prev, ...data }) : null);
      }
      setEditingGame(null);
    } else {
      const newGame: UpcomingGame = {
        id: `game-${Date.now()}`,
        organizerId: user.id,
        organizerName: user.name,
        sport: data.sport,
        venue: data.venue,
        date: data.date,
        time: data.time,
        maxPlayers: data.maxPlayers,
        currentPlayers: [user.id],
        pendingPlayers: [],
        contribution: data.contribution,
        description: data.description,
        status: GameStatus.OPEN
      };
      setUpcomingGames([newGame, ...upcomingGames]);
      setFeedView('active');
    }
    setIsOrganizeModalOpen(false);
  };

  const handleFinalizeGame = (results: { finalScore: string, playerOutcomes: Record<string, { outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED', rank?: number, stats?: Record<string, any> }> }) => {
    if (!selectedGame) return;

    // 1. Create activity records for EVERYONE
    const newActivities: ActivityRecord[] = [];
    selectedGame.currentPlayers.forEach(pId => {
      const pProfile = allPlayersSimulated.find(p => p.id === pId);
      const outcomeData = results.playerOutcomes[pId] || { outcome: 'DRAW' };
      
      newActivities.push({
        id: `act-auto-${Date.now()}-${pId}`,
        userId: pId,
        userName: pProfile?.name || 'Unknown Athlete',
        sport: selectedGame.sport,
        eventName: `Session at ${selectedGame.venue}`,
        date: selectedGame.date,
        score: results.finalScore,
        outcome: outcomeData.outcome,
        rank: outcomeData.rank,
        status: VerificationStatus.VERIFIED, // Auto-verified by organizer finalizing
        verifiers: [selectedGame.organizerId],
        dynamicStats: outcomeData.stats
      });

      // Update Participant's Individual Stats (Simulation)
      const isWinner = outcomeData.outcome === 'WIN' || (outcomeData.outcome === 'RANKED' && outcomeData.rank === 1);
      const isPodium = outcomeData.outcome === 'RANKED' && outcomeData.rank && outcomeData.rank <= 3;

      const ratingChange = isWinner ? 2 : (isPodium ? 1 : (outcomeData.outcome === 'LOSS' ? -1 : 0));

      if (pId === user.id) {
        setUser(prev => ({
          ...prev,
          stats: prev.stats.map(s => s.sport === selectedGame.sport ? {
            ...s,
            gamesPlayed: s.gamesPlayed + 1,
            wins: isWinner ? s.wins + 1 : s.wins,
            rating: Math.max(1, Math.min(99, s.rating + ratingChange)),
            form: [...(s.form || []).slice(-4), (isWinner ? 'W' : (isPodium ? 'P' : (outcomeData.outcome === 'LOSS' ? 'L' : 'D')))] as any
          } : s)
        }));
      } else {
        setLeaderboardUsers(prev => prev.map(lUser => lUser.id === pId ? {
          ...lUser,
          stats: lUser.stats.map(s => s.sport === selectedGame.sport ? {
            ...s,
            gamesPlayed: s.gamesPlayed + 1,
            wins: isWinner ? s.wins + 1 : s.wins,
            rating: Math.max(1, Math.min(99, s.rating + ratingChange)),
            form: [...(s.form || []).slice(-4), (isWinner ? 'W' : (isPodium ? 'P' : (outcomeData.outcome === 'LOSS' ? 'L' : 'D')))] as any
          } : s)
        } : lUser));
      }
    });

    setActivities(prev => [...newActivities, ...prev]);
    setUpcomingGames(prev => prev.map(g => g.id === selectedGame.id ? { 
      ...g, 
      status: GameStatus.COMPLETED,
      results: results
    } : g));
    setSelectedGame(prev => prev ? ({ 
      ...prev, 
      status: GameStatus.COMPLETED,
      results: results
    }) : null);
    setIsFinalizeModalOpen(false);
  };

  const handleVerify = (id: string) => {
    setActivities(prev => prev.map(act => 
      act.id === id ? { ...act, status: VerificationStatus.VERIFIED, verifiers: [...act.verifiers, 'u_me'] } : act
    ));
  };

  const handleJoinGame = (gameId: string) => {
    setUpcomingGames(prev => prev.map(g => 
      g.id === gameId && !g.currentPlayers.includes(user.id) && !g.pendingPlayers.includes(user.id)
        ? { ...g, pendingPlayers: [...g.pendingPlayers, user.id] } 
        : g
    ));
    if (selectedGame && selectedGame.id === gameId) {
       setSelectedGame(prev => prev ? ({ ...prev, pendingPlayers: [...prev.pendingPlayers, user.id] }) : null);
    }
  };

  const handleApprovePlayer = (gameId: string, playerId: string) => {
    setUpcomingGames(prev => prev.map(g => {
      if (g.id === gameId) {
        return {
          ...g,
          pendingPlayers: g.pendingPlayers.filter(id => id !== playerId),
          currentPlayers: [...g.currentPlayers, playerId]
        };
      }
      return g;
    }));
    if (selectedGame && selectedGame.id === gameId) {
       setSelectedGame(prev => prev ? ({
         ...prev,
         pendingPlayers: prev.pendingPlayers.filter(id => id !== playerId),
         currentPlayers: [...prev.currentPlayers, playerId]
       }) : null);
    }
  };

  const handleRejectPlayer = (gameId: string, playerId: string) => {
    setUpcomingGames(prev => prev.map(g => {
      if (g.id === gameId) {
        return {
          ...g,
          pendingPlayers: g.pendingPlayers.filter(id => id !== playerId)
        };
      }
      return g;
    }));
    if (selectedGame && selectedGame.id === gameId) {
       setSelectedGame(prev => prev ? ({
         ...prev,
         pendingPlayers: prev.pendingPlayers.filter(id => id !== playerId)
       }) : null);
    }
  };

  const handleSearchProfile = (profile: UserProfile) => {
    setViewedProfile(profile);
    setIsSearchModalOpen(false);
  };

  const handleSearchCompare = (profile: UserProfile) => {
    setComparingUser(profile);
    setIsSearchModalOpen(false);
  };

  const handleProfileCompare = (profile: UserProfile) => {
    setComparingUser(profile);
    setViewedProfile(null);
  };

  return (
    <PlayChaleContext.Provider value={{
      user, isLoggedIn, setIsLoggedIn, activeSportStat, activities, upcomingGames, leaderboardUsers,
      selectedSport, setSelectedSport, feedView, setFeedView, leaderboardData, filteredActivities, allPlayersSimulated,
      isRecordModalOpen, setIsRecordModalOpen, isOrganizeModalOpen, setIsOrganizeModalOpen,
      isSearchModalOpen, setIsSearchModalOpen, isFinalizeModalOpen, setIsFinalizeModalOpen,
      editingGame, setEditingGame, selectedGame, setSelectedGame, viewedProfile, setViewedProfile,
      comparingUser, setComparingUser, scoutingReport, isAnalyzing, handleRunAnalysis,
      handleAddActivity, handleCreateGame, handleFinalizeGame, handleVerify, handleJoinGame,
      handleApprovePlayer, handleRejectPlayer, handleSearchProfile, handleSearchCompare, handleProfileCompare
    }}>
      {children}
    </PlayChaleContext.Provider>
  );
};

export const usePlayChale = () => {
  const context = useContext(PlayChaleContext);
  if (!context) {
    throw new Error('usePlayChale must be used within a PlayChaleProvider');
  }
  return context;
};
