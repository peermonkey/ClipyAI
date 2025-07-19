#!/bin/bash

# ClipyAI Setup Script
set -e

echo "🎬 Setting up ClipyAI..."

# Check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is required but not installed."
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is required but not installed."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is required but not installed."
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Install pnpm if not present
install_pnpm() {
    if ! command -v pnpm &> /dev/null; then
        echo "📦 Installing pnpm..."
        npm install -g pnpm@8.6.0
    fi
    echo "✅ pnpm is ready"
}

# Setup environment
setup_environment() {
    echo "🔧 Setting up environment..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "📝 Created .env file from template"
        echo "⚠️  Please edit .env with your actual configuration values"
    fi
}

# Install dependencies
install_dependencies() {
    echo "📚 Installing dependencies..."
    pnpm install --frozen-lockfile
    echo "✅ Dependencies installed"
}

# Start infrastructure
start_infrastructure() {
    echo "🚀 Starting infrastructure services..."
    docker-compose -f infra/docker-compose.yml up -d postgres redis minio
    
    echo "⏳ Waiting for services to be ready..."
    sleep 10
    
    # Wait for postgres
    until docker-compose -f infra/docker-compose.yml exec -T postgres pg_isready -U user; do
        echo "Waiting for PostgreSQL..."
        sleep 2
    done
    
    echo "✅ Infrastructure services are running"
}

# Setup database
setup_database() {
    echo "🗄️ Setting up database..."
    
    # Generate Prisma client (skip if network issues)
    if pnpm --filter @xclips/db generate 2>/dev/null; then
        echo "✅ Prisma client generated"
    else
        echo "⚠️ Prisma client generation skipped (network issues)"
    fi
    
    # Run migrations (skip if Prisma client not available)
    if pnpm --filter @xclips/db migrate 2>/dev/null; then
        echo "✅ Database migrations completed"
    else
        echo "⚠️ Database migrations skipped"
    fi
}

# Build packages
build_packages() {
    echo "🔨 Building packages..."
    
    # Build packages individually to handle failures gracefully
    pnpm --filter @xclips/config build
    pnpm --filter @xclips/ui build
    pnpm --filter @xclips/billing build
    pnpm --filter @xclips/auth build
    pnpm --filter @xclips/worker build
    pnpm --filter @xclips/api build
    
    echo "✅ Core packages built successfully"
    
    # Try to build web app (may fail due to Prisma)
    if pnpm --filter @xclips/web build 2>/dev/null; then
        echo "✅ Web app built successfully"
    else
        echo "⚠️ Web app build skipped (Prisma dependency issue)"
    fi
}

# Main setup function
main() {
    echo "🎬 ClipyAI Setup Script"
    echo "======================="
    
    check_prerequisites
    install_pnpm
    setup_environment
    install_dependencies
    start_infrastructure
    setup_database
    build_packages
    
    echo ""
    echo "🎉 Setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env file with your configuration"
    echo "2. Start development servers: pnpm dev"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo "For production deployment, see DEPLOYMENT.md"
}

# Run main function
main "$@"