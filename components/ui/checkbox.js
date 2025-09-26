import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

/**
 * Checkbox component for React Native
 * Usage: <Checkbox checked={bool} onValueChange={fn} />
 * Props:
 * - checked: boolean
 * - onValueChange: function
 * - style: custom style
 * - disabled: boolean
 * - accessibilityLabel: string
 */
export function Checkbox({ checked, onValueChange, style, disabled, accessibilityLabel, ...rest }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onValueChange && onValueChange(!checked)}
      style={[styles.box, checked && styles.checked, disabled && styles.disabled, style]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
      disabled={disabled}
      {...rest}
    >
      {checked && <View style={styles.inner} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#059669',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  inner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
});
