// src/data/mockData.ts
export const MOCK_COMMUNITIES = [
  {
    id: '1',
    title: 'Sunday Running Club',
    description: 'Join our Sunday morning running group! We meet every Sunday at 7 AM for a refreshing run through Mission District. All levels welcome - from beginners to marathon runners.',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800',
    tags: ['sunday', 'sport', 'running', 'team', 'marathon'],
    memberCount: 124,
    category: 'Sport',
    createdBy: 'user1',
    createdAt: new Date('2024-01-15'),
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: 'Mission District, San Francisco, CA'
    },
  },
  {
    id: '2',
    title: 'Yoga & Meditation',
    description: 'Find your inner peace with our weekend yoga sessions. We practice various styles including Hatha, Vinyasa, and Yin yoga.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    tags: ['weekend', 'sport', 'yoga', 'team', 'meditation'],
    memberCount: 89,
    category: 'Sport',
    createdBy: 'user2',
    createdAt: new Date('2024-02-01'),
    location: {
      latitude: 37.7849,
      longitude: -122.4094,
      address: 'Castro District, San Francisco, CA'
    },
  },
  {
    id: '3',
    title: 'Healthy Cooking Club',
    description: 'Learn to cook delicious and nutritious meals! We share recipes, cooking tips, and host weekly cooking workshops.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    tags: ['monday', 'chef', 'vegan', 'healthy'],
    memberCount: 156,
    category: 'Cooking',
    createdBy: 'user3',
    createdAt: new Date('2024-01-20'),
    location: {
      latitude: 37.7649,
      longitude: -122.4394,
      address: 'Richmond District, San Francisco, CA'
    },
  },
  {
    id: '4',
    title: 'Cheese Tasting Society',
    description: 'Explore the world of artisanal cheeses! Monthly tastings, pairing workshops, and visits to local cheese makers.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
    tags: ['cheese', 'tasting', 'workshop', 'foodie'],
    memberCount: 78,
    category: 'Cooking',
    createdBy: 'user4',
    createdAt: new Date('2024-02-10'),
    location: {
      latitude: 37.7549,
      longitude: -122.4494,
      address: 'Sunset District, San Francisco, CA'
    },
  },
  {
    id: '5',
    title: 'Urban Cycling Adventures',
    description: 'Discover the city on two wheels! Weekend rides, bike maintenance workshops, and cycling advocacy.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    tags: ['cycling', 'adventure', 'weekend', 'fitness'],
    memberCount: 234,
    category: 'Sport',
    createdBy: 'user5',
    createdAt: new Date('2024-01-05'),
    location: {
      latitude: 37.7949,
      longitude: -122.3994,
      address: 'SOMA District, San Francisco, CA'
    },
  },
  {
    id: '6',
    title: 'Photography Walks',
    description: 'Capture the beauty of our city! Weekly photo walks, technique workshops, and monthly photo challenges.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    tags: ['photography', 'art', 'creative', 'outdoor'],
    memberCount: 167,
    category: 'Art',
    createdBy: 'user6',
    createdAt: new Date('2024-02-15'),
    location: {
      latitude: 37.8049,
      longitude: -122.4294,
      address: 'North Beach, San Francisco, CA'
    },
  },
];

export const MOCK_NEARBY_USERS = [
  {
    id: 'user1',
    name: 'Nolan Bator',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    interests: ['Running', 'Cycling', 'Photography'],
    distance: 550,
  },
  {
    id: 'user2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    location: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
    interests: ['Yoga', 'Cooking', 'Art'],
    distance: 1200,
  },
  {
    id: 'user3',
    name: 'Michael Torres',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    location: {
      latitude: 37.7649,
      longitude: -122.4294,
    },
    interests: ['Music', 'Running', 'Travel'],
    distance: 2100,
  },
  {
    id: 'user4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    location: {
      latitude: 37.7949,
      longitude: -122.4094,
    },
    interests: ['Reading', 'Writing', 'Yoga'],
    distance: 1800,
  },
  {
    id: 'user5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    location: {
      latitude: 37.7549,
      longitude: -122.4394,
    },
    interests: ['Photography', 'Traveling', 'Cooking'],
    distance: 3200,
  },
];

export const MOCK_COMMENTS = [
  {
    id: 'comment1',
    userId: 'user1',
    userName: 'Nolan Bator',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    text: "I'll come for a run. Cool idea! 😊",
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    likes: 5,
  },
  {
    id: 'comment2',
    userId: 'user2',
    userName: 'Lindsey Saris',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    text: 'I will also be running on Sunday. We can organize races for children.',
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    likes: 12,
  },
  {
    id: 'comment3',
    userId: 'user3',
    userName: 'Alex Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    text: 'What time exactly? I might join if it works with my schedule.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 3,
  },
];
