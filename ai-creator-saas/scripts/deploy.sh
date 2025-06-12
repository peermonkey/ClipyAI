#!/bin/bash

# AI Creator SaaS Deployment Script
# This script handles automated deployment to Sevalla or similar VPS

set -e

echo "🚀 Starting deployment process..."

# Check if environment variables are set
if [ -z "$JWT_SECRET" ]; then
    echo "❌ ERROR: JWT_SECRET environment variable is not set"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the application
echo "🏗️ Building application..."
npm run build

# Initialize Postgres database
echo "🗄️ Initializing Postgres database..."
node -e "
const { initDB } = require('./lib/db.js');
try {
  initDB();
  console.log('Postgres database initialized successfully');
} catch (err) {
  console.error('Database initialization failed:', err);
  process.exit(1);
}
"

# Stop existing PM2 process (if any)
echo "🔄 Stopping existing application..."
pm2 delete ai-creator-saas || true

# Start application with PM2
echo "▶️ Starting application..."
pm2 start npm --name "ai-creator-saas" -- start

# Configure PM2 to restart on boot
pm2 startup
pm2 save

# Setup log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 status

echo ""
echo "🔗 Next steps:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Set up SSL certificate with certbot"
echo "3. Configure NGINX reverse proxy (if not already done)"
echo ""
echo "💡 Useful commands:"
echo "  pm2 logs ai-creator-saas  # View logs"
echo "  pm2 restart ai-creator-saas  # Restart app"
echo "  pm2 stop ai-creator-saas  # Stop app"
