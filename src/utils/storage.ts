import type { CommunityStory, Reflection, SavedTapestry, TherapySession, UserReactionsState } from '../types';

const STORAGE_KEYS = {
  REFLECTIONS: 'stillroom_reflections',
  TAPESTRIES: 'stillroom_tapestries',
  SESSIONS: 'stillroom_sessions',
  REACTIONS: 'stillroom_reactions',
  INITIALIZED: 'stillroom_initialized_v1',
};

export const INITIAL_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    title: 'The heavy weight of expectations before final exams',
    topic: 'School pressure',
    authorAlias: 'Silent Library Reader',
    readingTime: '2 min read',
    date: '2 days ago',
    excerpt: 'Everyone assumed I had everything figured out because my grades were steady. Inside, my chest was tight every morning at 6 AM.',
    fullStory: [
      'Everyone around me assumed I had everything figured out because my grades were steady. Teachers praised my consistency, and my parents told relatives I was self-driven.',
      'Inside, my chest was tight every morning at 6 AM. I wasn\'t studying out of curiosity or ambition anymore; I was studying out of sheer dread that one lower mark would shatter the identity everyone built for me.',
      'One Tuesday in the library, staring at a page of practice equations, I started trembling and couldn\'t focus my eyes. A stranger at the next desk quietly slid over a peppermint candy and a small sticky note that said: "Take a sip of water. It\'s okay to pause."',
      'It didn\'t erase the exam, but it punctured the panic. It reminded me that I am a human being existing in a room, not a grading algorithm.'
    ],
    baseReactions: {
      hearYou: 24,
      relate: 31,
      holdingSpace: 12
    }
  },
  {
    id: 'story-2',
    title: 'Cooking dinner in an apartment that felt too quiet',
    topic: 'Loneliness',
    authorAlias: 'Corner Window Resident',
    readingTime: '3 min read',
    date: '3 days ago',
    excerpt: 'Moving across the country sounded brave until the first Friday night when no one called and the radiator was the only sound.',
    fullStory: [
      'Moving across the country for a new job sounded courageous in conversations. I packed my belongings with a sense of adventure.',
      'Then the first Friday night arrived. The unpacking boxes were flat, the work emails ceased, and the kitchen was deafeningly silent. I chopped carrots for a pasta sauce and realized I hadn\'t spoken out loud in fourteen hours.',
      'Loneliness isn\'t just feeling sad; it feels like physical coldness in your palms. You wonder if anyone would notice if you dissolved.',
      'I forced myself to leave the stove on simmer, open the apartment window, and listen to the street sounds below — dogs barking, bicycles rattling over pavers. I wasn\'t connected yet, but I was part of the living world. Step by step, that was enough for tonight.'
    ],
    baseReactions: {
      hearYou: 42,
      relate: 28,
      holdingSpace: 19
    }
  },
  {
    id: 'story-3',
    title: 'Saying no to Sunday family dinner without an apology',
    topic: 'Family difficulties',
    authorAlias: 'Learning Boundarism',
    readingTime: '3 min read',
    date: '5 days ago',
    excerpt: 'For thirty years, saying "no" to my mother felt like committing a felony. Last weekend, I finally set my first quiet boundary.',
    fullStory: [
      'In my family, boundaries were treated as insults. If you had plans of your own, you were selfish; if you needed solitude, you were distant.',
      'Every Sunday dinner turned into an unspoken trial where my life choices, body weight, and career pace were picked apart under the guise of "caring". By Sunday night, I was depleted for the week ahead.',
      'Last Sunday, I sent a simple text: "I won\'t be attending tonight, but I hope you all have a lovely evening. Love to all." When the guilt-tripping follow-up calls started, I left my phone in the drawer and took a walk under the trees.',
      'My hands shook for an hour. But when Monday came, I woke up with my energy intact for the first time in years. Guilt was the tax I had to pay for my own peace, and it was worth it.'
    ],
    baseReactions: {
      hearYou: 53,
      relate: 47,
      holdingSpace: 26
    }
  },
  {
    id: 'story-4',
    title: 'Forgiving the version of myself that didn\'t know better',
    topic: 'Personal growth',
    authorAlias: 'Reflective Nomad',
    readingTime: '2 min read',
    date: '1 week ago',
    excerpt: 'I used to replay mistakes from five years ago at 2 AM with blistering self-criticism. Here is what changed.',
    fullStory: [
      'I used to replay arguments, botched projects, and lost friendships at 2 AM with blistering self-criticism. I judged my past actions with the wisdom I only gained because of those failures.',
      'My counselor suggested a visual exercise: picture that younger self sitting on a bench in the park, stressed and lacking tools. Would you walk up to them and scream? Or would you sit down and put a blanket over their shoulders?',
      'Realizing that self-criticism is not accountability was my turning point. Compassion allows you to change; shame just keeps you paralyzed in the shame loop.',
      'Today I can look back at old journals and feel tenderness rather than humiliation. Growth is slow, but gentleness speeds it up.'
    ],
    baseReactions: {
      hearYou: 38,
      relate: 35,
      holdingSpace: 21
    }
  },
  {
    id: 'story-5',
    title: 'Leaving my laptop in the office overnight',
    topic: 'Career burnout',
    authorAlias: 'Recovering Overachiever',
    readingTime: '2 min read',
    date: '1 week ago',
    excerpt: 'I measured my self-worth by my response time on Slack. When my body gave out, I had to rethink everything.',
    fullStory: [
      'I was the person who responded to team pings in three minutes, even at 10 PM. I wore my exhaustion like a medal.',
      'Then migraines started hitting every Thursday afternoon. My doctor asked: "What are you running from?" I answered: "If I slow down, I might find out I\'m replaceable."',
      'Last week, I physically closed my laptop at 5:30 PM, placed it in my desk locker, and walked out without my charger or bag. The commute home felt strangely spacious. The sky was pink and violet.',
      'Nothing burned down. The emails waited until 9 AM the next morning. My emergency was entirely artificial.'
    ],
    baseReactions: {
      hearYou: 61,
      relate: 52,
      holdingSpace: 17
    }
  },
  {
    id: 'story-6',
    title: 'Finding sanctuary in an early morning tea ritual',
    topic: 'Quiet healing',
    authorAlias: 'Morning Light',
    readingTime: '2 min read',
    date: '2 weeks ago',
    excerpt: 'When therapy felt exhausting and grief was loud, five minutes of watching steam rise from hot water kept me grounded.',
    fullStory: [
      'Grief isn\'t always tears; sometimes it\'s pure numbness and feeling untethered from reality.',
      'After difficult grief counseling sessions, my therapist advised against rushing back into productivity. She suggested finding one sensory anchor.',
      'Mine became loose-leaf peppermint tea. No phone, no news, no book. Just the sound of water boiling, the pale green colour unfurling in the porcelain cup, and the warm ceramic against my palms.',
      'Five quiet minutes did what hours of overthinking could not: it reminded my nervous system that right here, right now, I am safe and breathing.'
    ],
    baseReactions: {
      hearYou: 49,
      relate: 29,
      holdingSpace: 33
    }
  }
];

export const INITIAL_REFLECTIONS: Reflection[] = [
  {
    id: 'ref-seed-1',
    title: 'Noticing the breath when the day starts moving too fast',
    content: 'Felt my shoulders creeping up towards my ears during the morning team sync. Stepped outside for 3 minutes to feel the cool wind. Reminded myself that I don\'t need to answer every problem in the same breath it is delivered.',
    feeling: 'Reflective',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'ref-seed-2',
    title: 'Gratitude for the stillness between tasks',
    content: 'Finished a demanding milestone. Rather than instantly loading up another to-do list, I sat on the rug with a glass of water and let the accomplishment settle in.',
    feeling: 'Grateful',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  }
];

export const INITIAL_SESSIONS: TherapySession[] = [
  {
    id: 'sess-seed-1',
    date: new Date(Date.now() - 86400000 * 7).toISOString().slice(0, 10),
    focusArea: 'Navigating perfectionism and inner critic triggers',
    notes: 'Discussed how early expectations formed an automatic "must perform" instinct. Looked at somatic cues (tight jaw, shallow breathing) that warn me when perfectionism takes over from healthy diligence.',
    takeaways: 'The goal is good enough with peace, not flawless with misery. Perfectionism is an anxiety response, not a virtue.',
    nextSteps: 'Practice intentional 80% completion on one non-critical task this week without reviewing it twice.',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  }
];

export const INITIAL_TAPESTRIES: SavedTapestry[] = [
  {
    id: 'tap-seed-1',
    title: 'Morning Forest Hush',
    config: {
      pinkWarmth: 35,
      sageDepth: 65,
      complexity: 4,
      softness: 70,
      paletteMode: 'sageDominant',
      seed: 42
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// Initialize default storage data if not present
export function initializeStorageIfEmpty(): void {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
      if (!localStorage.getItem(STORAGE_KEYS.REFLECTIONS)) {
        localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(INITIAL_REFLECTIONS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(INITIAL_SESSIONS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.TAPESTRIES)) {
        localStorage.setItem(STORAGE_KEYS.TAPESTRIES, JSON.stringify(INITIAL_TAPESTRIES));
      }
      if (!localStorage.getItem(STORAGE_KEYS.REACTIONS)) {
        localStorage.setItem(STORAGE_KEYS.REACTIONS, JSON.stringify({}));
      }
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  } catch (e) {
    console.error('LocalStorage initialization error:', e);
  }
}

// Reflections
export function getReflections(): Reflection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReflection(reflection: Omit<Reflection, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Reflection {
  const existing = getReflections();
  const now = new Date().toISOString();
  
  if (reflection.id) {
    const updated = existing.map(item => {
      if (item.id === reflection.id) {
        return {
          ...item,
          ...reflection,
          updatedAt: now,
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(updated));
    return updated.find(item => item.id === reflection.id)!;
  } else {
    const newEntry: Reflection = {
      id: 'ref-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: reflection.title,
      content: reflection.content,
      feeling: reflection.feeling,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(updated));
    return newEntry;
  }
}

export function deleteReflection(id: string): void {
  const existing = getReflections();
  const updated = existing.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(updated));
}

// Tapestries
export function getSavedTapestries(): SavedTapestry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TAPESTRIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTapestry(title: string, config: SavedTapestry['config']): SavedTapestry {
  const existing = getSavedTapestries();
  const newTapestry: SavedTapestry = {
    id: 'tap-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: title.trim() || 'Untitled Tapestry',
    config,
    createdAt: new Date().toISOString(),
  };
  const updated = [newTapestry, ...existing];
  localStorage.setItem(STORAGE_KEYS.TAPESTRIES, JSON.stringify(updated));
  return newTapestry;
}

export function deleteTapestry(id: string): void {
  const existing = getSavedTapestries();
  const updated = existing.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TAPESTRIES, JSON.stringify(updated));
}

// Sessions
export function getSessions(): TherapySession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const sessions: TherapySession[] = raw ? JSON.parse(raw) : [];
    // Sort chronological descending
    return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export function saveSession(session: Omit<TherapySession, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): TherapySession {
  const existing = getSessions();
  const now = new Date().toISOString();

  if (session.id) {
    const updated = existing.map(item => {
      if (item.id === session.id) {
        return {
          ...item,
          ...session,
          updatedAt: now,
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    return updated.find(item => item.id === session.id)!;
  } else {
    const newEntry: TherapySession = {
      id: 'sess-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      date: session.date,
      focusArea: session.focusArea,
      notes: session.notes,
      takeaways: session.takeaways,
      nextSteps: session.nextSteps,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    return newEntry;
  }
}

export function deleteSession(id: string): void {
  const existing = getSessions();
  const updated = existing.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
}

// Reactions
export function getUserReactions(): UserReactionsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REACTIONS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function toggleReaction(storyId: string, reaction: 'hearYou' | 'relate' | 'holdingSpace'): UserReactionsState {
  const current = getUserReactions();
  const storyState = current[storyId] || {};
  const isCurrentlyActive = !!storyState[reaction];

  const updated: UserReactionsState = {
    ...current,
    [storyId]: {
      ...storyState,
      [reaction]: !isCurrentlyActive
    }
  };
  localStorage.setItem(STORAGE_KEYS.REACTIONS, JSON.stringify(updated));
  return updated;
}

// Clear or Reset
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.REFLECTIONS);
  localStorage.removeItem(STORAGE_KEYS.TAPESTRIES);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.REACTIONS);
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
}

export function resetToSampleData(): void {
  localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(INITIAL_REFLECTIONS));
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(INITIAL_SESSIONS));
  localStorage.setItem(STORAGE_KEYS.TAPESTRIES, JSON.stringify(INITIAL_TAPESTRIES));
  localStorage.setItem(STORAGE_KEYS.REACTIONS, JSON.stringify({}));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
}

// Export Session File Helpers
export function exportSession(session: TherapySession, format: 'markdown' | 'text'): void {
  let content = '';
  const dateFormatted = new Date(session.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (format === 'markdown') {
    content = `# Therapy Session Notes
*Date: ${dateFormatted}*
*Focus / Topic: ${session.focusArea || 'General reflection'}*

---

## 1. Discussion & Exploration
${session.notes || '_No detailed notes recorded._'}

## 2. Key Takeaways & Insights
${session.takeaways || '_No takeaways noted._'}

## 3. Next Steps & Commitments
${session.nextSteps || '_No next steps defined._'}

---
*Stillroom — Private Personal Reflection (Not a clinical or medical record)*
`;
  } else {
    content = `STILLROOM THERAPY SESSION NOTES
==========================================
Date: ${dateFormatted}
Focus: ${session.focusArea || 'General'}
------------------------------------------

1. DISCUSSION NOTES:
${session.notes || 'None'}

2. KEY TAKEAWAYS:
${session.takeaways || 'None'}

3. NEXT STEPS:
${session.nextSteps || 'None'}

==========================================
Stillroom Personal Note. Stored locally on device.
`;
  }

  const filename = `stillroom-session-${session.date || 'note'}.${format === 'markdown' ? 'md' : 'txt'}`;
  const blob = new Blob([content], { type: format === 'markdown' ? 'text/markdown;charset=utf-8;' : 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
