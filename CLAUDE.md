# K-Fortune

English Saju (Korean fortune telling) service for global GenZ users.
Free mini reading → Paid premium report ($29, manual delivery).
Auto SEO blog for organic traffic.

# Bash commands
- npm run dev: Start dev server
- npm run build: Build project
- npm run typecheck: Run TypeScript checker
- npx next-sitemap: Generate sitemap

# Tech stack
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS + Framer Motion
- Vercel Postgres (@vercel/postgres)
- 토스페이먼츠 (@tosspayments/tosspayments-sdk)
- Claude API (@anthropic-ai/sdk)
- Resend (resend)
- @vercel/og for dynamic OG images
- next-sitemap for SEO
- googleapis for Google Indexing API
- react-markdown for rendering
- Deploy: Vercel

# Design
- Dark theme: bg #0A0A0F, surface #1A1A2E, border #2A2A4A
- Primary: purple #7C3AED, Accent: gold #F59E0B
- Font: Inter (Google Fonts)
- Mobile-first, max-width 1280px
- All UI in English

# Code style
- Use App Router conventions (app/ directory)
- Server components by default, 'use client' only when needed
- Separate components into components/ by feature
- Utilities in lib/
- API routes in app/api/
- Use Tailwind classes, avoid custom CSS
- Use Framer Motion for scroll animations via SectionWrapper component

# DB
- Vercel Postgres
- Two tables: orders, blog_posts
- Schema defined in lib/db.ts — run setup SQL before first use

# Env vars needed
NEXT_PUBLIC_TOSS_CLIENT_KEY, TOSS_SECRET_KEY, ANTHROPIC_API_KEY, RESEND_API_KEY, MASTER_EMAIL, GOOGLE_SERVICE_ACCOUNT_JSON, CRON_SECRET, NEXT_PUBLIC_BASE_URL

# Key routes
- / (landing page)
- /free-reading (input form)
- /free-reading/result (AI result + upsell)
- /order (payment form, $35)
- /order/success, /order/fail
- /blog, /blog/[slug]
- /api/free-reading (POST, Claude streaming)
- /api/payment (POST, create order)
- /api/payment/confirm (POST, toss confirm + emails)
- /api/blog/generate (GET, cron daily)
- /api/og (GET, dynamic OG image)

# Workflow
- Always typecheck after code changes
- Test payment flow in toss test mode first
- Blog generation uses Vercel Cron (vercel.json, daily 00:00 UTC)
- After generating blog post, call Google Indexing API
- Use SSG with revalidate for blog pages