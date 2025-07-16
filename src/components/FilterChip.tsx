import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.chip,
    backgroundColor: tokens.colors.softGray,
    marginRight: tokens.spacing.sm,
  },
  selected: {
    backgroundColor: tokens.colors.primary,
  },
  label: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.medium,
    color: tokens.colors.text.secondary,
  },
  selectedLabel: {
    color: tokens.colors.text.inverse,
  },
});
