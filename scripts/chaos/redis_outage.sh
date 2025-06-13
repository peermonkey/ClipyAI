#!/usr/bin/env bash
# Simulate Redis outage by stopping container for 60 seconds
set -euo pipefail

REDIS_CONTAINER=${REDIS_CONTAINER:-redis}

echo "[chaos] Stopping Redis container $REDIS_CONTAINER"
docker stop "$REDIS_CONTAINER"

sleep 60

echo "[chaos] Starting Redis container $REDIS_CONTAINER"
docker start "$REDIS_CONTAINER"

echo "[chaos] Redis outage simulation completed" 