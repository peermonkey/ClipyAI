# Base Node.js image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.6.0

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/
COPY services/billing/package.json ./services/billing/

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
RUN pnpm build --filter=@xclips/api

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/packages/*/dist ./packages/
COPY --from=builder /app/services/billing/dist ./services/billing/
COPY --from=builder /app/node_modules ./node_modules

USER api

EXPOSE 8080

ENV PORT 8080

CMD ["node", "dist/index.js"]