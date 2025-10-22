import { Users, Calculator, Target, BookOpen } from 'lucide-react';

/**
 * Application tab identifiers
 */
export const TABS = {
  ROSTER: 'roster',
  MATCHUP: 'matchup',
  RESULTS: 'results',
  GUIDE: 'guide',
};

/**
 * Tab configuration for navigation
 */
export const TAB_CONFIG = [
  { 
    id: TABS.ROSTER, 
    name: 'Roster', 
    icon: Users 
  },
  { 
    id: TABS.MATCHUP, 
    name: 'Matchup', 
    icon: Calculator 
  },
  { 
    id: TABS.RESULTS, 
    name: 'Results', 
    icon: Target 
  },
  { 
    id: TABS.GUIDE, 
    name: 'Guide', 
    icon: BookOpen 
  },
];
