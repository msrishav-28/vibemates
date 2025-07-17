# Vibemates

A React Native iOS application built with Expo that connects people with shared hobbies and interests. Users can discover local communities, join hobby groups, and meet like-minded individuals who share their vibe.

## Features

- **Hobby Selection**: Choose from various interests and hobbies during onboarding
- **Community Discovery**: Find local hobby groups and communities
- **Interactive Map**: View nearby users and communities on a map
- **Community Details**: Explore community information, members, and join discussions
- **State Management**: Zustand for global state with persistence
- **Beautiful UI**: Modern design with smooth animations and intuitive navigation

## Tech Stack

- **Framework**: React Native with Expo SDK 51 (iOS focused)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: Zustand with AsyncStorage persistence
- **Maps**: React Native Maps with location services
- **Icons**: React Native Vector Icons
- **Testing**: Jest with Expo preset
- **Styling**: StyleSheet with design tokens
- **TypeScript**: Full TypeScript support with path aliases
- **Performance**: Optimized Metro bundler configuration

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── CommunityCard.tsx
│   ├── FilterPills.tsx
│   ├── Header.tsx
│   └── InterestButton.tsx
├── constants/          # App constants and configuration
│   └── interests.ts
├── data/              # Mock data and static content
│   └── mockData.ts
├── navigation/        # Navigation configuration
│   └── AppNavigator.tsx
├── screens/          # Screen components
│   ├── CommunityDetailScreen.tsx
│   ├── HobbySelectionScreen.tsx
│   ├── HomeScreen.tsx
│   └── MapScreen.tsx
├── services/         # API services and utilities
│   └── mockData.ts
├── store/           # Zustand state management
│   └── index.ts
├── theme/           # Design system
│   └── tokens.ts
└── types/           # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (Xcode) or physical iOS device
- Expo Go app (for testing on device)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vibemates
```

2. Install dependencies:
```bash
npm install
```

### Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Run on iOS:
```bash
npm run ios
```

Or scan the QR code with your iOS device using the Expo Go app.

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open the Expo Go app on your phone and scan the QR code

### Running on Simulators

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For Web:
```bash
npm run web
```

## Design System

The app uses a comprehensive design system with:

- **Colors**: Brand colors, semantic colors, and category-specific pastels
- **Typography**: Consistent font sizes, weights, and line heights
- **Spacing**: Standardized spacing scale
- **Shadows**: Elevation system for depth
- **Radii**: Consistent border radius values

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.