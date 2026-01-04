
export enum SportType {
  FOOTBALL = 'Football',
  BASKETBALL = 'Basketball',
  TENNIS = 'Tennis',
  VOLLEYBALL = 'Volleyball',
  CHESS = 'Chess',
  GAMING = 'E-Sports',
  LUDO = 'Ludo',
  AMPE = 'Ampe',
  CRICKET = 'Cricket',
  TABLE_TENNIS = 'Table Tennis',
  ATHLETICS = 'Athletics'
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  DISPUTED = 'DISPUTED'
}

export enum GameStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: string;
}

export interface SportStat {
  sport: SportType;
  gamesPlayed: number;
  wins: number;
  rating: number; // 0-99
  form?: ('W' | 'L' | 'D' | 'P')[]; // P for Podium/Position
  traits?: string[];
  attributes: Record<string, number>;
  highlightStats: { label: string; value: string | number }[]; // Sport-specific KPIs
}

export interface ActivityRecord {
  id: string;
  userId: string;
  userName: string;
  sport: SportType;
  eventName: string;
  date: string;
  score: string;
  outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED' | 'PB';
  rank?: number; // For sports like Athletics (1st, 2nd, etc.)
  status: VerificationStatus;
  verifiers: string[];
  evidenceUrl?: string;
  dynamicStats?: Record<string, string | number>;
}

export interface GameResult {
  finalScore: string;
  playerOutcomes: Record<string, { 
    outcome: 'WIN' | 'LOSS' | 'DRAW' | 'RANKED', 
    rank?: number,
    stats?: Record<string, any> 
  }>;
}

export interface UpcomingGame {
  id: string;
  organizerId: string;
  organizerName: string;
  sport: SportType;
  venue: string;
  date: string;
  time: string;
  maxPlayers: number;
  currentPlayers: string[]; // Approved User IDs
  pendingPlayers: string[]; // Users waiting for approval
  contribution?: string;
  description: string;
  status: GameStatus;
  results?: GameResult;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  location: string;
  bio: string;
  avatar: string;
  joinedDate: string;
  primarySport: SportType;
  stats: SportStat[];
  achievements: Achievement[];
  trustScore: number;
}
