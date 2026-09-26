import React, { useState } from 'react';
import { MoodType } from '../types';
import { MOODS_DATA } from '../data/cheersData';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';
import { Sparkles, Utensils, Feather, Check, Copy, Share2 } from 'lucide-react';

interface MoodSelectorProps {
  onCheerClick: () => void;
  onHugClick: () => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onCheerClick, onHugClick }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('emotional');
  const [copied, setCopied] = useState(false);

  const moodList: { id: MoodType; emoji: string; label: string }[] = [
    { id: 'sad', emoji: '😭', label: 'Sad' },
    { id: 'irritated', emoji: '😤', label: 'Irritated' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
    { id: 'emotional', emoji: '🥺', label: 'Emotional' },
    { id: 'okay', emoji: '😊', label: 'Feeling okay' },
  ];

  const currentMood = MOODS_DATA[selectedMood];

  const handleSelectMood = (mood: MoodType, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMood(mood);
    audioManager.playPop();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`${currentMood.quoteHinglish}\n\n- Sent with love from Bestie Care 💗`);
    setCopied(true);
    audioManager.playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="mood-section" className="px-4 py-4 scroll-mt-6">
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
            <span>How are you feeling right now?</span>
            <span className="text-rose-500">🌸</span>
          </h3>
          <span className="text-xs text-rose-500/90 font-medium">Tap your mood</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Pick whatever fits your heart. Every feeling is totally welcomed here.
        </p>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {moodList.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              onClick={(e) => handleSelectMood(m.id, e)}
              className={`min-h-[64px] flex flex-col items-center justify-center p-2 rounded-2xl border transition-all active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-500 to-pink-500 text-white border-rose-500 shadow-md shadow-rose-200/80 scale-102 font-bold'
                  : 'bg-white/90 border-rose-100 text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 shadow-xs'
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-2xl mb-1 transition-transform group-hover:scale-110">
                {m.emoji}
              </span>
              <span className="text-[11px] leading-tight text-center line-clamp-1">
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Supportive Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-300 bg-gradient-to-br ${currentMood.comfortColor}`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl p-1.5 bg-white/80 rounded-2xl shadow-xs">
              {currentMood.emoji}
            </span>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {currentMood.supportTitle}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                Tailored care for: {currentMood.label}
              </p>
            </div>
          </div>
        </div>

        {/* Supportive Message Prose */}
        <p className="text-sm text-slate-700 leading-relaxed my-3 font-normal">
          {currentMood.supportMessage}
        </p>

        {/* Bestie Hinglish Quote */}
        <div className="relative my-3 p-3.5 rounded-2xl bg-white/85 border border-rose-100/90 shadow-xs">
          <p className="text-xs sm:text-sm font-semibold text-rose-800 italic leading-relaxed">
            {currentMood.quoteHinglish}
          </p>
          <div className="flex justify-end mt-1.5">
            <button
              onClick={handleCopyQuote}
              className="text-[11px] text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 active:scale-95 transition-transform"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy note</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tiny Comfort & Snack Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-rose-200/50">
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/60 p-2 rounded-xl">
            <Feather className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="leading-tight">
              <strong>Tiny Comfort:</strong> {currentMood.recommendedAction}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-white/60 p-2 rounded-xl">
            <Utensils className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="leading-tight">
              <strong>Comfort Nibble:</strong> {currentMood.snackIdea}
            </span>
          </div>
        </div>

        {/* Action button inside card */}
        <div className="mt-4 pt-1 flex items-center gap-2">
          <button
            onClick={() => {
              fireHeartConfetti();
              onCheerClick();
            }}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-white border border-rose-200 text-rose-700 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-50 active:scale-95 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Need more cheering up?</span>
          </button>
          <button
            onClick={() => {
              fireHeartConfetti();
              onHugClick();
            }}
            className="min-h-[44px] py-2 px-4 rounded-xl bg-rose-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-700 active:scale-95 transition-all shadow-xs"
          >
            <span>Virtual Hug</span>
            <span>🤗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
