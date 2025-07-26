# Base Node.js image with FFmpeg
FROM node:20-alpine AS base

# Install FFmpeg and other required tools
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++ \
    libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.6.0

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/worker/package.json ./services/worker/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install pnpm
RUN npm install -g pnpm@8.6.0

# Build application
RUN pnpm build --filter=@xclips/worker

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker

# Copy built application
COPY --from=builder /app/services/worker/dist ./dist
COPY --from=builder /app/packages/*/dist ./packages/
COPY --from=builder /app/node_modules ./node_modules

USER worker

CMD ["node", "dist/index.js"]