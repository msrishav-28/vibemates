// src/store/index.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Community, User } from '../types';

// User Store
interface UserState {
  user: User | null;
  interests: string[];
  isOnboarded: boolean;
  setUser: (user: User | null) => void;
  setInterests: (interests: string[]) => void;
  setOnboarded: (value: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      interests: [],
      isOnboarded: false,
      setUser: (user) => set({ user }),
      setInterests: (interests) => set({ interests }),
      setOnboarded: (value) => set({ isOnboarded: value }),
      clearUser: () => set({ user: null, interests: [], isOnboarded: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Communities Store
interface CommunitiesState {
  communities: Community[];
  joinedCommunities: string[];
  setCommunities: (communities: Community[]) => void;
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;
  isJoined: (communityId: string) => boolean;
}

export const useCommunitiesStore = create<CommunitiesState>((set, get) => ({
  communities: [],
  joinedCommunities: [],
  setCommunities: (communities) => set({ communities }),
  joinCommunity: (communityId) =>
    set((state) => ({
      joinedCommunities: [...state.joinedCommunities, communityId],
    })),
  leaveCommunity: (communityId) =>
    set((state) => ({
      joinedCommunities: state.joinedCommunities.filter((id) => id !== communityId),
    })),
  isJoined: (communityId) => get().joinedCommunities.includes(communityId),
}));

// Map Store
interface MapUser {
  id: string;
  name: string;
  avatar?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  interests: string[];
  distance?: number;
}

interface MapState {
  nearbyUsers: MapUser[];
  userLocation: { latitude: number; longitude: number } | null;
  setNearbyUsers: (users: MapUser[]) => void;
  setUserLocation: (location: { latitude: number; longitude: number }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  nearbyUsers: [],
  userLocation: null,
  setNearbyUsers: (users) => set({ nearbyUsers: users }),
  setUserLocation: (location) => set({ userLocation: location }),
}));
