// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { HobbySelectionScreen } from '../screens/HobbySelectionScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { CommunityDetailScreen } from '../screens/CommunityDetailScreen';
import { MapScreen } from '../screens/MapScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { tokens } from '../theme/tokens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
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
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
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

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}>
        <Stack.Screen name="HobbySelection" component={HobbySelectionScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};