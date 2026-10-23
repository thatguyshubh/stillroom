import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Trash2, RotateCcw, X, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearData: () => void;
  onResetData: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onClearData,
  onResetData,
}) => {
  const [confirmClear, setConfirmClear] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClear = () => {
    onClearData();
    setConfirmClear(false);
    setFeedbackMsg('All local demo data has been cleared.');
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    onResetData();
    setFeedbackMsg('Restored sample demo reflections, sessions, and stories.');
    setTimeout(() => {
      setFeedbackMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26342C]/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FFF9F7] rounded-3xl border border-[#DDEDE1] max-w-lg w-full p-6 sm:p-8 shadow-xl text-[#26342C] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#26342C]/60 hover:text-[#26342C] hover:bg-[#DDEDE1]/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#DDEDE1] flex items-center justify-center text-[#294737] border border-[#BBD9C5]/60">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="privacy-modal-title" className="text-xl sm:text-2xl font-serif font-semibold text-[#294737]">
              Privacy & Local Storage
            </h2>
            <p className="text-xs text-[#26342C]/70">
              Zero registration. Zero telemetry. Zero cloud storage.
            </p>
          </div>
        </div>

        {/* Feedback message */}
        {feedbackMsg && (
          <div className="mb-4 p-3 bg-[#DDEDE1] text-[#294737] text-xs font-medium rounded-xl flex items-center gap-2 border border-[#BBD9C5]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#294737]" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Privacy points */}
        <div className="space-y-3.5 text-sm mb-6 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-[#DDEDE1]/40 border border-[#DDEDE1] flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#294737] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-[#294737] uppercase tracking-wider mb-0.5">
                Saved only on this device
              </p>
              <p className="text-xs text-[#26342C]/80">
                All reflections, tapestries, and therapy session notes live inside your browser’s <code className="bg-[#FFF9F7] px-1.5 py-0.5 rounded border border-[#DDEDE1] text-[11px]">localStorage</code>. They never touch an external server or API.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F9E7EB]/50 border border-[#F9E7EB] flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#294737] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs text-[#294737] uppercase tracking-wider mb-0.5">
                Prototype notice
              </p>
              <p className="text-xs text-[#26342C]/80">
                This demonstration MVP does not encrypt data on your local hard drive. Anyone with direct administrative access to your browser can view stored demo data.
              </p>
            </div>
          </div>

          <div className="text-xs text-[#26342C]/70 px-1">
            Stillroom will never ask for your real name, birthdate, email address, or phone number.
          </div>
        </div>

        {/* Data management controls */}
        <div className="border-t border-[#DDEDE1] pt-5">
          <p className="text-xs font-medium text-[#294737] uppercase tracking-wider mb-3">
            Demo Data Management
          </p>

          {!confirmClear ? (
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#DDEDE1] hover:bg-[#BBD9C5] text-[#294737] text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Sample Data</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-transparent hover:bg-[#F9E7EB] text-[#26342C]/80 hover:text-red-800 border border-[#DDEDE1] text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-700" />
                <span>Clear All Data</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#F9E7EB] border border-red-200 text-xs">
              <p className="font-semibold text-red-900 mb-2">
                Are you sure you want to erase all locally stored data?
              </p>
              <p className="text-[#26342C]/80 mb-3">
                This clears your local reflections, created tapestries, and session notes.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-medium transition-colors"
                >
                  Yes, Clear Everything
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FFF9F7] text-[#26342C] font-medium border border-[#DDEDE1] hover:bg-[#DDEDE1] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
