// Main API service
export { api } from './api';

// Authentication service
export { authService } from './auth';

// Storage service
export { storageService } from './storage';
export type { UserPreferences } from './storage';

// Location service
export { locationService } from './location';
export type { LocationData } from './location';

// Image service
export { imageService } from './image';
export type { ImagePickerResult, ImageUploadOptions } from './image';

// Notification service
export { notificationService } from './notifications';

// Firebase service (optional)
export { firebaseService } from './firebase';

// Import services for internal use
import { api } from './api';
import { authService } from './auth';
import { notificationService } from './notifications';
import { locationService } from './location';
import { imageService } from './image';

// Service initialization
export const initializeServices = async () => {
  try {
    // Initialize API service
    await api.init();
    
    // Initialize auth service
    const isAuthenticated = await authService.initialize();
    
    // Initialize notification service
    await notificationService.initialize();
    
    console.log('Services initialized successfully');
    return { isAuthenticated };
  } catch (error) {
    console.error('Error initializing services:', error);
    return { isAuthenticated: false };
  }
};

// Export utility functions
export const utils = {
  formatDistance: locationService.formatDistance,
  formatFileSize: imageService.formatFileSize,
  calculateDistance: locationService.calculateDistance,
};
