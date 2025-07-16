import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

interface ActionSheetOption {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionSheetOption[];
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  options,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      
      <View style={styles.container}>
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index === 0 && styles.firstOption,
                index === options.length - 1 && styles.lastOption,
              ]}
              onPress={() => {
                option.onPress();
                onClose();
              }}
            >
              <View style={styles.optionContent}>
                {option.icon && (
                  <Icon
                    name={option.icon}
                    size={20}
                    color={option.destructive ? tokens.colors.danger : tokens.colors.text.primary}
                    style={styles.optionIcon}
                  />
                )}
                <Text
                  style={[
                    styles.optionText,
                    option.destructive && styles.destructiveText,
                  ]}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: tokens.colors.background,
    borderTopLeftRadius: tokens.radii.card,
    borderTopRightRadius: tokens.radii.card,
    paddingBottom: tokens.spacing.xl,
  },
  header: {
    padding: tokens.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.lightGray,
  },
  title: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.md,
  },
  option: {
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.lightGray,
  },
  firstOption: {
    borderTopWidth: 0,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: tokens.spacing.md,
  },
  optionText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
    fontWeight: tokens.typography.weights.medium,
  },
  destructiveText: {
    color: tokens.colors.danger,
  },
  cancelButton: {
    marginTop: tokens.spacing.md,
    marginHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    backgroundColor: tokens.colors.lightGray,
    borderRadius: tokens.radii.button,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
  },
});
