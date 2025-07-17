import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { tokens } from '../theme/tokens';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  text?: string;
  size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  text,
  size = 'large',
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator 
          size={size} 
          color={tokens.colors.primary} 
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size={size} 
        color={tokens.colors.primary} 
      />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.background,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.lg,
  },
  text: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.md,
    textAlign: 'center',
  },
});
