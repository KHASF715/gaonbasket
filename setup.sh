#!/bin/bash
# GaonBasket Project Initialization Script

set -e

echo "🚀 GaonBasket Project Setup"
echo "===================================="
echo ""

# Check Node.js version
echo "📋 Checking Node.js..."
NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo "✅ Created .env.local"
fi

if [ ! -f "apps/web/.env.local" ]; then
  cp apps/web/.env.example apps/web/.env.local
  echo "✅ Created apps/web/.env.local"
fi

if [ ! -f "apps/api/.env.local" ]; then
  cp apps/api/.env.example apps/api/.env.local
  echo "✅ Created apps/api/.env.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update environment variables in .env.local files"
echo "2. Add MongoDB URI to apps/api/.env.local"
echo "3. Run: npm run dev"
echo ""
echo "📚 Documentation:"
echo "- Setup Guide: docs/SETUP.md"
echo "- API Docs: docs/API.md"
echo "- Architecture: docs/ARCHITECTURE.md"
echo "- Deployment: docs/DEPLOYMENT.md"
echo ""
echo "Designed & Developed by Mohammad Ashif"
