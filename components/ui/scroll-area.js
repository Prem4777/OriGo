import React from 'react';
import { ScrollView } from 'react-native';

/**
 * ScrollArea component for React Native
 * Usage: <ScrollArea style={...}>...</ScrollArea>
 * Just a styled wrapper around ScrollView for scrollable content areas.
 */
export function ScrollArea({ children, style, ...rest }) {
  return (
    <ScrollView style={style} contentContainerStyle={{ flexGrow: 1 }} {...rest}>
      {children}
    </ScrollView>
  );
}
