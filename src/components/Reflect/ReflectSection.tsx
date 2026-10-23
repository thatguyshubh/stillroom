import React, { useState } from 'react';
import type { FeelingType, ReflectSubTab, Reflection, SavedTapestry, TapestryConfig } from '../../types';
import { ReflectionJournal } from './ReflectionJournal';
import { ColorTapestry } from './ColorTapestry';
import { BookOpen, Palette } from 'lucide-react';

interface ReflectSectionProps {
  reflections: Reflection[];
  savedTapestries: SavedTapestry[];
  onSaveReflection: (reflection: { id?: string; title: string; content: string; feeling?: FeelingType }) => void;
  onDeleteReflection: (id: string) => void;
  onSaveTapestry: (title: string, config: TapestryConfig) => void;
  onDeleteTapestry: (id: string) => void;
  initialSubTab?: ReflectSubTab;
}

export const ReflectSection: React.FC<ReflectSectionProps> = ({
  reflections,
  savedTapestries,
  onSaveReflection,
  onDeleteReflection,
  onSaveTapestry,
  onDeleteTapestry,
  initialSubTab = 'journal',
}) => {
  const [subTab, setSubTab] = useState<ReflectSubTab>(initialSubTab);

  return (
    <div className="space-y-6">
      {/* Sub navigation pills */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-full bg-[#DDEDE1]/50 border border-[#BBD9C5]/50">
          <button
            onClick={() => setSubTab('journal')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              subTab === 'journal'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:text-[#294737] hover:bg-[#DDEDE1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Private Reflections ({reflections.length})</span>
          </button>

          <button
            onClick={() => setSubTab('tapestry')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              subTab === 'tapestry'
                ? 'bg-[#294737] text-[#FFF9F7] shadow-sm'
                : 'text-[#26342C] hover:text-[#294737] hover:bg-[#DDEDE1]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colour Tapestry ({savedTapestries.length})</span>
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {subTab === 'journal' ? (
        <ReflectionJournal
          reflections={reflections}
          onSaveReflection={onSaveReflection}
          onDeleteReflection={onDeleteReflection}
        />
      ) : (
        <ColorTapestry
          savedTapestries={savedTapestries}
          onSaveTapestry={onSaveTapestry}
          onDeleteTapestry={onDeleteTapestry}
        />
      )}
    </div>
  );
};
