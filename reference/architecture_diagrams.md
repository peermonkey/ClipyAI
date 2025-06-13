# XClips.ai – Architecture & Workflow Diagrams

## 1. High-Level System Architecture
```mermaid
flowchart LR
  subgraph Frontend
    FE[Next.js 14 Web App]
    RN[React-Native Shell]
  end
  subgraph Edge
    EDGE[Edge Functions / ISR]
  end
  subgraph Backend
    API[tRPC API Gateway]
    AUTH[NextAuth Service]
    BILLING[Stripe Webhook Svc]
  end
  subgraph Async
    REDIS[(Redis Queue)]
    WORKER[Worker Pool\n(FFmpeg + GPT + Whisper)]
  end
  subgraph Data
    PG[(Postgres)]
    S3[S3 Object Storage]
    PROM[(Prometheus / Grafana)]
  end
  OpenAI[[OpenAI GPT-4 & Whisper]]
  Stripe[[Stripe]]

  FE -- JWT --> AUTH
  FE -- RPC --> API
  API -- SQL --> PG
  API --> REDIS
  REDIS --> WORKER
  WORKER -- SQL --> PG
  WORKER -- Files --> S3
  WORKER -- API --> OpenAI
  WORKER -- Metrics --> PROM
  API -- WS/SSE --> FE
  BILLING --> PG
  BILLING --> Stripe
  S3 --> FE
```

## 2. Sprint Timeline vs Blueprint
```mermaid
gantt
dateFormat  YYYY-MM-DD
axisFormat  %d %b
section Phase
Sprint 1 Foundation        :done,  s1, 2025-06-12, 7d
Sprint 2 Auth & Landing     :active,s2, after s1, 7d
Sprint 3 Upload Pipeline    :        s3, after s2, 14d
Sprint 4 Clips & Clipping   :        s4, after s3, 14d
Sprint 5 Captions & Export  :        s5, after s4, 7d
Sprint 6 Billing            :        s6, after s5, 7d
Sprint 7 SRE & Analytics    :        s7, after s6, 7d
Sprint 8 Beta Polish        :        s8, after s7, 7d
```

## 3. Upload-to-Publish Sequence
```mermaid
sequenceDiagram
  participant FE as Frontend
  participant API as API Gateway
  participant S3 as S3 Bucket
  participant Q as Redis Queue
  participant W as Worker
  participant DB as Postgres
  participant WS as WebSocket

  FE->>API: upload.request(meta)
  API->>S3: Presign PUT URL
  FE->>S3: PUT file
  FE->>API: upload.complete(jobId)
  API->>Q: enqueue transcribe(jobId)
  WS-->>FE: stage=queued
  Q-->>W: transcribe
  W->>OpenAI: Whisper
  W->>DB: save transcript
  W->>Q: enqueue clip(jobId)
  WS-->>FE: stage=transcribed
  W->>OpenAI: GPT highlight
  W->>FFmpeg: slice
  W->>S3: store clips
  W->>DB: clips rows
  W->>Q: enqueue caption(jobId)
  WS-->>FE: stage=clipped
  W->>OpenAI: GPT captions
  W->>DB: caption rows
  W->>Q: enqueue export(jobId)
  W->>FFmpeg: burn captions
  W->>S3: store export
  W->>DB: export row
  WS-->>FE: stage=ready
```

## 4. Package Dependency Graph
```mermaid
graph TD
  subgraph Packages
    UI[packages/ui]
    CFG[packages/config]
    ESL[packages/eslint-config]
  end
  subgraph AppsServices
    WEB[apps/web]
    API[apps/api]
    AUTH[services/auth]
    WORKER[services/worker]
    BILL[services/billing]
  end
  UI --> WEB & API & AUTH & WORKER & BILL
  CFG --> WEB & API & AUTH & WORKER & BILL
  ESL --> WEB & API & AUTH & WORKER & BILL
  API --> WORKER
  BILL --> API
```

## 5. Event & Billing State Machine
```mermaid
stateDiagram-v2
    [*] --> UploadComplete
    UploadComplete --> Transcribe : enqueue
    Transcribe --> Clip : success
    Clip --> Caption : success
    Caption --> Export : success
    Export --> Billing : recordCost
    Billing --> [*]

    state Billing {
      TokenMetering --> MinuteDebit : cost * 7x
      MinuteDebit --> StripeCharge : balance < 0
      StripeCharge --> TokenMetering
    }
``` 