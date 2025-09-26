import React, { useState, forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

/**
 * Enhanced Input component with modern design patterns
 * Usage: <Input label="Email" placeholder="Enter your email" variant="outlined" />
 * Props:
 * - label: string (optional)
 * - placeholder: string
 * - value: string
 * - onChangeText: function
 * - variant: 'filled' | 'outlined' | 'underlined' (default: 'outlined')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - error: string (optional)
 * - helper: string (optional)
 * - leftIcon: component (optional)
 * - rightIcon: component (optional)
 * - disabled: boolean (optional)
 * - style: custom style
 * - ...rest: other TextInput props
 */
export const EnhancedInput = forwardRef(({ 
  label, 
  style, 
  variant = 'outlined', 
  size = 'md',
  error,
  helper,
  leftIcon,
  rightIcon,
  disabled = false,
  ...rest 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const getVariantStyles = () => {
    const baseStyles = {
      borderColor: error 
        ? theme.colors.error 
        : isFocused 
        ? theme.colors.primary[600] 
        : theme.colors.neutral[300],
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: disabled 
            ? theme.colors.neutral[100] 
            : theme.colors.neutral[50],
          borderWidth: 0,
          borderBottomWidth: 2,
        };
      case 'underlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
        };
      default: // outlined
        return {
          ...baseStyles,
          backgroundColor: disabled 
            ? theme.colors.neutral[50] 
            : theme.colors.surface,
          borderWidth: 1.5,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing[2],
          paddingHorizontal: theme.spacing[3],
          minHeight: 36,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing[4],
          paddingHorizontal: theme.spacing[4],
          minHeight: 56,
        };
      default: // md
        return {
          paddingVertical: theme.spacing[3],
          paddingHorizontal: theme.spacing[4],
          minHeight: 44,
        };
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[
          styles.label,
          error && { color: theme.colors.error },
          disabled && { color: theme.colors.text.disabled }
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        getSizeStyles(),
        getVariantStyles(),
        disabled && styles.disabled
      ]}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          ref={ref}
          style={[
            styles.input,
            size === 'sm' && styles.inputSm,
            size === 'lg' && styles.inputLg,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={theme.colors.text.disabled}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessible
          accessibilityLabel={label}
          {...rest}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helper) && (
        <Text style={[
          styles.helperText,
          error && styles.errorText
        ]}>
          {error || helper}
        </Text>
      )}
    </View>
  );
});

// Legacy Input component for backward compatibility
export function Input({ style, ...rest }) {
  return (
    <TextInput
      style={[styles.legacyInput, style]}
      placeholderTextColor={theme.colors.text.disabled}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[4],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.base,
    color: theme.colors.text.primary,
    backgroundColor: 'transparent',
  },
  inputSm: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
  },
  inputLg: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.lg,
  },
  inputWithLeftIcon: {
    marginLeft: theme.spacing[2],
  },
  inputWithRightIcon: {
    marginRight: theme.spacing[2],
  },
  leftIcon: {
    marginRight: 0,
  },
  rightIcon: {
    marginLeft: 0,
  },
  helperText: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  },
  errorText: {
    color: theme.colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  // Legacy input style for backward compatibility
  legacyInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: theme.colors.text.primary,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
});