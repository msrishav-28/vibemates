// src/services/auth.ts
import { api } from './api';
import { useUserStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // The initialize function now lives in the Zustand store as `checkUser`
  // to better manage the loading and user state.

  async signIn(email: string, password: string) {
    const response = await api.auth.signIn(email, password);
    useUserStore.getState().setUser(response.user);
    if (!response.user.isOnboarded) {
      useUserStore.getState().setOnboarded(false);
    }
    return response;
  },

  async signUp(userData: any) {
    const response = await api.auth.signUp(userData);
    useUserStore.getState().setUser(response.user);
    // Onboarding status is handled by the HobbySelectionScreen
    return response;
  },

  async signOut() {
    await api.auth.signOut();
    useUserStore.getState().clearUser();
  },
};