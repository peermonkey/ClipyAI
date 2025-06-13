# 11 – Observability & SRE

_Last updated: 2025-06-12_

## 11.1 Monitoring Stack
Component | Purpose | Hosted On
--------- | ------- | ---------
Prometheus | Metrics scrape | Sevalla add-on
Grafana | Dashboards & alerts | Sevalla add-on
Loki | Log aggregation | Sevalla add-on
Vector | Log shipper sidecar | All services
Sentry | Error tracking + perf | SaaS
OpenTelemetry | Tracing | Exporter → Honeycomb

## 11.2 Golden Signals
Signal | Target (95th) | Alert Level
------ | ------------- | ----------
Latency (API p95) | <300 ms | Sev2
Queue Lag (jobs) | <30 | Sev3
Error Rate (5xx) | <1 % | Sev2
Worker Fail Ratio | <5 % / hour | Sev2
DB CPU | <70 % | Sev3

## 11.3 Dashboards
1. **Exec Overview** – Revenue, new users, clip success.  
2. **API Latency Heatmap** – per route.  
3. **Worker Throughput** – jobs processed/min, GPU util.

## 11.4 Alert Routing
Severity | Channel | Policy
---------|---------|-------
Sev1 (critical) | PagerDuty phone | 24/7 on-call rotation
Sev2 (major) | PagerDuty app | Business hours
Sev3 (minor) | Slack `#alerts` | Triage next workday

## 11.5 Error Handling Lifecycle
1. Error captured by Sentry with `x-trace-id`.  
2. Issue auto-groomed by severity (frequency × impact).  
3. Triage meeting daily @ 09:00 UTC.

## 11.6 Performance Budgets
• First Contentful Paint <1.8 s on 4G.  
• Dashboard API bundle <150 kB gzip.  
• Worker avg processing ≤ 1× media duration.

## 11.7 Chaos Engineering
Quarterly game days: simulate Redis crash, S3 latency spikes, openai downtime; ensure auto-recovery scripts work.

---

> **SLO breach rule:** If same SLO breached 3 weeks in a row → create dedicated engineering sprint. 