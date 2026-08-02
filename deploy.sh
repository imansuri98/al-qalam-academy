#!/bin/bash
# ==============================================================================
# Al-Arabi Platform 1-Click VPS Deployment Script
# ==============================================================================

echo "🚀 Starting Al-Arabi Production Deployment on VPS..."

# Step 1: Pull latest changes from GitHub
echo "📦 Pulling latest codebase from GitHub main branch..."
git pull origin main

# Step 2: Build and start Docker containers
echo "🐳 Building and starting Docker containers (PostgreSQL, Web, Admin, Nginx)..."
docker-compose down
docker-compose up -d --build

# Step 3: Run Database Migrations
echo "🗄️ Executing Drizzle ORM PostgreSQL migrations..."
docker-compose exec -T web npm run db:push --workspace=@alarabi/database

# Step 4: Issue SSL Certificates via Certbot (Optional)
# certbot --nginx -d alarabi.edu -d admin.alarabi.edu --non-interactive --agree-tos -m admin@alarabi.edu

echo "✅ Deployment Successful!"
echo "🌐 Learner Portal Live: http://localhost:3000 (Reverse proxied via Nginx)"
echo "👑 CMS Admin Studio Live: http://localhost:3001 (Reverse proxied via Nginx)"
