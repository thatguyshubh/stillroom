import React, { useState } from 'react';
import type { FeelingType, Reflection } from '../../types';
import { PenLine, Lock, Trash2, Edit3, Check, Calendar, HeartHandshake, X } from 'lucide-react';

interface ReflectionJournalProps {
  reflections: Reflection[];
  onSaveReflection: (reflection: { id?: string; title: string; content: string; feeling?: FeelingType }) => void;
  onDeleteReflection: (id: string) => void;
}

const FEELINGS: { label: FeelingType; color: string }[] = [
  { label: 'Calm', color: 'bg-[#DDEDE1] text-[#294737] border-[#BBD9C5]' },
  { label: 'Grateful', color: 'bg-[#F9E7EB] text-[#294737] border-[#F4CCD6]' },
  { label: 'Hopeful', color: 'bg-[#DDEDE1] text-[#294737] border-[#BBD9C5]' },
  { label: 'Reflective', color: 'bg-[#DDEDE1]/70 text-[#294737] border-[#BBD9C5]' },
  { label: 'Overwhelmed', color: 'bg-[#F9E7EB] text-[#26342C] border-[#F4CCD6]' },
  { label: 'Anxious', color: 'bg-[#F9E7EB] text-[#26342C] border-[#F4CCD6]' },
  { label: 'Weary', color: 'bg-[#DDEDE1]/50 text-[#26342C] border-[#BBD9C5]' },
  { label: 'Seeking Clarity', color: 'bg-[#DDEDE1] text-[#294737] border-[#BBD9C5]' },
];

export const ReflectionJournal: React.FC<ReflectionJournalProps> = ({
  reflections,
  onSaveReflection,
  onDeleteReflection,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingType | undefined>(undefined);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filterFeeling, setFilterFeeling] = useState<string>('all');

  const startEdit = (reflection: Reflection) => {
    setEditingId(reflection.id);
    setTitle(reflection.title);
    setContent(reflection.content);
    setSelectedFeeling(reflection.feeling);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setSelectedFeeling(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSaveReflection({
      id: editingId || undefined,
      title: title.trim() || 'Untitled Reflection',
      content: content.trim(),
      feeling: selectedFeeling,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    cancelEdit();
  };

  const filteredReflections = filterFeeling === 'all'
    ? reflections
    : reflections.filter(r => r.feeling === filterFeeling);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#294737] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Private Sanctuary Journal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#294737]">
            Put words to the unsaid
          </h2>
          <p className="text-sm text-[#26342C]/75 max-w-xl mt-1">
            Write without editing yourself. Stored exclusively on your browser, never uploaded, and never public.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDEDE1]/60 text-xs text-[#294737] font-medium border border-[#BBD9C5]/60 self-start sm:self-auto">
          <HeartHandshake className="w-4 h-4" />
          <span>No accounts · Completely confidential</span>
        </div>
      </div>

      {/* Write / Edit Card */}
      <div className="bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#294737] flex items-center gap-1.5">
              <PenLine className="w-4 h-4" />
              <span>{editingId ? 'Edit Reflection' : 'New Reflection'}</span>
            </span>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs text-[#26342C]/70 hover:text-[#26342C] flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel editing</span>
              </button>
            )}
          </div>

          {/* Feeling Pill Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#26342C]/80 block">
              How are you feeling right now? (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {FEELINGS.map(item => {
                const isSelected = selectedFeeling === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedFeeling(isSelected ? undefined : item.label)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                        : 'bg-white/80 text-[#26342C] border-[#DDEDE1] hover:border-[#BBD9C5]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Give your thought a quiet title (e.g., A heavy afternoon, finding my breath)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 text-base rounded-2xl border border-[#DDEDE1] bg-white focus:outline-none focus:ring-2 focus:ring-[#294737]/30 text-[#26342C] placeholder:text-[#26342C]/40"
            />
          </div>

          {/* Content */}
          <div>
            <textarea
              rows={5}
              placeholder="What feels heavy? What felt good? What do you need to remind yourself of?..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-2xl border border-[#DDEDE1] bg-white focus:outline-none focus:ring-2 focus:ring-[#294737]/30 text-[#26342C] placeholder:text-[#26342C]/40 leading-relaxed resize-y"
            />
          </div>

          {/* Save Button & Confirmation */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#26342C]/60 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Visible only to you on this device</span>
            </span>

            <button
              type="submit"
              disabled={!title.trim() && !content.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#294737] hover:bg-[#1f382b] disabled:opacity-40 disabled:hover:bg-[#294737] text-[#FFF9F7] text-xs font-medium transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#BBD9C5]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <PenLine className="w-4 h-4" />
                  <span>{editingId ? 'Update Reflection' : 'Save Reflection'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Past Reflections List */}
      <div className="space-y-4 pt-4 border-t border-[#DDEDE1]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#294737]">
              Previous Reflections ({reflections.length})
            </h3>
            <p className="text-xs text-[#26342C]/70">
              Your safe chronology of thoughts and emotional check-ins.
            </p>
          </div>

          {/* Quick feeling filter */}
          {reflections.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#26342C]/70">Filter:</span>
              <select
                value={filterFeeling}
                onChange={e => setFilterFeeling(e.target.value)}
                className="px-2.5 py-1 rounded-xl border border-[#DDEDE1] bg-white text-xs text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737]"
              >
                <option value="all">All Feelings</option>
                {FEELINGS.map(f => (
                  <option key={f.label} value={f.label}>{f.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {filteredReflections.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-[#DDEDE1]/20 border border-dashed border-[#DDEDE1]">
            <PenLine className="w-8 h-8 text-[#294737]/40 mx-auto mb-2" />
            <p className="text-sm font-medium text-[#294737]">No reflections found</p>
            <p className="text-xs text-[#26342C]/70 mt-1">
              Write your first thought above to begin building your private reflection archive.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReflections.map(reflection => (
              <div
                key={reflection.id}
                className="bg-[#FFF9F7] rounded-3xl p-5 border border-[#DDEDE1] shadow-xs hover:border-[#BBD9C5] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {reflection.feeling && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F9E7EB] text-[#294737] border border-[#F4CCD6]">
                          {reflection.feeling}
                        </span>
                      )}
                      <span className="text-[11px] text-[#26342C]/60 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(reflection.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(reflection)}
                        className="p-1.5 rounded-lg text-[#26342C]/60 hover:text-[#294737] hover:bg-[#DDEDE1] transition-colors"
                        title="Edit reflection"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteReflection(reflection.id)}
                        className="p-1.5 rounded-lg text-[#26342C]/60 hover:text-red-700 hover:bg-[#F9E7EB] transition-colors"
                        title="Delete reflection"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-serif font-semibold text-lg text-[#294737] leading-snug">
                    {reflection.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#26342C]/85 leading-relaxed whitespace-pre-wrap">
                    {reflection.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DDEDE1]/60 flex items-center justify-between text-[11px] text-[#26342C]/50">
                  <span className="flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    Private
                  </span>
                  {reflection.updatedAt !== reflection.createdAt && (
                    <span>Edited</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
