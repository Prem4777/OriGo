import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Badge component for React Native
 * Usage: <Badge>...</Badge>
 * Supports style and children props.
 */
export function Badge({ children, style, ...rest }) {
  return (
    <View style={[styles.badge, style]} {...rest}>
      {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
    marginBottom: 2,
  },
  text: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
});
