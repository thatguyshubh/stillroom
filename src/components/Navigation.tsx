import React from 'react';
import type { NavigationTab } from '../types';
import { ShieldCheck, BookOpen, Users, CalendarCheck, Home } from 'lucide-react';

interface NavigationProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenPrivacy: () => void;
  sessionCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  onOpenPrivacy,
  sessionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F7]/90 backdrop-blur-md border-b border-[#DDEDE1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-3 text-left group transition-opacity hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-full bg-[#DDEDE1] flex items-center justify-center border border-[#BBD9C5]/60 text-[#294737] font-serif text-lg font-medium shadow-sm">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#294737]">
                Stillroom
              </span>
            </div>
            <p className="text-[11px] text-[#26342C]/70 tracking-wide font-sans -mt-0.5 hidden sm:block">
              You deserve to be heard.
            </p>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#DDEDE1]/50 border border-[#BBD9C5]/50 text-sm">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
              currentTab === 'dashboard'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:bg-[#DDEDE1] hover:text-[#294737]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onTabChange('reflect')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
              currentTab === 'reflect'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:bg-[#DDEDE1] hover:text-[#294737]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Reflect</span>
          </button>

          <button
            onClick={() => onTabChange('community')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
              currentTab === 'community'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:bg-[#DDEDE1] hover:text-[#294737]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Community</span>
          </button>

          <button
            onClick={() => onTabChange('sessions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium relative ${
              currentTab === 'sessions'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:bg-[#DDEDE1] hover:text-[#294737]'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Sessions</span>
            {sessionCount > 0 && (
              <span
                className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                  currentTab === 'sessions'
                    ? 'bg-[#BBD9C5] text-[#294737]'
                    : 'bg-[#BBD9C5]/80 text-[#294737]'
                }`}
              >
                {sessionCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right side: Privacy status button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#294737] bg-[#F9E7EB]/70 border border-[#F9E7EB] hover:bg-[#F9E7EB] transition-colors"
            title="Privacy status & demo data settings"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#294737]" />
            <span className="hidden sm:inline">100% Private & Local</span>
            <span className="sm:hidden">Private</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F7]/95 backdrop-blur-md border-t border-[#DDEDE1] px-4 py-2">
        <div className="flex justify-around items-center">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex flex-col items-center gap-1 p-1 text-xs ${
              currentTab === 'dashboard' ? 'text-[#294737] font-semibold' : 'text-[#26342C]/70'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onTabChange('reflect')}
            className={`flex flex-col items-center gap-1 p-1 text-xs ${
              currentTab === 'reflect' ? 'text-[#294737] font-semibold' : 'text-[#26342C]/70'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Reflect</span>
          </button>

          <button
            onClick={() => onTabChange('community')}
            className={`flex flex-col items-center gap-1 p-1 text-xs ${
              currentTab === 'community' ? 'text-[#294737] font-semibold' : 'text-[#26342C]/70'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Community</span>
          </button>

          <button
            onClick={() => onTabChange('sessions')}
            className={`flex flex-col items-center gap-1 p-1 text-xs relative ${
              currentTab === 'sessions' ? 'text-[#294737] font-semibold' : 'text-[#26342C]/70'
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
            <span>Sessions</span>
            {sessionCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#294737]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
