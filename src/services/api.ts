import AsyncStorage from '@react-native-async-storage/async-storage';

// Fake API that always works - no backend needed!
class ApiService {
  private token: string | null = null;
  private fakeUser: any = null;

  async init() {
    this.token = await AsyncStorage.getItem('authToken');
  }

  // Fake API endpoints that always succeed
  auth = {
    signIn: async (email: string, password: string) => {
      // Always succeed with fake data
      this.fakeUser = {
        id: 'user123',
        name: email.split('@')[0],
        email: email,
        interests: [],
        isOnboarded: false,
      };
      this.token = 'fake_token_123';
      await AsyncStorage.setItem('authToken', this.token);
      
      return { token: this.token, user: this.fakeUser };
    },

    signUp: async (userData: any) => {
      // Always succeed with fake data
      this.fakeUser = {
        id: 'user123',
        name: userData.name,
        email: userData.email,
        interests: [],
        isOnboarded: false,
      };
      this.token = 'fake_token_123';
      await AsyncStorage.setItem('authToken', this.token);
      
      return { token: this.token, user: this.fakeUser };
    },

    signOut: async () => {
      await AsyncStorage.removeItem('authToken');
      this.token = null;
      this.fakeUser = null;
    },

    refreshToken: async () => {
      return { token: 'fake_token_123' };
    },
  };

  // Community endpoints
  communities = {
    getAll: async () => {
      // Return mock communities
      return [
        {
          id: '1',
          title: 'Photography Club',
          description: 'Local photography enthusiasts',
          memberCount: 156,
          tags: ['photography', 'art'],
          category: 'Art',
          image: 'https://picsum.photos/300/200?random=1',
        },
        {
          id: '2',
          title: 'Morning Runners',
          description: 'Early morning running group',
          memberCount: 89,
          tags: ['running', 'fitness'],
          category: 'Sport',
          image: 'https://picsum.photos/300/200?random=2',
        },
      ];
    },

    getById: async (id: string) => {
      return {
        id: id,
        title: 'Photography Club',
        description: 'Local photography enthusiasts',
        memberCount: 156,
        tags: ['photography', 'art'],
        category: 'Art',
        image: 'https://picsum.photos/300/200?random=1',
      };
    },

    join: async (communityId: string) => {
      return { success: true };
    },

    leave: async (communityId: string) => {
      return { success: true };
    },

    create: async (communityData: any) => {
      return { ...communityData, id: 'new123', memberCount: 1 };
    },
  };

  // User endpoints
  users = {
    getNearby: async () => {
      return [];
    },

    getProfile: async (userId?: string) => {
      return this.fakeUser || {
        id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        interests: ['Photography', 'Hiking'],
        isOnboarded: true,
      };
    },

    updateProfile: async (updates: any) => {
      // Update the fake user
      this.fakeUser = { ...this.fakeUser, ...updates };
      return this.fakeUser;
    },

    uploadAvatar: async (imageUri: string) => {
      return { avatarUrl: 'https://picsum.photos/100/100' };
    },
  };

  // Comments endpoints
  comments = {
    getForCommunity: async (communityId: string) => {
      return [];
    },

    create: async (communityId: string, text: string) => {
      return { id: 'comment123', text };
    },

    like: async (commentId: string) => {
      return { success: true };
    },

    delete: async (commentId: string) => {
      return { success: true };
    },
  };

  // Fake request method (not used but kept for compatibility)
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return {} as T;
  }
}

export const api = new ApiService();