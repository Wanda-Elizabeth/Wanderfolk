import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = getSupabaseServerClient();

    const testData = {
      country: 'Test Country',
      interests: ['Testing'],
      connection_preference: 'Text',
      friendship_importance: 3,
      trust_answer: 'Test answer',
      email: null,
      waitlist: false,
    };

    const { data, error } = await supabase
      .from('questionnaire_responses')
      .insert(testData)
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errorCode: error.code,
          errorDetails: error.details,
          errorHint: error.hint,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: 'Test insert successful',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
