import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface EventCardProps {
  title: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  distance?: string;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  time,
  location,
  attendees,
  category,
  distance,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {distance && (
          <View style={styles.distanceContainer}>
            <Icon name="location-outline" size={12} color={tokens.colors.darkGray} />
            <Text style={styles.distance}>{distance}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.details}>
        <View style={styles.timeLocation}>
          <Icon name="time-outline" size={14} color={tokens.colors.darkGray} />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        
        <View style={styles.timeLocation}>
          <Icon name="location-outline" size={14} color={tokens.colors.darkGray} />
          <Text style={styles.detailText}>{location}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.attendees}>{attendees} attending</Text>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.sm,
  },
  title: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    flex: 1,
    marginRight: tokens.spacing.sm,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.darkGray,
    marginLeft: tokens.spacing.xs,
  },
  details: {
    marginBottom: tokens.spacing.sm,
  },
  timeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  detailText: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
    marginLeft: tokens.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.primary,
    fontWeight: tokens.typography.weights.medium,
  },
  attendees: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
});
