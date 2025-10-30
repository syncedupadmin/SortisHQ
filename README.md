# SortisIQ Marketing Site

[![CI/CD](https://github.com/syncedupadmin/SortisHQ/actions/workflows/ci.yml/badge.svg)](https://github.com/syncedupadmin/SortisHQ/actions/workflows/ci.yml)

Production-ready, enterprise-grade marketing site built with Next.js 14+, TypeScript, and TailwindCSS. Features animated bokeh backgrounds, UTM tracking, serverless lead forwarding, dynamic OG images, and full SEO optimization.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+ App Router, TypeScript, TailwindCSS v4, shadcn/ui, Framer Motion
- **Animated Backgrounds**: Parallax bokeh glows with `prefers-reduced-motion` support
- **UTM Tracking**: Automatic capture and persistence of campaign parameters
- **Lead Forwarding**: Serverless API endpoint that forwards to LeadConnector/webhooks
- **SEO Optimized**: Dynamic OG images, JSON-LD structured data, sitemap, robots.txt
- **Analytics**: Vercel Analytics built-in, optional PostHog integration
- **Fully Tested**: Playwright E2E tests, Vitest unit tests, Lighthouse CI
- **CI/CD Ready**: GitHub Actions pipeline with typecheck, lint, tests, and Lighthouse
- **Production Grade**: Husky pre-commit hooks, ESLint, Prettier, accessibility compliant

## 📦 Setup

### Prerequisites

- Node.js 20+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/syncedupadmin/SortisHQ.git
cd sortisiq

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables (see below)
```

### Environment Variables

Create `.env.local` with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# LeadConnector / Webhook Configuration
LEADCONNECTOR_API_URL=https://your-webhook-url.com/endpoint
LEADCONNECTOR_API_KEY=your_secret_api_key

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code

# UTM Debug Mode (Development Only)
NEXT_PUBLIC_DEBUG_UTM=true
```

#### Webhook Setup

The `/api/lead` endpoint forwards form submissions to your webhook service:

1. **LeadConnector**: Use your LeadConnector webhook URL
2. **Make/Zapier**: Create a webhook trigger and use that URL
3. **Custom**: Any HTTPS endpoint that accepts JSON POST requests

**Payload Structure**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "company": "Acme Inc",
  "message": "Interested in a demo",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "q4-2024"
}
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm test              # Run tests
npm run test:ui       # Run with UI
```

Tests are located in `__tests__/` directory.

### E2E Tests (Playwright)

```bash
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run with UI
```

Tests are located in `e2e/` directory.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub: `https://github.com/syncedupadmin/SortisHQ`
2. Import project in Vercel dashboard
3. Configure environment variables in Vercel project settings
4. Deploy!

**Environment Variables to Set in Vercel:**

- `LEADCONNECTOR_API_URL`
- `LEADCONNECTOR_API_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production domain)
- `NEXT_PUBLIC_POSTHOG_KEY` (optional)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional)

### Manual Deployment

```bash
npm run build
npm start
```

## 📄 Pages

- `/` - Homepage with hero, metrics, features, and CTA
- `/platform` - Platform overview (Signals, Scoring, Sync)
- `/proof` - Case studies and testimonials
- `/start` - Lead capture form with UTM tracking

## 🔌 API Routes

- `/api/lead` - POST endpoint for lead submission (forwards to webhook)
- `/api/og` - Dynamic Open Graph image generator
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - SEO robots configuration

## 🎨 Design System

### Brand Colors

- **Ink**: `#0B1220` (background)
- **Teal**: `#00D3C0` (primary accent)
- **Azure**: `#2B6CFF` (secondary accent)
- **Soft**: `#2D9CFF` (tertiary accent)
- **Text**: `#FFFFFF` (primary text)
- **Muted**: `#A9B1BC` (secondary text)
- **Card**: `#121A2C` (card backgrounds)

### Typography

- **Base**: Inter (sans-serif)
- **Headlines**: Playfair Display (serif)

### Utilities

- `.glass` - Glassmorphism effect
- `.glow-teal` - Teal glow effect
- `.glow-azure` - Azure glow effect

## 🔧 Configuration Files

- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `vitest.config.ts` - Vitest test configuration
- `playwright.config.ts` - Playwright E2E configuration
- `lighthouserc.json` - Lighthouse CI thresholds
- `.lintstagedrc.js` - Pre-commit hook configuration

## 📊 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and PR:

1. ✅ Type checking (TypeScript)
2. ✅ Linting (ESLint)
3. ✅ Format checking (Prettier)
4. ✅ Unit tests (Vitest)
5. ✅ Build verification
6. ✅ E2E tests (Playwright)
7. ✅ Lighthouse CI (Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90)

## 🔐 Security

- API keys never exposed to client
- Serverless functions for sensitive operations
- CORS and rate limiting recommendations in production
- Environment variable validation

## 📝 Adding Content

### Adding Case Studies

Currently case studies are hardcoded in `/app/proof/page.tsx`. To make them dynamic with MDX:

1. Create `content/cases/` directory
2. Add MDX files with frontmatter
3. Use `@next/mdx` to render (see Next.js MDX docs)

## 🔄 Updating LeadConnector Keys

To rotate your API key:

1. Generate new key in LeadConnector dashboard
2. Update `LEADCONNECTOR_API_KEY` in Vercel environment variables
3. Redeploy (or wait for auto-deploy on next commit)

## 📈 Lighthouse Scores

Target thresholds (enforced in CI):

- **Performance**: ≥90
- **Accessibility**: ≥90
- **Best Practices**: ≥90
- **SEO**: ≥90

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm test` and `npm run test:e2e`
4. Push and create a pull request
5. CI will run automatically

---

**Built with ❤️ for SortisIQ**
