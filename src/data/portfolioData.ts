/**
 * ============================================================================
 *  EDIT THIS FILE to change what appears on your portfolio.
 *  Everything here is public: never put passwords, tokens or API keys in it.
 *  Leave a value as '' (empty) if you do not have it yet. The site will show an
 *  honest "not added yet" state instead of a broken link.
 * ============================================================================
 */

export type SkillLevel = 'Learning' | 'Practicing' | 'Building with';
export type ProjectStatus = 'Live' | 'In development' | 'Prototype' | 'Planned';
export type FeatureState = 'built' | 'in-progress' | 'planned';
export type JourneyKind = 'education' | 'learning' | 'project' | 'experience' | 'event';

export interface Skill { name: string; level: SkillLevel }
export interface SkillGroup { title: string; skills: Skill[] }
export interface Feature { label: string; state: FeatureState }
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  stack: string[];
  /** Screenshot path inside public/, e.g. 'assets/projects/wallora.png'. Leave '' to show the interface sketch. */
  image: string;
  /** Which built-in interface sketch to show when there is no screenshot. */
  mockup: 'quiz' | 'gallery' | 'none';
  github: string;
  live: string;
  status: ProjectStatus;
  featured: boolean;
  features: Feature[];
}
export interface JourneyItem {
  kind: JourneyKind;
  period: string;
  title: string;
  place?: string;
  text: string;
}

export const site = {
  name: 'Ujjaval Pratap Singh',
  displayName: 'Ujjaval Pratap',
  headline: 'Curious by nature. Builder by choice.',
  subheadline:
    'Exploring the intersection of intelligent systems, software engineering, and creative problem-solving.',
  role: 'AI & Data Science student',
  availability: 'Open to internships & collaborations',
  location: 'Uttar Pradesh, India',

  education: {
    degree: 'B.Tech in Computer Science Engineering',
    university: 'GLA University, Mathura',
    specialization: 'Artificial Intelligence and Data Science',
    stage: 'Second year', // update when you move to the next year
  },

  statement: ['I learn by', 'building things.'],
  bio: [
    "I'm a curious, self-motivated learner who believes the fastest way to understand something is to build it. I'm strengthening my programming in Java, Python and C, while exploring web development, data analysis and machine learning.",
    "I'm a B.Tech Computer Science student at GLA University, Mathura, specializing in Artificial Intelligence and Data Science. I'm early in the journey, which is why I spend my time shipping projects, practicing problems and improving a little every week.",
  ],
  currentlyExploring: ['Data analysis', 'Machine learning basics', 'Web development', 'Problem solving'],

  /** Paths are relative to the public/ folder. Replace the files, keep the names. */
  portrait: '/portrait.png',
  resume: '/Ujjaval_Pratap_singh_Resume.pdf',

  email: 'ujjwalpratapsingh624604@gmail.com', // e.g. 'you@example.com'

  /**
   * Phone and WhatsApp. Use the international format: + country code + number, no spaces.
   * Example for India: '+919876543210'. Leave '' to hide the call, WhatsApp and phone options.
   * Remember: anything here is public on the internet, so only add a number you are happy to share.
   */
  phone: '+917251925474',
  whatsapp: '+917251925474', // leave '' to use the same number as phone
  whatsappMessage: 'Hi Ujjwal, I saw your portfolio and would like to connect.',

  links: {
    github: { username: 'Ujjwalpratap001' }, // e.g. 'octocat'  -> enables the live GitHub section
    leetcode: { username: 'ujjavalpratap' }, // e.g. 'your_leetcode_name' -> enables live LeetCode stats
    linkedin: { url: 'https://www.linkedin.com/in/ujjwalpratap624604/' }, // e.g. 'https://www.linkedin.com/in/your-id/'
    extra: [] as { label: string; url: string }[], // e.g. [{ label: 'Kaggle', url: 'https://...' }]
  },

  linkedin: {
    headline: 'Computer Science student specializing in AI & Data Science',
    focus: 'B.Tech CSE at GLA University, Mathura',
    about:
      'Building real projects, practicing problem solving and learning data science. Open to internships, collaborations and hackathons.',
  },

  /**
   * LeetCode fallback shown ONLY if live data cannot be loaded. Keep it honest:
   * fill it in by hand and update `updated`. Leave solved as null to hide it.
   */
  leetcodeManual: { solved: null as number | null, updated: '' },
};

/** Derived links. Nothing to edit below this line in this block. */
export const githubUrl = site.links.github.username ? `https://github.com/${site.links.github.username}` : '';
export const leetcodeUrl = site.links.leetcode.username
  ? `https://leetcode.com/u/${site.links.leetcode.username}/`
  : '';
export const linkedinUrl = site.links.linkedin.url;

const digits = (v: string) => v.replace(/\D/g, '');
export const telUrl = site.phone ? `tel:+${digits(site.phone)}` : '';
const waNumber = digits(site.whatsapp || site.phone);
export const whatsappUrl = waNumber
  ? `https://wa.me/${waNumber}?text=${encodeURIComponent(site.whatsappMessage)}`
  : '';

/**
 * Skill levels are about HONESTY, not scores:
 *  Learning       = studying it, not confident yet
 *  Practicing     = using it regularly in exercises and small programs
 *  Building with  = used it inside a project
 * These start as a best guess from your notes. Change any level that is not true.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    skills: [
      { name: 'Java', level: 'Practicing' },
      { name: 'Python', level: 'Practicing' },
      { name: 'C', level: 'Learning' },
      { name: 'Data structures & algorithms', level: 'Practicing' },
    ],
  },
  {
    title: 'Web development',
    skills: [
      { name: 'HTML', level: 'Building with' },
      { name: 'CSS', level: 'Building with' },
      { name: 'JavaScript', level: 'Building with' },
      { name: 'React', level: 'Learning' },
    ],
  },
  {
    title: 'Data and AI',
    skills: [
      { name: 'Data analysis', level: 'Learning' },
      { name: 'SQL', level: 'Learning' },
      { name: 'NumPy & Pandas', level: 'Learning' },
      { name: 'Machine learning fundamentals', level: 'Learning' },
    ],
  },
  {
    title: 'Tools and platforms',
    skills: [
      { name: 'Git & GitHub', level: 'Practicing' },
      { name: 'VS Code', level: 'Building with' },
      { name: 'Firebase', level: 'Building with' },
      { name: 'Jupyter & Google Colab', level: 'Learning' },
    ],
  },
];

/**
 * ADD A NEW PROJECT: copy one object below, change the text, set featured: true to give it
 * a large showcase, or false to list it in the compact "more projects" row.
 * Feature states: 'built' (works today), 'in-progress' (being built), 'planned' (not started).
 * Only mark something 'built' if it really works. Add the technologies you actually used.
 */
export const projects: Project[] = [
  {
    id: 'gla-examprep',
    title: 'GLA ExamPrep',
    tagline: 'Learn. Practice. Succeed.',
    description:
      'A student-focused exam preparation platform designed to help GLA University students practice subject-wise quizzes through a simple and accessible interface.',
    category: 'Education web app',
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    image: 'examprep.png',
    mockup: 'quiz',
    github: '', // paste your repository link
    live: 'https://gla-examprep.web.app/#authSection', // paste your deployed link
    status: 'In development',
    featured: true,
    features: [
      { label: 'Subject-wise quizzes', state: 'in-progress' },
      { label: 'Quiz search and navigation', state: 'planned' },
      { label: 'Firebase sign-in with Google and email/password', state: 'planned' },
      { label: 'Student profiles', state: 'planned' },
      { label: 'Admin portal to manage subjects and quizzes', state: 'planned' },
    ],
  },
  {
    id: 'wallora',
    title: 'Wallora',
    tagline: 'A visual world, curated for every screen.',
    description:
      'A wallpaper platform focused on discovering, showcasing, and sharing high-quality visual content through a modern interface.',
    category: 'Media web app',
    stack: [], // add the technologies you used, for example ['HTML', 'CSS', 'JavaScript', 'Firebase']
    image: 'wallora',
    mockup: 'gallery',
    github: '',
    live: 'https://wallora-pratap.web.app/',
    status: 'Live',
    featured: true,
    features: [
      { label: 'Wallpaper categories', state: 'built' },
      { label: 'Image uploads', state: 'built' },
      { label: 'Wallpaper downloads', state: 'built' },
      { label: 'Google sign-in', state: 'built' },
    ],
  },
];

/** Used in About (education + learning) and Journey (projects, experience, events). */
export const journey: JourneyItem[] = [
  {
    kind: 'education',
    period: 'Ongoing',
    title: 'B.Tech in Computer Science Engineering',
    place: 'GLA University, Mathura',
    text: 'Specializing in Artificial Intelligence and Data Science. Currently in second year.',
  },
  {
    kind: 'learning',
    period: 'Ongoing',
    title: 'Programming and problem solving',
    text: 'Java, Python and C, with data structures, recursion and regular LeetCode practice.',
  },
  {
    kind: 'learning',
    period: 'Ongoing',
    title: 'Data and AI foundations',
    text: 'NumPy, Pandas, statistics, visualization and machine learning basics.',
  },
  {
    kind: 'project',
    period: 'Building',
    title: 'GLA ExamPrep',
    text: 'A free quiz platform so GLA students can practice subject by subject.',
  },
  {
    kind: 'project',
    period: 'Building',
    title: 'Wallora',
    text: 'A wallpaper discovery and upload website with categories and Google sign-in.',
  },
  // Add real internships, hackathons or events here, for example:
  // { kind: 'event', period: 'March 2027', title: 'Hackathon name', place: 'Organizer', text: 'What you built.' },
];
