# Analytics Documentation

## Overview

Wanderfolk uses Google Analytics 4 (GA4) to track visitor behavior and validate demand for an international friendship platform.

## Setup

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your **Measurement ID** (format: `G_XXXXXXXXXX`)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G_XXXXXXXXXX
   ```

## Events Tracked

### Page Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `page_view` | User lands on site | `page_path`, `page_title` |
| `scroll_depth` | User scrolls to section | `section_name`, `scroll_percent` |

### Engagement Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `hero_cta_clicked` | User clicks CTA in hero | `cta_type` (primary/secondary), `cta_location` |
| `country_selected` | User selects a country | `country`, `selection_type` |

### Validation Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `interest_yes` | "Yes, I'd love this" | (none) |
| `interest_maybe` | "Maybe, tell me more" | (none) |
| `interest_no` | "Not for me" | (none) |
| `survey_started` | User begins survey | `initial_interest` |
| `survey_completed` | User submits survey | `country_interest`, `connection_type`, `friendship_importance`, `has_trust_feedback`, `wants_email` |

### Conversion Events

| Event | Description | Parameters |
|-------|-------------|------------|
| `email_signup` | User provides email | `source` (survey/footer) |

## Key Metrics

### Primary Validation Metrics

1. **Interest Rate** (Most Important)
   - Formula: `(interest_yes + interest_maybe) / hero_cta_clicked`
   - Target: >40% indicates demand
   - Interpretation: What % of engaged users express interest?

2. **Survey Completion Rate**
   - Formula: `survey_completed / survey_started`
   - Target: >70% indicates message clarity
   - Interpretation: Can users understand the concept?

3. **"Yes" Conversion**
   - Formula: `interest_yes / (interest_yes + interest_maybe + interest_no)`
   - Target: >25% indicates strong demand
   - Interpretation: How many people are enthusiastic?

### Secondary Metrics

4. **Email Signup Rate**
   - Formula: `email_signup / survey_completed`
   - Target: >15% indicates launch interest
   - Interpretation: Who wants updates?

5. **Country Interest Distribution**
   - Look at: Most selected countries
   - Interpretation: Which regions show most interest?

6. **Connection Preference**
   - Look at: Text vs. Voice vs. Video vs. Group
   - Interpretation: What features to prioritize?

7. **Friendship Importance Score**
   - Average response to importance scale (1-5)
   - Target: >4.0 indicates product resonance
   - Interpretation: How important is "friendship first"?

## Dashboard Setup

Create a GA4 dashboard with:

1. **Overview Card**
   - Unique visitors (past 30 days)
   - Session count
   - Engagement rate

2. **Validation Card**
   - `interest_yes` count
   - `interest_maybe` count
   - `interest_no` count
   - Interest rate (as metric)

3. **Survey Insights Card**
   - `survey_started` count
   - `survey_completed` count
   - Survey completion rate

4. **Conversion Card**
   - `email_signup` count
   - Email signup rate

5. **Device Card**
   - Mobile vs. Desktop breakdown
   - Device category distribution

6. **Geography Card**
   - Top countries by users
   - Top countries by `interest_yes`

## Custom Events Code

Events are tracked from `/lib/analytics.ts`:

```typescript
trackEvent('interest_yes'); // No parameters
trackEvent('interest_maybe');
trackEvent('country_selected', { country: 'Luxembourg' });
trackEvent('survey_completed', {
  country_interest: 'Japan',
  connection_type: 'Video',
  friendship_importance: 5,
  wants_email: true,
});
```

## Privacy

- All user IP addresses are anonymized (`anonymize_ip: true`)
- No personally identifiable information (PII) is collected in event parameters
- Email addresses are stored separately, not in GA4
- Compliant with GDPR, CCPA, and other privacy regulations

## Interpreting Results

### Success Threshold

The MVP is considered successful if:

- **Unique visitors**: >1,000 in first month
- **Interest rate**: >40%
- **Survey completion**: >70%
- **"Yes" rate**: >25%
- **Email signups**: >50

If all criteria are met, move to Phase 2 (waitlist + profiles).

### Stopping Point

If after 2-3 months:
- Interest rate <20%
- "Yes" rate <10%
- Low email signups

Consider pivoting the messaging or pausing development.

### Iteration

Use data to:
- A/B test different headlines
- Refine problem/solution messaging
- Adjust country examples
- Improve CTA copy

## Accessing Analytics

1. Log in to [Google Analytics](https://analytics.google.com)
2. Select the Wanderfolk property
3. View reports and dashboards
4. Export data for analysis

## Limitations

This MVP validates:
- ✅ Whether the *concept* resonates
- ✅ What features people want
- ✅ Geographic interest

This MVP does NOT validate:
- ❌ Willingness to pay
- ❌ User retention rates
- ❌ Actual matching algorithm effectiveness
- ❌ Real conversation quality

## Next Steps

Once you have 100+ survey responses:

1. Download survey data
2. Analyze free-text feedback
3. Create persona profiles
4. Identify top features
5. Decide on Phase 2 viability

---

**Last updated**: August 2026
