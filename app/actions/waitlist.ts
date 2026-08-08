'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Submit email to waitlist
 * Server-side action to keep API keys secure
 */
export async function submitWaitlistEmail(
  email: string,
  country: string,
  consent: boolean
): Promise<{ success: boolean; error?: string }> {
  // Validate inputs
  if (!email || !isValidEmail(email)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }

  if (!country) {
    return { success: false, error: 'Please select a country.' };
  }

  if (!consent) {
    return { success: false, error: 'Please consent to receive updates.' };
  }

  try {
    const supabase = getSupabaseServerClient();

    // Check if email already exists (within last 24 hours to allow re-signup)
    const { data: existingSignup, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('id, created_at')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1);

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email:', checkError);
      return { success: false, error: 'An error occurred. Please try again.' };
    }

    if (existingSignup && existingSignup.length > 0) {
      const lastSignup = new Date(existingSignup[0].created_at);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastSignup.getTime()) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        return {
          success: false,
          error: 'You have already signed up. Check your email for updates!',
        };
      }
    }

    // Insert into waitlist
    const { error: insertError } = await supabase.from('waitlist_signups').insert({
      email: email.toLowerCase(),
      country,
      consent,
    });

    if (insertError) {
      console.error('Error inserting waitlist signup:', insertError);
      return { success: false, error: 'Failed to sign up. Please try again.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in submitWaitlistEmail:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

/**
 * Submit survey responses
 */
export async function submitSurveyResponse(
  sessionId: string,
  responses: Array<{
    questionNumber: number;
    questionType: string;
    answer: string;
  }>,
  country: string,
  connectionPreferences: string[],
  countryInterests: string[]
): Promise<{ success: boolean; error?: string }> {
  if (!sessionId || !responses.length) {
    return { success: false, error: 'Invalid survey data.' };
  }

  try {
    const supabase = getSupabaseServerClient();

    // Insert survey responses
    const { error: surveyError } = await supabase.from('survey_responses').insert(
      responses.map((r) => ({
        session_id: sessionId,
        question_number: r.questionNumber,
        question_type: r.questionType,
        answer: r.answer,
      }))
    );

    if (surveyError) {
      console.error('Error inserting survey responses:', surveyError);
      return { success: false, error: 'Failed to save survey. Please try again.' };
    }

    // Insert connection preferences
    if (connectionPreferences.length > 0) {
      const { error: prefError } = await supabase.from('connection_preferences').insert(
        connectionPreferences.map((p) => ({
          session_id: sessionId,
          preference: p,
        }))
      );

      if (prefError) {
        console.error('Error inserting preferences:', prefError);
      }
    }

    // Insert country interests
    if (countryInterests.length > 0) {
      const { error: countryError } = await supabase.from('country_interests').insert(
        countryInterests.map((c) => ({
          session_id: sessionId,
          country: c,
        }))
      );

      if (countryError) {
        console.error('Error inserting country interests:', countryError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error in submitSurveyResponse:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
