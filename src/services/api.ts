import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-endpoint.com/api';

class ApiService {
  private token: string | null = null;

  async init() {
    this.token = await AsyncStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    const contentType = response.headers.get('content-type');
    let data: any = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // If data is a string, use it as the error message; otherwise, try to use data.message
      const errorMsg = typeof data === 'string' ? data : (data && data.message) ? data.message : `API Error: ${response.status}`;
      throw new Error(errorMsg);
    }

    // If data is a string (not JSON), just return it as-is (for success cases)
    return data;
  }

  // Auth endpoints
  auth = {
    signIn: async (email: string, password: string) => {
      const response = await this.request<{ token?: string; user: any }>('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response.token) {
        await AsyncStorage.setItem('authToken', response.token);
        this.token = response.token;
      } else {
        await AsyncStorage.removeItem('authToken');
        this.token = null;
      }
      return response;
    },

    signUp: async (userData: {
      email: string;
      password: string;
      name: string;
      interests: string[];
    }) => {
      const response = await this.request<{ token?: string; user: any }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (response.token) {
        await AsyncStorage.setItem('authToken', response.token);
        this.token = response.token;
      } else {
        await AsyncStorage.removeItem('authToken');
        this.token = null;
      }
      return response;
    },

    signOut: async () => {
      await AsyncStorage.removeItem('authToken');
      this.token = null;
    },

    refreshToken: async () => {
      const response = await this.request<{ token: string }>('/auth/refresh', {
        method: 'POST',
      });
      
      await AsyncStorage.setItem('authToken', response.token);
      this.token = response.token;
      
      return response;
    },
  };

  // Community endpoints
  communities = {
    getAll: async (filters?: { category?: string; search?: string }) => {
      const params = new URLSearchParams(filters as any).toString();
      return this.request<any[]>(`/communities?${params}`);
    },

    getById: async (id: string) => {
      return this.request<any>(`/communities/${id}`);
    },

    join: async (communityId: string) => {
      return this.request(`/communities/${communityId}/join`, {
        method: 'POST',
      });
    },

    leave: async (communityId: string) => {
      return this.request(`/communities/${communityId}/leave`, {
        method: 'POST',
      });
    },

    create: async (communityData: {
      title: string;
      description: string;
      category: string;
      tags: string[];
      image?: string;
    }) => {
      return this.request('/communities', {
        method: 'POST',
        body: JSON.stringify(communityData),
      });
    },
  };

  // User endpoints
  users = {
    getNearby: async (location: { latitude: number; longitude: number }, radius = 5000) => {
      return this.request<any[]>(`/users/nearby`, {
        method: 'POST',
        body: JSON.stringify({ location, radius }),
      });
    },

    getProfile: async (userId?: string) => {
      const endpoint = userId ? `/users/${userId}` : '/users/me';
      return this.request<any>(endpoint);
    },

    updateProfile: async (updates: any) => {
      return this.request('/users/me', {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },

    uploadAvatar: async (imageUri: string) => {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);

      return this.request('/users/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    },
  };

  // Comments endpoints
  comments = {
    getForCommunity: async (communityId: string) => {
      return this.request<any[]>(`/communities/${communityId}/comments`);
    },

    create: async (communityId: string, text: string) => {
      return this.request(`/communities/${communityId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
    },

    like: async (commentId: string) => {
      return this.request(`/comments/${commentId}/like`, {
        method: 'POST',
      });
    },

    delete: async (commentId: string) => {
      return this.request(`/comments/${commentId}`, {
        method: 'DELETE',
      });
    },
  };
}

export const api = new ApiService();
