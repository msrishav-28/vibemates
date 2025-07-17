import { Community, Event, User } from '../types';

// Mock API service for development and testing
// This file provides mock data and can be used as a fallback when the real API is not available

// Mock data for the app
export const mockCommunities: Community[] = [
  {
    id: '1',
    title: 'Local Photographers',
    description: 'A community for photography enthusiasts to share tips, organize photo walks, and showcase their work.',
    memberCount: 234,
    category: 'Art',
    tags: ['Photography', 'Art', 'Nature'],
    image: 'https://picsum.photos/300/200?random=1',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Downtown LA, CA',
    },
    distance: 1200,
    isJoined: false,
    createdBy: 'user1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Weekend Hikers',
    description: 'Join us for weekend hiking adventures around Los Angeles. All skill levels welcome!',
    memberCount: 156,
    category: 'Sport',
    tags: ['Hiking', 'Outdoors', 'Fitness'],
    image: 'https://picsum.photos/300/200?random=2',
    location: {
      latitude: 34.0822,
      longitude: -118.2637,
      address: 'Hollywood Hills, CA',
    },
    distance: 800,
    isJoined: true,
    createdBy: 'user2',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    title: 'Coffee & Code',
    description: 'Weekly meetup for developers to work on projects, share knowledge, and network.',
    memberCount: 89,
    category: 'Technology',
    tags: ['Programming', 'Networking', 'Coffee'],
    image: 'https://picsum.photos/300/200?random=3',
    location: {
      latitude: 34.0422,
      longitude: -118.2537,
      address: 'Santa Monica, CA',
    },
    distance: 2500,
    isJoined: false,
    createdBy: 'user3',
    createdAt: new Date('2024-01-20'),
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Photography Workshop',
    description: 'Learn advanced photography techniques and editing skills.',
    startDate: new Date(2025, 7, 17, 14, 0), // Today 2:00 PM
    endDate: new Date(2025, 7, 17, 17, 0),   // Today 5:00 PM
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Central Park, Downtown LA',
    },
    attendeeCount: 24,
    maxAttendees: 30,
    category: 'Photography',
    organizer: {
      id: 'user1',
      name: 'Sarah Johnson',
    },
    isAttending: false,
    distance: 1200,
  },
  {
    id: '2',
    title: 'Morning Hike',
    description: 'Early morning hike to catch the sunrise at Griffith Observatory.',
    startDate: new Date(2025, 7, 18, 7, 0),  // Tomorrow 7:00 AM
    endDate: new Date(2025, 7, 18, 10, 0),   // Tomorrow 10:00 AM
    location: {
      latitude: 34.1184,
      longitude: -118.3004,
      address: 'Griffith Observatory, Los Angeles',
    },
    attendeeCount: 12,
    maxAttendees: 20,
    category: 'Hiking',
    organizer: {
      id: 'user2',
      name: 'Mike Chen',
    },
    isAttending: true,
    distance: 3500,
  },
  {
    id: '3',
    title: 'Code Review Session',
    description: 'Collaborative code review and pair programming session.',
    startDate: new Date(2025, 7, 19, 19, 0), // Day after tomorrow 7:00 PM
    location: {
      latitude: 34.0422,
      longitude: -118.2537,
      address: 'Coffee & Code Hub, Santa Monica',
    },
    attendeeCount: 8,
    maxAttendees: 15,
    category: 'Programming',
    organizer: {
      id: 'user3',
      name: 'Alex Rivera',
    },
    isAttending: false,
    distance: 2500,
  },
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    bio: 'Passionate photographer and nature lover. Always looking for the perfect shot!',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      city: 'Downtown LA',
    },
    interests: ['Photography', 'Art', 'Coffee', 'Travel'],
    joinedCommunities: ['1'],
  },
  {
    id: 'user2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    bio: 'Fitness enthusiast and hiking guide. Love exploring new trails!',
    location: {
      latitude: 34.0822,
      longitude: -118.2637,
      city: 'Hollywood Hills',
    },
    interests: ['Hiking', 'Fitness', 'Cooking', 'Photography'],
    joinedCommunities: ['2'],
  },
  {
    id: 'user3',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    bio: 'Full-stack developer and tech enthusiast. Building the future, one line of code at a time.',
    location: {
      latitude: 34.0422,
      longitude: -118.2537,
      city: 'Santa Monica',
    },
    interests: ['Programming', 'Technology', 'Gaming', 'Coffee'],
    joinedCommunities: ['3'],
  },
];

// Helper functions to simulate API calls
export const getCommunities = async (searchQuery?: string): Promise<Community[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchQuery) return mockCommunities;
  
  return mockCommunities.filter(community =>
    community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};

export const getEvents = async (searchQuery?: string): Promise<Event[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchQuery) return mockEvents;
  
  return mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const getUsers = async (searchQuery?: string): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchQuery) return mockUsers;
  
  return mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};

export const getCommunityById = async (id: string): Promise<Community | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCommunities.find(community => community.id === id) || null;
};

export const getEventById = async (id: string): Promise<Event | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEvents.find(event => event.id === id) || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockUsers.find(user => user.id === id) || null;
};

// Mock API Service
// This can be used as a fallback when the real API is not available
export const mockApiService = {
  // Auth endpoints
  auth: {
    signIn: async (email: string, password: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email === 'demo@hobbyapp.com' && password === 'demo123') {
        const token = 'mock_token_' + Date.now();
        const user = mockUsers[0]; // Return first user as logged in user
        
        return { token, user };
      } else {
        throw new Error('Invalid credentials');
      }
    },

    signUp: async (userData: {
      email: string;
      password: string;
      name: string;
      interests: string[];
    }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: 'https://picsum.photos/100/100?random=' + Date.now(),
        interests: userData.interests,
        location: {
          latitude: 34.0522,
          longitude: -118.2437,
          address: 'Los Angeles, CA',
        },
        distance: 0,
        isOnline: true,
        joinedAt: new Date(),
      };
      
      mockUsers.push(newUser);
      const token = 'mock_token_' + Date.now();
      
      return { token, user: newUser };
    },

    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Mock sign out
      return true;
    },

    refreshToken: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { token: 'mock_token_' + Date.now() };
    },
  },

  // Community endpoints
  communities: {
    getAll: async (filters?: { category?: string; search?: string }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filtered = [...mockCommunities];
      
      if (filters?.category) {
        filtered = filtered.filter(c => c.category === filters.category);
      }
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return filtered;
    },

    getById: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return getCommunityById(id);
    },

    join: async (communityId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const community = mockCommunities.find(c => c.id === communityId);
      if (community) {
        community.isJoined = true;
        community.memberCount += 1;
      }
      
      return { success: true };
    },

    leave: async (communityId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const community = mockCommunities.find(c => c.id === communityId);
      if (community) {
        community.isJoined = false;
        community.memberCount = Math.max(0, community.memberCount - 1);
      }
      
      return { success: true };
    },

    create: async (communityData: {
      title: string;
      description: string;
      category: string;
      tags: string[];
      image?: string;
    }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCommunity: Community = {
        id: 'community_' + Date.now(),
        title: communityData.title,
        description: communityData.description,
        category: communityData.category,
        tags: communityData.tags,
        image: communityData.image || `https://picsum.photos/300/200?random=${Date.now()}`,
        memberCount: 1,
        location: {
          latitude: 34.0522 + (Math.random() - 0.5) * 0.1,
          longitude: -118.2437 + (Math.random() - 0.5) * 0.1,
          address: 'Los Angeles, CA',
        },
        distance: Math.floor(Math.random() * 5000),
        isJoined: true,
        createdBy: 'current_user',
        createdAt: new Date(),
      };
      
      mockCommunities.unshift(newCommunity);
      return newCommunity;
    },
  },

  // User endpoints
  users: {
    getNearby: async (location: { latitude: number; longitude: number }, radius = 5000) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock filtering by distance
      return mockUsers.filter(user => user.distance && user.distance <= radius);
    },

    getProfile: async (userId?: string) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      if (userId) {
        return getUserById(userId);
      } else {
        // Return current user profile
        return mockUsers[0];
      }
    },

    updateProfile: async (updates: any) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock update logic
      const user = mockUsers[0];
      Object.assign(user, updates);
      
      return user;
    },

    uploadAvatar: async (imageUri: string) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock upload - return a new avatar URL
      const avatarUrl = `https://picsum.photos/100/100?random=${Date.now()}`;
      
      return { avatarUrl };
    },
  },

  // Comments endpoints
  comments: {
    getForCommunity: async (communityId: string) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Mock comments
      return [
        {
          id: 'comment_1',
          text: 'Great community! Looking forward to participating.',
          authorId: 'user_1',
          authorName: 'Alex Johnson',
          authorAvatar: 'https://picsum.photos/50/50?random=1',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          likes: 5,
          isLiked: false,
        },
        {
          id: 'comment_2',
          text: 'When is the next meetup?',
          authorId: 'user_2',
          authorName: 'Sarah Chen',
          authorAvatar: 'https://picsum.photos/50/50?random=2',
          createdAt: new Date(Date.now() - 43200000), // 12 hours ago
          likes: 2,
          isLiked: true,
        },
      ];
    },

    create: async (communityId: string, text: string) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const newComment = {
        id: 'comment_' + Date.now(),
        text,
        authorId: 'current_user',
        authorName: 'You',
        authorAvatar: 'https://picsum.photos/50/50?random=0',
        createdAt: new Date(),
        likes: 0,
        isLiked: false,
      };
      
      return newComment;
    },

    like: async (commentId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, liked: true };
    },

    delete: async (commentId: string) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { success: true };
    },
  },
};
