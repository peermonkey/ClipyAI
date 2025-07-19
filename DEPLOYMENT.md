# ClipyAI Deployment Guide

## Quick Start

### Development Setup

1. **Prerequisites**
   ```bash
   # Install required tools
   node --version  # v20+
   npm install -g pnpm@8.6.0
   docker --version
   docker-compose --version
   ```

2. **Environment Setup**
   ```bash
   # Clone and setup
   git clone <repository-url>
   cd ClipyAI
   cp .env.example .env
   
   # Install dependencies
   pnpm install
   
   # Start infrastructure
   docker-compose -f infra/docker-compose.yml up -d postgres redis minio
   
   # Generate Prisma client
   pnpm --filter @xclips/db generate
   
   # Run database migrations
   pnpm --filter @xclips/db migrate
   ```

3. **Development Servers**
   ```bash
   # Start all services in development mode
   pnpm dev
   
   # Or start individual services
   pnpm --filter @xclips/web dev      # Frontend: http://localhost:3000
   pnpm --filter @xclips/api dev      # API: http://localhost:8080
   pnpm --filter @xclips/worker dev   # Worker service
   ```

### Production Deployment

#### Docker Compose (Single Server)

1. **Setup Environment**
   ```bash
   cp .env.production .env
   # Edit .env with your production values
   ```

2. **Deploy with Docker Compose**
   ```bash
   # Build and start all services
   docker-compose -f infra/docker-compose.yml --profile production up -d
   
   # View logs
   docker-compose -f infra/docker-compose.yml logs -f
   
   # Scale workers
   docker-compose -f infra/docker-compose.yml up -d --scale worker=3
   ```

#### Kubernetes Deployment

1. **Create Namespace**
   ```bash
   kubectl create namespace clipyai
   ```

2. **Setup Secrets**
   ```bash
   kubectl create secret generic clipyai-secrets \
     --from-literal=DATABASE_URL=postgresql://... \
     --from-literal=JWT_SECRET=your-secret \
     --from-literal=OPENAI_API_KEY=your-key \
     --namespace=clipyai
   ```

3. **Deploy Services**
   ```bash
   kubectl apply -f infra/k8s/ -n clipyai
   ```

#### Cloud Provider Specific

**AWS ECS/Fargate**
- Use the provided Dockerfiles with ECS task definitions
- Set up ALB for load balancing
- Use RDS for PostgreSQL and ElastiCache for Redis

**Google Cloud Run**
- Deploy each service as a separate Cloud Run service
- Use Cloud SQL for PostgreSQL and Memorystore for Redis

**Azure Container Instances**
- Deploy using Azure Container Groups
- Use Azure Database for PostgreSQL and Azure Cache for Redis

### Environment Variables

#### Required Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Authentication
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com

# Storage
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET=your-bucket

# AI
OPENAI_API_KEY=your-openai-key
```

#### Optional Variables
```bash
# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Payments
STRIPE_SECRET_KEY=sk_live_...
RAZORPAY_KEY_ID=rzp_live_...

# Monitoring
HONEYCOMB_API_KEY=your-honeycomb-key
```

### Monitoring & Observability

1. **Health Checks**
   - API: `GET /health`
   - Web: `GET /api/health`

2. **Metrics**
   - Prometheus metrics: `GET /metrics`
   - Custom application metrics included

3. **Logging**
   - Structured JSON logging
   - Request/response logging
   - Error tracking

### Scaling

1. **Horizontal Scaling**
   ```bash
   # Scale workers
   docker-compose up -d --scale worker=5
   
   # Scale API servers (behind load balancer)
   docker-compose up -d --scale api=3
   ```

2. **Vertical Scaling**
   - Adjust container resource limits
   - Monitor CPU/memory usage
   - Scale database connections accordingly

### Security

1. **SSL/TLS**
   - Use Let's Encrypt for free certificates
   - Configure HTTPS redirects in nginx

2. **Secrets Management**
   - Use environment variables for secrets
   - Never commit secrets to git
   - Rotate keys regularly

3. **Network Security**
   - Use VPC/private networks
   - Restrict database access
   - Configure firewall rules

### Troubleshooting

1. **Common Issues**
   ```bash
   # Check service status
   docker-compose ps
   
   # View logs
   docker-compose logs <service-name>
   
   # Check database connection
   docker-compose exec postgres psql -U user -d xclips
   
   # Test Redis connection
   docker-compose exec redis redis-cli ping
   ```

2. **Performance Issues**
   - Monitor database query performance
   - Check Redis memory usage
   - Monitor file upload/processing times
   - Scale worker instances for video processing

### Backup & Recovery

1. **Database Backups**
   ```bash
   # Create backup
   docker-compose exec postgres pg_dump -U user xclips > backup.sql
   
   # Restore backup
   docker-compose exec postgres psql -U user xclips < backup.sql
   ```

2. **File Storage Backups**
   - Use S3 bucket versioning
   - Configure cross-region replication
   - Regular integrity checks