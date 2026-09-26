import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X, CheckCircle2, Volume2 } from 'lucide-react';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface VirtualHugModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualHugModal: React.FC<VirtualHugModalProps> = ({ isOpen, onClose }) => {
  const [hugProgress, setHugProgress] = useState(0);
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      // Auto initiate hug sequence when opened
      startHugSequence();
    } else {
      setHugProgress(0);
      setIsHugging(false);
    }
  }, [isOpen]);

  const startHugSequence = () => {
    setIsHugging(true);
    setHugProgress(15);
    audioManager.playPop();

    const t1 = setTimeout(() => {
      setHugProgress(45);
      audioManager.playPop();
    }, 600);

    const t2 = setTimeout(() => {
      setHugProgress(80);
      audioManager.playPop();
    }, 1300);

    const t3 = setTimeout(() => {
      setHugProgress(100);
      setIsHugging(false);
      audioManager.playChime();
      fireCelebrationConfetti();
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 100]);
      }
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleSendAnotherHug = () => {
    setHugCount((c) => c + 1);
    startHugSequence();
  };

  if (!isOpen) return null;

  const getStatusText = () => {
    if (hugProgress < 30) return 'Wrapping you in the fluffiest blanket... 🧸';
    if (hugProgress < 60) return 'Brewing hot cocoa and warming up cozy socks... ☕';
    if (hugProgress < 95) return 'Transferring 100,000 gentle cuddles right now... 💖';
    return 'HUG DELIVERED! You are safe, loved & warm 🥰';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-rose-200 p-6 shadow-2xl text-center overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close hug modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Hug Delivery #{hugCount}</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800">
            A Super Warm Cuddle 🤗
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Close your eyes for 5 seconds and take a slow, deep breath.
          </p>
        </div>

        {/* Animated Cuddle Visual */}
        <div className="my-6 relative flex items-center justify-center h-44">
          {/* Animated concentric rings */}
          <div
            className={`absolute w-36 h-36 rounded-full bg-rose-100/60 transition-transform duration-700 ${
              hugProgress >= 100 ? 'scale-125 bg-pink-100/80 animate-pulse-gentle' : 'scale-100 animate-ping opacity-30'
            }`}
          />
          <div
            className={`absolute w-28 h-28 rounded-full bg-rose-200/60 transition-transform duration-500 ${
              hugProgress >= 100 ? 'scale-110' : 'scale-95'
            }`}
          />

          {/* Central Hugging Heart & Emoji */}
          <div
            className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex flex-col items-center justify-center text-white shadow-xl shadow-rose-300/80 transition-all duration-300 ${
              hugProgress >= 100 ? 'scale-110 animate-warm-glow' : 'scale-100 animate-pulse'
            }`}
          >
            <span className="text-4xl select-none">
              {hugProgress >= 100 ? '🥰' : '🤗'}
            </span>
          </div>

          {/* Little Floating floating hearts around heart */}
          <div className="absolute top-4 right-10 text-xl animate-float-slow">💗</div>
          <div className="absolute bottom-4 left-10 text-xl animate-float-reverse">✨</div>
          <div className="absolute top-8 left-8 text-sm animate-float-slow">🌸</div>
        </div>

        {/* Status Message */}
        <div className="mb-4 min-h-[44px] flex items-center justify-center">
          <p className="text-xs sm:text-sm font-semibold text-rose-700 leading-snug">
            {getStatusText()}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-rose-100 rounded-full h-2.5 overflow-hidden mb-5">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${hugProgress}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {hugProgress >= 100 ? (
            <>
              <button
                onClick={handleSendAnotherHug}
                className="w-full min-h-[46px] py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200 active:scale-98 transition-all flex items-center justify-center gap-2 hover:opacity-95"
              >
                <span>Send One More Hug! 🫂</span>
              </button>
              <button
                onClick={onClose}
                className="w-full min-h-[44px] py-2 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors"
              >
                <span>Thank you, I feel warmer now 💗</span>
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-400 font-medium py-2">
              Transferring love in progress...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
