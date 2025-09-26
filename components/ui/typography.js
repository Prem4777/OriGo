import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

/**
 * Typography Components for consistent text styling
 */

export function Heading1({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.h1,
        color && { color },
        style
      ]}
      accessible
      accessibilityRole="header"
      {...props}
    >
      {children}
    </Text>
  );
}

export function Heading2({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.h2,
        color && { color },
        style
      ]}
      accessible
      accessibilityRole="header"
      {...props}
    >
      {children}
    </Text>
  );
}

export function Heading3({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.h3,
        color && { color },
        style
      ]}
      accessible
      accessibilityRole="header"
      {...props}
    >
      {children}
    </Text>
  );
}

export function Heading4({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.h4,
        color && { color },
        style
      ]}
      accessible
      accessibilityRole="header"
      {...props}
    >
      {children}
    </Text>
  );
}

export function BodyLarge({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.bodyLarge,
        color && { color },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Body({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.body,
        color && { color },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function BodySmall({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.bodySmall,
        color && { color },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Caption({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.caption,
        color && { color },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Label({ children, style, color, ...props }) {
  return (
    <Text 
      style={[
        styles.label,
        color && { color },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function Link({ children, style, onPress, ...props }) {
  return (
    <Text 
      style={[
        styles.link,
        style
      ]}
      onPress={onPress}
      accessible
      accessibilityRole="link"
      {...props}
    >
      {children}
    </Text>
  );
}

export function ErrorText({ children, style, ...props }) {
  return (
    <Text 
      style={[
        styles.errorText,
        style
      ]}
      accessible
      accessibilityRole="alert"
      {...props}
    >
      {children}
    </Text>
  );
}

export function SuccessText({ children, style, ...props }) {
  return (
    <Text 
      style={[
        styles.successText,
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.fontSize['4xl'],
    lineHeight: theme.typography.lineHeight['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[4],
  },
  h2: {
    fontSize: theme.typography.fontSize['3xl'],
    lineHeight: theme.typography.lineHeight['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
  },
  h3: {
    fontSize: theme.typography.fontSize['2xl'],
    lineHeight: theme.typography.lineHeight['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[3],
  },
  h4: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.lineHeight.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  bodyLarge: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.lg,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  body: {
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.base,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  caption: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.xs,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[1],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  link: {
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary[600],
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.error,
  },
  successText: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.success,
  },
});