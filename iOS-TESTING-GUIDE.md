# 🚀 Vibemates iOS Testing Guide

## ✅ Project Status
Your Vibemates project is **ready for iOS testing**! All dependencies and configurations are properly set up.

## 📱 Testing Options

### Option 1: iOS Simulator (Recommended for Development)
```bash
# Start the Expo development server
npm start

# In a new terminal, run on iOS simulator
npm run ios
```

### Option 2: Physical iPhone (Recommended for Real Device Testing)
```bash
# Start the Expo development server
npm start

# Download Expo Go from the App Store on your iPhone
# Scan the QR code that appears in the terminal
```

### Option 3: Expo Development Build (Production-like Testing)
```bash
# Build a development client
npx eas build --platform ios --profile development

# Install the .ipa file on your device via TestFlight or direct installation
```

## 🔧 Pre-Testing Checklist

### 1. Install Dependencies
```bash
npm install
```

### 2. Clear Cache (if needed)
```bash
npm run clean
# or
npx expo start --clear
```

### 3. Check for TypeScript Errors
```bash
npx tsc --noEmit
```

### 4. Run Linting
```bash
npm run lint
```

## 🧪 Running Tests

### Jest Unit Tests
```bash
npm test
```

### ESLint Code Quality
```bash
npm run lint
```

## 📋 iOS-Specific Features to Test

### Core App Features
- [ ] App launches successfully
- [ ] Navigation between screens works
- [ ] Bottom tab navigation functions
- [ ] Stack navigation (push/pop) works

### Location Features
- [ ] Location permission prompts appear
- [ ] Map screen loads correctly
- [ ] Location-based features work

### UI/UX Testing
- [ ] Safe area handling (notch, home indicator)
- [ ] Dark mode support (automatic switching)
- [ ] Gesture navigation (swipes, taps)
- [ ] Keyboard handling
- [ ] Loading states and animations

### State Management
- [ ] Zustand store persists data
- [ ] AsyncStorage works correctly
- [ ] User preferences are saved

### Icon Testing
- [ ] Vector icons display correctly
- [ ] Both react-native-vector-icons and @expo/vector-icons work
- [ ] Tab bar icons show proper states

## 🐛 Common iOS Issues to Watch For

### Performance
- [ ] Smooth 60fps animations
- [ ] Fast app startup time
- [ ] Memory usage optimization

### iOS-Specific Features
- [ ] StatusBar appearance (light/dark)
- [ ] Safe area insets
- [ ] Haptic feedback (if implemented)

### Network & Storage
- [ ] API calls work correctly
- [ ] Image loading and caching
- [ ] Offline functionality

## 📊 Test Scenarios

### New User Flow
1. Launch app → Welcome screen
2. Sign up process
3. Hobby selection screen
4. Navigate to home screen
5. Explore communities
6. Use map functionality

### Existing User Flow
1. Launch app → Auto-login
2. Home screen with personalized content
3. Search functionality
4. Community details
5. Profile management

### Error Handling
1. Network disconnection
2. Invalid user input
3. API errors
4. Permission denials

## 🔍 Debugging Tools

### React Native Debugger
```bash
# Install React Native Debugger for advanced debugging
# Available at: https://github.com/jhen0409/react-native-debugger
```

### Expo Development Tools
- **Expo DevTools**: Access via browser when running `npm start`
- **Remote Debugging**: Enable in development menu
- **Performance Monitor**: Built into Expo Go

### Console Logging
```typescript
// Add console.logs in your components for debugging
console.log('Component mounted:', componentName);
console.warn('Warning message');
console.error('Error details:', error);
```

## 🚨 Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npx expo start --clear

# Reset npm cache
npm start -- --reset-cache
```

### iOS Simulator Issues
```bash
# Reset iOS simulator
# Device → Erase All Content and Settings

# Restart simulator
# Device → Restart
```

### Dependency Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for Expo compatibility
npx expo install --check
```

## 📈 Performance Testing

### Memory Usage
- Monitor in Xcode Instruments
- Check for memory leaks
- Optimize image loading

### Bundle Size
```bash
# Analyze bundle size
npx expo export --dev
```

### Startup Time
- Test cold startup
- Test warm startup
- Optimize initial load

## ✅ Ready to Test!

Your Vibemates project is fully configured for iOS testing with:
- ✅ Expo SDK 51 (latest)
- ✅ React Native 0.74.5
- ✅ All dependencies compatible
- ✅ TypeScript configured
- ✅ Navigation setup complete
- ✅ Icons and assets ready
- ✅ State management configured

Run `npm start` to begin testing! 🎉
