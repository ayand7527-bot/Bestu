/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { CheerGenerator } from './components/CheerGenerator';
import { VirtualHugModal } from './components/VirtualHugModal';
import { SurpriseModal } from './components/SurpriseModal';
import { SelfCareSection } from './components/SelfCareSection';
import { BestieLetter } from './components/BestieLetter';
import { BottomNav } from './components/BottomNav';
import { Heart, Sparkles, HeartHandshake, Gift } from 'lucide-react';
import { fireHeartConfetti, fireCelebrationConfetti } from './utils/confetti';
import { audioManager } from './utils/audio';

export default function App() {
  const [isHugOpen, setIsHugOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');

  // Listen to scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['letter-section', 'self-care-section', 'cheer-section', 'mood-section'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveTab(sectionId);
            return;
          }
        }
      }
      setActiveTab('welcome');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFloatingAction = (type: 'hug' | 'surprise') => {
    if (type === 'hug') {
      fireHeartConfetti();
      audioManager.playChime();
      setIsHugOpen(true);
    } else {
      fireCelebrationConfetti();
      audioManager.playChime();
      setIsSurpriseOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-purple-50/60 pb-24 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Floating Gentle Background Hearts */}
      <FloatingHearts />

      {/* Main Container - Mobile First (Max Width 460px on Desktop for authentic Android app look) */}
      <main className="relative z-10 max-w-lg mx-auto min-h-screen bg-white/40 shadow-sm border-x border-rose-100/50">
        {/* Header & Welcome Banner */}
        <div id="welcome">
          <Header
            onOpenHug={() => setIsHugOpen(true)}
            onOpenSurprise={() => setIsSurpriseOpen(true)}
          />
        </div>

        {/* Quick Love Boosters Bar */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFloatingAction('hug')}
              className="min-h-[46px] p-2.5 rounded-2xl bg-white/90 border border-rose-200/80 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-rose-50 active:scale-95 transition-all"
            >
              <span className="text-lg">🤗</span>
              <span>Virtual Hug</span>
            </button>
            <button
              onClick={() => handleFloatingAction('surprise')}
              className="min-h-[46px] p-2.5 rounded-2xl bg-white/90 border border-purple-200/80 text-purple-700 font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-purple-50 active:scale-95 transition-all"
            >
              <span className="text-lg">🎁</span>
              <span>Little Surprise</span>
            </button>
          </div>
        </div>

        {/* Section 2: Mood Selector with tailored comforting messages */}
        <MoodSelector
          onCheerClick={() => {
            const el = document.getElementById('cheer-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onHugClick={() => setIsHugOpen(true)}
        />

        {/* Section 3: Cheer Me Up Generator */}
        <CheerGenerator />

        {/* Section 4: Self-Care Ideas */}
        <SelfCareSection />

        {/* Section 5: From Your Bestie 💌 Letter */}
        <BestieLetter />

        {/* Friendly Loving Disclaimer & Footer */}
        <footer className="px-4 pt-6 pb-8 text-center">
          <div className="rounded-2xl bg-rose-50/80 border border-rose-100 p-4 mb-4 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-1">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Friendly Emotional Support Note</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Bestie Care is designed with 100% pure love as a comforting digital hug, entertainment, and gentle company from your best friend. It is not medical advice. For severe pain or medical guidance, please consult a healthcare professional.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-rose-500 font-bold mb-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline animate-pulse" />
            <span>especially for you</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Bestie Care 💗 · Stay cozy, snack well & rest easy
          </p>
        </footer>
      </main>

      {/* Virtual Hug Modal */}
      <VirtualHugModal
        isOpen={isHugOpen}
        onClose={() => setIsHugOpen(false)}
      />

      {/* Little Surprise Modal */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
      />

      {/* Thumb-friendly Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />
    </div>
  );
}
