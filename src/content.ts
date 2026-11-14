/**
 * Landing page content.
 *
 * All copy, links and numbers live here so that marketing changes never touch
 * the components. Every figure in STATS is a real number from the product
 * (see the `source` notes). Update them as the platform grows.
 */

import type { FeatureIconName } from "./components/icons";

export const LINKS = {
  bot: "https://t.me/UniPrismBot",
  channel: "https://t.me/uni_prism",
  support: "https://t.me/uniprism_support",
  instagram: "https://www.instagram.com/uni.prism",
  github: "https://github.com/shamshodbekdev/uniprism.site",
} as const;

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Inside the app", href: "#showcase" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ------------------------------------------------------------------ */
/* App screenshots (public/landing/screens, 780×1688 + a 480w variant) */
/* ------------------------------------------------------------------ */

export type ScreenName =
  | "home"
  | "scholarships"
  | "essay-audit"
  | "match-rate"
  | "sample-essays"
  | "deadlines"
  | "quiz"
  | "live-chat";

export const screenSrc = (name: ScreenName) => ({
  src: `/landing/screens/${name}-480.webp`,
  srcSet: `/landing/screens/${name}-480.webp 480w, /landing/screens/${name}.webp 780w`,
});

/** Screens the hero phone cycles through. */
export const HERO_SCREENS: { name: ScreenName; label: string }[] = [
  { name: "home", label: "Home" },
  { name: "match-rate", label: "Match Rate" },
  { name: "essay-audit", label: "Essay Audit" },
  { name: "scholarships", label: "Scholarships" },
];

/* ------------------------------------------------------------------ */
/* Features: bento grid. The order matters: it tiles 4 columns on xl  */
/* screens and 2 below without holes ("wide" spans 2 columns).         */
/* ------------------------------------------------------------------ */

export interface Feature {
  icon: FeatureIconName;
  title: string;
  description: string;
  /** Short label on the card, e.g. "Free" or "AI". */
  tag?: string;
  /** "wide" cards span two columns on large screens. */
  size?: "wide";
}

export const FEATURES: Feature[] = [
  {
    icon: "essay",
    title: "AI Essay Audit",
    description:
      "Paste your Common App essay and get structured feedback in seconds: story, voice, clarity and impact, with a score and concrete suggestions you can act on.",
    tag: "AI",
    size: "wide",
  },
  {
    icon: "target",
    title: "Match Rate",
    description:
      "Enter your GPA, SAT and IELTS to get a Profile Strength Score and honest feedback for your target school.",
    tag: "AI",
  },
  {
    icon: "scholarship",
    title: "Scholarships",
    description:
      "Fully funded programs like DAAD, MEXT and Fulbright with eligibility and deadlines in one place.",
    tag: "Free",
  },
  {
    icon: "study",
    title: "Study Together",
    description:
      "Live video study rooms for 2 to 4 students. Invite friends privately or join an open room and stay accountable.",
    size: "wide",
  },
  {
    icon: "globe",
    title: "1,002 Universities",
    description:
      "Every QS-ranked university with tuition, acceptance rate, programs and campus facts. Search, filter, compare.",
  },
  {
    icon: "bolt",
    title: "Flash Quiz",
    description:
      "Rapid-fire SAT Math and Reading & Writing questions. Answer first, win coins, climb the leaderboard.",
  },
  {
    icon: "spark",
    title: "AI Admissions Chat",
    description:
      "Ask anything about applications, tests, visas or financial aid and get a focused answer at any hour.",
    size: "wide",
  },
  {
    icon: "gift",
    title: "Referral Rewards",
    description:
      "Invite classmates with your personal link and earn coins for every friend who joins.",
    size: "wide",
  },
];

/* ------------------------------------------------------------------ */
/* Showcase tabs ("Inside the app")                                    */
/* ------------------------------------------------------------------ */

export interface ShowcaseItem {
  screen: ScreenName;
  icon: FeatureIconName;
  title: string;
  description: string;
  points: string[];
}

export const SHOWCASE: ShowcaseItem[] = [
  {
    screen: "essay-audit",
    icon: "essay",
    title: "Essay Audit",
    description: "Structured AI feedback on your Common App essay, the way an admissions reader would see it.",
    points: ["Story, voice, clarity and impact", "Concrete suggestions you can act on", "Your essay stays 100% private"],
  },
  {
    screen: "match-rate",
    icon: "target",
    title: "Match Rate",
    description: "A Profile Strength Score and honest feedback for the university you are aiming at.",
    points: ["Uses your GPA, SAT, IELTS or TOEFL", "Pick any target university", "Honest feedback, no fake probabilities"],
  },
  {
    screen: "scholarships",
    icon: "globe",
    title: "University Explorer",
    description: "All 1,002 QS-ranked universities, searchable and free.",
    points: ["Tuition, acceptance rate and programs", "Search by name or country", "Free for every student"],
  },
  {
    screen: "live-chat",
    icon: "study",
    title: "Study Together",
    description: "Video study rooms for 2 to 4 students, right inside Telegram.",
    points: ["Private rooms for friends you invite", "Open rooms to meet other applicants", "Room chat visible only to members"],
  },
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export interface Step {
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    title: "Open the bot",
    description:
      "Tap Open in Telegram and press Start. No forms, no passwords: your Telegram account is your login.",
  },
  {
    title: "Build your plan",
    description:
      "Explore universities, check your profile strength, polish essays and keep every deadline in view.",
  },
  {
    title: "Apply with confidence",
    description:
      "Submit stronger applications and walk into the university that fits you best.",
  },
];

/* ------------------------------------------------------------------ */
/* Stats — real product numbers                                        */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  /** Where the number comes from, kept for maintainers. */
  source: string;
}

export const STATS: Stat[] = [
  { value: 1002, label: "QS-ranked universities", source: "universities table" },
  { value: 89, label: "Countries covered", source: "distinct universities.country" },
  { value: 50, label: "Admitted-student essays", source: "sample_essays table" },
  { value: 200, suffix: "+", label: "Flash quiz questions", source: "quiz_questions table" },
];

/** University names for the scrolling band under the hero (text only). */
export const UNIVERSITIES = [
  "MIT",
  "Imperial College London",
  "University of Oxford",
  "Harvard University",
  "University of Cambridge",
  "Stanford University",
  "ETH Zurich",
  "National University of Singapore",
  "UCL",
  "University of Toronto",
  "TU Munich",
  "Seoul National University",
  "University of Tokyo",
  "KAIST",
  "University of Melbourne",
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

/**
 * PLACEHOLDER stories. These are illustrative, not quotes from real users,
 * and the section says so. Replace them with real, consented testimonials
 * (and drop `illustrative`) as soon as they are collected.
 */
export const TESTIMONIALS_ILLUSTRATIVE = true;

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I rewrote my personal statement four times with Essay Audit. Each pass showed me exactly where my story went flat.",
    name: "Madina",
    detail: "Applying to the UK",
  },
  {
    quote:
      "Match Rate told me honestly where my profile was weak for my dream school. I knew exactly what to work on.",
    name: "Javohir",
    detail: "Engineering applicant",
  },
  {
    quote:
      "I found two fully funded scholarships I'd never heard of, with every deadline in one place.",
    name: "Sevara",
    detail: "Scholarship seeker",
  },
  {
    quote:
      "Our study room kept the four of us going every evening through SAT prep. It never felt like studying alone.",
    name: "Aziz",
    detail: "SAT prep group",
  },
  {
    quote:
      "No counselor at my school knew about applying abroad. UniPrism became the counselor I didn't have.",
    name: "Nilufar",
    detail: "First-generation applicant",
  },
  {
    quote:
      "The flash quiz is weirdly addictive. Five minutes between classes and my reading score went up.",
    name: "Bekzod",
    detail: "Grade 11 student",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Is UniPrism free?",
    answer:
      "Yes. Browsing universities, scholarships, sample essays, deadlines, study rooms and the flash quiz are all free. Two AI tools, Essay Audit and Match Rate, use coins, which you can earn by inviting friends and winning quizzes, or buy in the app.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. UniPrism runs inside Telegram as a Mini App. Open @UniPrismBot, tap Start and the app opens instantly on your phone or desktop.",
  },
  {
    question: "Which universities are included?",
    answer:
      "All 1,002 universities in the QS World University Rankings, across 89 countries, each with tuition, acceptance rate, programs and key facts.",
  },
  {
    question: "How does the AI Essay Audit work?",
    answer:
      "You paste your essay and our AI reviews it the way an admissions reader would: structure, authenticity, specificity and language. You get a score and concrete suggestions you can act on right away.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We only use your public Telegram profile to sign you in. Essays you submit are used only to generate your feedback. You can delete your account at any time from Settings.",
  },
  {
    question: "Who is UniPrism for?",
    answer:
      "High-school and gap-year students applying to universities abroad, especially those navigating the process without a private counselor.",
  },
];
