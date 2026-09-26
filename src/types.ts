export type MoodType = 'sad' | 'irritated' | 'tired' | 'emotional' | 'okay';

export interface MoodInfo {
  id: MoodType;
  emoji: string;
  label: string;
  sublabel: string;
  supportTitle: string;
  supportMessage: string;
  quoteHinglish: string;
  recommendedAction: string;
  snackIdea: string;
  comfortColor: string;
}

export type CheerCategory = 'wholesome' | 'funny' | 'compliment' | 'friendship';

export interface CheerItem {
  id: string;
  category: CheerCategory;
  categoryLabel: string;
  text: string;
  subtext?: string;
  emoji: string;
}

export type SurpriseType = 'friendship' | 'funny' | 'compliment' | 'motivation' | 'voucher';

export interface SurpriseItem {
  id: string;
  type: SurpriseType;
  typeBadge: string;
  title: string;
  content: string;
  footerNote: string;
  icon: string;
}

export interface SelfCareTask {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  tip: string;
}

export interface BestieLetterData {
  recipientName: string;
  senderName: string;
  message: string;
  stationery: 'pink' | 'lavender' | 'peach' | 'mint';
  updatedAt: string;
}
