import React from 'react';
import { Heart, Smile, Sparkles, Coffee, Mail } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'welcome', label: 'Care 💗', icon: Heart },
    { id: 'mood-section', label: 'Moods 🌸', icon: Smile },
    { id: 'cheer-section', label: 'Cheer Up 🌟', icon: Sparkles },
    { id: 'self-care-section', label: 'Self-Care ☕', icon: Coffee },
    { id: 'letter-section', label: 'Letter 💌', icon: Mail },
  ];

  const handleTabClick = (tabId: string) => {
    audioManager.playPop();
    onSelectTab(tabId);
    const targetElement = document.getElementById(tabId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-rose-100 shadow-lg px-2 max-w-lg mx-auto"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors active:scale-95 ${
                isActive ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
              aria-label={tab.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-rose-500 stroke-rose-600' : ''}`} />
              <span className="text-[10px] mt-1 leading-tight tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
