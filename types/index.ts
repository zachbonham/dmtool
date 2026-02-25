// Type definitions for GM Campaign Preference Tool

export interface Archetype {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
}

export interface SurveyResponse {
  id: string;
  playerName: string;
  responses: Record<string, number>; // questionId -> score (1-5)
  submittedAt: Date;
}

export interface CampaignRecommendation {
  primaryArchetype: Archetype;
  secondaryArchetypes: Archetype[];
  scores: Record<string, number>; // archetypeId -> score
  advice: string[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  createdBy: string;
  createdAt: Date;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'scale' | 'multiple-choice' | 'text';
  options?: string[];
  required: boolean;
}