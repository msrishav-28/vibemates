// src/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onSearchPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'there',
  userAvatar,
  onSearchPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
        <Icon name="search-outline" size={tokens.sizes.icon.md} color={tokens.colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.layout.screenPadding,
    paddingVertical: tokens.spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: tokens.sizes.avatar.md,
    height: tokens.sizes.avatar.md,
    borderRadius: tokens.radii.full,
    marginRight: tokens.spacing.md,
    backgroundColor: tokens.colors.lightGray,
  },
  greeting: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
  userName: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
  },
  searchButton: {
    padding: tokens.spacing.sm,
  },
});