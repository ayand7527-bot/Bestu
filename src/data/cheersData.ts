import { MoodInfo, CheerItem, SurpriseItem, SelfCareTask } from '../types';

export const MOODS_DATA: Record<string, MoodInfo> = {
  sad: {
    id: 'sad',
    emoji: '😭',
    label: 'Sad',
    sublabel: 'Feeling low or weepy',
    supportTitle: 'Aww Meri Jaan, It’s Okay to Cry 🫂',
    supportMessage:
      'You don’t have to put on a brave face today. If tears are coming, let them roll down—tears are just your body releasing tension. Wrap yourself in the softest blanket like a tiny burrito. Remember, this low feeling is just temporary chemical weather passing through your brain. You are endlessly precious to me!',
    quoteHinglish: '“Rona hai toh jee bhar ke ro le, but yaad rakhna tu akele nahi hai. Tera bestie yahin hai hamesha!”',
    recommendedAction: 'Put your head on a soft pillow and listen to slow soothing tunes.',
    snackIdea: 'Warm hot chocolate or a bite of dark chocolate 🍫',
    comfortColor: 'from-rose-50 to-pink-100/70 border-rose-200 text-rose-900',
  },
  irritated: {
    id: 'irritated',
    emoji: '😤',
    label: 'Irritated',
    sublabel: 'Ready to fight the whole world',
    supportTitle: '100% Permission to Be Grumpy! 😤⚔️',
    supportMessage:
      'Ugh, I completely get it! When hormones are raging, even the sound of someone breathing too loud can feel like a personal attack. You do NOT have to be polite or sweet right now. Put your phone on "Do Not Disturb", roll your eyes as much as you want, and if anyone annoys you, tell me—I’ll come fight them for you!',
    quoteHinglish: '“Duniya thodi si irritating lag rahi hai na? Chhodo sabko, bas apne kambal mein chill kar.”',
    recommendedAction: 'Mute all notifications for 2 hours and avoid replying to anyone annoying.',
    snackIdea: 'Something crunchy or cold ice cream to cool down 🍦',
    comfortColor: 'from-amber-50 to-orange-100/70 border-amber-200 text-amber-900',
  },
  tired: {
    id: 'tired',
    emoji: '😴',
    label: 'Tired',
    sublabel: 'Zero battery, heavy eyelids',
    supportTitle: 'Sleepy Koala Mode Activated 🐨💤',
    supportMessage:
      'Listen to me: your body is working overtime backstage right now. It takes real physical energy, so feeling completely wiped out is totally normal. Please do not feel guilty about doing absolutely nothing today. Cancel tasks, ignore dishes, close your curtains, and take that deep 3-hour nap. Sleep is productive medicine right now.',
    quoteHinglish: '“Battery 1% hai na? Toh so ja bina kisi guilt ke. Duniya kahin bhaag nahi rahi.”',
    recommendedAction: 'Dim the room lights, warm up your feet with fuzzy socks, and sleep.',
    snackIdea: 'Warm chamomile tea or lukewarm water with honey 🍯',
    comfortColor: 'from-purple-50 to-indigo-100/70 border-purple-200 text-purple-900',
  },
  emotional: {
    id: 'emotional',
    emoji: '🥺',
    label: 'Emotional',
    sublabel: 'Big tender feelings everywhere',
    supportTitle: 'Your Heart is Just Extra Tender Today 🌸',
    supportMessage:
      'Did a reel of a golden retriever puppy or a random sweet memory just make you tear up? That’s okay! You have a huge, warm, empathetic heart, and right now all your feelings are turned up to 200% volume. Be so gentle with yourself. You are loved, you are worthy, and you’re never alone in this.',
    quoteHinglish: '“Tu thodi si overthinker zaroor hai, par meri favourite insaan bhi tu hi hai.”',
    recommendedAction: 'Wrap both arms around a pillow and remind yourself: "This feeling will soften soon."',
    snackIdea: 'Your absolute comfort snack and lots of cozy cuddles 🍪',
    comfortColor: 'from-pink-50 to-rose-100/70 border-pink-200 text-pink-900',
  },
  okay: {
    id: 'okay',
    emoji: '😊',
    label: 'Feeling okay',
    sublabel: 'Chilling, cruising along',
    supportTitle: 'Yay! Loving this gentle calm for you! 💖',
    supportMessage:
      'I am so happy you are feeling decent right now! Just a tiny loving reminder: even if you feel fine, don’t suddenly start doing heavy workouts or stressing yourself out. Keep up the chill vibe, drink your water, put on a cute show, and treat yourself to something nice. You deserve every peaceful minute.',
    quoteHinglish: '“Sukun wali smile bani rahe! Bas aaram se din bitana, koi tension mat lena.”',
    recommendedAction: 'Paint your nails, read a nice chapter, or re-watch your comfort movie.',
    snackIdea: 'Fresh fruit slices or crunchy cookies 🍓',
    comfortColor: 'from-emerald-50 to-teal-100/70 border-emerald-200 text-emerald-900',
  },
};

export const CHEER_ITEMS: CheerItem[] = [
  {
    id: 'c1',
    category: 'funny',
    categoryLabel: 'Funny Reality Check',
    emoji: '😂',
    text: 'Cramps are proof that Mother Nature definitely did not consult a woman before finalizing the human biological design.',
    subtext: 'Petition to cancel period cramps via Supreme Court order ASAP.',
  },
  {
    id: 'c2',
    category: 'wholesome',
    categoryLabel: 'Wholesome Hug',
    emoji: '🧸',
    text: 'If I could package warm sunshine, cozy fuzzy socks, and infinite melted chocolate into a cloud and send it to your bed, I would.',
    subtext: 'Until then, consider this message a warm long-distance forehead kiss.',
  },
  {
    id: 'c3',
    category: 'compliment',
    categoryLabel: 'Genuine Compliment',
    emoji: '✨',
    text: 'Reminder: You handle so much with so much grace, even when your body feels like an earthquake. You’re genuinely one of the strongest people I know.',
    subtext: 'Even in your oversized messy pajamas, you are 10/10 royalty.',
  },
  {
    id: 'c4',
    category: 'friendship',
    categoryLabel: 'Bestie Pact',
    emoji: '💌',
    text: 'You are my favourite person to send unhinged 3-minute voice notes to. Don’t ever change.',
    subtext: 'I will literally sit in silence on a call with you just so you don’t feel alone.',
  },
  {
    id: 'c5',
    category: 'funny',
    categoryLabel: 'Legal Exemption',
    emoji: '🛌',
    text: 'Under Article 420 of the Best Friend Penal Code: You are legally exempted from all chores, serious conversations, and adulting today.',
    subtext: 'Any violation will result in forceful tucking into bed.',
  },
  {
    id: 'c6',
    category: 'wholesome',
    categoryLabel: 'Gentle Reminder',
    emoji: '🌸',
    text: 'It is okay if all you did today was breathe, lie down, and survive. That is more than enough.',
    subtext: 'Your worth is not measured by your productivity, especially today.',
  },
  {
    id: 'c7',
    category: 'compliment',
    categoryLabel: 'Pure Hype',
    emoji: '💅',
    text: 'Fact: Your laugh is literally therapy, your sense of humor is elite, and anyone who gets to have you in their life is blessed.',
    subtext: 'I am "anyone", and yes, I am very grateful.',
  },
  {
    id: 'c8',
    category: 'funny',
    categoryLabel: 'Hot Water Bag Supremacy',
    emoji: '🔥',
    text: 'A hot water bottle isn’t just heating equipment today—it is your emotional support spouse.',
    subtext: 'Hold it tight, let it take away all the aches.',
  },
  {
    id: 'c9',
    category: 'friendship',
    categoryLabel: 'Always Here',
    emoji: '🤍',
    text: 'No matter what mood you are in—happy, cranky, sobbing, or silent—there is always a safe seat reserved for you next to me.',
    subtext: 'No judgment, ever. Just love and snacks.',
  },
  {
    id: 'c10',
    category: 'wholesome',
    categoryLabel: 'Comfort Thought',
    emoji: '🌙',
    text: 'This pain is temporary. Soon this phase will pass, and you’ll feel light, energetic, and glowing again. Hang in there, love!',
    subtext: 'Breathe in peace, exhale the cramps.',
  },
  {
    id: 'c11',
    category: 'funny',
    categoryLabel: 'Snack Science',
    emoji: '🍫',
    text: 'Scientifically proven fact: Calories consumed while lying horizontally on the bed do not count.',
    subtext: 'Go ahead, take that extra piece of chocolate.',
  },
  {
    id: 'c12',
    category: 'compliment',
    categoryLabel: 'Sweet Truth',
    emoji: '👑',
    text: 'The world feels a little softer and brighter just because you are in it.',
    subtext: 'Take care of my favourite girl today, okay?',
  },
];

export const SURPRISE_ITEMS: SurpriseItem[] = [
  {
    id: 's1',
    type: 'voucher',
    typeBadge: '🎟️ Official Bestie Voucher',
    title: 'The Unlimited Venting Pass',
    content:
      'This coupon entitles you to 24 hours of uninterrupted, unfiltered rants about literally anyone or anything. I promise to gasp at all the right moments and take your side 100%.',
    footerNote: 'Valid: Lifetime · Non-transferable · No expiry',
    icon: '🗣️',
  },
  {
    id: 's2',
    type: 'voucher',
    typeBadge: '🎟️ Sweet Treat Coupon',
    title: 'Free Dessert / Ice Cream On Me 🍨',
    content:
      'Next time we meet or whenever you order, dinner sweet/dessert is on my tab! You just pick whatever chocolatey, cheesy, or sweet craving your heart desires.',
    footerNote: 'Redeemable anytime: Just screenshot this!',
    icon: '🍰',
  },
  {
    id: 's3',
    type: 'funny',
    typeBadge: '😂 Drama Queen Pass',
    title: 'Official Exemption Certificate',
    content:
      'By the power vested in me as your Best Friend, you are hereby granted immunity from replying to boring texts, doing dishes, pretending to care about small talk, or wearing uncomfortable pants.',
    footerNote: 'Issued with 100% unconditional love 📜',
    icon: '🛋️',
  },
  {
    id: 's4',
    type: 'friendship',
    typeBadge: '💌 Secret Bestie Confession',
    title: 'Why You Mean The World To Me',
    content:
      'Even when we are doing nothing together, just your presence feels like home. You understand my silence, you match my chaos, and life is simply 1000x more fun with you.',
    footerNote: 'You’re stuck with me forever, deal with it 💗',
    icon: '👯‍♀️',
  },
  {
    id: 's5',
    type: 'motivation',
    typeBadge: '🌟 Mini Motivational Love',
    title: 'Soft Reminder For A Tough Day',
    content:
      'You don’t have to conquer mountains today. Surviving, resting, staying warm, and taking care of your lovely body is your ONLY mission. Be proud of yourself.',
    footerNote: 'Rest is not giving up—it is refuelling 🔋',
    icon: '✨',
  },
  {
    id: 's6',
    type: 'compliment',
    typeBadge: '💖 Cute Compliment Drop',
    title: 'A List Of Things I Adore About You',
    content:
      '1. Your beautiful heart.\n2. The way your eyes light up when you laugh.\n3. Your unmatched aesthetic & taste.\n4. How wonderfully weird and genuine you are with me.',
    footerNote: 'Never doubt how special you are ✨',
    icon: '🥰',
  },
  {
    id: 's7',
    type: 'voucher',
    typeBadge: '🎟️ The DJ & Movie Pass',
    title: '100% Aux Cord & Watchlist Control 🎬',
    content:
      'You get sole authority to choose whatever corny rom-com, Bollywood drama, or cartoon we watch next. Zero complaints guaranteed from my side!',
    footerNote: 'Popcorn included automatically 🍿',
    icon: '🍿',
  },
];

export const SELF_CARE_IDEAS: SelfCareTask[] = [
  {
    id: 'sc1',
    title: 'Drink some water',
    desc: 'Hydration helps reduce bloating and keeps cramping muscles relaxed.',
    emoji: '💧',
    tip: 'Keep a warm flask or cute bottle right by your bedside.',
  },
  {
    id: 'sc2',
    title: 'Rest for a while',
    desc: 'Curl up in a cozy fetal position with your knees pulled softly to your chest.',
    emoji: '🛌',
    tip: 'A pillow tucked between your knees helps relieve lower back ache.',
  },
  {
    id: 'sc3',
    title: 'Listen to soothing sounds',
    desc: 'Calm your nervous system with soft gentle rain or cozy crackling warmth.',
    emoji: '🎵',
    tip: 'Try the built-in ambient sounds below for instant peace.',
  },
  {
    id: 'sc4',
    title: 'Watch something comforting',
    desc: 'Put on a familiar feel-good show where you already know the ending.',
    emoji: '📺',
    tip: 'No stressful thrillers! Stick to cozy cartoons, rom-coms, or baking shows.',
  },
  {
    id: 'sc5',
    title: 'Warm compress or hot water bag',
    desc: 'Gentle warmth increases blood circulation and soothes uterine tension.',
    emoji: '♨️',
    tip: 'Always wrap it in a thin towel so it feels just right against your skin.',
  },
  {
    id: 'sc6',
    title: 'Talk to someone you trust',
    desc: 'Send a quick text or voice note. You don’t have to suffer in silence.',
    emoji: '💌',
    tip: 'I am literally one tap away. Even if you just text "ugh", I will get it.',
  },
];

export const DEFAULT_LETTER = {
  recipientName: 'Meri Pyaari Bestie',
  senderName: 'Your Best Friend Forever 💗',
  message:
    'Hey sweet girl, I made this little corner of the internet just for you today.\n\nWhenever you feel that dull ache, sudden mood swing, or that heavy exhaustion where even moving feels like a chore, remember that I am rooting for you every second. You don’t have to explain yourself to anyone today. Just snuggle up, eat whatever you crave, and let yourself rest without an ounce of guilt.\n\nI love you to the moon and back. Always here for your rants, your tears, and your weird midnight memes!\n\nAaj bas aaram kar, baaki sab ho jayega 😌🌸',
  stationery: 'pink' as const,
  updatedAt: new Date().toISOString(),
};
