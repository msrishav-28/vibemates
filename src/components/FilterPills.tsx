// src/components/FilterPills.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterPress: (filter: string) => void;
  showCreateButton?: boolean;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  activeFilter,
  onFilterPress,
  showCreateButton = false,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onFilterPress(filter)}
          style={[
            styles.pill,
            activeFilter === filter && styles.activePill,
          ]}>
          <Text style={[
            styles.text,
            activeFilter === filter && styles.activeText,
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
      {showCreateButton && (
        <TouchableOpacity style={[styles.pill, styles.createPill]}>
          <Text style={styles.createText}>+ Create</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: tokens.layout.screenPadding,
    paddingVertical: tokens.spacing.sm,
  },
  pill: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.chip,
    marginRight: tokens.spacing.sm,
    backgroundColor: tokens.colors.lightGray,
  },
  activePill: {
    backgroundColor: tokens.colors.primary,
  },
  text: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.medium,
    color: tokens.colors.text.secondary,
  },
  activeText: {
    color: tokens.colors.text.inverse,
  },
  createPill: {
    backgroundColor: tokens.colors.mint,
  },
  createText: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
  },
});