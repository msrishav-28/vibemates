// src/theme/tokens.ts
export const colors = {
  // Brand & Background
  primary: '#000000',           // Black - primary text/buttons
  background: '#FFFFFF',        // White - screen background
  surface: '#FAFAFA',           // Slightly off-white for cards
  lightGray: '#F5F5F5',         // Section backgrounds
  mediumGray: '#D8D8D8',        // Secondary text, borders
  softGray: '#F0F0F0',          // Chips, tag backgrounds
  darkGray: '#666666',          // Secondary text
  
  // Category Pastels (used for interest buttons/cards)
  violet: '#E9E6FF',
  mint: '#E3F9F1',
  lemon: '#FEF8D9',
  pink: '#FDE8F1',
  cyan: '#DFF6FE',
  peach: '#FFE8DD',
  
  // Utility Colors
  danger: '#FF3B30',
  success: '#34C759',
  info: '#007AFF',
  warning: '#FF9500',
  inactive: '#C7C7CC',          // Unselected icon tint
  
  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  }
};

export const typography = {
  fontFamily: {
    regular: 'System',
    rounded: 'SFProRounded',
  },
  sizes: {
    heading1: 28,
    heading2: 24,
    heading3: 20,
    body: 16,
    small: 14,
    tiny: 12,
    micro: 10,
  },
  weights: {
    bold: '700' as const,
    semibold: '600' as const,
    medium: '500' as const,
    regular: '400' as const,
    light: '300' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  button: 16,
  card: 20,
  chip: 24,
  full: 999, // for avatars or circular elements
};

export const shadows = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const sizes = {
  avatar: {
    xs: 24,
    sm: 36,
    md: 48,
    lg: 64,
    xl: 96,
  },
  button: {
    sm: 40,
    md: 48,
    lg: 56,
  },
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  },
  badge: {
    height: 20,
    minWidth: 20,
  },
};

export const layout = {
  screenPadding: spacing.lg,
  cardPadding: spacing.md,
  borderWidth: 1,
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
};

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
};

export const tokens = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  sizes,
  layout,
  animation,
} as const;

export type Theme = typeof tokens;