
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer'
}

export interface QuestionOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface TrueFalsePart {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface SlideData {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuestionOption[];
  trueFalseParts?: TrueFalsePart[];
  shortAnswer?: string;
  explanation?: string;
}

export interface ExtractionResult {
  title: string;
  slides: SlideData[];
}

// Fixed: Added missing Element interface used in Periodic Table
export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  phase: string;
  xpos: number;
  ypos: number;
  summary: string;
  cpk_hex: string;
}

// Fixed: Added missing ChatMessage interface used in AI Tutor
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
