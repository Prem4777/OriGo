import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

/**
 * Enhanced Card component with modern design patterns
 * Usage: <Card variant="elevated" padding="md">...</Card>
 * Props:
 * - variant: 'elevated' | 'outlined' | 'filled' (default: 'elevated')
 * - padding: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
 * - children: node
 * - style: custom style
 */
export function Card({ children, style, variant = 'elevated', padding = 'md', ...rest }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          ...styles.outlined,
          ...theme.shadows.sm,
        };
      case 'filled':
        return {
          backgroundColor: theme.colors.neutral[100],
          borderWidth: 0,
        };
      default: // elevated
        return {
          ...styles.elevated,
          ...theme.shadows.base,
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'sm':
        return { padding: theme.spacing[3] };
      case 'lg':
        return { padding: theme.spacing[6] };
      default: // md
        return { padding: theme.spacing[4] };
    }
  };

  return (
    <View 
      style={[
        styles.base,
        getVariantStyles(),
        getPaddingStyles(),
        style
      ]} 
      {...rest}
    >
      {children}
    </View>
  );
}

export function CardContent({ children, style, padding = 'md', ...rest }) {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'sm':
        return { padding: theme.spacing[3] };
      case 'lg':
        return { padding: theme.spacing[6] };
      default: // md
        return { padding: theme.spacing[4] };
    }
  };

  return (
    <View style={[styles.content, getPaddingStyles(), style]} {...rest}>
      {children}
    </View>
  );
}

export function CardHeader({ children, style, ...rest }) {
  return (
    <View style={[styles.header, style]} {...rest}>
      {children}
    </View>
  );
}

export function CardTitle({ children, style, ...rest }) {
  return (
    <View style={[styles.titleWrap, style]} {...rest}>
      {typeof children === 'string' ? (
        <Text style={styles.title}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function CardDescription({ children, style, ...rest }) {
  return (
    <Text style={[styles.description, style]} {...rest}>
      {children}
    </Text>
  );
}

export function CardFooter({ children, style, ...rest }) {
  return (
    <View style={[styles.footer, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing[3],
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  content: {
    // Base content styles - padding applied via getPaddingStyles
  },
  header: {
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    alignItems: 'flex-start',
  },
  titleWrap: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.lg,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  footer: {
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
