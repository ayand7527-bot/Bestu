import React, { useState, useEffect } from 'react';
import { SELF_CARE_IDEAS } from '../data/cheersData';
import { audioManager } from '../utils/audio';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import {
  Droplet,
  Moon,
  Music,
  Tv,
  Flame,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  Wind,
} from 'lucide-react';

export const SelfCareSection: React.FC = () => {
  // Water tracker (5 cute glasses)
  const [glasses, setGlasses] = useState<boolean[]>([false, false, false, false, false]);

  // Ambient audio state
  const [activeSound, setActiveSound] = useState<'rain' | 'fire' | null>(null);

  // Breathing tool modal
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    let timer: any;
    if (showBreathing) {
      const cycle = () => {
        setBreathPhase('Inhale');
        timer = setTimeout(() => {
          setBreathPhase('Hold');
          timer = setTimeout(() => {
            setBreathPhase('Exhale');
            timer = setTimeout(cycle, 4000);
          }, 3000);
        }, 4000);
      };
      cycle();
    }
    return () => clearTimeout(timer);
  }, [showBreathing]);

  const handleToggleGlass = (index: number) => {
    const updated = [...glasses];
    updated[index] = !updated[index];
    setGlasses(updated);
    audioManager.playPop();

    // Check if all glasses are filled
    if (updated.every(Boolean)) {
      fireCelebrationConfetti();
      audioManager.playChime();
    } else if (updated[index]) {
      fireHeartConfetti();
    }
  };

  const handleToggleSound = (type: 'rain' | 'fire') => {
    if (activeSound === type) {
      audioManager.stopAmbient();
      setActiveSound(null);
    } else {
      if (type === 'rain') {
        audioManager.startRainSound();
      } else {
        audioManager.startFireplaceSound();
      }
      setActiveSound(type);
      audioManager.playChime();
    }
  };

  // Safe message link
  const handleReachOut = () => {
    const text = encodeURIComponent("Hey bestie 💗 Just checking in from Bestie Care, sending you a warm hug!");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="self-care-section" className="px-4 py-4 scroll-mt-6">
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
            <span>Self-Care Ideas</span>
            <span className="text-rose-500">☕</span>
          </h3>
          <span className="text-xs text-rose-500 font-medium">Gentle & easy</span>
        </div>
        <p className="text-xs text-slate-500">
          No pressure at all. Just tiny, cozy comforts for right now.
        </p>
      </div>

      {/* Interactive Water Tracker Card */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50/80 border border-sky-100 p-4 mb-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-sky-100 text-sky-600 rounded-xl">
              <Droplet className="w-4 h-4 fill-sky-500" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                Gentle Water Reminder 💧
              </h4>
              <p className="text-[11px] text-slate-500">
                Sip slowly to soothe cramps and stay cozy
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-sky-600">
            {glasses.filter(Boolean).length}/5 glasses
          </span>
        </div>

        {/* 5 Tap Glasses */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          {glasses.map((filled, i) => (
            <button
              key={i}
              onClick={() => handleToggleGlass(i)}
              className={`flex-1 min-h-[44px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center border transition-all active:scale-95 ${
                filled
                  ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                  : 'bg-white/80 text-sky-300 border-sky-200 hover:border-sky-300'
              }`}
              title={filled ? 'Logged glass' : 'Tap to mark glass'}
              aria-label={`Water glass ${i + 1}`}
            >
              <Droplet className={`w-4 h-4 ${filled ? 'fill-white' : ''}`} />
              <span className="text-[10px] font-bold mt-0.5">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ambient Sound Player & Breathing Widget */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Rain Sound Button */}
        <button
          onClick={() => handleToggleSound('rain')}
          className={`min-h-[52px] p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-98 ${
            activeSound === 'rain'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-sm'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div>
            <div className="text-xs font-bold flex items-center gap-1">
              <span>Gentle Rain</span>
              <span>🌧️</span>
            </div>
            <div className="text-[10px] opacity-80">
              {activeSound === 'rain' ? 'Playing calming rain...' : 'Tap to play soothing rain'}
            </div>
          </div>
          {activeSound === 'rain' ? (
            <Volume2 className="w-4 h-4 animate-pulse shrink-0" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </button>

        {/* Cozy Fireplace Sound Button */}
        <button
          onClick={() => handleToggleSound('fire')}
          className={`min-h-[52px] p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-98 ${
            activeSound === 'fire'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-500 shadow-sm'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div>
            <div className="text-xs font-bold flex items-center gap-1">
              <span>Warm Hearth</span>
              <span>🔥</span>
            </div>
            <div className="text-[10px] opacity-80">
              {activeSound === 'fire' ? 'Playing fireplace...' : 'Tap for cozy crackle'}
            </div>
          </div>
          {activeSound === 'fire' ? (
            <Volume2 className="w-4 h-4 animate-pulse shrink-0" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </button>
      </div>

      {/* 60-Second Breathing Bubble Trigger */}
      <button
        onClick={() => setShowBreathing(true)}
        className="w-full min-h-[44px] mb-3 py-2.5 px-4 rounded-2xl bg-rose-100/70 border border-rose-200 text-rose-800 font-semibold text-xs flex items-center justify-between hover:bg-rose-100 active:scale-98 transition-all"
      >
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-rose-500" />
          <span>Need to slow down? Try the 1-Minute Soft Breathing</span>
        </div>
        <span className="text-xs font-bold text-rose-600">Start 🧘‍♀️</span>
      </button>

      {/* List of Prompt Self-Care Ideas */}
      <div className="space-y-2">
        {SELF_CARE_IDEAS.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white/90 border border-rose-100 p-3.5 shadow-xs flex items-start gap-3"
          >
            <div className="text-2xl p-1.5 bg-rose-50 rounded-xl shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-1 text-[11px] text-rose-700/80 font-medium">
                💡 <em>Bestie tip:</em> {item.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gentle Breathing Modal */}
      {showBreathing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-xl border border-rose-200">
            <h4 className="text-base font-bold text-slate-800 mb-1">
              Soft Belly Breathing 🌸
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Let your shoulders drop and soften your stomach.
            </p>

            {/* Breathing Animation Circle */}
            <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
              <div
                className={`w-36 h-36 rounded-full bg-gradient-to-tr from-rose-400 to-pink-300 flex flex-col items-center justify-center text-white font-bold transition-all duration-1000 shadow-xl shadow-rose-200 ${
                  breathPhase === 'Inhale'
                    ? 'scale-110'
                    : breathPhase === 'Hold'
                    ? 'scale-110 ring-8 ring-rose-200'
                    : 'scale-90 opacity-90'
                }`}
              >
                <span className="text-lg">{breathPhase}</span>
                <span className="text-xs font-normal opacity-90">
                  {breathPhase === 'Inhale'
                    ? 'Fill your belly'
                    : breathPhase === 'Hold'
                    ? 'Gently rest'
                    : 'Slowly let go'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowBreathing(false)}
              className="mt-4 w-full min-h-[44px] py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
            >
              Done Relaxing
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
