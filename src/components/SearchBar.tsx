import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search communities, events...",
  onFocus,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      <Icon 
        name="search" 
        size={20} 
        color={tokens.colors.mediumGray} 
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.mediumGray}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value.length > 0 && (
        <Icon 
          name="close-circle" 
          size={20} 
          color={tokens.colors.mediumGray} 
          style={styles.clearIcon}
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.lightGray,
    borderRadius: tokens.radii.md,
    paddingHorizontal: tokens.spacing.md,
    height: 48,
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  icon: {
    marginRight: tokens.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
    fontFamily: tokens.typography.fontFamily.regular,
  },
  clearIcon: {
    marginLeft: tokens.spacing.sm,
  },
});
