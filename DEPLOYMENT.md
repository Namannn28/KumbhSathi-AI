# KumbhSaarthi AI - Complete Installation & Deployment Guide

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- A Vercel account

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd mahakumbh-ai
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```bash
# Database (Vercel Postgres recommended)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
ALLOWED_ORIGINS=https://your-production-domain.com

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Gemini API (free tier available)
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Set Up Database

```bash
# Create database schema
npm run db:push

# Seed with sample data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live!

---

## Deployment to Vercel (Production)

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Initial KumbhSaarthi deployment"
git push origin main
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" framework (auto-detected)

### Step 3: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

- `DATABASE_URL` — Vercel Postgres connection string
- `NEXTAUTH_URL` — `https://your-domain.vercel.app`
- `NEXTAUTH_SECRET` — Generate: `openssl rand -base64 32`
- `ALLOWED_ORIGINS` — Comma-separated HTTPS origins allowed to call API routes
- `GEMINI_API_KEY` — Your API key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — OAuth credentials

### Step 4: Connect Vercel Postgres

1. In Vercel → Storage → Create Database → PostgreSQL
2. Copy connection string to `DATABASE_URL`

### Step 5: Deploy

```bash
# Automatic deployment on git push
git push origin main
```

Or click "Deploy" in Vercel dashboard.

### Step 6: Initialize Database (First Time Only)

In Vercel → Functions → Run Command:
```bash
npm run db:push && npm run db:seed
```

---

## API Keys Setup

### Google OAuth
1. [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`

### Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Add to environment variables

### WhatsApp (Optional)
1. [Twilio Console](https://www.twilio.com/console)
2. Set up WhatsApp Business Account
3. Configure webhook at `/api/v1/whatsapp/webhook`

---

## Database Migrations

After schema changes:

```bash
# Create migration
npx prisma migrate dev --name <description>

# Deploy migration to production
npx prisma migrate deploy
```

---

## Monitoring & Troubleshooting

### Logs
View Vercel logs: `vercel logs <project-name>`

### Common Issues

| Issue | Solution |
|-------|----------|
| 500 error on chat | Check Gemini API key, verify rate limits |
| Database connection fails | Verify DATABASE_URL, check Vercel Postgres |
| OAuth redirect not working | Ensure NEXTAUTH_URL matches deployment URL |
| Slow response | Enable caching in API routes, optimize queries |

---

## Performance Optimization

### Caching
- API responses cached in Redis (ElastiCache in production)
- Static pages cached with Vercel CDN
- FAQ responses cached in-app

### Database
- Indexes on frequently queried columns
- Connection pooling via Vercel Postgres
- Query optimization via Prisma select

### Frontend
- Dynamic imports for heavy components
- Image optimization via Next.js Image
- CSS bundled with Tailwind purging

---

## Scaling

For production traffic (5M+ daily users):

1. **Database**: Upgrade to Vercel Postgres Pro or Aurora
2. **CDN**: Enable Vercel Analytics & Web Vitals
3. **API Routes**: Add Redis caching layer
4. **Rate Limiting**: Implement at Kong/CloudFlare level

---

## Maintenance

### Daily
- Monitor error rates in Sentry
- Check Vercel deployment status

### Weekly
- Review API usage/costs
- Check database backup status
- Monitor uptime via Vercel Analytics

### Monthly
- Analyze user feedback
- Performance profiling
- Security updates

---

## Support & Resources

- **Documentation**: See ARCHITECTURE.md
- **API Reference**: See API.md
- **Helpline**: 1800-XXX-XXXX
- **Emergency**: 112

---

**Last Updated**: Jan 2025
**Version**: 1.0.0
