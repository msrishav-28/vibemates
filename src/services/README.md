# Services Documentation

This directory contains all the service layers for the Social Hobby App. Services handle API communication, data persistence, device features, and external integrations.

## 📁 Service Files

### Core Services

#### `api.ts` - Main API Service
- **Purpose**: Handles all HTTP requests to the backend API
- **Features**: Authentication, communities, users, comments
- **Authentication**: JWT token-based with automatic refresh
- **Usage**: 
  ```typescript
  import { api } from '@/services';
  const communities = await api.communities.getAll();
  ```

#### `auth.ts` - Authentication Service
- **Purpose**: Manages user authentication state
- **Features**: Sign in/up, token management, user session
- **Integration**: Works with Zustand store for state management
- **Usage**:
  ```typescript
  import { authService } from '@/services';
  await authService.signIn(email, password);
  ```

#### `storage.ts` - Local Storage Service
- **Purpose**: Handles local data persistence using AsyncStorage
- **Features**: User preferences, caching, favorites, search history
- **Data Types**: Preferences, onboarding status, theme settings
- **Usage**:
  ```typescript
  import { storageService } from '@/services';
  const preferences = await storageService.getUserPreferences();
  ```

### Device & Feature Services

#### `location.ts` - Location Service
- **Purpose**: Handles GPS location and geolocation features
- **Features**: Current location, distance calculation, geocoding
- **Permissions**: Manages location permissions
- **Dependencies**: `expo-location`
- **Usage**:
  ```typescript
  import { locationService } from '@/services';
  const location = await locationService.getCurrentLocation();
  ```

#### `image.ts` - Image Service
- **Purpose**: Handles photo capture, selection, and manipulation
- **Features**: Camera, photo library, image resizing, thumbnails
- **Permissions**: Camera and photo library access
- **Dependencies**: `expo-image-picker`, `expo-image-manipulator`
- **Usage**:
  ```typescript
  import { imageService } from '@/services';
  const image = await imageService.showImagePicker();
  ```

#### `notifications.ts` - Push Notifications Service
- **Purpose**: Manages push notifications and local notifications
- **Features**: FCM integration, background messaging, scheduling
- **Dependencies**: `@react-native-firebase/messaging`, `@notifee/react-native`
- **Usage**:
  ```typescript
  import { notificationService } from '@/services';
  await notificationService.initialize();
  ```

### Alternative & Mock Services

#### `firebase.ts` - Firebase Service
- **Purpose**: Alternative backend using Firebase/Firestore
- **Features**: Auth, Firestore database, Cloud Storage
- **Status**: Optional - requires Firebase setup
- **Dependencies**: `@react-native-firebase/*` packages

#### `mockData.ts` - Mock API Service
- **Purpose**: Development and testing with mock data
- **Features**: Complete API simulation with delays
- **Usage**: Fallback when real API is unavailable
- **Data**: Mock communities, users, events

## 🚀 Quick Start

### 1. Initialize Services
```typescript
import { initializeServices } from '@/services';

const { isAuthenticated } = await initializeServices();
```

### 2. Use Individual Services
```typescript
// API calls
import { api } from '@/services';
const communities = await api.communities.getAll();

// Location
import { locationService } from '@/services';
const location = await locationService.getCurrentLocation();

// Storage
import { storageService } from '@/services';
await storageService.setUserPreferences({ theme: 'dark' });
```

### 3. Mock Development
```typescript
// Switch to mock API for development
import { mockApiService } from '@/services/mockData';
const communities = await mockApiService.communities.getAll();
```

## 📦 Required Dependencies

### Core Dependencies (Already Installed)
- `@react-native-async-storage/async-storage` - Local storage
- `expo-location` - Location services

### Optional Dependencies (Install as needed)
```bash
# Image handling
npm install expo-image-picker expo-image-manipulator

# Firebase
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage

# Push notifications
npm install @react-native-firebase/messaging @notifee/react-native
```

## 🔧 Configuration

### API Configuration
Update the API base URL in `api.ts`:
```typescript
const API_BASE_URL = 'https://your-actual-api.com/api';
```

### Firebase Configuration
1. Install Firebase packages
2. Add Firebase config files (iOS/Android)
3. Uncomment Firebase service imports
4. Follow Firebase setup guides

### Notification Setup
1. Install notification packages
2. Configure Firebase Messaging
3. Set up Notifee for local notifications
4. Add notification permissions to iOS Info.plist

## 🔐 Security

### API Security
- JWT tokens stored securely in AsyncStorage
- Automatic token refresh
- Request/response interceptors for auth

### Permissions
- Location: Properly requested with user-friendly messages
- Camera/Photos: Graceful permission handling
- Notifications: Optional with user preferences

## 🧪 Testing

### Mock Data
- Complete mock API for development
- Realistic delays and responses
- Error simulation capabilities

### Development Mode
- Switch between real and mock APIs
- Console logging for debugging
- Error boundaries for service failures

## 📱 Platform Support

### iOS
- Native location services
- Camera/photo library integration
- Push notifications via APNs
- Proper permission handling

### Android
- Location services with permission flow
- Camera/gallery access
- FCM push notifications
- Background processing

### Web (Expo)
- Limited native features
- Web-compatible alternatives
- Graceful feature detection

## 🔄 Service Integration

### State Management
- Services integrate with Zustand store
- Automatic state updates on auth changes
- Persistent user preferences

### Error Handling
- Consistent error responses
- User-friendly error messages
- Fallback mechanisms

### Performance
- Request caching where appropriate
- Background data refresh
- Optimized image handling

## 📈 Future Enhancements

### Planned Features
- Offline data synchronization
- Advanced caching strategies
- Real-time features (WebSocket)
- Social media integrations
- Analytics service
- Crash reporting

### Scalability
- Service worker integration
- CDN for image uploads
- Database optimization
- API rate limiting
- Monitoring and logging
