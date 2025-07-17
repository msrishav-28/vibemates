export interface Interest {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Community {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  memberCount: number;
  category: string;
  isJoined?: boolean;
  createdBy: string;
  createdAt: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance?: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  joinedCommunities: string[];
  isOnboarded?: boolean;  // ← ADDED THIS LINE
  location?: {
    latitude: number;
    longitude: number;
    city: string;
  };
  mutualConnections?: number;
  isConnected?: boolean;
  distance?: number;
}

export interface Post {
  id: string;
  communityId: string;
  userId: string;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  attendeeCount: number;
  maxAttendees?: number;
  category: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  isAttending?: boolean;
  distance?: number;
}

export interface Notification {
  id: string;
  type: 'event_invite' | 'community_join' | 'connection_request' | 'event_reminder' | 'community_update';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionData?: {
    entityId: string;
    entityType: 'event' | 'community' | 'user';
  };
}

export interface CreateEventForm {
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate?: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  maxAttendees?: number;
  isPrivate: boolean;
  tags: string[];
}
