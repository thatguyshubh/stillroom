import { useState } from 'react';
import type { NavigationTab, Reflection, SavedTapestry, TherapySession, UserReactionsState, TapestryConfig, FeelingType } from './types';
import {
  clearAllData,
  deleteReflection,
  deleteSession,
  deleteTapestry,
  getReflections,
  getSavedTapestries,
  getSessions,
  getUserReactions,
  INITIAL_STORIES,
  initializeStorageIfEmpty,
  resetToSampleData,
  saveReflection,
  saveSession,
  saveTapestry,
  toggleReaction,
} from './utils/storage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ReflectSection } from './components/Reflect/ReflectSection';
import { CommunitySection } from './components/Community/CommunitySection';
import { SessionsSection } from './components/Sessions/SessionsSection';
import { PrivacyModal } from './components/PrivacyModal';
import { HeartHandshake } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Core application persistent state initialized from localStorage
  const [reflections, setReflections] = useState<Reflection[]>(() => {
    initializeStorageIfEmpty();
    return getReflections();
  });
  const [savedTapestries, setSavedTapestries] = useState<SavedTapestry[]>(() => getSavedTapestries());
  const [sessions, setSessions] = useState<TherapySession[]>(() => getSessions());
  const [userReactions, setUserReactions] = useState<UserReactionsState>(() => getUserReactions());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadAllState = () => {
    setReflections(getReflections());
    setSavedTapestries(getSavedTapestries());
    setSessions(getSessions());
    setUserReactions(getUserReactions());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Reflection handlers
  const handleSaveReflection = (data: { id?: string; title: string; content: string; feeling?: FeelingType }) => {
    saveReflection(data);
    setReflections(getReflections());
    showToast(data.id ? 'Reflection updated' : 'Reflection saved privately');
  };

  const handleDeleteReflection = (id: string) => {
    deleteReflection(id);
    setReflections(getReflections());
    showToast('Reflection removed');
  };

  // Tapestry handlers
  const handleSaveTapestry = (title: string, config: TapestryConfig) => {
    saveTapestry(title, config);
    setSavedTapestries(getSavedTapestries());
    showToast('Colour tapestry saved to your gallery');
  };

  const handleDeleteTapestry = (id: string) => {
    deleteTapestry(id);
    setSavedTapestries(getSavedTapestries());
    showToast('Tapestry removed');
  };

  // Session handlers
  const handleSaveSession = (data: {
    id?: string;
    date: string;
    focusArea: string;
    notes: string;
    takeaways: string;
    nextSteps: string;
  }) => {
    saveSession(data);
    setSessions(getSessions());
    showToast(data.id ? 'Session updated' : 'Therapy session recorded');
  };

  const handleDeleteSession = (id: string) => {
    deleteSession(id);
    setSessions(getSessions());
    showToast('Session note removed');
  };

  // Reaction handlers
  const handleToggleReaction = (storyId: string, reaction: 'hearYou' | 'relate' | 'holdingSpace') => {
    const updated = toggleReaction(storyId, reaction);
    setUserReactions({ ...updated });
  };

  // Data management
  const handleClearAllData = () => {
    clearAllData();
    loadAllState();
    showToast('All local data cleared');
  };

  const handleResetData = () => {
    resetToSampleData();
    loadAllState();
    showToast('Sample demo data restored');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-[#26342C] flex flex-col selection:bg-[#F9E7EB] selection:text-[#294737] font-sans">
      {/* Top Header Navigation */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        sessionCount={sessions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentTab === 'dashboard' && (
          <Dashboard
            onNavigate={setCurrentTab}
            reflections={reflections}
            savedTapestries={savedTapestries}
            sessions={sessions}
            featuredStory={INITIAL_STORIES[0]}
            userReactions={userReactions}
            onToggleReaction={handleToggleReaction}
          />
        )}

        {currentTab === 'reflect' && (
          <ReflectSection
            reflections={reflections}
            savedTapestries={savedTapestries}
            onSaveReflection={handleSaveReflection}
            onDeleteReflection={handleDeleteReflection}
            onSaveTapestry={handleSaveTapestry}
            onDeleteTapestry={handleDeleteTapestry}
          />
        )}

        {currentTab === 'community' && (
          <CommunitySection
            stories={INITIAL_STORIES}
            userReactions={userReactions}
            onToggleReaction={handleToggleReaction}
          />
        )}

        {currentTab === 'sessions' && (
          <SessionsSection
            sessions={sessions}
            onSaveSession={handleSaveSession}
            onDeleteSession={handleDeleteSession}
          />
        )}
      </main>

      {/* Discreet Footer */}
      <footer className="border-t border-[#DDEDE1] py-8 text-center text-xs text-[#26342C]/65 px-4 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#DDEDE1] flex items-center justify-center font-serif text-[10px] text-[#294737] font-bold">
              S
            </div>
            <span className="font-serif font-medium text-[#294737]">Stillroom</span>
            <span>—</span>
            <span className="italic">You deserve to be heard.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#294737] hover:underline transition-colors"
            >
              Privacy & Demo Storage
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[11px]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#294737]" />
              <span>Offline-capable prototype</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Privacy & Settings Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onClearData={handleClearAllData}
        onResetData={handleResetData}
      />

      {/* Gentle Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#294737] text-[#FFF9F7] px-4 py-2.5 rounded-2xl shadow-lg text-xs font-medium flex items-center gap-2 border border-[#BBD9C5]/30 animate-bounce-short">
          <span className="w-2 h-2 rounded-full bg-[#BBD9C5]"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
