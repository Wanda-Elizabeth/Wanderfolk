# Wanderfolk — Development Guide

## Project Overview

**Wanderfolk** is an international friendship validation MVP landing page. It's a modern, responsive website designed to test whether people want a platform for genuine friendships across countries.

**Status**: Initial MVP setup complete. Ready for local development and deployment.

## Technology Stack

- **Next.js 15+** with TypeScript
- **Tailwind CSS** for styling
- **Google Analytics 4** for validation metrics
- **Jest** and React Testing Library for tests
- **ESLint** and Prettier** for code quality
- **Vercel** for hosting
- **GitHub Actions** for CI/CD

## Project Structure

```
wanderfolk/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home landing page
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles
│   ├── privacy/page.tsx   # Privacy policy
│   └── terms/page.tsx     # Terms of service
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Solution.tsx
│   ├── ExampleExperience.tsx
│   ├── FriendshipFirst.tsx
│   ├── CountryDiscovery.tsx
│   ├── ValidationCTA.tsx
│   ├── ValidationModal.tsx
│   ├── SurveyForm.tsx
│   └── Footer.tsx
├── lib/
│   └── analytics.ts        # GA4 integration
├── __tests__/             # Test files
├── docs/
│   ├── analytics.md       # Analytics documentation
│   └── validation-plan.md # Validation strategy
├── .github/workflows/     # CI/CD pipelines
├── public/               # Static assets
└── [config files]        # TypeScript, Tailwind, ESLint, etc.
```

## Key Components

### Analytics Integration
- Google Analytics 4 is integrated via `/lib/analytics.ts`
- Events are tracked for: page views, CTA clicks, interest levels, survey progress, country selections, email signups
- All IP addresses are anonymized
- No PII is collected in event parameters

### Survey System
- 5-question survey collects validation data
- Questions cover: location, desired features, connection method, friendship importance, trust factors
- Optional email signup for launch notifications
- Form validates before allowing submission

### Accessibility
- Keyboard navigation throughout
- Visible focus states
- WCAG color contrast compliance
- Semantic HTML structure
- Reduced motion support

## Development

### Setup

```bash
npm install
cp .env.example .env.local
# Add your GA4 measurement ID to .env.local
npm run dev
```

### Local Development

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Build for production
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
npm test          # Run test suite
```

### Environment Variables

Required:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Your GA4 measurement ID (format: `G_XXXXXXXXXX`)

Get this from [Google Analytics](https://analytics.google.com) by creating a property and selecting the web data stream.

## Design System

### Colors
- **Primary**: #0f172a (navy)
- **Secondary**: #ec834f (coral)
- **Accent**: #22c55e (green)
- **Neutral**: Slate gray tones

See `tailwind.config.ts` for full color palette.

### Typography
- **Font**: Inter (modern sans-serif)
- **Headlines**: 400-700 weight, large sizes
- **Body**: 400-500 weight, high contrast

### Spacing & Layout
- Mobile-first responsive design
- Max-width container: 6rem (24px) for most sections, 4rem (16px) for hero/special
- Consistent spacing using Tailwind scale (4px base)

## Analytics Events

Key events to track validation:

| Event | Purpose |
|-------|---------|
| `page_view` | Page load |
| `hero_cta_clicked` | CTA engagement |
| `interest_yes` | Strong interest |
| `interest_maybe` | Moderate interest |
| `interest_no` | No interest |
| `survey_started` | Survey engagement |
| `survey_completed` | Survey completion |
| `email_signup` | Launch notification signup |
| `country_selected` | Feature preference |

See `docs/analytics.md` for full event documentation.

## Testing

### Test Coverage

Current tests cover:
- Hero component rendering and CTAs
- Survey validation
- Analytics event firing
- Button interactions

Run tests:
```bash
npm test
npm test -- --coverage  # With coverage report
```

### Adding Tests

Place new test files in `__tests__/` directory with `.test.tsx` or `.spec.tsx` extensions.

## Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Automatic deployments on push to `main`

### Manual Deployment

```bash
npm run build
npm start
```

## Git Workflow

- **main**: Production-ready, auto-deployed to Vercel
- **develop**: Development integration branch
- **feature/xyz**: Feature branches from develop

### Branch Protection on `main`

Recommended rules:
- Require 1 pull request review
- Require status checks to pass (CI)
- Dismiss stale reviews
- Require branches up to date before merge

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`):

On every push:
- ✅ ESLint linting
- ✅ TypeScript type checking
- ✅ Build verification
- ✅ Test suite

On merge to main:
- ✅ All of above
- ✅ Deploy to Vercel (production)

## Validation Metrics

### Success Criteria

- Interest rate: >40% (yes + maybe / total responding)
- Survey completion: >70%
- "Yes" rate: >25% (yes / all interest responses)
- Email signups: >50
- Avg. friendship importance: >4.0/5.0

### Key Metrics to Monitor

1. **Unique visitors** — Overall reach
2. **Interest rate** — Concept resonance (most important)
3. **Survey completion rate** — Message clarity
4. **Country distribution** — Geographic demand
5. **Preferred features** — Development priority
6. **Email signup rate** — Future launch interest

See `docs/validation-plan.md` and `docs/analytics.md` for detailed analysis framework.

## Common Tasks

### Adding a New Section

1. Create component in `/components/`
2. Export from component
3. Import and place in `app/page.tsx`
4. Style with Tailwind using design system colors
5. Add analytics events if interactive
6. Test on mobile and desktop

### Adding a New Form Field

1. Add to `SurveyForm.tsx` state
2. Add input element with Tailwind classes
3. Validate before allowing next step
4. Include in `survey_completed` event parameters

### Changing Colors

1. Update `tailwind.config.ts` color palette
2. Use color variables throughout components
3. Test contrast (should pass WCAG AA)
4. Test on both light and dark backgrounds

### Updating Analytics

1. Add event to `/lib/analytics.ts` function calls
2. Include in corresponding component
3. Verify event fires in GA4 real-time view
4. Add to analytics documentation

## Performance Targets

- **Lighthouse Performance**: >90
- **Lighthouse Accessibility**: >95
- **Lighthouse SEO**: >90
- **Page load time**: <2s
- **Core Web Vitals**: All green

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast ≥4.5:1 for normal text
- [ ] Form labels associated with inputs
- [ ] Alt text on images
- [ ] Semantic HTML structure
- [ ] Screen reader tested
- [ ] Reduced motion respected

## Known Limitations

- Survey data is not persisted to backend (currently logged to console)
- Email signups are not actually sent anywhere (needs backend integration)
- No user accounts or authentication
- No actual matching algorithm
- This is validation only, not the full platform

## Future Phases (After Validation)

- Phase 2: Waitlist + basic profiles
- Phase 3: Friendship discovery
- Phase 4: Messaging
- Phase 5: Interest groups
- Phase 6: International events
- Phase 7: Trust systems
- Phase 8: Advanced matching

Only proceed if validation metrics indicate demand.

## Important Principles

1. **Validation First**: We're testing demand, not building features
2. **Transparency**: Clear about MVP status and future plans
3. **Privacy**: Minimal data collection, no PII in events
4. **Accessibility**: WCAG compliant, keyboard friendly
5. **Speed**: Lightweight, minimal JavaScript
6. **Genuine**: Focus on real connection, not metrics

## Resources

- [Next.js Docs](https://nextjs.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Google Analytics 4](https://support.google.com/analytics)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Questions?

See README.md for more information or check documentation in `/docs/`.

---

**Last updated**: August 2026
