import React, { useState } from 'react';
import type { TherapySession } from '../../types';
import { exportSession } from '../../utils/storage';
import {
  CalendarCheck,
  Plus,
  FileDown,
  Edit3,
  Trash2,
  Calendar,
  Sparkles,
  ShieldAlert,
  Check,
  X,
  FileText,
} from 'lucide-react';

interface SessionsSectionProps {
  sessions: TherapySession[];
  onSaveSession: (session: {
    id?: string;
    date: string;
    focusArea: string;
    notes: string;
    takeaways: string;
    nextSteps: string;
  }) => void;
  onDeleteSession: (id: string) => void;
}

export const SessionsSection: React.FC<SessionsSectionProps> = ({
  sessions,
  onSaveSession,
  onDeleteSession,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [focusArea, setFocusArea] = useState('');
  const [notes, setNotes] = useState('');
  const [takeaways, setTakeaways] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [exportedId, setExportedId] = useState<string | null>(null);

  const startEdit = (session: TherapySession) => {
    setEditingId(session.id);
    setDate(session.date);
    setFocusArea(session.focusArea);
    setNotes(session.notes);
    setTakeaways(session.takeaways);
    setNextSteps(session.nextSteps);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setDate(new Date().toISOString().slice(0, 10));
    setFocusArea('');
    setNotes('');
    setTakeaways('');
    setNextSteps('');
    setIsFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!focusArea.trim() && !notes.trim()) return;

    onSaveSession({
      id: editingId || undefined,
      date,
      focusArea: focusArea.trim() || 'General Session Reflections',
      notes: notes.trim(),
      takeaways: takeaways.trim(),
      nextSteps: nextSteps.trim(),
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      resetForm();
    }, 1200);
  };

  const handleExport = (session: TherapySession, format: 'markdown' | 'text') => {
    exportSession(session, format);
    setExportedId(session.id);
    setTimeout(() => setExportedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Session Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#294737] mb-1">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Therapy Notes & Personal Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#294737]">
            Integrate what matters most
          </h2>
          <p className="text-sm text-[#26342C]/75 max-w-xl mt-1">
            Capture takeaways right after your appointment so hard-earned insights don’t evaporate into the busy week.
          </p>
        </div>

        {/* Counter Badge & Record Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#DDEDE1] border border-[#BBD9C5] text-[#294737]">
            <span className="text-xl sm:text-2xl font-serif font-bold leading-none">
              {sessions.length}
            </span>
            <span className="text-xs font-medium leading-tight">
              {sessions.length === 1 ? 'Session Recorded' : 'Sessions Recorded'}
            </span>
          </div>

          {!isFormOpen && (
            <button
              onClick={() => {
                resetForm();
                setIsFormOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#294737] hover:bg-[#1f382b] text-[#FFF9F7] text-xs font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Record Session</span>
            </button>
          )}
        </div>
      </div>

      {/* Clinical Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-[#DDEDE1]/40 border border-[#BBD9C5]/50 flex items-start gap-3 text-xs text-[#26342C]/80">
        <ShieldAlert className="w-4 h-4 text-[#294737] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#294737]">Private Personal Notes:</span> These entries are for your own reflection and peace of mind. They are not a clinical healthcare record, nor can your therapist or medical provider access them.
        </div>
      </div>

      {/* Session Entry Form Card (Collapsible) */}
      {isFormOpen && (
        <div className="bg-[#FFF9F7] rounded-3xl p-6 sm:p-7 border border-[#DDEDE1] shadow-sm animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDEDE1]">
              <h3 className="font-serif text-lg font-semibold text-[#294737] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BBD9C5]" />
                <span>{editingId ? 'Edit Session Note' : 'Log New Therapy Session'}</span>
              </h3>
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-[#26342C]/70 hover:text-[#26342C] p-1 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Row 1: Date & Focus Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-[#294737] block mb-1.5">
                  Session Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDEDE1] bg-white text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#294737] block mb-1.5">
                  Primary Focus / Theme *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Establishing boundaries with family, work anxiety, inner child"
                  value={focusArea}
                  onChange={e => setFocusArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDEDE1] bg-white text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737]"
                />
              </div>
            </div>

            {/* Row 2: Discussion Notes */}
            <div>
              <label className="text-xs font-medium text-[#294737] block mb-1.5">
                What did we explore? (Discussion & Themes)
              </label>
              <textarea
                rows={4}
                placeholder="Key patterns we touched upon, bodily sensations, stories or memories brought up..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDEDE1] bg-white text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737] resize-y"
              />
            </div>

            {/* Row 3: Key Takeaways & Epiphanies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#294737] block mb-1.5">
                  Key Takeaway / Reframe
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., 'Perfectionism is a fear reaction, not a work ethic.'"
                  value={takeaways}
                  onChange={e => setTakeaways(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDEDE1] bg-white text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737] resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#294737] block mb-1.5">
                  Gentle Next Step / Intention
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Try taking 3 deep belly breaths before responding to difficult emails."
                  value={nextSteps}
                  onChange={e => setNextSteps(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDEDE1] bg-white text-[#26342C] focus:outline-none focus:ring-1 focus:ring-[#294737] resize-y"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#26342C]/60">
                Saves directly into local browser storage
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-full border border-[#DDEDE1] text-xs font-medium text-[#26342C] hover:bg-[#DDEDE1]/50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!focusArea.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#294737] hover:bg-[#1f382b] disabled:opacity-40 text-[#FFF9F7] text-xs font-medium transition-all shadow-sm"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#BBD9C5]" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-4 h-4" />
                      <span>{editingId ? 'Update Session' : 'Save Session Note'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Chronological Session History */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-[#294737]">
            Session Timeline ({sessions.length})
          </h3>
          <span className="text-xs text-[#26342C]/70">
            Sorted by most recent
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-[#DDEDE1]/20 border border-dashed border-[#DDEDE1]">
            <CalendarCheck className="w-8 h-8 text-[#294737]/40 mx-auto mb-2" />
            <p className="text-sm font-medium text-[#294737]">No session notes recorded yet</p>
            <p className="text-xs text-[#26342C]/70 mt-1 max-w-sm mx-auto">
              Click “Record Session” above to record your session takeaways and track your personal journey.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => {
              const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <div
                  key={session.id}
                  className="bg-[#FFF9F7] rounded-3xl p-6 border border-[#DDEDE1] shadow-xs hover:border-[#BBD9C5] transition-all space-y-4"
                >
                  {/* Card Top: Date, Title & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#DDEDE1]/70">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-0.5 rounded-full bg-[#DDEDE1] text-[#294737] text-xs font-semibold flex items-center gap-1.5 border border-[#BBD9C5]">
                          <Calendar className="w-3 h-3" />
                          {formattedDate}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-[#294737]">
                        {session.focusArea}
                      </h4>
                    </div>

                    {/* Action Controls: Export, Edit, Delete */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      {/* Export Dropdown / Buttons */}
                      <button
                        onClick={() => handleExport(session, 'markdown')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#294737] bg-[#DDEDE1]/70 hover:bg-[#DDEDE1] border border-[#BBD9C5]/60 transition-colors"
                        title="Download notes as Markdown file"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Export .md</span>
                      </button>

                      <button
                        onClick={() => handleExport(session, 'text')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#26342C] bg-white hover:bg-[#DDEDE1]/40 border border-[#DDEDE1] transition-colors"
                        title="Download notes as Plain Text"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>.txt</span>
                      </button>

                      <button
                        onClick={() => startEdit(session)}
                        className="p-1.5 rounded-xl text-[#26342C]/70 hover:text-[#294737] hover:bg-[#DDEDE1] transition-colors"
                        title="Edit session"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteSession(session.id)}
                        className="p-1.5 rounded-xl text-[#26342C]/70 hover:text-red-700 hover:bg-[#F9E7EB] transition-colors"
                        title="Delete session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Export feedback toast */}
                  {exportedId === session.id && (
                    <div className="p-2.5 rounded-xl bg-[#DDEDE1] text-[#294737] text-xs font-medium flex items-center gap-2 border border-[#BBD9C5]">
                      <Check className="w-4 h-4" />
                      <span>Notes exported and downloaded to your computer!</span>
                    </div>
                  )}

                  {/* Discussion Notes */}
                  {session.notes && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#294737]/80">
                        Discussion & Exploration
                      </p>
                      <p className="text-xs sm:text-sm text-[#26342C]/85 leading-relaxed whitespace-pre-wrap">
                        {session.notes}
                      </p>
                    </div>
                  )}

                  {/* Takeaway & Next Steps Highlight Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {session.takeaways && (
                      <div className="p-4 rounded-2xl bg-[#DDEDE1]/50 border border-[#BBD9C5]/50">
                        <p className="text-xs font-semibold text-[#294737] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <span>🌱</span>
                          <span>Key Takeaway</span>
                        </p>
                        <p className="text-xs sm:text-sm text-[#26342C] font-serif italic">
                          "{session.takeaways}"
                        </p>
                      </div>
                    )}

                    {session.nextSteps && (
                      <div className="p-4 rounded-2xl bg-[#F9E7EB]/50 border border-[#F9E7EB]">
                        <p className="text-xs font-semibold text-[#294737] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <span>🎯</span>
                          <span>Next Step / Intention</span>
                        </p>
                        <p className="text-xs sm:text-sm text-[#26342C]">
                          {session.nextSteps}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
