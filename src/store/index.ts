import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api'; // Make sure this path is correct
import { User } from '../types'; // Make sure this path is correct

// This interface MUST include isLoading and checkUser
interface UserState {
  user: User | null;
  interests: string[];
  isOnboarded: boolean;
  isLoading: boolean; // This was missing
  setUser: (user: User | null) => void;
  setInterests: (interests: string[]) => void;
  setOnboarded: (value: boolean) => void;
  checkUser: () => Promise<void>; // This was missing
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      interests: [],
      isOnboarded: false,
      isLoading: true, // Define the initial state
      setUser: (user) => set({ user, isLoading: false }),
      setInterests: (interests) => set({ interests }),
      setOnboarded: (value) => set({ isOnboarded: value }),
      // Define the implementation for checkUser
      checkUser: async () => {
        set({ isLoading: true });
        try {
          // This logic checks the token and fetches the user profile
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            await api.init(); // Assuming you have an init function for your API client
            const user = await api.users.getProfile();
            set({ user, isOnboarded: user.isOnboarded || false, isLoading: false });
          } else {
            set({ user: null, isLoading: false });
          }
        } catch (error) {
          console.error("Failed to check user:", error);
          await AsyncStorage.removeItem('authToken'); // Clear bad token
          set({ user: null, isLoading: false });
        }
      },
      clearUser: () => set({ user: null, interests: [], isOnboarded: false, isLoading: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, interests: state.interests, isOnboarded: state.isOnboarded }),
    }
  )
);