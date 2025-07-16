import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface TabBarProps {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarAccessibilityLabel?: string;
        tabBarTestID?: string;
      };
    };
  };
  navigation: {
    emit: (options: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const getIconName = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'Home':
        return focused ? 'home' : 'home-outline';
      case 'Search':
        return focused ? 'search' : 'search-outline';
      case 'Create':
        return focused ? 'add-circle' : 'add-circle-outline';
      case 'Map':
        return focused ? 'map' : 'map-outline';
      case 'Profile':
        return focused ? 'person' : 'person-outline';
      default:
        return 'help-outline';
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Icon
              name={getIconName(route.name, isFocused)}
              size={24}
              color={isFocused ? tokens.colors.primary : tokens.colors.inactive}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.background,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.lightGray,
    paddingVertical: tokens.spacing.sm,
    paddingBottom: tokens.spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: tokens.spacing.xs,
  },
});
