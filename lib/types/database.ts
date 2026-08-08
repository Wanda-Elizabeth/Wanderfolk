export interface WaitlistSignup {
  id: string;
  email: string;
  country: string;
  consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface SurveyResponse {
  id: string;
  session_id: string;
  question_number: number;
  question_type: string;
  answer: string;
  created_at: string;
}

export interface ConnectionPreference {
  id: string;
  session_id: string;
  preference: string;
  created_at: string;
}

export interface CountryInterest {
  id: string;
  session_id: string;
  country: string;
  created_at: string;
}

export interface ValidationSession {
  id: string;
  created_at: string;
  updated_at: string;
  user_agent?: string;
  ip_address?: string;
}

export interface QuestionnaireResponse {
  id: string;
  created_at: string;
  country: string;
  interests: string[];
  connection_preference: string;
  friendship_importance: number;
  trust_answer: string;
  email: string | null;
  waitlist: boolean;
}
