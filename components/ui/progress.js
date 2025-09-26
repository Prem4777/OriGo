import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme';
import { accessibilityProps } from '../../utils/accessibility';

/**
 * Enhanced Progress component with accessibility and animations
 * Usage: <Progress value={75} size="md" variant="primary" showLabel />
 * Props:
 * - value: number (0-100)
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' (default: 'primary')
 * - showLabel: boolean (default: false)
 * - label: string (optional custom label)
 * - animated: boolean (default: false)
 * - style: custom style
 */
export function Progress({ 
  value = 0, 
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  animated = false,
  style, 
  ...rest 
}) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const normalizedValue = Math.max(0, Math.min(100, value));

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: normalizedValue,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(normalizedValue);
    }
  }, [normalizedValue, animated, animatedValue]);

  const getVariantColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary[600];
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.primary[600];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: 4,
          borderRadius: 2,
        };
      case 'lg':
        return {
          height: 12,
          borderRadius: 6,
        };
      default: // md
        return {
          height: 8,
          borderRadius: 4,
        };
    }
  };

  const progressWidth = animated 
    ? animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
    : `${normalizedValue}%`;

  const accessibilityLabel = label || `Progress: ${normalizedValue} percent`;

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label || 'Progress'}
          </Text>
          <Text style={styles.value}>
            {normalizedValue}%
          </Text>
        </View>
      )}
      <View 
        style={[
          styles.track, 
          getSizeStyles()
        ]}
        {...accessibilityProps.alert(accessibilityLabel)}
        {...rest}
      >
        <Animated.View 
          style={[
            styles.bar,
            getSizeStyles(),
            {
              width: progressWidth,
              backgroundColor: getVariantColor(),
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  value: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  track: {
    backgroundColor: theme.colors.neutral[200],
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  bar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
