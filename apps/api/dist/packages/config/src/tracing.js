"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTracing = initTracing;
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
function initTracing(serviceName) {
    if (process.env.OTEL_DISABLED === '1')
        return;
    const traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'https://api.honeycomb.io/v1/traces',
        headers: {
            'x-honeycomb-team': process.env.HONEYCOMB_API_KEY || '',
            'x-honeycomb-dataset': process.env.HONEYCOMB_DATASET || serviceName,
        },
    });
    const sdk = new sdk_node_1.NodeSDK({
        traceExporter,
        serviceName,
        instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
    });
    sdk.start();
}
