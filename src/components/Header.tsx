import React from 'react';
import { Heart, Sparkles, Moon, Sun, Coffee } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface HeaderProps {
  onOpenHug: () => void;
  onOpenSurprise: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHug, onOpenSurprise }) => {
  const handleHeartClick = () => {
    fireHeartConfetti();
    audioManager.playPop();
  };

  return (
    <header className="relative z-10 pt-4 pb-2">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-2 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleHeartClick}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-sm shadow-rose-200 active:scale-95 transition-transform"
            aria-label="Tap for love"
          >
            <Heart className="w-5 h-5 fill-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Bestie Care 💗
            </h1>
            <p className="text-[11px] font-medium text-rose-500/80 -mt-0.5">
              your personal comfort station
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium bg-rose-100/70 border border-rose-200/80 rounded-full px-3 py-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Warm & Cozy</span>
        </div>
      </div>

      {/* Main Welcome Hero Banner */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/95 to-rose-50/90 border border-rose-200/80 p-6 shadow-sm shadow-rose-100/60 backdrop-blur-md">
          {/* Decorative Corner Embellishments */}
          <div className="absolute top-2 right-3 text-3xl select-none opacity-80 animate-float-slow">
            🌸
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-200/40 rounded-full blur-xl pointer-events-none" />

          {/* Subtitle kicker */}
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">
            <span>Special Care Package</span>
            <span aria-hidden="true">·</span>
            <span>Made Just For You</span>
          </div>

          {/* Prompt requested titles */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3">
            Hey Bestie <span className="inline-block animate-pulse-gentle">💗</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
            “Aaj bas relax kar, baaki sab hum sambhal lenge 😌”
          </p>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mb-5">
            Your body is working extra hard today, and it deserves all the softness, warmth, and zero guilt. Treat this as your safe corner to smile, vent, and cuddle up.
          </p>

          {/* Quick Hero Actions */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => {
                fireHeartConfetti(0.3, 0.4);
                audioManager.playChime();
                onOpenHug();
              }}
              className="min-h-[48px] px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-sm shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2 hover:opacity-95"
            >
              <span>Virtual Hug</span>
              <span className="text-base">🤗</span>
            </button>

            <button
              onClick={() => {
                fireHeartConfetti(0.7, 0.4);
                audioManager.playChime();
                onOpenSurprise();
              }}
              className="min-h-[48px] px-4 py-2.5 rounded-2xl bg-white border border-purple-200 text-purple-700 font-semibold text-sm shadow-xs hover:bg-purple-50/50 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Little Surprise</span>
              <span className="text-base">🎁</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
