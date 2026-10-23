import React, { useState } from 'react';
import type { SavedTapestry, TapestryConfig } from '../../types';
import { Sparkles, Save, RotateCw, Trash2, Check, Palette, Eye } from 'lucide-react';

interface ColorTapestryProps {
  savedTapestries: SavedTapestry[];
  onSaveTapestry: (title: string, config: TapestryConfig) => void;
  onDeleteTapestry: (id: string) => void;
}

const DEFAULT_CONFIG: TapestryConfig = {
  pinkWarmth: 45,
  sageDepth: 55,
  complexity: 4,
  softness: 60,
  paletteMode: 'balanced',
  seed: 12,
};

// Generates SVG wave path based on seed, complexity and index
function generateOrganicWave(index: number, complexity: number, seed: number): string {
  const points: { x: number; y: number }[] = [];
  const totalPoints = complexity + 3;
  const stepX = 800 / (totalPoints - 1);

  for (let i = 0; i < totalPoints; i++) {
    const x = i * stepX;
    // Pseudo-random wave offset
    const pseudo = Math.sin((i + 1) * (index + 2) * 1.7 + seed * 0.3) * 0.5 + 0.5;
    const baseHeight = 150 + index * 80;
    const amplitude = 50 + complexity * 12;
    const y = baseHeight + (pseudo - 0.5) * amplitude;
    points.push({ x, y });
  }

  // Build smooth cubic bezier curve
  let d = `M 0,${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX = (p0.x + p1.x) / 2;
    d += ` Q ${p0.x + (cpX - p0.x) * 0.8},${p0.y} ${cpX},${(p0.y + p1.y) / 2} T ${p1.x},${p1.y}`;
  }
  d += ` L 800,600 L 0,600 Z`;
  return d;
}

export const TapestryCanvas: React.FC<{
  config: TapestryConfig;
  className?: string;
}> = ({ config, className = 'w-full h-full' }) => {
  const { pinkWarmth, sageDepth, complexity, softness, paletteMode, seed } = config;

  // Compute dynamic color values from inputs
  // Pink tones: from soft blush #F9E7EB to deeper rose #E8A5B6
  const pinkFactor = pinkWarmth / 100;
  const pinkR = Math.round(249 - pinkFactor * 25);
  const pinkG = Math.round(231 - pinkFactor * 65);
  const pinkB = Math.round(235 - pinkFactor * 45);
  const dynamicPink = `rgb(${pinkR}, ${pinkG}, ${pinkB})`;
  const dynamicBlush = `rgba(${pinkR + 5}, ${pinkG + 15}, ${pinkB + 10}, 0.85)`;

  // Sage tones: from pale sage #DDEDE1 to forest green #294737
  const sageFactor = sageDepth / 100;
  const sageR = Math.round(221 - sageFactor * (221 - 41));
  const sageG = Math.round(237 - sageFactor * (237 - 71));
  const sageB = Math.round(225 - sageFactor * (225 - 55));
  const dynamicSage = `rgb(${sageR}, ${sageG}, ${sageB})`;
  const dynamicSoftSage = `rgba(${Math.min(255, sageR + 40)}, ${Math.min(255, sageG + 30)}, ${Math.min(255, sageB + 30)}, 0.75)`;

  // Mode overrides
  const bgGradStart = paletteMode === 'blushDominant' ? '#F9E7EB' : paletteMode === 'sageDominant' ? '#DDEDE1' : '#FFF9F7';
  const bgGradEnd = paletteMode === 'blushDominant' ? '#F4CCD6' : paletteMode === 'sageDominant' ? '#BBD9C5' : '#DDEDE1';

  const blurRadius = Math.round((softness / 100) * 22);

  // Layer waves
  const wave1 = generateOrganicWave(0, complexity, seed);
  const wave2 = generateOrganicWave(1, complexity, seed + 1);
  const wave3 = generateOrganicWave(2, complexity, seed + 2);
  const wave4 = generateOrganicWave(3, complexity, seed + 3);

  // Dynamic floating orbs
  const orb1X = 200 + ((seed * 47) % 350);
  const orb1Y = 150 + ((seed * 31) % 250);
  const orb2X = 500 + ((seed * 67) % 250);
  const orb2Y = 280 + ((seed * 23) % 220);

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`bgGrad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={bgGradStart} />
            <stop offset="100%" stopColor={bgGradEnd} />
          </linearGradient>

          <linearGradient id={`pinkGrad-${seed}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={dynamicPink} stopOpacity="0.85" />
            <stop offset="100%" stopColor={dynamicBlush} stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id={`sageGrad-${seed}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={dynamicSage} stopOpacity="0.9" />
            <stop offset="100%" stopColor={dynamicSoftSage} stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id={`accentGrad-${seed}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#294737" stopOpacity={sageFactor * 0.45} />
            <stop offset="100%" stopColor="#F9E7EB" stopOpacity={pinkFactor * 0.5} />
          </linearGradient>

          <filter id={`blurFilter-${seed}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={blurRadius} />
          </filter>
        </defs>

        {/* Base Canvas Background */}
        <rect width="800" height="600" fill={`url(#bgGrad-${seed})`} />

        {/* Diffused Atmosphere / Orbs */}
        <g filter={blurRadius > 0 ? `url(#blurFilter-${seed})` : undefined}>
          <circle
            cx={orb1X}
            cy={orb1Y}
            r={140 + pinkFactor * 60}
            fill={dynamicPink}
            opacity="0.65"
          />
          <circle
            cx={orb2X}
            cy={orb2Y}
            r={160 + sageFactor * 70}
            fill={dynamicSage}
            opacity="0.55"
          />
        </g>

        {/* Fluid Contour Layers */}
        <path
          d={wave1}
          fill={`url(#sageGrad-${seed})`}
          className="transition-all duration-300"
        />
        <path
          d={wave2}
          fill={`url(#pinkGrad-${seed})`}
          className="transition-all duration-300"
        />
        <path
          d={wave3}
          fill={`url(#accentGrad-${seed})`}
          className="transition-all duration-300"
        />
        <path
          d={wave4}
          fill={paletteMode === 'sageDominant' ? dynamicSoftSage : dynamicBlush}
          opacity="0.75"
          className="transition-all duration-300"
        />

        {/* Subtle decorative framing */}
        <rect
          x="1"
          y="1"
          width="798"
          height="598"
          fill="none"
          stroke="#294737"
          strokeOpacity="0.1"
          strokeWidth="2"
          rx="24"
        />
      </svg>
    </div>
  );
};

export const ColorTapestry: React.FC<ColorTapestryProps> = ({
  savedTapestries,
  onSaveTapestry,
  onDeleteTapestry,
}) => {
  const [config, setConfig] = useState<TapestryConfig>(DEFAULT_CONFIG);
  const [tapestryTitle, setTapestryTitle] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleShuffle = () => {
    setConfig(prev => ({
      ...prev,
      seed: Math.floor(Math.random() * 1000) + 1,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = tapestryTitle.trim() || `Tapestry #${savedTapestries.length + 1}`;
    onSaveTapestry(finalTitle, config);
    setTapestryTitle('');
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const loadSaved = (saved: SavedTapestry) => {
    setConfig(saved.config);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#294737] mb-1">
          <Palette className="w-4 h-4" />
          <span>Generative Colour Tapestry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#294737]">
          An abstract canvas for your inner climate
        </h2>
        <p className="text-sm text-[#26342C]/75 max-w-2xl mt-1">
          Tune the blush and sage frequencies. Some days feel quiet and diffused; other days feel structured and deep. Adjust the palette to mirror where you are right now.
        </p>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Top: Live Artwork Display */}
        <div className="lg:col-span-7 space-y-3">
          <div className="aspect-[4/3] w-full rounded-3xl shadow-sm border border-[#DDEDE1] overflow-hidden bg-[#FFF9F7]">
            <TapestryCanvas config={config} />
          </div>

          <div className="flex items-center justify-between px-2 text-xs text-[#26342C]/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#BBD9C5]"></span>
              Live SVG generative rendering
            </span>
            <span>Seed #{config.seed}</span>
          </div>
        </div>

        {/* Right: Fine-tuning Controls & Save Form */}
        <div className="lg:col-span-5 bg-[#FFF9F7] rounded-3xl p-6 border border-[#DDEDE1] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDEDE1]">
            <h3 className="font-serif text-lg font-semibold text-[#294737]">
              Palette & Fluidity Controls
            </h3>
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#294737] bg-[#DDEDE1]/70 hover:bg-[#DDEDE1] transition-colors"
              title="Shuffle wave patterns"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
          </div>

          {/* Palette Mood Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-[#294737]">
              Atmosphere Mood
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'balanced', label: 'Balanced Flow' },
                { id: 'sageDominant', label: 'Sage Canopy' },
                { id: 'blushDominant', label: 'Blush Dawn' },
                { id: 'whisper', label: 'Quiet Mist' },
              ].map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setConfig({ ...config, paletteMode: mode.id as any })}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                    config.paletteMode === mode.id
                      ? 'bg-[#294737] text-[#FFF9F7] border-[#294737] shadow-xs'
                      : 'bg-[#FFF9F7] text-[#26342C] border-[#DDEDE1] hover:bg-[#DDEDE1]/40'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {/* Pink Warmth */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#26342C]">Pink Warmth & Tint</span>
                <span className="text-[#26342C]/60">{config.pinkWarmth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.pinkWarmth}
                onChange={e => setConfig({ ...config, pinkWarmth: Number(e.target.value) })}
                className="w-full h-2 bg-[#F9E7EB] rounded-lg appearance-none cursor-pointer accent-[#294737]"
              />
            </div>

            {/* Sage Depth */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#26342C]">Sage Depth & Contrast</span>
                <span className="text-[#26342C]/60">{config.sageDepth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.sageDepth}
                onChange={e => setConfig({ ...config, sageDepth: Number(e.target.value) })}
                className="w-full h-2 bg-[#DDEDE1] rounded-lg appearance-none cursor-pointer accent-[#294737]"
              />
            </div>

            {/* Complexity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#26342C]">Wave Rhythm & Layers</span>
                <span className="text-[#26342C]/60">Level {config.complexity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={config.complexity}
                onChange={e => setConfig({ ...config, complexity: Number(e.target.value) })}
                className="w-full h-2 bg-[#DDEDE1] rounded-lg appearance-none cursor-pointer accent-[#294737]"
              />
            </div>

            {/* Softness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#26342C]">Atmosphere Diffusion (Softness)</span>
                <span className="text-[#26342C]/60">{config.softness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.softness}
                onChange={e => setConfig({ ...config, softness: Number(e.target.value) })}
                className="w-full h-2 bg-[#BBD9C5] rounded-lg appearance-none cursor-pointer accent-[#294737]"
              />
            </div>
          </div>

          {/* Save Tapestry Form */}
          <form onSubmit={handleSave} className="pt-2 border-t border-[#DDEDE1] space-y-3">
            <div className="space-y-1">
              <label htmlFor="tapestry-title" className="text-xs font-medium text-[#294737]">
                Name this tapestry
              </label>
              <div className="flex gap-2">
                <input
                  id="tapestry-title"
                  type="text"
                  placeholder="e.g., Afternoon stillness"
                  value={tapestryTitle}
                  onChange={e => setTapestryTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDEDE1] bg-white focus:outline-none focus:ring-1 focus:ring-[#294737]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#294737] hover:bg-[#1f382b] text-[#FFF9F7] text-xs font-medium transition-colors shrink-0 shadow-xs"
                >
                  {showSaveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#BBD9C5]" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Tapestry</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Saved Tapestries Gallery */}
      <div className="space-y-4 pt-4 border-t border-[#DDEDE1]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#294737]">
              Saved Tapestries ({savedTapestries.length})
            </h3>
            <p className="text-xs text-[#26342C]/70">
              Revisit your previous color landscapes anytime. Click any piece to inspect or modify.
            </p>
          </div>
        </div>

        {savedTapestries.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-[#DDEDE1]/20 border border-dashed border-[#DDEDE1]">
            <Sparkles className="w-6 h-6 text-[#294737]/40 mx-auto mb-2" />
            <p className="text-xs text-[#26342C]/70">No saved tapestries yet. Create your first piece above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedTapestries.map(tapestry => (
              <div
                key={tapestry.id}
                className="bg-[#FFF9F7] rounded-2xl border border-[#DDEDE1] p-3 shadow-xs hover:border-[#BBD9C5] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-3 border border-[#DDEDE1]/60">
                    <TapestryCanvas config={tapestry.config} />
                  </div>
                  <div className="flex items-start justify-between gap-2 px-1">
                    <div>
                      <h4 className="font-serif font-semibold text-sm text-[#294737] line-clamp-1">
                        {tapestry.title}
                      </h4>
                      <p className="text-[11px] text-[#26342C]/60">
                        {new Date(tapestry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#DDEDE1]/60 px-1">
                  <button
                    onClick={() => loadSaved(tapestry)}
                    className="flex items-center gap-1 text-[11px] font-medium text-[#294737] hover:underline"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Load into Studio</span>
                  </button>

                  <button
                    onClick={() => onDeleteTapestry(tapestry.id)}
                    className="text-[#26342C]/40 hover:text-red-700 transition-colors p-1"
                    title="Delete tapestry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
