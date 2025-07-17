import { api } from './api';
import { useUserStore } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async initialize() {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      try {
        await api.init();
        const user = await api.users.getProfile();
        useUserStore.getState().setUser(user);
        return true;
      } catch (error) {
        await AsyncStorage.removeItem('authToken');
        return false;
      }
    }
    return false;
  },

  async signIn(email: string, password: string) {
    const response = await api.auth.signIn(email, password);
    useUserStore.getState().setUser(response.user);
    return response;
  },

  async signUp(userData: any) {
    const response = await api.auth.signUp(userData);
    useUserStore.getState().setUser(response.user);
    useUserStore.getState().setInterests(userData.interests);
    useUserStore.getState().setOnboarded(true);
    return response;
  },

  async signOut() {
    await api.auth.signOut();
    useUserStore.getState().clearUser();
  },
};
