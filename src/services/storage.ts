import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  THEME_PREFERENCE: 'theme_preference',
  LOCATION_CACHE: 'location_cache',
  SEARCH_HISTORY: 'search_history',
  FAVORITE_COMMUNITIES: 'favorite_communities',
  NOTIFICATION_SETTINGS: 'notification_settings',
} as const;

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    push: boolean;
    email: boolean;
    communityUpdates: boolean;
    nearbyUsers: boolean;
    eventReminders: boolean;
  };
  privacy: {
    showLocation: boolean;
    showOnlineStatus: boolean;
    allowMessages: boolean;
  };
  search: {
    radius: number; // in kilometers
    autoLocation: boolean;
  };
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  notifications: {
    push: true,
    email: true,
    communityUpdates: true,
    nearbyUsers: true,
    eventReminders: true,
  },
  privacy: {
    showLocation: true,
    showOnlineStatus: true,
    allowMessages: true,
  },
  search: {
    radius: 10,
    autoLocation: true,
  },
};

export const storageService = {
  // Generic storage methods
  async setItem(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing item:', error);
      throw error;
    }
  },

  async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return defaultValue || null;
      }
      return JSON.parse(value);
    } catch (error) {
      console.error('Error retrieving item:', error);
      return defaultValue || null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  // User preferences
  async getUserPreferences(): Promise<UserPreferences> {
    const preferences = await this.getItem<UserPreferences>(
      STORAGE_KEYS.USER_PREFERENCES,
      DEFAULT_PREFERENCES
    );
    return { ...DEFAULT_PREFERENCES, ...preferences };
  },

  async setUserPreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const currentPreferences = await this.getUserPreferences();
    const updatedPreferences = { ...currentPreferences, ...preferences };
    await this.setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
  },

  // Onboarding
  async isOnboardingCompleted(): Promise<boolean> {
    return await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED, false) || false;
  },

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  },

  // Theme
  async getThemePreference(): Promise<'light' | 'dark' | 'system'> {
    return await this.getItem<'light' | 'dark' | 'system'>(
      STORAGE_KEYS.THEME_PREFERENCE,
      'system'
    ) || 'system';
  },

  async setThemePreference(theme: 'light' | 'dark' | 'system'): Promise<void> {
    await this.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
  },

  // Location cache
  async cacheLocation(location: { latitude: number; longitude: number }): Promise<void> {
    await this.setItem(STORAGE_KEYS.LOCATION_CACHE, {
      ...location,
      timestamp: Date.now(),
    });
  },

  async getCachedLocation(): Promise<{ 
    latitude: number; 
    longitude: number; 
    timestamp: number 
  } | null> {
    const cached = await this.getItem<{
      latitude: number;
      longitude: number;
      timestamp: number;
    }>(STORAGE_KEYS.LOCATION_CACHE);

    // Return cached location if it's less than 1 hour old
    if (cached && Date.now() - cached.timestamp < 3600000) {
      return cached;
    }

    return null;
  },

  // Search history
  async addToSearchHistory(query: string): Promise<void> {
    const history = await this.getSearchHistory();
    const updatedHistory = [query, ...history.filter(item => item !== query)].slice(0, 10);
    await this.setItem(STORAGE_KEYS.SEARCH_HISTORY, updatedHistory);
  },

  async getSearchHistory(): Promise<string[]> {
    return await this.getItem<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []) || [];
  },

  async clearSearchHistory(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
  },

  // Favorite communities
  async addFavoriteCommunity(communityId: string): Promise<void> {
    const favorites = await this.getFavoriteCommunities();
    if (!favorites.includes(communityId)) {
      const updatedFavorites = [...favorites, communityId];
      await this.setItem(STORAGE_KEYS.FAVORITE_COMMUNITIES, updatedFavorites);
    }
  },

  async removeFavoriteCommunity(communityId: string): Promise<void> {
    const favorites = await this.getFavoriteCommunities();
    const updatedFavorites = favorites.filter(id => id !== communityId);
    await this.setItem(STORAGE_KEYS.FAVORITE_COMMUNITIES, updatedFavorites);
  },

  async getFavoriteCommunities(): Promise<string[]> {
    return await this.getItem<string[]>(STORAGE_KEYS.FAVORITE_COMMUNITIES, []) || [];
  },

  async isFavoriteCommunity(communityId: string): Promise<boolean> {
    const favorites = await this.getFavoriteCommunities();
    return favorites.includes(communityId);
  },

  // Debug and utility methods
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys]; // Convert readonly array to mutable array
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },

  async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      
      let totalSize = 0;
      items.forEach(([key, value]) => {
        totalSize += key.length + (value?.length || 0);
      });
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  },
};
