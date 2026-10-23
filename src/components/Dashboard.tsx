import React from 'react';
import type { CommunityStory, NavigationTab, Reflection, SavedTapestry, TherapySession, UserReactionsState } from '../types';
import { TapestryCanvas } from './Reflect/ColorTapestry';
import {
  BookOpen,
  Users,
  CalendarCheck,
  ArrowRight,
  PenLine,
  Sparkles,
  Heart,
  MessageCircleHeart,
  ShieldCheck,
  Palette,
  Calendar,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  reflections: Reflection[];
  savedTapestries: SavedTapestry[];
  sessions: TherapySession[];
  featuredStory: CommunityStory;
  userReactions: UserReactionsState;
  onToggleReaction: (storyId: string, reaction: 'hearYou' | 'relate' | 'holdingSpace') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  reflections,
  savedTapestries,
  sessions,
  featuredStory,
  userReactions,
  onToggleReaction,
}) => {
  const latestTapestry = savedTapestries[0];

  const getReactionCount = (story: CommunityStory, reaction: 'hearYou' | 'relate' | 'holdingSpace') => {
    const base = story.baseReactions[reaction] || 0;
    const userActive = userReactions[story.id]?.[reaction];
    return base + (userActive ? 1 : 0);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-br from-[#DDEDE1]/60 via-[#FFF9F7] to-[#F9E7EB]/60 rounded-3xl p-7 sm:p-10 border border-[#BBD9C5]/50 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDEDE1] border border-[#BBD9C5] text-[#294737] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#294737]"></span>
            <span>Welcome to Stillroom</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#294737] tracking-tight leading-[1.15]">
            You deserve to be heard.
          </h1>

          <p className="text-sm sm:text-base text-[#26342C]/85 leading-relaxed font-sans">
            A quiet sanctuary to express what you are carrying, discover lived experiences that resonate with yours, and preserve therapeutic insights.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('reflect')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#294737] hover:bg-[#1f382b] text-[#FFF9F7] text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <PenLine className="w-4 h-4" />
              <span>Write a Reflection</span>
            </button>

            <button
              onClick={() => onNavigate('sessions')}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#DDEDE1]/50 text-[#294737] text-xs sm:text-sm font-semibold border border-[#DDEDE1] transition-all shadow-2xs"
            >
              <CalendarCheck className="w-4 h-4 text-[#294737]" />
              <span>Record Session ({sessions.length})</span>
            </button>
          </div>
        </div>

        {/* Decorative soft backdrop element */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#BBD9C5]/20 blur-2xl pointer-events-none" />
      </section>

      {/* Three Prominent Primary Navigation Pillars */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#294737]">
            Core Sanctuaries
          </h2>
          <span className="text-xs text-[#26342C]/60">Select any space to begin</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: Reflect */}
          <div
            onClick={() => onNavigate('reflect')}
            className="group cursor-pointer bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] hover:border-[#BBD9C5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDEDE1] text-[#294737] flex items-center justify-center border border-[#BBD9C5]/60 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#294737]">
                Reflect
              </h3>
              <p className="text-xs sm:text-sm text-[#26342C]/75 leading-relaxed">
                Journal your unexpressed thoughts privately or craft an abstract colour tapestry mirroring your emotional landscape.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDEDE1] flex items-center justify-between text-xs font-semibold text-[#294737]">
              <span>{reflections.length} reflections · {savedTapestries.length} tapestries</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: Community */}
          <div
            onClick={() => onNavigate('community')}
            className="group cursor-pointer bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] hover:border-[#BBD9C5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F9E7EB] text-[#294737] flex items-center justify-center border border-[#F4CCD6] group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#294737]">
                Community
              </h3>
              <p className="text-xs sm:text-sm text-[#26342C]/75 leading-relaxed">
                Explore real, anonymized stories from peers navigating loneliness, family boundaries, academic anxiety, and healing.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDEDE1] flex items-center justify-between text-xs font-semibold text-[#294737]">
              <span>6 curated stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: Sessions */}
          <div
            onClick={() => onNavigate('sessions')}
            className="group cursor-pointer bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] hover:border-[#BBD9C5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDEDE1] text-[#294737] flex items-center justify-center border border-[#BBD9C5]/60 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#294737]">
                Sessions
              </h3>
              <p className="text-xs sm:text-sm text-[#26342C]/75 leading-relaxed">
                Log therapy takeaways, maintain a personal chronology, and export your session insights in clean Markdown or text files.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDEDE1] flex items-center justify-between text-xs font-semibold text-[#294737]">
              <span>{sessions.length} recorded sessions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview Grid: Recent Reflections Preview & Featured Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Reflections Preview (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDEDE1]">
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-[#294737]" />
              <h3 className="font-serif text-lg font-bold text-[#294737]">
                Recent Private Reflections
              </h3>
            </div>
            <button
              onClick={() => onNavigate('reflect')}
              className="text-xs font-semibold text-[#294737] hover:underline flex items-center gap-1"
            >
              <span>View all ({reflections.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {reflections.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#26342C]/60 space-y-2">
              <p>No reflections recorded yet.</p>
              <button
                onClick={() => onNavigate('reflect')}
                className="px-4 py-2 rounded-full bg-[#DDEDE1] text-[#294737] font-medium hover:bg-[#BBD9C5] transition-colors"
              >
                Write your first reflection
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {reflections.slice(0, 2).map(ref => (
                <div
                  key={ref.id}
                  onClick={() => onNavigate('reflect')}
                  className="p-4 rounded-2xl bg-[#DDEDE1]/30 hover:bg-[#DDEDE1]/50 border border-[#DDEDE1] cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-sm text-[#294737]">
                      {ref.title}
                    </span>
                    {ref.feeling && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F9E7EB] text-[#294737] border border-[#F4CCD6]">
                        {ref.feeling}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#26342C]/80 line-clamp-2 leading-relaxed">
                    {ref.content}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-[#26342C]/60 pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(ref.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Latest Tapestry Snippet if available */}
          {latestTapestry && (
            <div className="mt-4 pt-4 border-t border-[#DDEDE1] flex items-center gap-4">
              <div className="w-20 h-16 rounded-xl overflow-hidden border border-[#DDEDE1] shrink-0">
                <TapestryCanvas config={latestTapestry.config} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-[#294737] font-semibold">
                  <Palette className="w-3.5 h-3.5" />
                  <span className="truncate">{latestTapestry.title}</span>
                </div>
                <p className="text-[11px] text-[#26342C]/60 mt-0.5">
                  Latest saved colour landscape
                </p>
              </div>
              <button
                onClick={() => onNavigate('reflect')}
                className="text-xs font-semibold text-[#294737] hover:underline shrink-0"
              >
                Inspect
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Featured Community Story (5 cols) */}
        <div className="lg:col-span-5 bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDEDE1]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#294737]" />
              <h3 className="font-serif text-lg font-bold text-[#294737]">
                Featured Voice
              </h3>
            </div>
            <button
              onClick={() => onNavigate('community')}
              className="text-xs font-semibold text-[#294737] hover:underline flex items-center gap-1"
            >
              <span>Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#DDEDE1] text-[#294737] border border-[#BBD9C5]">
              {featuredStory.topic}
            </span>

            <h4 className="font-serif text-xl font-bold text-[#294737] leading-snug">
              {featuredStory.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#26342C]/80 leading-relaxed italic">
              "{featuredStory.excerpt}"
            </p>

            <p className="text-[11px] text-[#26342C]/60">
              Shared anonymously by {featuredStory.authorAlias}
            </p>
          </div>

          {/* Interactive Reactions on Featured Story */}
          <div className="pt-4 border-t border-[#DDEDE1] space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleReaction(featuredStory.id, 'hearYou')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all border ${
                  userReactions[featuredStory.id]?.hearYou
                    ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] font-semibold'
                    : 'bg-[#FFF9F7] text-[#26342C] border-[#DDEDE1] hover:bg-[#DDEDE1]/40'
                }`}
              >
                <MessageCircleHeart className="w-3.5 h-3.5 text-[#BBD9C5]" />
                <span>I hear you</span>
                <span className="font-mono text-[11px] opacity-80">
                  {getReactionCount(featuredStory, 'hearYou')}
                </span>
              </button>

              <button
                onClick={() => onToggleReaction(featuredStory.id, 'relate')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all border ${
                  userReactions[featuredStory.id]?.relate
                    ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] font-semibold'
                    : 'bg-[#FFF9F7] text-[#26342C] border-[#DDEDE1] hover:bg-[#F9E7EB]'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-[#F4CCD6]" />
                <span>I relate</span>
                <span className="font-mono text-[11px] opacity-80">
                  {getReactionCount(featuredStory, 'relate')}
                </span>
              </button>
            </div>

            <button
              onClick={() => onNavigate('community')}
              className="w-full text-center py-2.5 rounded-2xl bg-[#DDEDE1]/60 hover:bg-[#DDEDE1] text-[#294737] text-xs font-semibold transition-colors"
            >
              Read Full Story & Others
            </button>
          </div>
        </div>
      </section>

      {/* Gentle Privacy Banner in Footer */}
      <section className="p-5 rounded-3xl bg-[#DDEDE1]/30 border border-[#BBD9C5]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#26342C]/75">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#294737] shrink-0" />
          <span>
            <strong>Zero track record:</strong> Stillroom operates entirely within your browser storage. No accounts, cookies, or remote databases.
          </span>
        </div>
      </section>
    </div>
  );
};
