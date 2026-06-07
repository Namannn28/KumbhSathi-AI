# COMPLETE TESTING GUIDE

## Local Testing

### Setup

```bash
cd /c/Users/HP/Desktop/KumbhSathi-AI
npm install
cp .env.example .env.local
```

### Environment Variables for Testing

```bash
# .env.local
DATABASE_URL=postgresql://localhost:5432/kumbhsaarthi_test
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-key-12345
GEMINI_API_KEY=AIzaSyD... (free tier key)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
NODE_ENV=development
```

### Start Development

```bash
npm run db:push      # Create database
npm run db:seed      # Load sample data
npm run dev          # Start server (http://localhost:3000)
```

---

## UI Testing

### 1. Landing Page
```
URL: http://localhost:3000
✓ Loads successfully
✓ "Get Started" button links to login
✓ Features section displays 6 cards
✓ Stats section shows correct numbers
✓ Responsive on mobile/tablet/desktop
```

### 2. Login Flow
```
URL: http://localhost:3000/auth/login
✓ Enter phone: 9876543210
✓ Click "Send OTP"
✓ Enter OTP: 123456 (demo mode)
✓ Click "Verify OTP"
✓ Redirects to dashboard
```

### 3. Dashboard
```
URL: http://localhost:3000/dashboard (after login)
✓ Shows welcome message
✓ Displays crowd data for 3 sectors
✓ All 6 feature buttons visible
✓ SOS button visible in bottom-right (red, pulsing)
✓ Each button navigates correctly
```

### 4. Chat Page
```
URL: http://localhost:3000/chat
✓ Type message: "Sangam ghat kaise jaayein?"
✓ Click send
✓ AI response appears (~2-3 seconds)
✓ Conversation history saved
✓ Responsive layout
```

### 5. Emergency Page
```
URL: http://localhost:3000/emergency
✓ Select "Medical Emergency"
✓ Click SOS button
✓ Case ID displayed
✓ Success confirmation shown
✓ Back button works
```

### 6. Crowd Map
```
URL: http://localhost:3000/crowd
✓ Shows 3+ sectors with density levels
✓ Color coding correct (green/yellow/red)
✓ Forecast shown for +1hr, +2hr
```

### 7. Events Page
```
URL: http://localhost:3000/events
✓ Shows 3 Snan events
✓ Dates and times correct
✓ Significance text displays
✓ "Set Reminder" button visible
```

### 8. Accommodation
```
URL: http://localhost:3000/accommodation
✓ Select Sector 1
✓ Set budget to 500
✓ Click Search
✓ Results display with names, prices, distance
✓ "Contact via WhatsApp" button works
```

### 9. Lost & Found
```
URL: http://localhost:3000/lost-found
✓ Switch to "Report Missing"
✓ Enter name, sector
✓ Submit form
✓ Switch to "Search"
✓ Displays matches with confidence scores
```

### 10. Navigation
```
URL: http://localhost:3000/navigation
✓ Enter destination: "Sangam Ghat"
✓ Select route type: "Crowd-Aware"
✓ Click "Get Directions"
✓ Shows route details
✓ Step-by-step directions display
```

---

## API Testing (Postman / cURL)

### Test Authentication

```bash
# 1. Get JWT token (phone OTP login)
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "otp": "123456"
  }'

# Response contains JWT token
```

### Test Chat API

```bash
# Replace JWT with token from auth response
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "Sangam ghat ke liye kaise jaayein?",
    "language": "hi",
    "sessionId": "test-session"
  }'

# Expected response:
{
  "success": true,
  "data": {
    "message": "Sangam Ghat aapke paas 1.2 km door hai...",
    "sources": [...]
  }
}
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
    "description": "Chest pain"
  }'

# Expected response:
{
  "success": true,
  "data": {
    "caseId": "EMERGENCY_ID",
    "status": "REPORTED",
    "severity": "HIGH",
    "nearestFacility": {...}
  }
}
```

### Test Crowd Heatmap

```bash
curl -X GET http://localhost:3000/api/v1/crowd/heatmap

# Expected response:
{
  "success": true,
  "data": [
    {
      "sector": "1",
      "density": 0.65,
      "crowdLevel": "medium",
      "personCount": 45000
    },
    ...
  ]
}
```

### Test Navigation

```bash
curl -X GET "http://localhost:3000/api/v1/nav/route?fromLat=25.434&fromLng=81.844&toLat=25.4358&toLng=81.8463&mode=crowd-aware"

# Expected response:
{
  "success": true,
  "data": {
    "distance": 1.2,
    "estimatedTime": 14,
    "directions": [...]
  }
}
```

### Test WhatsApp Webhook

```bash
# Webhook verification
curl -X GET "http://localhost:3000/api/v1/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=<random-token>&hub.challenge=test123"

# Response should be: test123

# Incoming message test
curl -X POST http://localhost:3000/api/v1/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "9479394160",
            "text": { "body": "snan" }
          }]
        }
      }]
    }]
  }'

# Expected: Message processed, would send reply via WhatsApp API
```

---

## Performance Testing

### Load Test with Apache Bench

```bash
# Test 100 concurrent requests
ab -n 1000 -c 100 http://localhost:3000/api/v1/locations/nearest

# Check results:
# - Requests per second
# - Mean time per request
# - Failed requests (should be 0)
```

### Test Database Performance

```bash
# Connect to database
psql postgresql://user:pass@localhost:5432/kumbhsaarthi

# Check indexes
\d locations

# Run query performance check
EXPLAIN ANALYZE
SELECT * FROM locations WHERE latitude > 25.4 AND latitude < 25.45;
```

---

## WhatsApp Integration Testing

### Steps to Test with Your Number (9479394160)

1. **Set Up Meta Webhook**:
   - Create Meta/Facebook app
   - Enable WhatsApp product
   - Add phone number: 9479394160
   - Configure webhook:
     ```
     URL: https://your-vercel-app.vercel.app/api/v1/whatsapp/webhook
     Token: <random-token>
     ```

2. **Send Test Messages**:
   - From any WhatsApp: Message your bot number
   - Try keywords:
     - "snan" → Snan schedule
     - "accommodation" → Accommodation info
     - "emergency" → Emergency contacts
     - "hindi" → Hindi response

3. **Monitor Logs**:
   ```bash
   # In Vercel dashboard → Functions → Logs
   # Filter: whatsapp
   # Should see incoming messages + responses
   ```

---

## Vercel Deployment Testing

### 1. Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Check: https://vercel.com/your-project
```

### 2. Test Production URLs

```bash
# Landing page
https://kumbhsaarthi-ai.vercel.app

# Chat API
curl -X POST https://kumbhsaarthi-ai.vercel.app/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'

# WhatsApp webhook verification
curl -X GET "https://kumbhsaarthi-ai.vercel.app/api/v1/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=<random-token>&hub.challenge=test123"
```

### 3. Monitor Vercel

```
Dashboard → Project Name → Monitoring
✓ Check API latency (should be <2s for chat, <500ms for emergency)
✓ Check error rates (should be <0.1%)
✓ Check function invocations
✓ Check database connections
```

---

## Security Testing

### Test Rate Limiting

```bash
# Should succeed
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "test1"}'

# Repeat 60+ times rapidly
# Should get rate limit error after 60 requests/minute
```

### Test Authentication

```bash
# No auth header - should fail
curl -X POST http://localhost:3000/api/v1/emergency/sos \
  -H "Content-Type: application/json" \
  -d '{"type": "MEDICAL"}'

# Expected: 401 UNAUTHORIZED
```

### Test CORS

```bash
# Different origin - should be blocked
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil.com" \
  -d '{"message": "test"}'

# Check CORS headers
```

---

## Test Checklist

### Functional Tests
- [ ] Landing page loads
- [ ] All 10 pages work
- [ ] Login flow works
- [ ] All 50+ APIs respond
- [ ] Chat generates responses
- [ ] Emergency SOS works
- [ ] Lost & found displays
- [ ] Navigation calculates routes
- [ ] Accommodation search works
- [ ] Events display correctly

### Security Tests
- [ ] Rate limiting works
- [ ] No error disclosure
- [ ] CORS properly configured
- [ ] Authentication required for sensitive endpoints
- [ ] HTTPS/TLS working
- [ ] Security headers present

### Performance Tests
- [ ] Chat response <2 seconds
- [ ] Emergency SOS <500ms
- [ ] Page load <3 seconds
- [ ] Database queries efficient
- [ ] No memory leaks

### WhatsApp Tests
- [ ] Webhook verification works
- [ ] Messages received correctly
- [ ] Responses sent back
- [ ] Rate limiting applies
- [ ] Errors handled gracefully

---

**Testing Status**: Ready for full QA cycle
