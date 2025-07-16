// src/components/InterestButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface InterestButtonProps {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
  color?: string;
}

export const InterestButton: React.FC<InterestButtonProps> = ({
  label,
  icon,
  selected,
  onPress,
  color = tokens.colors.lightGray,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={[
          styles.container,
          {
            backgroundColor: selected ? color : tokens.colors.background,
            borderColor: selected ? color : tokens.colors.mediumGray,
            borderWidth: selected ? 0 : 1,
          },
        ]}>
        <Icon
          name={icon}
          size={tokens.sizes.icon.md}
          color={selected ? tokens.colors.text.primary : tokens.colors.inactive}
        />
        <Text style={[
          styles.label,
          { color: selected ? tokens.colors.text.primary : tokens.colors.text.secondary }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: tokens.radii.card,
    alignItems: 'center',
    justifyContent: 'center',
    margin: tokens.spacing.xs,
  },
  label: {
    marginTop: tokens.spacing.xs,
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.medium,
  },
});