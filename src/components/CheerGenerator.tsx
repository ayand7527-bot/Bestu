import React, { useState } from 'react';
import { CHEER_ITEMS } from '../data/cheersData';
import { CheerCategory, CheerItem } from '../types';
import { Sparkles, RefreshCw, Heart, Copy, Check, MessageCircleHeart } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

export const CheerGenerator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CheerCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  // Filter items according to category
  const filteredItems = selectedCategory === 'all'
    ? CHEER_ITEMS
    : CHEER_ITEMS.filter((item) => item.category === selectedCategory);

  const currentItem: CheerItem = filteredItems[currentIndex % filteredItems.length] || CHEER_ITEMS[0];

  const handleNextCheer = (e?: React.MouseEvent) => {
    setIsAnimating(true);
    setLiked(false);
    audioManager.playPop();

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      fireHeartConfetti(x, y);
    } else {
      fireHeartConfetti();
    }

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
      setIsAnimating(false);
    }, 180);
  };

  const handleCategoryChange = (cat: CheerCategory | 'all') => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setLiked(false);
    audioManager.playPop();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentItem.text}"\n${currentItem.subtext ? `${currentItem.subtext}\n` : ''}— Bestie Care 💗`);
    setCopied(true);
    audioManager.playPop();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      fireHeartConfetti();
      audioManager.playChime();
    } else {
      audioManager.playPop();
    }
  };

  const categories: { id: CheerCategory | 'all'; label: string; emoji: string }[] = [
    { id: 'all', label: 'All Smiles', emoji: '✨' },
    { id: 'wholesome', label: 'Wholesome', emoji: '🧸' },
    { id: 'funny', label: 'Funny Jokes', emoji: '😂' },
    { id: 'compliment', label: 'Compliments', emoji: '👑' },
    { id: 'friendship', label: 'Bestie Pact', emoji: '💌' },
  ];

  return (
    <section id="cheer-section" className="px-4 py-4 scroll-mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
            <span>Cheer Me Up</span>
            <span className="text-pink-500">🌟</span>
          </h3>
          <p className="text-xs text-slate-500">
            Instant smiles, funny thoughts, and warm compliments
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3 -mx-4 px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 border border-rose-100 hover:bg-rose-50'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cheer Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-pink-200/80 p-5 shadow-sm shadow-pink-100 backdrop-blur-md">
        {/* Background decorative flower */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-pink-100/40 rounded-full blur-xl pointer-events-none" />

        {/* Top Card Meta */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
            <span>{currentItem.emoji}</span>
            <span>{currentItem.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl transition-all active:scale-90 ${
                liked ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50/50'
              }`}
              title="Save this quote"
              aria-label="Heart this message"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/70 transition-all active:scale-90"
              title="Copy message"
              aria-label="Copy message"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Message Content */}
        <div
          className={`min-h-[110px] flex flex-col justify-center transition-all duration-200 ${
            isAnimating ? 'opacity-0 scale-98 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug mb-2">
            “{currentItem.text}”
          </p>
          {currentItem.subtext && (
            <p className="text-xs sm:text-sm text-rose-700/80 font-medium leading-relaxed">
              {currentItem.subtext}
            </p>
          )}
        </div>

        {/* Big Cheer Me Up Button */}
        <div className="mt-4 pt-3 border-t border-rose-100 flex items-center gap-2">
          <button
            onClick={handleNextCheer}
            className="w-full min-h-[48px] py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white font-bold text-sm shadow-md shadow-rose-200/80 flex items-center justify-center gap-2 active:scale-98 transition-all hover:opacity-95"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Cheer Me Up Again 💖</span>
            <RefreshCw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
