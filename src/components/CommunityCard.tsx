// src/components/CommunityCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface CommunityCardProps {
  image: string;
  title: string;
  tags: string[];
  memberCount: number;
  onPress: () => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  image,
  title,
  tags,
  memberCount,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.badge}>
          <Icon name="people-outline" size={14} color={tokens.colors.text.inverse} />
          <Text style={styles.badgeText}>{memberCount}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.tags}>
          {tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: tokens.spacing.md,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: tokens.radii.button,
    backgroundColor: tokens.colors.lightGray,
  },
  badge: {
    position: 'absolute',
    top: tokens.spacing.sm,
    right: tokens.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radii.chip,
  },
  badgeText: {
    color: tokens.colors.text.inverse,
    fontSize: tokens.typography.sizes.tiny,
    fontWeight: tokens.typography.weights.semibold,
    marginLeft: tokens.spacing.xxs,
  },
  content: {
    marginTop: tokens.spacing.sm,
  },
  title: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
  },
  tags: {
    flexDirection: 'row',
    marginTop: tokens.spacing.xs,
  },
  tag: {
    fontSize: tokens.typography.sizes.tiny,
    color: tokens.colors.text.tertiary,
    marginRight: tokens.spacing.sm,
  },
});