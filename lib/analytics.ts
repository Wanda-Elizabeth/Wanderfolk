declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GA4Event =
  | 'page_view'
  | 'hero_cta_clicked'
  | 'survey_started'
  | 'survey_question_answered'
  | 'interest_yes'
  | 'interest_maybe'
  | 'interest_no'
  | 'connection_preference_selected'
  | 'country_selected'
  | 'survey_completed'
  | 'waitlist_started'
  | 'email_signup'
  | 'waitlist_completed';

export interface GA4EventParams {
  cta_type?: string;
  cta_location?: string;
  question?: string;
  answer?: string;
  country?: string;
  connection_type?: string;
  survey_source?: string;
  device_type?: string;
  error?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a GA4 event
 * IMPORTANT: Never send email addresses or other PII as parameters
 *
 * @param eventName - The GA4 event name
 * @param params - Event parameters (must not include email or sensitive data)
 */
export const trackEvent = (eventName: GA4Event, params?: GA4EventParams) => {
  if (typeof window === 'undefined' || !window.gtag) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[GA4] Event: ${eventName}`, params);
    }
    return;
  }

  // Validate that no PII is being sent
  if (params) {
    const sensitivePatterns = ['email', 'password', 'phone', 'address', 'ssn', 'credit'];
    for (const key of Object.keys(params)) {
      const lowerKey = key.toLowerCase();
      if (sensitivePatterns.some((pattern) => lowerKey.includes(pattern))) {
        console.warn(`[GA4] Warning: Attempted to send sensitive data (${key}) to GA4. This has been blocked.`);
        const { [key]: _removed, ...safeParams } = params;
        window.gtag('event', eventName, safeParams);
        return;
      }
    }
  }

  window.gtag('event', eventName, params || {});
};

/**
 * Track hero CTA clicks
 */
export const trackHeroCTAClick = (ctaType: 'primary' | 'secondary') => {
  trackEvent('hero_cta_clicked', {
    cta_type: ctaType,
    cta_location: 'hero_section',
  });
};

/**
 * Track interest selection
 */
export const trackInterestSelection = (interest: 'yes' | 'maybe' | 'no') => {
  trackEvent(`interest_${interest}`, {
    survey_source: 'validation_cta',
  });
};

/**
 * Track survey start
 */
export const trackSurveyStart = () => {
  trackEvent('survey_started', {
    survey_source: 'validation_modal',
  });
};

/**
 * Track survey question answer
 */
export const trackSurveyAnswer = (questionNumber: number, answerType: string) => {
  trackEvent('survey_question_answered', {
    question: `q${questionNumber}`,
    answer: answerType,
  });
};

/**
 * Track country selection
 */
export const trackCountrySelected = (country: string) => {
  trackEvent('country_selected', {
    country,
  });
};

/**
 * Track connection preference
 */
export const trackConnectionPreference = (preference: string) => {
  trackEvent('connection_preference_selected', {
    connection_type: preference,
  });
};

/**
 * Track survey completion
 */
export const trackSurveyCompleted = () => {
  trackEvent('survey_completed', {
    survey_source: 'validation_modal',
  });
};

/**
 * Track waitlist signup start
 */
export const trackWaitlistStart = () => {
  trackEvent('waitlist_started', {
    source: 'survey_completion',
  });
};

/**
 * Track email signup (NO EMAIL ADDRESS SENT)
 */
export const trackEmailSignup = () => {
  trackEvent('email_signup', {
    source: 'waitlist_modal',
  });
};

/**
 * Track waitlist completion
 */
export const trackWaitlistCompleted = () => {
  trackEvent('waitlist_completed', {
    source: 'email_submission',
  });
};
