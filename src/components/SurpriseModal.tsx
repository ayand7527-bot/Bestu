import React, { useState, useEffect } from 'react';
import { SURPRISE_ITEMS } from '../data/cheersData';
import { SurpriseItem } from '../types';
import { Gift, Sparkles, X, RotateCcw, Copy, Check } from 'lucide-react';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose }) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsUnwrapped(false);
      // Pick random initial surprise
      setSurpriseIndex(Math.floor(Math.random() * SURPRISE_ITEMS.length));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSurprise: SurpriseItem = SURPRISE_ITEMS[surpriseIndex % SURPRISE_ITEMS.length];

  const handleUnwrap = (e?: React.MouseEvent) => {
    setIsUnwrapped(true);
    audioManager.playChime();
    fireCelebrationConfetti();
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([80, 50, 80]);
    }
  };

  const handleNextSurprise = () => {
    setIsUnwrapped(false);
    audioManager.playPop();
    setTimeout(() => {
      setSurpriseIndex((prev) => (prev + 1) % SURPRISE_ITEMS.length);
      setIsUnwrapped(true);
      audioManager.playChime();
      fireHeartConfetti();
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`🎁 ${currentSurprise.title}\n\n${currentSurprise.content}\n\n— Sent from Bestie Care 💗`);
    setCopied(true);
    audioManager.playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-purple-200 p-6 shadow-2xl text-center overflow-hidden">
        {/* Soft background tint */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close surprise modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isUnwrapped ? (
          /* Unopened Gift State */
          <div className="py-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Delivery for You</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-800 mb-1">
              Little Surprise 🎁
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              A tiny secret package packed with love, laughs, and pampering!
            </p>

            {/* Gift Box Graphic Button */}
            <div className="my-6 flex justify-center">
              <button
                onClick={handleUnwrap}
                className="group relative cursor-pointer active:scale-95 transition-transform"
                title="Tap to unwrap"
                aria-label="Tap to unwrap gift box"
              >
                {/* Pulsing ring */}
                <div className="absolute -inset-4 bg-purple-200/50 rounded-full blur-md group-hover:bg-purple-300/60 transition-all animate-pulse-gentle" />

                {/* Animated Gift Box Container */}
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-xl shadow-purple-300/70 border-2 border-white/60 animate-float-slow">
                  <span className="text-5xl select-none transition-transform group-hover:scale-110">
                    🎁
                  </span>
                </div>
              </button>
            </div>

            <p className="text-xs font-bold text-purple-700 animate-bounce mb-6">
              ✨ Tap the gift box to unwrap! ✨
            </p>

            <button
              onClick={handleUnwrap}
              className="w-full min-h-[48px] py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm shadow-md shadow-purple-200 active:scale-98 transition-all hover:opacity-95"
            >
              Open My Surprise 🎀
            </button>
          </div>
        ) : (
          /* Unwrapped Revealed State */
          <div className="py-2 animate-in zoom-in-95 duration-300">
            {/* Category Badge */}
            <div className="inline-block text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-full mb-3">
              {currentSurprise.typeBadge}
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-100 mx-auto flex items-center justify-center text-3xl shadow-inner mb-3">
              {currentSurprise.icon}
            </div>

            <h4 className="text-lg font-bold text-slate-800 leading-snug mb-2">
              {currentSurprise.title}
            </h4>

            {/* Surprise Body */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 my-3 text-left">
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                {currentSurprise.content}
              </p>
              <div className="mt-3 pt-2 border-t border-purple-200/40 text-[11px] text-purple-700 font-semibold italic text-center">
                {currentSurprise.footerNote}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextSurprise}
                  className="flex-1 min-h-[46px] py-2 px-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-purple-200 active:scale-98 transition-all hover:opacity-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Unwrap Another! 🎁</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="min-h-[46px] px-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-1 transition-colors"
                  title="Copy surprise"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full min-h-[42px] py-2 px-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Close for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
