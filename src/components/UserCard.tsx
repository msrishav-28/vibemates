import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface UserCardProps {
  name: string;
  location: string;
  interests: string[];
  mutualConnections?: number;
  distance?: string;
  onPress?: () => void;
  onConnect?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  location,
  interests,
  mutualConnections,
  distance,
  onPress,
  onConnect,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Icon name="person" size={24} color={tokens.colors.mediumGray} />
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={12} color={tokens.colors.darkGray} />
            <Text style={styles.location}>{location}</Text>
            {distance && <Text style={styles.distance}> • {distance}</Text>}
          </View>
          
          {mutualConnections && mutualConnections > 0 && (
            <Text style={styles.mutualConnections}>
              {mutualConnections} mutual connection{mutualConnections > 1 ? 's' : ''}
            </Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
          <Text style={styles.connectText}>Connect</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.interests}>
        {interests.slice(0, 3).map((interest, index) => (
          <View key={index} style={styles.interestChip}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
        {interests.length > 3 && (
          <Text style={styles.moreInterests}>+{interests.length - 3} more</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radii.card,
    padding: tokens.spacing.md,
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    ...tokens.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.md,
  },
  avatar: {
    width: tokens.sizes.avatar.md,
    height: tokens.sizes.avatar.md,
    borderRadius: tokens.radii.full,
    backgroundColor: tokens.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  location: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
    marginLeft: tokens.spacing.xs,
  },
  distance: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
  mutualConnections: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.primary,
    fontWeight: tokens.typography.weights.medium,
  },
  connectButton: {
    backgroundColor: tokens.colors.primary,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.button,
  },
  connectText: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.inverse,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  interestChip: {
    backgroundColor: tokens.colors.softGray,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radii.chip,
    marginRight: tokens.spacing.sm,
    marginBottom: tokens.spacing.xs,
  },
  interestText: {
    fontSize: tokens.typography.sizes.tiny,
    color: tokens.colors.text.secondary,
  },
  moreInterests: {
    fontSize: tokens.typography.sizes.tiny,
    color: tokens.colors.text.tertiary,
    fontStyle: 'italic',
  },
});
