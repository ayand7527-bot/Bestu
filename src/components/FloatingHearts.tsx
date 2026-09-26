import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const FloatingHearts: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        className="fixed bottom-20 right-4 z-30 p-2.5 rounded-full bg-white/80 shadow-md backdrop-blur border border-rose-100 text-rose-400 hover:text-rose-600 transition-all text-xs flex items-center gap-1.5"
        title="Turn on floating hearts"
        aria-label="Turn on floating hearts"
      >
        <Heart className="w-3.5 h-3.5 fill-rose-300" />
      </button>
    );
  }

  // Pre-configured floating hearts with different positions, sizes, animations
  const hearts = [
    { top: '8%', left: '6%', size: 'w-4 h-4', delay: '0s', duration: '5s', opacity: 'opacity-40', color: 'text-rose-300' },
    { top: '15%', right: '8%', size: 'w-6 h-6', delay: '1.2s', duration: '6s', opacity: 'opacity-30', color: 'text-pink-300' },
    { top: '28%', left: '85%', size: 'w-5 h-5', delay: '2.5s', duration: '5.5s', opacity: 'opacity-35', color: 'text-purple-300' },
    { top: '42%', left: '4%', size: 'w-5 h-5', delay: '0.8s', duration: '6.2s', opacity: 'opacity-30', color: 'text-rose-300' },
    { top: '56%', right: '6%', size: 'w-7 h-7', delay: '1.8s', duration: '5.8s', opacity: 'opacity-25', color: 'text-pink-400' },
    { top: '70%', left: '10%', size: 'w-4 h-4', delay: '3.1s', duration: '4.8s', opacity: 'opacity-35', color: 'text-purple-300' },
    { top: '82%', right: '12%', size: 'w-5 h-5', delay: '2.2s', duration: '5.2s', opacity: 'opacity-30', color: 'text-rose-300' },
    { top: '92%', left: '7%', size: 'w-6 h-6', delay: '0.5s', duration: '6.5s', opacity: 'opacity-25', color: 'text-pink-300' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h, i) => (
        <div
          key={i}
          className={`absolute ${h.size} ${h.opacity} ${h.color} animate-float-slow`}
          style={{
            top: h.top,
            left: h.left,
            right: h.right,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          <Heart className="w-full h-full fill-current" />
        </div>
      ))}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-pink-200/30 via-purple-100/30 to-rose-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-80 h-80 bg-gradient-to-br from-rose-200/25 via-pink-100/25 to-purple-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
    </div>
  );
};
