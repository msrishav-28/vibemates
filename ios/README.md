# iOS Setup for HobbyApp

This directory contains the iOS-specific configuration and native code for the HobbyApp React Native application.

## Files Overview

### Core Configuration
- **Info.plist**: Contains app permissions, bundle information, and configuration
- **Podfile**: CocoaPods dependency management for iOS native libraries
- **AppDelegate.h/.mm**: Main application entry point and setup
- **main.m**: Application bootstrap file

### Xcode Project
- **HobbyApp.xcodeproj/**: Xcode project configuration
- **Images.xcassets/**: App icons and image assets
- **LaunchScreen.storyboard**: Launch screen configuration

### Permissions Configured
- **Location**: For finding nearby hobbyists and communities
- **Camera**: For taking profile photos
- **Photo Library**: For selecting profile photos from gallery

### Dependencies
- **react-native-maps**: Map functionality with Google Maps integration
- **react-native-vector-icons**: Icon support
- **expo-location**: Location services

## Setup Instructions

1. **Install CocoaPods dependencies:**
   ```bash
   cd ios
   pod install
   ```

2. **Build and run on iOS:**
   ```bash
   npm run ios
   ```

3. **For release build:**
   ```bash
   npm run build:ios
   ```

## Development Notes

- Minimum iOS version: 13.4
- Bundle identifier: `com.hobbyapp.social`
- The app supports both iPhone and iPad (universal)
- Uses React Native's New Architecture (Fabric/TurboModules) when enabled

## Troubleshooting

1. **Clean build issues:**
   ```bash
   npm run clean:ios
   npm run pod-install
   ```

2. **Reset Metro cache:**
   ```bash
   npm run reset-cache
   ```

3. **Full clean and rebuild:**
   ```bash
   npm run clean
   ```
