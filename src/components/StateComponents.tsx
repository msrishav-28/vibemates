import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { tokens } from '../theme/tokens';

interface LoadingStateProps {
  message?: string;
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ErrorStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading..." 
}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={tokens.colors.primary} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {actionLabel && onAction && (
      <TouchableOpacity style={styles.actionButton} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  actionLabel = "Try Again",
  onAction,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {onAction && (
      <TouchableOpacity style={styles.actionButton} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.xl,
  },
  message: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.md,
    textAlign: 'center',
  },
  title: {
    fontSize: tokens.typography.sizes.heading2,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    textAlign: 'center',
    marginBottom: tokens.spacing.md,
  },
  description: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: tokens.typography.lineHeights.relaxed * tokens.typography.sizes.body,
    marginBottom: tokens.spacing.xl,
  },
  actionButton: {
    backgroundColor: tokens.colors.primary,
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.md,
    borderRadius: tokens.radii.button,
  },
  actionText: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.inverse,
  },
});
