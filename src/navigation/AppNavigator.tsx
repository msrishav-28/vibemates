// src/navigation/AppNavigator.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Auth Screens
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';

// Main Screens
import { HobbySelectionScreen } from '../screens/HobbySelectionScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CommunityDetailScreen } from '../screens/CommunityDetailScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreateScreen } from '../screens/CreateScreen';

// Components
import { LoadingSpinner } from '../components/LoadingSpinner';

// Services & Store
import { authService } from '../services/auth';
import { useUserStore } from '../store';
import { tokens } from '../theme/tokens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = 'home-outline';
        if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Map') iconName = focused ? 'map' : 'map-outline';
        else if (route.name === 'Create') iconName = 'add-circle-outline';
        else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: tokens.colors.primary,
      tabBarInactiveTintColor: tokens.colors.inactive,
      headerShown: false,
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Create" component={CreateScreen} />
    <Tab.Screen name="Search" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const MainStack = () => {
  const { isOnboarded } = useUserStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded ? (
        <Stack.Screen name="HobbySelection" component={HobbySelectionScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} options={{ presentation: 'modal' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, isLoading, checkUser } = useUserStore(state => ({
    user: state.user,
    isLoading: state.isLoading,
    checkUser: state.checkUser,
  }));

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading" />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};