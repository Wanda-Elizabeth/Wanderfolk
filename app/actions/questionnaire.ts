'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';

interface QuestionnaireSubmitData {
  country: string;
  interests: string[];
  connectionPreference: string;
  friendshipImportance: number;
  trustAnswer: string;
}

/**
 * Submit questionnaire responses to Supabase
 * Returns the created row ID for later email update
 */
export async function submitQuestionnaire(
  data: QuestionnaireSubmitData
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!data.country || !data.interests.length || !data.connectionPreference) {
      return { success: false, error: 'Missing required fields' };
    }

    const supabase = getSupabaseServerClient();

    const { data: inserted, error } = await supabase
      .from('questionnaire_responses')
      .insert({
        country: data.country,
        interests: data.interests,
        connection_preference: data.connectionPreference,
        friendship_importance: data.friendshipImportance,
        trust_answer: data.trustAnswer,
        email: null,
        waitlist: false,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error submitting questionnaire:', error);
      return { success: false, error: 'Failed to save questionnaire response' };
    }

    if (!inserted) {
      return { success: false, error: 'Failed to create questionnaire response' };
    }

    return { success: true, id: inserted.id };
  } catch (error) {
    console.error('Unexpected error in submitQuestionnaire:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Update questionnaire with email and set waitlist flag
 * Only updates the same row that was created by the user
 */
export async function updateQuestionnaireEmail(
  responseId: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!responseId || !email) {
      return { success: false, error: 'Missing response ID or email' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Please provide a valid email address' };
    }

    const supabase = getSupabaseServerClient();

    const { error } = await supabase
      .from('questionnaire_responses')
      .update({
        email: email.toLowerCase(),
        waitlist: true,
      })
      .eq('id', responseId);

    if (error) {
      console.error('Error updating questionnaire email:', error);
      return { success: false, error: 'Failed to save email address' };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in updateQuestionnaireEmail:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
