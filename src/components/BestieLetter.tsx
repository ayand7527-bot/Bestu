import React, { useState, useEffect } from 'react';
import { DEFAULT_LETTER } from '../data/cheersData';
import { BestieLetterData } from '../types';
import { Edit3, Check, Heart, Share2, Sparkles, RotateCcw, Copy } from 'lucide-react';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

const STORAGE_KEY = 'bestie_care_custom_letter';

export const BestieLetter: React.FC = () => {
  const [letterData, setLetterData] = useState<BestieLetterData>(() => {
    try {
      // Check URL query parameters first (for shared custom links)
      const params = new URLSearchParams(window.location.search);
      const sharedMsg = params.get('msg');
      const sharedTo = params.get('to');
      const sharedFrom = params.get('from');

      if (sharedMsg) {
        return {
          recipientName: sharedTo || DEFAULT_LETTER.recipientName,
          senderName: sharedFrom || DEFAULT_LETTER.senderName,
          message: decodeURIComponent(sharedMsg),
          stationery: 'pink',
          updatedAt: new Date().toISOString(),
        };
      }

      // Then check localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_LETTER;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<BestieLetterData>(letterData);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    setEditForm(letterData);
  }, [letterData]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...editForm,
      updatedAt: new Date().toISOString(),
    };
    setLetterData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsEditing(false);
    audioManager.playChime();
    fireCelebrationConfetti();
  };

  const handleReset = () => {
    setLetterData(DEFAULT_LETTER);
    setEditForm(DEFAULT_LETTER);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsEditing(false);
    audioManager.playPop();
  };

  const handleCopyShareLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('to', letterData.recipientName);
    url.searchParams.set('from', letterData.senderName);
    url.searchParams.set('msg', letterData.message);

    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    audioManager.playPop();
    fireHeartConfetti();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyText = () => {
    const fullText = `💌 To: ${letterData.recipientName}\n\n${letterData.message}\n\nWith love,\n${letterData.senderName}\n\n(From Bestie Care 💗)`;
    navigator.clipboard.writeText(fullText);
    setCopiedText(true);
    audioManager.playPop();
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Color styles based on chosen stationery
  const stationeryStyles = {
    pink: {
      bg: 'bg-rose-50/90',
      border: 'border-rose-200',
      tape: 'bg-rose-300/70',
      accent: 'text-rose-700',
      stamp: 'border-rose-300 text-rose-500 bg-rose-100/50',
    },
    lavender: {
      bg: 'bg-purple-50/90',
      border: 'border-purple-200',
      tape: 'bg-purple-300/70',
      accent: 'text-purple-700',
      stamp: 'border-purple-300 text-purple-500 bg-purple-100/50',
    },
    peach: {
      bg: 'bg-amber-50/90',
      border: 'border-amber-200',
      tape: 'bg-amber-300/70',
      accent: 'text-amber-700',
      stamp: 'border-amber-300 text-amber-500 bg-amber-100/50',
    },
    mint: {
      bg: 'bg-emerald-50/90',
      border: 'border-emerald-200',
      tape: 'bg-emerald-300/70',
      accent: 'text-emerald-700',
      stamp: 'border-emerald-300 text-emerald-500 bg-emerald-100/50',
    },
  }[letterData.stationery || 'pink'];

  return (
    <section id="letter-section" className="px-4 py-4 scroll-mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
            <span>From your bestie</span>
            <span className="text-rose-500">💌</span>
          </h3>
          <p className="text-xs text-slate-500">
            A real heartfelt letter just for you
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              audioManager.playPop();
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-50 active:scale-95 transition-all shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Customize Note</span>
          </button>
        )}
      </div>

      {isEditing ? (
        /* Edit Note Form */
        <div className="rounded-3xl bg-white border border-rose-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-slate-800">
              Personalize Your Letter ✍️
            </h4>
            <span className="text-[11px] text-slate-400">Saved on your device</span>
          </div>

          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bestie's Name (Recipient)
              </label>
              <input
                type="text"
                value={editForm.recipientName}
                onChange={(e) => setEditForm({ ...editForm, recipientName: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                placeholder="e.g. Meri Pyaari Simran"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Custom Message
              </label>
              <textarea
                value={editForm.message}
                onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                rows={6}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 leading-relaxed"
                placeholder="Write your sweet message here..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sign-off (From)
              </label>
              <input
                type="text"
                value={editForm.senderName}
                onChange={(e) => setEditForm({ ...editForm, senderName: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                placeholder="e.g. Your Best Friend Forever 💗"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Stationery Color Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'pink', label: 'Blush', color: 'bg-rose-200 border-rose-300' },
                  { id: 'lavender', label: 'Lavender', color: 'bg-purple-200 border-purple-300' },
                  { id: 'peach', label: 'Peach', color: 'bg-amber-200 border-amber-300' },
                  { id: 'mint', label: 'Mint', color: 'bg-emerald-200 border-emerald-300' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setEditForm({ ...editForm, stationery: s.id as any })}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition-all ${
                      editForm.stationery === s.id ? 'ring-2 ring-rose-500 scale-102' : 'opacity-80'
                    } ${s.color}`}
                  >
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all hover:opacity-95"
              >
                <Check className="w-4 h-4" />
                <span>Save My Letter</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="min-h-[46px] py-2 px-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[46px] p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Rendered Stationery Card */
        <div className={`relative overflow-hidden rounded-3xl border ${stationeryStyles.border} ${stationeryStyles.bg} p-6 shadow-sm`}>
          {/* Cute Washi Tape Decor */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 ${stationeryStyles.tape} -rotate-1 shadow-xs rounded-b-sm opacity-90`}
          />

          {/* Postal stamp detail */}
          <div className="flex items-start justify-between mt-2 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                Private Letter
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                Dearest {letterData.recipientName} 🌸
              </h4>
            </div>

            {/* Vintage style stamp */}
            <div
              className={`w-12 h-14 border-2 border-dashed ${stationeryStyles.stamp} rounded-md flex flex-col items-center justify-center p-1 rotate-3 select-none`}
            >
              <Heart className="w-4 h-4 fill-current mb-0.5" />
              <span className="text-[8px] font-bold uppercase">100% LOVE</span>
            </div>
          </div>

          {/* Letter Prose */}
          <div className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed whitespace-pre-line my-4 font-sans">
            {letterData.message}
          </div>

          {/* Sign-off with handwriting font */}
          <div className="mt-5 pt-3 border-t border-rose-200/60 flex flex-col items-end">
            <span className="text-xs text-slate-500">Always and forever,</span>
            <span className="text-2xl font-bold font-handwriting text-rose-700 tracking-wide mt-0.5">
              {letterData.senderName}
            </span>
          </div>

          {/* Quick share actions */}
          <div className="mt-5 pt-3 border-t border-rose-200/50 flex items-center justify-between gap-2">
            <button
              onClick={handleCopyShareLink}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white/80 border border-rose-200 text-rose-700 font-semibold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-xs hover:bg-white"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied! 🔗' : 'Copy Share Link'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200 text-slate-600 font-semibold text-xs flex items-center gap-1.5 active:scale-95 transition-all hover:bg-white"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedText ? 'Text Copied! 💌' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
