# KumbhSaarthi AI - Complete Vercel Setup & WhatsApp Integration Guide

## Table of Contents
1. [Vercel Deployment](#vercel-deployment)
2. [WhatsApp Integration](#whatsapp-integration)
3. [Testing](#testing)
4. [Security Checklist](#security-checklist)

---

## VERCEL DEPLOYMENT

### Step 1: Prepare Repository

```bash
cd /c/Users/HP/Desktop/KumbhSathi-AI

# Initialize git (if not done)
git init
git add .
git commit -m "feat: Initial KumbhSaarthi deployment"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository: `kumbhsaarthi-ai`
3. Push code:

```bash
git remote add origin https://github.com/YOUR-USERNAME/kumbhsaarthi-ai.git
git branch -M main
git push -u origin main
```

### Step 3: Create Vercel Project

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import GitHub Repository**
   - Select `kumbhsaarthi-ai`
   - Vercel auto-detects: Next.js framework
4. **Configure Build Settings**
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 4: Add Environment Variables

In Vercel Project → Settings → Environment Variables:

#### Critical Variables (Must Add)

```
DATABASE_URL = postgresql://user:password@host/db
NEXTAUTH_URL = https://kumbhsaarthi-ai.vercel.app
NEXTAUTH_SECRET = [generate: openssl rand -base64 32]
GEMINI_API_KEY = [from Google AI Studio]
GOOGLE_CLIENT_ID = [from Google Cloud Console]
GOOGLE_CLIENT_SECRET = [from Google Cloud Console]
NODE_ENV = production
```

#### Optional Variables

```
WHATSAPP_BUSINESS_TOKEN = [from Meta/Twilio]
WHATSAPP_BUSINESS_PHONE_ID = [from Meta Business Manager]
WHATSAPP_VERIFY_TOKEN = [generate: openssl rand -hex 32]
WHATSAPP_APP_SECRET = [from Meta app dashboard]
SENTRY_DSN = [from Sentry]
```

### Step 5: Set Up Database

**Option A: Vercel Postgres (Recommended)**

1. In Vercel dashboard → **Storage** → **Create Database** → **Postgres**
2. Follow setup wizard
3. Copy connection string to `DATABASE_URL`
4. Run migrations:

```bash
# After deployment
npm run db:push
npm run db:seed
```

**Option B: External Postgres**

Use your own PostgreSQL instance:
- AWS RDS
- DigitalOcean
- Heroku Postgres
- Local (for testing)

### Step 6: Configure Google OAuth

1. **Go to [console.cloud.google.com](https://console.cloud.google.com)**
2. **Create new project**: "KumbhSaarthi"
3. **Enable APIs**: 
   - Google+ API
   - Google Maps API (optional)
4. **Create OAuth Credentials**:
   - Type: Web application
   - Authorized JavaScript origins: `https://kumbhsaarthi-ai.vercel.app`
   - Authorized redirect URIs:
     ```
     https://kumbhsaarthi-ai.vercel.app/api/auth/callback/google
     https://localhost:3000/api/auth/callback/google (for testing)
     ```
5. Copy Client ID & Secret → Add to Vercel env

### Step 7: Deploy

Click **Deploy** in Vercel dashboard or:

```bash
git push origin main
```

Vercel automatically deploys on push! 🚀

**Your app is live at**: `https://kumbhsaarthi-ai.vercel.app`

---

## WHATSAPP INTEGRATION

### Prerequisites

- [Meta Developer Account](https://developers.facebook.com)
- [WhatsApp Business API Access](https://www.whatsapp.com/business/api)
- Your phone number: **9479394160**

### Setup Steps

#### 1. Create Meta App

```
Facebook Developers → My Apps → Create App
→ Business → App Name: "KumbhSaarthi AI"
```

#### 2. Add WhatsApp Product

```
Dashboard → Add Product → WhatsApp
→ WhatsApp Business Platform
```

#### 3. Configure Phone Number

```
WhatsApp Settings → Phone Numbers → Add Phone Number
Phone: 9479394160 (your number)
Display Name: KumbhSaarthi AI
```

#### 4. Get Access Token

```
Settings → Generate Token
Scopes needed:
- whatsapp_business_messaging
- whatsapp_business_management
```

#### 5. Configure Webhook in Vercel

```
WhatsApp Settings → Webhook URL

Webhook URL: https://kumbhsaarthi-ai.vercel.app/api/v1/whatsapp/webhook
Verify Token: [same random value as WHATSAPP_VERIFY_TOKEN]
```

#### 6. Add Environment Variables to Vercel

```
WHATSAPP_BUSINESS_TOKEN = your_access_token
WHATSAPP_BUSINESS_PHONE_ID = your_phone_id
WHATSAPP_VERIFY_TOKEN = [same random value configured in Meta]
WHATSAPP_APP_SECRET = [from Meta app dashboard]
```

#### 7. Subscribe to Messages Webhook

```
Meta App Dashboard → WhatsApp → Configuration

Subscribe to Webhooks:
✓ messages
✓ message_status
✓ message_template_status_update
```

---

## TESTING

### Test Local Setup

```bash
# Install dependencies
npm install

# Configure .env.local
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up database
npm run db:push
npm run db:seed

# Run development
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

**Test Credentials** (Demo Mode):
- Phone: 9876543210
- OTP: 123456

### Test Chat API

```bash
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "Sangam ghat kaise jaayein?",
    "language": "hi"
  }'
```

### Test Emergency SOS

```bash
curl -X POST http://localhost:3000/api/v1/emergency/sos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "MEDICAL",
    "sector": "1",
    "latitude": 25.4358,
    "longitude": 81.8463,
    "description": "Test emergency"
  }'
```

### Test WhatsApp (Local)

```bash
# Test webhook verification
curl -X GET "http://localhost:3000/api/v1/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=<random-token>&hub.challenge=test123"

# Test incoming message
curl -X POST http://localhost:3000/api/v1/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "9479394160",
            "text": { "body": "Snan ka time?" }
          }]
        }
      }]
    }]
  }'
```

### Test Deployed WhatsApp

1. **Send WhatsApp message to your bot number**
2. **Expected responses**:

Send: `snan`
Reply: Shows Snan schedule

Send: `accommodation`
Reply: Shows accommodation options

Send: `emergency`
Reply: Emergency contacts

Send: `hello`
Reply: AI-generated response

---

## SECURITY CHECKLIST

Before production:

### Authentication
- [ ] Remove demo OTP (change `if (otp !== "123456")`)
- [ ] Set `NODE_ENV=production` in Vercel
- [ ] Generate strong `NEXTAUTH_SECRET`
- [ ] Enable OAuth sign-in

### API Security
- [ ] Enable rate limiting (done in `middleware.ts`)
- [ ] Add security headers (done in `middleware.ts`)
- [ ] Validate all inputs
- [ ] Hide error messages (done in error handlers)
- [ ] Enable HTTPS only (automatic on Vercel)

### Database
- [ ] Use Vercel Postgres (encryption included)
- [ ] Never commit `.env` files
- [ ] Rotate access tokens regularly
- [ ] Enable database backups

### WhatsApp
- [ ] Verify webhook token matches Vercel env
- [ ] Test message sending/receiving
- [ ] Monitor message logs
- [ ] Implement rate limiting per user

### Monitoring
- [ ] Set up Sentry for error tracking
- [ ] Enable Vercel Analytics
- [ ] Monitor API latency
- [ ] Set up alerts for errors

---

## Troubleshooting

### "Database Connection Failed"

```bash
# Check connection string format
postgresql://USER:PASSWORD@HOST:5432/DATABASE

# Verify Vercel Postgres is running
# Test with: npm run db:push
```

### "WhatsApp Webhook Verification Failed"

```bash
# Check verify token matches:
WHATSAPP_VERIFY_TOKEN in Vercel env
The same random value in `WHATSAPP_VERIFY_TOKEN` and your webhook config
```

### "Gemini API Rate Limited"

```
Upgrade from free tier or implement caching:
- Already done via Redis in production
- Use local cache in development
```

### "Build Fails on Vercel"

```
Check build logs in Vercel dashboard
Common issues:
- Missing env variables
- Prisma schema errors
- TypeScript compilation errors
```

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up WhatsApp webhook
3. ✅ Test all endpoints
4. ✅ Monitor logs & errors
5. ✅ Invite beta users
6. 📈 Scale infrastructure as needed

---

**Support**: See README.md or DEPLOYMENT.md for additional help.

**Last Updated**: Jan 2025
