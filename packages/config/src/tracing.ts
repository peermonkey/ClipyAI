import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export function initTracing(serviceName: string) {
  if (process.env.OTEL_DISABLED === '1') return;
  const traceExporter = new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
      'x-honeycomb-dataset': process.env.HONEYCOMB_DATASET || serviceName,
    },
  });

  const sdk = new NodeSDK({
    traceExporter,
    serviceName,
    instrumentations: [getNodeAutoInstrumentations()],
  });
  sdk.start();
} 