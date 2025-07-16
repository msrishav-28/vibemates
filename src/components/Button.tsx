// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { tokens } from '../theme/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? tokens.colors.primary : tokens.colors.background,
          borderWidth: isPrimary ? 0 : 1,
          borderColor: tokens.colors.primary,
          height: tokens.sizes.button[size],
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? tokens.colors.text.inverse : tokens.colors.primary} />
      ) : (
        <Text style={[
          styles.text,
          { color: isPrimary ? tokens.colors.text.inverse : tokens.colors.primary }
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: tokens.radii.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.lg,
  },
  text: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
  },
});