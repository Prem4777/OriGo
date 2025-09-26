import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { theme } from '../../theme';

/**
 * Enhanced Button component with modern design patterns
 * Props:
 * - onPress: function
 * - disabled: boolean
 * - style: custom style
 * - variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - children: node
 * - loading: boolean (optional)
 * - fullWidth: boolean (optional)
 * - leftIcon: component (optional)
 * - rightIcon: component (optional)
 */
export function Button({ 
  onPress, 
  disabled, 
  style, 
  variant = 'primary', 
  size = 'md',
  children, 
  loading, 
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...rest 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary[600],
          borderColor: theme.colors.secondary[600],
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary[600],
          borderWidth: 1.5,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      case 'destructive':
        return {
          backgroundColor: theme.colors.error,
          borderColor: theme.colors.error,
        };
      default: // primary
        return {
          backgroundColor: theme.colors.primary[600],
          borderColor: theme.colors.primary[600],
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
          paddingHorizontal: theme.spacing[6],
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

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return disabled ? theme.colors.text.disabled : theme.colors.primary[600];
    }
    return disabled ? theme.colors.text.disabled : theme.colors.text.inverse;
  };

  const getLoadingColor = () => {
    return variant === 'outline' || variant === 'ghost' 
      ? theme.colors.primary[600] 
      : theme.colors.text.inverse;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        getSizeStyles(),
        getVariantStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        loading && styles.loading,
        style,
      ]}
      activeOpacity={disabled || loading ? 1 : 0.8}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator 
            color={getLoadingColor()} 
            size={size === 'sm' ? 'small' : 'small'}
          />
        ) : (
          <>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Text 
              style={[
                styles.text,
                size === 'sm' && styles.textSm,
                size === 'lg' && styles.textLg,
                { color: getTextColor() }
              ]}
            >
              {children}
            </Text>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
    ...theme.shadows.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.base,
  },
  textSm: {
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.sm,
  },
  textLg: {
    fontSize: theme.typography.fontSize.lg,
    lineHeight: theme.typography.lineHeight.lg,
  },
  leftIcon: {
    marginRight: theme.spacing[2],
  },
  rightIcon: {
    marginLeft: theme.spacing[2],
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  loading: {
    opacity: 0.8,
  },
});
