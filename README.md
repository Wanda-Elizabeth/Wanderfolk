# Wanderfolk — International Friendship Validation MVP

> **Meet people. Not dates.**
>
> Genuine friendships with people around the world.

This repository contains the validation MVP landing page for Wanderfolk, an online platform designed to help people form genuine, platonic friendships with people from different countries.

## What is Wanderfolk?

Wanderfolk is NOT a dating app. It's NOT a language-exchange platform. It IS a friendship-first concept focused on:

- Genuine human connection
- International friendships
- Cultural curiosity
- Meaningful conversations
- Casual fun
- Meeting people from different countries

## Current Phase: Validation MVP

This is **not** the full platform yet. The website exists to answer one question:

> **Would people actually want a platform like this?**

The landing page explains the concept, collects user interest through a survey, and tracks analytics to validate demand. We're gathering feedback, not building user accounts, messaging, or matching systems yet.

## Tech Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wanderfolk.git
cd wanderfolk

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G_XXXXXXXXXX
```

Get your GA4 measurement ID from [Google Analytics](https://analytics.google.com).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Linting and Type Checking

```bash
npm run lint
npm run type-check
```

### Running Tests

```bash
npm test
```

## Project Structure

```
wanderfolk/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
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
├── lib/                 # Utilities
│   └── analytics.ts    # Google Analytics 4 integration
├── public/              # Static assets
├── .github/workflows/   # CI/CD pipelines
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Analytics Events

The landing page tracks meaningful events in Google Analytics:

| Event | Purpose |
|-------|---------|
| `page_view` | Page loads |
| `hero_cta_clicked` | Primary/secondary CTA clicks |
| `interest_yes` | "Yes, I'd love this" responses |
| `interest_maybe` | "Maybe, tell me more" responses |
| `interest_no` | "Not for me" responses |
| `country_selected` | Country interest selections |
| `survey_started` | Survey starts |
| `survey_completed` | Survey completions |
| `email_signup` | Email signup conversions |

### Key Metrics to Track

1. **Unique visitors** — Overall interest
2. **Hero CTA click rate** — Message resonance
3. **Survey completion rate** — Engagement depth
4. **"Yes" interest rate** — Core validation metric
5. **Email signup rate** — Future launch interest
6. **Country interest distribution** — Geographic demand
7. **Preferred connection method** — Feature priority
8. **Traffic source** — Marketing effectiveness

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to `main`

### Manual Deployment

```bash
npm run build
npm start
```

## Branch Strategy

- **main**: Production-ready code, automatically deployed
- **develop**: Development branch for features
- **feature/**: Feature branches from `develop`

### Branch Protection

Enable on `main` branch:

- Require pull request reviews (1+ approval)
- Require status checks to pass (CI pipeline)
- Dismiss stale pull request approvals
- Require branches to be up to date before merging

## CI/CD Pipeline

GitHub Actions automatically:

1. **On every push**:
   - Runs ESLint
   - Runs TypeScript type checking
   - Builds the project
   - Runs test suite

2. **On merge to main**:
   - Same checks as above
   - Deploys to Vercel (production)

3. **On PR to main**:
   - All checks run
   - Generates preview deployment
   - Preview URL available in PR comments

## Future Roadmap

This MVP validates demand. Future phases (only if validation succeeds):

- **Phase 2**: Waitlist + basic profiles
- **Phase 3**: Friendship discovery
- **Phase 4**: Messaging
- **Phase 5**: Interest-based groups
- **Phase 6**: International events
- **Phase 7**: Trust and safety systems
- **Phase 8**: Advanced matching

## Design Principles

The website emphasizes:

- **Human**: Real conversation, genuine connection
- **Global**: International perspective
- **Optimistic**: Hopeful tone about human connection
- **Modern**: Clean, contemporary design
- **Accessible**: WCAG compliant, keyboard navigation
- **Fast**: Excellent Lighthouse scores

## Brand Identity

**Name**: Wanderfolk

**Colors**:
- Primary: Deep navy (#0f172a)
- Secondary: Warm coral (#ec834f)
- Accent: Fresh green (#22c55e)
- Supporting: Soft cream/off-white

**Typography**: Inter font family, modern sans-serif

## Privacy & Legal

- No unnecessary personal information is collected
- Google Analytics respects user privacy (anonymize_ip enabled)
- Email signup is optional
- See `Privacy Policy` and `Terms of Service` (to be created)

## Testing

Current test coverage includes:

- CTA interaction
- Survey validation
- Country selection tracking
- Analytics event firing
- Responsive navigation
- Form submission states

Run tests:

```bash
npm test
```

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass: `npm test`
4. Ensure linting passes: `npm run lint`
5. Create a pull request with a clear description
6. Wait for review and CI checks to pass
7. Merge when approved

## Support

For help or feedback:

- **Issues**: [GitHub Issues](https://github.com/yourusername/wanderfolk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/wanderfolk/discussions)

## License

[Specify your license here, e.g., MIT, CC0, etc.]

## Disclaimer

**This is a validation experiment.** No platform exists yet. We are testing whether people want this product before building it. All messaging on this website is aspirational and describes potential future functionality, not current capabilities.

---

**Last updated**: August 2026

For more information, see:
- [Analytics Documentation](./docs/analytics.md)
- [Validation Plan](./docs/validation-plan.md)
# Wanderfolk
