// src/navigation/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
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

// Components
import { LoadingSpinner } from '../components/LoadingSpinner';

// Services & Store
import { authService } from '../services/auth';
import { useUserStore } from '../store';
import { tokens } from '../theme/tokens';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

// Bottom Tab Navigator
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home-outline';
          
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors.inactive,
        tabBarStyle: {
          backgroundColor: tokens.colors.background,
          borderTopColor: tokens.colors.lightGray,
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: tokens.typography.sizes.tiny,
          fontWeight: tokens.typography.weights.medium,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Search" component={HomeScreen} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen
        name="Create"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="add"
              size={30}
              color={tokens.colors.text.inverse}
              style={{
                backgroundColor: tokens.colors.primary,
                borderRadius: tokens.radii.full,
                padding: 5,
                marginTop: -10,
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Map' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainNavigator = () => {
  const { isOnboarded } = useUserStore();
  
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      {!isOnboarded && (
        <MainStack.Screen name="HobbySelection" component={HobbySelectionScreen} />
      )}
      <MainStack.Screen name="Home" component={HomeTabs} />
      <MainStack.Screen
        name="CommunityDetail"
        component={CommunityDetailScreen}
        options={{
          presentation: 'modal',
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [800, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
    </MainStack.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const authenticated = await authService.initialize();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated && user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};