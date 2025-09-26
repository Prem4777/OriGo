import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Tabs component for React Native
 * Usage:
 * <Tabs value={activeTab} onChange={setActiveTab}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">...</TabsContent>
 *   <TabsContent value="tab2">...</TabsContent>
 * </Tabs>
 */
export function Tabs({ value, onChange, children, style }) {
  // Controlled or uncontrolled
  const [internalValue, setInternalValue] = useState(null);
  const activeValue = value !== undefined ? value : internalValue;
  const setValue = onChange || setInternalValue;

  // Provide context to children
  return (
    <TabsContext.Provider value={{ activeValue, setValue }}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
}

const TabsContext = React.createContext({ activeValue: null, setValue: () => {} });

export function TabsList({ children, style }) {
  return <View style={[styles.tabList, style]}>{children}</View>;
}

export function TabsTrigger({ value, children, style }) {
  const { activeValue, setValue } = React.useContext(TabsContext);
  const isActive = activeValue === value;
  return (
    <TouchableOpacity
      onPress={() => setValue(value)}
      style={[styles.tabTrigger, isActive && styles.tabTriggerActive, style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabTriggerText, isActive && styles.tabTriggerTextActive]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function TabsContent({ value, children, style }) {
  const { activeValue } = React.useContext(TabsContext);
  if (activeValue !== value) return null;
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  tabList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 8,
  },
  tabTrigger: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  tabTriggerActive: {
    borderBottomColor: '#059669',
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
  },
  tabTriggerText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '500',
  },
  tabTriggerTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
});
