# KumbhSaarthi AI - System Architecture

## Overview

KumbhSaarthi is a distributed, cloud-native application designed to serve 50M+ pilgrims with real-time AI guidance, emergency support, and community connection.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Mobile App     │   Web App        │  WhatsApp/IVR              │
│  (Flutter)      │  (Next.js)       │  (API-based)               │
└─────────────────┴────────┬──────────┴─────────────────────────────┘
                           │
                    (HTTPS/WebSocket)
                           │
┌──────────────────────────▼────────────────────────────────────────┐
│                  API GATEWAY & AUTH LAYER                         │
├────────────────────────────────────────────────────────────────────┤
│  • NextAuth.js (authentication)                                   │
│  • JWT token management                                           │
│  • Rate limiting (100 req/min per user)                          │
│  • Request validation & sanitization                             │
└──────────────────────────▼────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼─────────┐ ┌──────▼────────┐ ┌──────▼──────────┐
│  MICROSERVICES  │ │  AI SERVICES  │ │  DATA LAYER   │
│  (Next.js API)  │ │  (LLM/ML)     │ │  (Storage)    │
└─────────────────┘ └───────────────┘ └───────────────┘
```

## Layer Breakdown

### 1. Client Layer

**Frontend Applications**:
- **Flutter Mobile App** (Android/iOS)
  - Native performance
  - Offline support
  - Push notifications
  - Camera integration (for AR, face matching)

- **Next.js Web App** (Dashboard, Admin)
  - Responsive design
  - Real-time WebSocket updates
  - Progressive enhancement
  - Accessible (WCAG 2.1 AA)

- **WhatsApp + IVR**
  - Voice-based interaction
  - No app installation required
  - Reach 500M+ users instantly

### 2. API Gateway & Authentication

**NextAuth.js Config** (`auth.config.ts`):
```
User Request
    ↓
[Login] → JWT generation → Session creation → Stored in DB
    ↓
[API Call] → Token validation → Role-based access → Microservice
    ↓
[Logout] → Token invalidation → Session cleanup
```

**Security**:
- Phone OTP + Google OAuth
- JWT tokens (1-hour expiry)
- Refresh tokens (30-day expiry, HttpOnly)
- Role-based access control (RBAC)
- CORS protection + CSRF tokens

### 3. Microservices Layer

Deployed on **Vercel's Edge Functions** + **Serverless Functions**:

| Service | Endpoints | Dependencies |
|---------|-----------|--------------|
| **Chat Service** | `/api/v1/chat/*` | Gemini, Pinecone, LangChain |
| **Navigation** | `/api/v1/nav/*` | OpenStreetMap, Google Maps API |
| **Emergency** | `/api/v1/emergency/*` | PostgreSQL, WebSocket broadcast |
| **Lost & Found** | `/api/v1/lost/*` | FaceNet, S3, PostgreSQL |
| **Accommodation** | `/api/v1/accommodation/*` | PostgreSQL, Redis cache |
| **Crowd Intelligence** | `/api/v1/crowd/*` | MongoDB, TFT model, Kafka |
| **Events** | `/api/v1/events/*` | PostgreSQL |
| **Translation** | `/api/v1/translate/*` | IndicTrans2, Google Translate |

### 4. AI/ML Layer

**Models & Services**:

```
User Query
    ↓
[Language Detection] → IndicBERT (22 languages)
    ↓
[Intent Classification] → fine-tuned DistilBERT (5 classes)
    ↓
[Routing Decision]
    ├→ [FAQ] → RAG Pipeline → Pinecone + Claude → Retrieve + Generate
    ├→ [Navigation] → OSM + Google Maps → Route calculation
    ├→ [Emergency] → Rule-based + NLP urgency detection
    ├→ [Lost & Found] → FaceNet embeddings + similarity search
    └→ [General Chat] → Claude 3.5 Sonnet
    ↓
[Response Generation]
    ↓
[Translation] → IndicTrans2 (if non-English)
    ↓
[Text-to-Speech] → Azure Neural TTS (optional)
    ↓
[Return to User]
```

**Model Selection Rationale**:

| Model | Choice | Why |
|-------|--------|-----|
| LLM | Claude 3.5 Sonnet | Best instruction-following + multilingual + safety |
| Embedding | text-embedding-3-large | Highest MTEB scores, 1536-dim |
| Translation | IndicTrans2 | Best for Indic languages, +15 BLEU over Google |
| STT | Whisper v3 | Best WER on Indian accents, self-hostable |
| TTS | Azure Neural | 21 natural voices, low latency |
| Face Match | FaceNet | 99.65% accuracy on LFW, fast embeddings |
| Crowd Detection | YOLOv8x | SOTA real-time detection, 30fps on Jetson |
| Crowd Forecast | TFT | Multivariate temporal forecasting, interpretable |

### 5. Data Layer

**Databases**:

```
PostgreSQL (Relational)
├── Users & Auth
├── Locations & POIs
├── Accommodations
├── Events
├── Emergencies (transactional)
└── Indexes on: (phone, role, sector, locationId)

MongoDB (Documents)
├── Chat conversations
├── Crowd snapshots (time-series)
└── WhatsApp sessions

Pinecone (Vector DB)
├── FAQ embeddings
├── Face embeddings (pgvector in Postgres as fallback)
└── Accommodation descriptions

Redis (Cache)
├── Session tokens
├── Rate limit counters
├── Crowd data (2-min TTL)
└── FAQ responses (1-hour TTL, semantic similarity)

S3 + CloudFront (CDN)
├── Map tiles (MBTiles)
├── Profile photos
├── Offline packs
└── Audio responses (TTS cache)
```

**Connection Pooling**:
- Vercel Postgres: built-in pooling
- MongoDB Atlas: connection pooling
- Redis: ElastiCache with auto-failover

### 6. Request Flow (Example: Chat Query)

```
1. User sends text query in Hindi via mobile app
   └─> POST /api/v1/chat/message
       Body: { message: "Sangam ghat ka time?", language: "hi" }

2. API Handler (Next.js Route)
   ├─> Validate JWT token → Get user ID + language preference
   ├─> Sanitize input
   └─> Call Chat Service

3. Chat Service (lib/ai/gemini.ts)
   ├─> Language Detection: IndicBERT → Detect "hi"
   ├─> Intent Classification: "FAQ" (confidence: 0.95)
   └─> Route to FAQ Agent

4. FAQ Agent
   ├─> Query: "Sangam ghat ka time?"
   ├─> Search Pinecone: hybrid (dense + BM25)
   │   └─> Retrieve top-5 documents
   ├─> Rerank: Cohere Rerank → top-3 selected
   ├─> Prepare context
   └─> Generate with Claude:
       System: "Respond in Hindi, 2-3 sentences, cite sources"
       Context: [FAQ documents]
       User: "Sangam ghat ka time?"

5. Response Generation
   └─> Claude returns: "Sangam ghat ka snan subah 6:00-9:00 baje hai..."

6. Post-Processing
   ├─> Hallucination check: "Is every claim in context?" → PASS
   ├─> Store in MongoDB: Chat history
   ├─> Cache in Redis: For similar queries
   └─> Return JSON response

7. Client receives
   ├─> Display message in chat UI
   └─> Optional: Play TTS audio (Azure Neural TTS)
```

### 7. Scaling Strategy

**Horizontal Scaling**:
- Vercel Edge Functions (unlimited auto-scaling)
- MongoDB sharding by user_id
- Redis cluster mode (16 shards)
- Pinecone serverless (pay-per-query)

**Vertical Optimization**:
- Query optimization via Prisma `select()`
- Index strategy for high-cardinality columns
- Connection pooling at all layers
- Request deduplication (HTTP caching)

**Load Patterns**:
- Peak: 500K concurrent users (Makar Sankranti Snan day, 5-9 AM)
- Normal: 5M daily active users
- Baseline: 50M registered users

**SLOs**:
- API P95 latency: <3s
- Emergency SOS: <500ms
- Chat response: <2s
- Crowd data freshness: <5min
- Uptime: 99.95%

### 8. Deployment Pipeline

```
Developer pushes to main
    ↓
GitHub Actions triggered
    ├─> Lint + Build + Test
    ├─> Code coverage check
    └─> Security scanning
    ↓
Deploy to Vercel
    ├─> Build Next.js
    ├─> Generate Prisma client
    ├─> Deploy to edge functions
    └─> Run smoke tests
    ↓
Production Live
    ├─> Monitor metrics (Sentry, Vercel Analytics)
    └─> Alert on SLO breaches
```

**Rollback**: Automatic if error rate > 1% within 5 min of deploy

### 9. Monitoring & Observability

**Metrics**:
- Prometheus: request rate, latency, errors
- Grafana dashboards: real-time system health
- Vercel Analytics: Web Vitals

**Logging**:
- Structured JSON logging (all services)
- Loki: log aggregation
- CloudWatch: error tracking

**Tracing**:
- Jaeger: distributed tracing for multi-hop requests
- Trace all chat→RAG→LLM flows

**Alerts**:
- PagerDuty: SLO breach alerts
- Slack: deployment status
- SMS: critical emergency path failures

## Data Flow Examples

### Lost & Found (Face Matching)

```
Family reports missing person
    ↓
Upload photo → S3 → FaceNet embedding generation
    ↓
Store: {user_id, photo_url, embedding} in PostgreSQL + Pinecone
    ↓
Volunteer finds person → Capture photo
    ↓
Generate embedding → Vector search in Pinecone
    ↓
Similarity > 0.85? → Match found → Alert family
```

### Crowd Prediction

```
CCTV/IoT sensors continuously stream data → Kafka
    ↓
Stream processor (Flink):
├─> Aggregate per sector (2-min windows)
├─> Calculate density score
└─> Feed to TFT model every 2 min
    ↓
TFT model generates forecast:
├─> 30-min ahead
├─> 60-min ahead
├─> 90-min ahead
├─> 120-min ahead
└─> Confidence intervals
    ↓
Store in MongoDB: {sector, densityScore, predictions, timestamp}
    ↓
WebSocket push to all connected clients
```

## Security Architecture

**Defense in Depth**:

```
Layer 1: DDoS Protection
  └─> Vercel DDoS mitigation

Layer 2: WAF
  └─> AWS WAF (SQL injection, XSS detection)

Layer 3: API Gateway
  └─> Rate limiting, authentication

Layer 4: Encryption
  ├─> TLS 1.3 (transit)
  └─> AES-256 (at rest, S3 + DB)

Layer 5: Access Control
  └─> RBAC, JWT validation

Layer 6: Data Privacy
  └─> Encryption of PII, embeddings only for faces
```

---

**Last Updated**: Jan 2025
**Version**: 1.0.0 Stable
