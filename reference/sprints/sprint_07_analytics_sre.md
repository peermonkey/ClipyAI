# Sprint 07 – Analytics & SRE (Week 9)

## Goal
Ensure reliability, traceability, and rapid incident detection as traffic scales.

## Key Outcomes
* Dashboards display golden signals in real time
* Alerts integrated with PagerDuty and Slack
* Traces link user clip jobs across API and worker
* Redis outage chaos test recovers within 2 minutes

## Dependencies
Billing complete; Sevalla add-ons provisioned.

## Team & Hours
DevOps (1) • Backend (1)  
Estimate: 25 SP.

## Acceptance Criteria
- [ ] SLO dashboard shows <300 ms API p95 for 24 h.  
- [ ] PagerDuty test page wakes on-call.  
- [ ] Chaos day report documents MTTR <15 min.

- [ ] Instrument API & workers with Prometheus metrics  
  Why: Observe latency, queue lag.  
  Inputs→Outputs: prom-client counters, exposed `/metrics`.
- [ ] Deploy Loki + Vector log pipeline  
  Why: Centralised structured logs.  
  Inputs→Outputs: vector.toml sidecar, Sevalla add-on.
- [ ] Setup Grafana dashboards  
  Why: Visualise golden signals.  
  Inputs→Outputs: JSON dashboard configs committed to infra.
- [ ] Implement alert rules (CPU, queue lag, error rate)  
  Why: Proactive incident response.  
  Inputs→Outputs: PrometheusRule yaml, PagerDuty webhook.
- [ ] Add OpenTelemetry tracing in tRPC and worker  
  Why: Distributed performance insights.  
  Inputs→Outputs: OTLP exporter → Honeycomb.
- [ ] Write chaos test script: Redis outage simulation  
  Why: Validate queue resilience.  
  Inputs→Outputs: bash script + incident runbook.

## Key File Targets
* `infra/monitoring/prometheus.yml`
* `infra/monitoring/grafana_dashboards/*.json`
* `apps/api/src/metrics.ts`
* `services/worker/src/metrics.ts`
* `scripts/chaos/redis_outage.sh` 