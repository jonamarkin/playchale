
import { UserProfile, SportType, ActivityRecord, VerificationStatus, UpcomingGame, GameStatus } from './types';

/**
 * PLAYCHALE ELITE DATA REGISTRY
 * Following the 10-point Sport-Specific Profile Data Guidelines
 */

export const INITIAL_USER: UserProfile = {
  id: 'u1',
  name: 'Kwame Mensah',
  handle: '@kwame_baller',
  location: 'Accra, Ghana',
  bio: 'Midfield maestro at the weekend, track sprinter by dawn. Always chasing a new PB at El-Wak.',
  avatar: 'https://picsum.photos/seed/kwame/200',
  joinedDate: 'Jan 2024',
  primarySport: SportType.FOOTBALL,
  trustScore: 88,
  stats: [
    {
      sport: SportType.FOOTBALL,
      // CATEGORY: TEAM_COMPETITIVE
      gamesPlayed: 45,
      wins: 30,
      rating: 84,
      form: ['W', 'W', 'D', 'W', 'L'],
      traits: ['PLAYMAKER', 'ENGINE', 'TACTICAL'],
      attributes: { 
        pace: 78, 
        technique: 89, 
        stamina: 92, 
        strategy: 85, 
        vision: 91 
      },
      highlightStats: [
        { label: 'Goals', value: 12 },
        { label: 'Assists', value: 24 },
        { label: 'Pass Accuracy', value: '89%' }
      ]
    },
    {
      sport: SportType.ATHLETICS,
      // CATEGORY: PERFORMANCE_BASED
      gamesPlayed: 12, // Meets
      wins: 5, // Podiums
      rating: 89,
      form: ['W', 'W', 'W', 'D', 'L'],
      traits: ['SPEEDSTER', 'EXPLOSIVE'],
      attributes: { 
        speed: 95, 
        power: 88, 
        reaction: 94, 
        technique: 82, 
        endurance: 70 
      },
      highlightStats: [
        { label: '100m PB', value: '10.82s' },
        { label: 'Reaction', value: '0.14s' },
        { label: 'Gold Medals', value: 3 }
      ]
    },
    {
      sport: SportType.AMPE,
      // CATEGORY: LOCAL_TRADITIONAL
      gamesPlayed: 25,
      wins: 18,
      rating: 79,
      form: ['W', 'W', 'L'],
      traits: ['AGILE', 'RHYTHMIC'],
      attributes: { 
        rhythm: 90, 
        reaction: 85, 
        agility: 92, 
        stamina: 75 
      },
      highlightStats: [
        { label: 'Win Streak', value: 7 },
        { label: 'Sessions', value: 25 },
        { label: 'Total Jumps', value: 1240 }
      ]
    }
  ],
  achievements: [
    { id: 'a1', title: 'Top Scorer - East Legon Derby', date: '2023-11-12', icon: '🏆' },
    { id: 'a2', title: 'Iron Lung - Marathon Finisher', date: '2024-02-01', icon: '🫁' },
    { id: 'a3', title: '100m Gold - Inter-Club Open', date: '2024-04-10', icon: '🥇' }
  ]
};

export const MOCK_LEADERBOARD_USERS: UserProfile[] = [
  {
    id: 'u2',
    name: 'Ama Boateng',
    handle: '@ama_runs',
    location: 'Kumasi, Ghana',
    bio: 'Speed is my middle name. Current regional record holder for 200m.',
    avatar: 'https://picsum.photos/seed/ama/200',
    joinedDate: 'Feb 2024',
    primarySport: SportType.ATHLETICS,
    trustScore: 95,
    stats: [
      {
        sport: SportType.ATHLETICS,
        gamesPlayed: 24,
        wins: 20,
        rating: 92,
        form: ['W', 'W', 'W', 'W', 'W'],
        traits: ['RECORD HOLDER', 'ELITE'],
        attributes: { 
          speed: 98, 
          power: 85, 
          reaction: 94, 
          technique: 90, 
          endurance: 82 
        },
        highlightStats: [
          { label: '200m PB', value: '22.15s' },
          { label: 'Max Speed', value: '34km/h' },
          { label: 'Podiums', value: 12 }
        ]
      }
    ],
    achievements: [{ id: 'ma1', title: 'Golden Spike', date: '2024-01-15', icon: '👟' }]
  },
  {
    id: 'u3',
    name: 'T-Raww',
    handle: '@traww_gaming',
    location: 'Osu, Accra',
    bio: 'Gaming isn\'t just a hobby, it\'s a lifestyle. FIFA champion.',
    avatar: 'https://picsum.photos/seed/traww/200',
    joinedDate: 'Mar 2024',
    primarySport: SportType.GAMING,
    trustScore: 91,
    stats: [
      {
        sport: SportType.GAMING,
        // CATEGORY: ESPORT
        gamesPlayed: 156,
        wins: 110,
        rating: 85,
        form: ['W', 'L', 'W', 'W', 'W'],
        traits: ['APEX PREDATOR', 'FOCUS'],
        attributes: { 
          precision: 95, 
          strategy: 92, 
          reaction: 88, 
          calm: 90, 
          skill: 96 
        },
        highlightStats: [
          { label: 'Win Rate', value: '70.5%' },
          { label: 'Tournaments', value: 45 },
          { label: 'Win Streak', value: 9 }
        ]
      }
    ],
    achievements: [{ id: 'ma2', title: 'Clutch King', date: '2024-02-20', icon: '🎮' }]
  }
];

export const INITIAL_ACTIVITIES: ActivityRecord[] = [
  {
    id: 'act1',
    userId: 'u1',
    userName: 'Kwame Mensah',
    sport: SportType.FOOTBALL,
    eventName: 'Saturday Morning Scrimmage - Kotobabi',
    date: '2024-03-23',
    score: '3 - 2',
    outcome: 'WIN',
    status: VerificationStatus.VERIFIED,
    verifiers: ['u2', 'u3', 'u4']
  }
];

export const INITIAL_UPCOMING_GAMES: UpcomingGame[] = [
  {
    id: 'g1',
    organizerId: 'u2',
    organizerName: 'Ama Boateng',
    sport: SportType.BASKETBALL,
    venue: 'Legon Court 2',
    date: '2024-05-15',
    time: '17:00',
    maxPlayers: 10,
    currentPlayers: ['u2', 'u5', 'u8'],
    pendingPlayers: ['u1'], 
    contribution: 'GHS 20',
    description: 'Casual 5v5 hoops. Looking for 3 more players. High intensity preferred!',
    status: GameStatus.OPEN
  },
  {
    id: 'h1',
    organizerId: 'u1',
    organizerName: 'Kwame Mensah',
    sport: SportType.FOOTBALL,
    venue: 'El-Wak Stadium',
    date: '2024-04-10',
    time: '20:00',
    maxPlayers: 14,
    currentPlayers: ['u1', 'u2', 'u3', 'u4', 'u5'],
    pendingPlayers: [],
    contribution: 'GHS 35',
    description: 'The El-Wak Floodlight Series. Midfield control was key tonight.',
    status: GameStatus.COMPLETED,
    results: {
      finalScore: '4 - 1',
      playerOutcomes: {
        'u1': { outcome: 'WIN', stats: { Goals: 2, Assists: 1 } },
        'u2': { outcome: 'LOSS', stats: { Clearances: 5 } },
        'u3': { outcome: 'WIN', stats: { Saves: 4 } }
      }
    }
  },
  {
    id: 'h2',
    organizerId: 'u3',
    organizerName: 'T-Raww',
    sport: SportType.GAMING,
    venue: 'Osu Gaming Hub',
    date: '2024-04-25',
    time: '14:00',
    maxPlayers: 4,
    currentPlayers: ['u1', 'u3'],
    pendingPlayers: [],
    contribution: 'Free',
    description: 'FIFA 24 Invitational. 1v1 Round Robin.',
    status: GameStatus.COMPLETED,
    results: {
      finalScore: '2 - 0 (Sets)',
      playerOutcomes: {
        'u1': { outcome: 'LOSS' },
        'u3': { outcome: 'WIN', stats: { Goals: 6 } }
      }
    }
  },
  {
    id: 'h3',
    organizerId: 'u2',
    organizerName: 'Ama Boateng',
    sport: SportType.ATHLETICS,
    venue: 'University of Ghana Track',
    date: '2024-05-01',
    time: '06:00',
    maxPlayers: 8,
    currentPlayers: ['u1', 'u2'],
    pendingPlayers: [],
    contribution: 'Free',
    description: 'Dawn Sprint Trials. 100m Dash with wind legal conditions.',
    status: GameStatus.COMPLETED,
    results: {
      finalScore: '10.85s / 11.20s',
      playerOutcomes: {
        'u1': { outcome: 'LOSS', stats: { '100m Time': '11.20s' } },
        'u2': { outcome: 'WIN', stats: { '100m Time': '10.85s' } }
      }
    }
  }
];
