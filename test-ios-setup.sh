#!/bin/bash

echo "🚀 Vibemates iOS Testing Setup"
echo "================================"

echo ""
echo "📋 Checking project configuration..."

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if app.json exists
if [ -f "app.json" ]; then
    echo "✅ app.json found"
else
    echo "❌ app.json not found"
    exit 1
fi

# Check if App.tsx exists
if [ -f "App.tsx" ]; then
    echo "✅ App.tsx found"
else
    echo "❌ App.tsx not found"
    exit 1
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules found"
else
    echo "❌ node_modules not found - run 'npm install'"
    exit 1
fi

echo ""
echo "🔧 Installing dependencies..."
npm install

echo ""
echo "🎯 Project ready for testing!"
echo ""
echo "To run on iOS:"
echo "1. npm start (to start Metro bundler)"
echo "2. npm run ios (to open iOS simulator)"
echo "3. Or scan QR code with Expo Go app on your iPhone"

echo ""
echo "📱 Available commands:"
echo "  npm start       - Start Expo development server"
echo "  npm run ios     - Run on iOS simulator"
echo "  npm test        - Run Jest tests"
echo "  npm run lint    - Run ESLint"
echo "  npm run clean   - Clear Expo cache"
