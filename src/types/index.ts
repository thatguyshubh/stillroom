export type FeelingType = 
  | 'Calm'
  | 'Grateful'
  | 'Hopeful'
  | 'Reflective'
  | 'Overwhelmed'
  | 'Anxious'
  | 'Weary'
  | 'Seeking Clarity';

export interface Reflection {
  id: string;
  title: string;
  content: string;
  feeling?: FeelingType;
  createdAt: string;
  updatedAt: string;
}

export type TapestryPreset = 'gentle' | 'flowing' | 'meditative' | 'solace';

export interface TapestryConfig {
  pinkWarmth: number; // 0 - 100
  sageDepth: number;  // 0 - 100
  complexity: number; // 1 - 10
  softness: number;   // 0 - 100
  paletteMode: 'balanced' | 'sageDominant' | 'blushDominant' | 'whisper';
  seed: number;
}

export interface SavedTapestry {
  id: string;
  title: string;
  config: TapestryConfig;
  createdAt: string;
}

export type CommunityTopic = 
  | 'All'
  | 'School pressure'
  | 'Loneliness'
  | 'Family difficulties'
  | 'Personal growth'
  | 'Career burnout'
  | 'Quiet healing';

export interface CommunityStory {
  id: string;
  title: string;
  topic: Exclude<CommunityTopic, 'All'>;
  authorAlias: string;
  readingTime: string;
  date: string;
  excerpt: string;
  fullStory: string[];
  baseReactions: {
    hearYou: number;
    relate: number;
    holdingSpace: number;
  };
}

export interface UserReactionsState {
  [storyId: string]: {
    hearYou?: boolean;
    relate?: boolean;
    holdingSpace?: boolean;
  };
}

export interface TherapySession {
  id: string;
  date: string; // YYYY-MM-DD
  focusArea: string;
  notes: string;
  takeaways: string;
  nextSteps: string;
  createdAt: string;
  updatedAt: string;
}

export type NavigationTab = 'dashboard' | 'reflect' | 'community' | 'sessions';
export type ReflectSubTab = 'journal' | 'tapestry';
