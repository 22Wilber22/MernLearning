export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
  xp: number;
  level: number;
  streak: number;
}

export interface Module {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isLocked: boolean;
  unlockPercentage: number;
  lessons: Lesson[];
  totalXP: number;
  estimatedHours: number;
  tags: string[];
}

export interface Lesson {
  _id: string;
  moduleId: string;
  title: string;
  slug: string;
  content: string;
  order: number;
  type: 'theory' | 'practice' | 'quiz';
  xpReward: number;
  exercises: Exercise[];
  estimatedMinutes: number;
}

export interface Exercise {
  _id: string;
  lessonId: string;
  moduleId: string;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'nodejs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  hints: string[];
  order: number;
}

export interface AIReview {
  score: number;
  passed: boolean;
  feedback: string;
  positives: string[];
  improvements: string[];
  suggestions: string[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokenAndUser: (token: string, user: User) => void;
}
