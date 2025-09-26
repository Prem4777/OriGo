// Enhanced Design System for OriGo
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Scale down typography on smaller screens (baseline 375)
const SCALE = Math.min(SCREEN_WIDTH / 375, 1);
const ms = (size) => Math.round(size * SCALE);

export const theme = {
  // Color palette
  colors: {
    // Primary colors (Kerala Green)
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#059669',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    // Secondary colors (Ocean Blue)
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Neutral colors
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // Semantic colors
    background: '#f8fafc',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
      inverse: '#ffffff',
    },
  },
  // Typography scale
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: ms(12),
      sm: ms(14),
      base: ms(16),
      lg: ms(18),
      xl: ms(20),
      '2xl': ms(24),
      '3xl': ms(30),
      '4xl': ms(36),
    },
    lineHeight: {
      xs: ms(16),
      sm: ms(20),
      base: ms(24),
      lg: ms(28),
      xl: ms(28),
      '2xl': ms(32),
      '3xl': ms(36),
      '4xl': ms(40),
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  // Spacing scale
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  // Border radius scale
  borderRadius: {
    none: 0,
    sm: 6,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

// Legacy theme support (updated to use new design tokens)
export const lightTheme = {
  background: theme.colors.background,
  foreground: theme.colors.text.primary,
  card: theme.colors.surface,
  cardForeground: theme.colors.text.primary,
  popover: theme.colors.surface,
  popoverForeground: theme.colors.text.primary,
  primary: theme.colors.primary[600],
  primaryForeground: theme.colors.text.inverse,
  secondary: theme.colors.secondary[100],
  secondaryForeground: theme.colors.text.primary,
  muted: theme.colors.neutral[100],
  mutedForeground: theme.colors.text.secondary,
  accent: theme.colors.neutral[200],
  accentForeground: theme.colors.text.primary,
  destructive: theme.colors.error,
  destructiveForeground: theme.colors.text.inverse,
  border: theme.colors.neutral[200],
  input: 'transparent',
  inputBackground: theme.colors.neutral[100],
  switchBackground: theme.colors.neutral[300],
  fontWeightMedium: theme.typography.fontWeight.medium,
  fontWeightNormal: theme.typography.fontWeight.normal,
  ring: theme.colors.neutral[400],
  radius: theme.borderRadius.base,
};

export const darkTheme = {
  background: theme.colors.neutral[900],
  foreground: theme.colors.neutral[50],
  card: theme.colors.neutral[800],
  cardForeground: theme.colors.neutral[50],
  popover: theme.colors.neutral[800],
  popoverForeground: theme.colors.neutral[50],
  primary: theme.colors.primary[500],
  primaryForeground: theme.colors.neutral[900],
  secondary: theme.colors.neutral[700],
  secondaryForeground: theme.colors.neutral[50],
  muted: theme.colors.neutral[700],
  mutedForeground: theme.colors.neutral[400],
  accent: theme.colors.neutral[700],
  accentForeground: theme.colors.neutral[50],
  destructive: theme.colors.error,
  destructiveForeground: theme.colors.neutral[50],
  border: theme.colors.neutral[700],
  input: theme.colors.neutral[700],
  inputBackground: theme.colors.neutral[700],
  switchBackground: theme.colors.neutral[600],
  fontWeightMedium: theme.typography.fontWeight.medium,
  fontWeightNormal: theme.typography.fontWeight.normal,
  ring: theme.colors.neutral[500],
  radius: theme.borderRadius.base,
};
