import { Community, Event, User } from '../types';

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
