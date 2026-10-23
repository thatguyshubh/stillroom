import React, { useState } from 'react';
import type { CommunityStory, CommunityTopic, UserReactionsState } from '../../types';
import { Users, Filter, X, Heart, MessageCircleHeart, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';

interface CommunitySectionProps {
  stories: CommunityStory[];
  userReactions: UserReactionsState;
  onToggleReaction: (storyId: string, reaction: 'hearYou' | 'relate' | 'holdingSpace') => void;
}

const TOPICS: CommunityTopic[] = [
  'All',
  'School pressure',
  'Loneliness',
  'Family difficulties',
  'Personal growth',
  'Career burnout',
  'Quiet healing',
];

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  stories,
  userReactions,
  onToggleReaction,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic>('All');
  const [activeStoryModal, setActiveStoryModal] = useState<CommunityStory | null>(null);

  const filteredStories = selectedTopic === 'All'
    ? stories
    : stories.filter(s => s.topic === selectedTopic);

  const getReactionCount = (story: CommunityStory, reaction: 'hearYou' | 'relate' | 'holdingSpace') => {
    const base = story.baseReactions[reaction] || 0;
    const userActive = userReactions[story.id]?.[reaction];
    return base + (userActive ? 1 : 0);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#294737] mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Anonymous Community Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#294737]">
            Lived experiences & quiet resonance
          </h2>
          <p className="text-sm text-[#26342C]/75 max-w-xl mt-1">
            Read stories from individuals who have walked similar paths. React gently to let them know they are not alone.
          </p>
        </div>

        {/* Demo Content Badge */}
        <div className="px-3.5 py-1.5 rounded-full bg-[#DDEDE1] text-xs font-medium text-[#294737] border border-[#BBD9C5] self-start sm:self-auto flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated demo stories</span>
        </div>
      </div>

      {/* Topic Filter Tabs */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#26342C]/70">
          <Filter className="w-3.5 h-3.5 text-[#294737]" />
          <span>Filter by Topic</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedTopic === topic
                  ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                  : 'bg-[#FFF9F7] text-[#26342C] border-[#DDEDE1] hover:border-[#BBD9C5] hover:bg-[#DDEDE1]/40'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredStories.map(story => {
          const userStoryReactions = userReactions[story.id] || {};

          return (
            <div
              key={story.id}
              className="bg-[#FFF9F7] rounded-3xl p-6 border border-[#DDEDE1] shadow-xs hover:border-[#BBD9C5] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-[#26342C]/65">
                  <span className="flex items-center gap-1 font-medium text-[#294737] px-2.5 py-0.5 rounded-full bg-[#DDEDE1]/70 border border-[#BBD9C5]/50 text-[11px]">
                    <Tag className="w-2.5 h-2.5" />
                    {story.topic}
                  </span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.readingTime}
                    </span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif font-semibold text-lg text-[#294737] leading-snug">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#26342C]/80 leading-relaxed">
                  "{story.excerpt}"
                </p>

                {/* Author alias */}
                <p className="text-[11px] text-[#26342C]/60 italic">
                  Shared by {story.authorAlias}
                </p>
              </div>

              {/* Actions & Reactions Footer */}
              <div className="mt-5 pt-4 border-t border-[#DDEDE1]/70 space-y-3">
                <div className="flex items-center justify-between">
                  {/* Read button */}
                  <button
                    onClick={() => setActiveStoryModal(story)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#294737] hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Story</span>
                  </button>

                  <span className="text-[11px] text-[#26342C]/50">
                    Anonymous peer voice
                  </span>
                </div>

                {/* Reaction Pill Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* "I hear you" */}
                  <button
                    onClick={() => onToggleReaction(story.id, 'hearYou')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                      userStoryReactions.hearYou
                        ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-2xs font-semibold'
                        : 'bg-[#FFF9F7] text-[#26342C]/80 border-[#DDEDE1] hover:bg-[#DDEDE1]/40'
                    }`}
                    title="Let author know you hear them"
                  >
                    <MessageCircleHeart className="w-3.5 h-3.5 text-[#BBD9C5]" />
                    <span>I hear you</span>
                    <span className="text-[10px] opacity-80 font-mono">
                      {getReactionCount(story, 'hearYou')}
                    </span>
                  </button>

                  {/* "I relate" */}
                  <button
                    onClick={() => onToggleReaction(story.id, 'relate')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                      userStoryReactions.relate
                        ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-2xs font-semibold'
                        : 'bg-[#FFF9F7] text-[#26342C]/80 border-[#DDEDE1] hover:bg-[#F9E7EB]/50'
                    }`}
                    title="Indicate that you have experienced this too"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#F4CCD6]" />
                    <span>I relate</span>
                    <span className="text-[10px] opacity-80 font-mono">
                      {getReactionCount(story, 'relate')}
                    </span>
                  </button>

                  {/* "Holding space" */}
                  <button
                    onClick={() => onToggleReaction(story.id, 'holdingSpace')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                      userStoryReactions.holdingSpace
                        ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-2xs font-semibold'
                        : 'bg-[#FFF9F7] text-[#26342C]/80 border-[#DDEDE1] hover:bg-[#DDEDE1]/40'
                    }`}
                    title="Holding compassionate space"
                  >
                    <span>🕊️</span>
                    <span className="hidden sm:inline">Space</span>
                    <span className="text-[10px] opacity-80 font-mono">
                      {getReactionCount(story, 'holdingSpace')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Story Reading Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26342C]/40 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-[#FFF9F7] rounded-3xl border border-[#DDEDE1] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-[#26342C]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#26342C]/60 hover:text-[#26342C] hover:bg-[#DDEDE1] transition-colors"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6 pr-8">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-0.5 rounded-full bg-[#DDEDE1] text-[#294737] font-semibold border border-[#BBD9C5]">
                  {activeStoryModal.topic}
                </span>
                <span className="text-[#26342C]/60">{activeStoryModal.readingTime}</span>
                <span>•</span>
                <span className="text-[#26342C]/60">{activeStoryModal.date}</span>
              </div>

              <h2 id="story-modal-title" className="text-2xl sm:text-3xl font-serif font-semibold text-[#294737] leading-tight">
                {activeStoryModal.title}
              </h2>

              <p className="text-xs text-[#26342C]/60 italic">
                Reflected by {activeStoryModal.authorAlias}
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#26342C]/90 leading-relaxed font-sans mb-8">
              {activeStoryModal.fullStory.map((paragraph, index) => (
                <p key={index} className="first-letter:text-xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#294737]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Modal Reactions Footer */}
            <div className="border-t border-[#DDEDE1] pt-6 space-y-3 bg-[#DDEDE1]/20 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-semibold text-[#294737]">
                  Did this resonate with you?
                </span>
                <span className="text-[11px] text-[#26342C]/60">
                  Anonymous response
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => onToggleReaction(activeStoryModal.id, 'hearYou')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                    userReactions[activeStoryModal.id]?.hearYou
                      ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                      : 'bg-white text-[#26342C] border-[#DDEDE1] hover:bg-[#DDEDE1]'
                  }`}
                >
                  <MessageCircleHeart className="w-4 h-4 text-[#BBD9C5]" />
                  <span>I hear you</span>
                  <span className="font-mono text-[11px] opacity-80">
                    {getReactionCount(activeStoryModal, 'hearYou')}
                  </span>
                </button>

                <button
                  onClick={() => onToggleReaction(activeStoryModal.id, 'relate')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                    userReactions[activeStoryModal.id]?.relate
                      ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                      : 'bg-white text-[#26342C] border-[#DDEDE1] hover:bg-[#F9E7EB]'
                  }`}
                >
                  <Heart className="w-4 h-4 text-[#F4CCD6]" />
                  <span>I relate</span>
                  <span className="font-mono text-[11px] opacity-80">
                    {getReactionCount(activeStoryModal, 'relate')}
                  </span>
                </button>

                <button
                  onClick={() => onToggleReaction(activeStoryModal.id, 'holdingSpace')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                    userReactions[activeStoryModal.id]?.holdingSpace
                      ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                      : 'bg-white text-[#26342C] border-[#DDEDE1] hover:bg-[#DDEDE1]'
                  }`}
                >
                  <span>🕊️</span>
                  <span>Holding space</span>
                  <span className="font-mono text-[11px] opacity-80">
                    {getReactionCount(activeStoryModal, 'holdingSpace')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
