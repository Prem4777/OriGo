import { AccessibilityInfo, Alert } from 'react-native';

/**
 * Accessibility Utilities for OriGo App
 */

/**
 * Check if screen reader is enabled
 */
export const isScreenReaderEnabled = async () => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.warn('Error checking screen reader status:', error);
    return false;
  }
};

/**
 * Announce message to screen reader
 */
export const announceForAccessibility = (message) => {
  if (message && typeof message === 'string') {
    AccessibilityInfo.announceForAccessibility(message);
  }
};

/**
 * Focus management utilities
 */
export const focusManager = {
  /**
   * Set focus to a specific element
   */
  setFocus: (ref) => {
    if (ref && ref.current) {
      AccessibilityInfo.setAccessibilityFocus(ref.current);
    }
  },

  /**
   * Move focus to next element
   */
  moveFocusNext: () => {
    // This would be implemented with navigation logic
    announceForAccessibility('Moving to next element');
  },

  /**
   * Move focus to previous element
   */
  moveFocusPrevious: () => {
    // This would be implemented with navigation logic
    announceForAccessibility('Moving to previous element');
  },
};

/**
 * Common accessibility props generators
 */
export const accessibilityProps = {
  /**
   * Props for buttons
   */
  button: (label, hint, disabled = false) => ({
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: { disabled },
  }),

  /**
   * Props for links
   */
  link: (label, hint) => ({
    accessible: true,
    accessibilityRole: 'link',
    accessibilityLabel: label,
    accessibilityHint: hint,
  }),

  /**
   * Props for text inputs
   */
  textInput: (label, value, placeholder, required = false, error = null) => ({
    accessible: true,
    accessibilityRole: 'text',
    accessibilityLabel: label,
    accessibilityValue: { text: value || placeholder },
    accessibilityState: { 
      required,
      invalid: !!error,
    },
    accessibilityHint: error || (required ? 'Required field' : undefined),
  }),

  /**
   * Props for headers
   */
  header: (level, label) => ({
    accessible: true,
    accessibilityRole: 'header',
    accessibilityLabel: label,
    accessibilityLevel: level,
  }),

  /**
   * Props for images
   */
  image: (description, decorative = false) => ({
    accessible: !decorative,
    accessibilityRole: decorative ? 'none' : 'image',
    accessibilityLabel: decorative ? undefined : description,
  }),

  /**
   * Props for lists
   */
  list: (itemCount) => ({
    accessible: true,
    accessibilityRole: 'list',
    accessibilityHint: `List with ${itemCount} items`,
  }),

  /**
   * Props for list items
   */
  listItem: (position, total) => ({
    accessible: true,
    accessibilityRole: 'listitem',
    accessibilityHint: `Item ${position} of ${total}`,
  }),

  /**
   * Props for alerts/notifications
   */
  alert: (message, type = 'info') => ({
    accessible: true,
    accessibilityRole: 'alert',
    accessibilityLabel: `${type}: ${message}`,
    accessibilityLiveRegion: 'assertive',
  }),

  /**
   * Props for tabs
   */
  tab: (label, selected = false, position, total) => ({
    accessible: true,
    accessibilityRole: 'tab',
    accessibilityLabel: label,
    accessibilityState: { selected },
    accessibilityHint: `Tab ${position} of ${total}`,
  }),

  /**
   * Props for switches/toggles
   */
  switch: (label, value, hint) => ({
    accessible: true,
    accessibilityRole: 'switch',
    accessibilityLabel: label,
    accessibilityState: { checked: value },
    accessibilityHint: hint,
  }),
};

/**
 * Accessibility testing utilities
 */
export const accessibilityTesting = {
  /**
   * Check if element has proper accessibility properties
   */
  validateElement: (props) => {
    const warnings = [];
    
    if (!props.accessible && !props.accessibilityElementsHidden) {
      warnings.push('Element should have accessible=true or be hidden');
    }
    
    if (props.accessible && !props.accessibilityLabel && !props.accessibilityLabelledBy) {
      warnings.push('Accessible element should have accessibilityLabel');
    }
    
    if (props.accessibilityRole === 'button' && !props.accessibilityHint) {
      warnings.push('Buttons should have accessibilityHint describing the action');
    }
    
    return warnings;
  },

  /**
   * Log accessibility warnings in development
   */
  logWarnings: (componentName, warnings) => {
    if (__DEV__ && warnings.length > 0) {
      console.warn(`Accessibility warnings for ${componentName}:`, warnings);
    }
  },
};

/**
 * Common accessibility patterns
 */
export const accessibilityPatterns = {
  /**
   * Loading state announcement
   */
  loading: (isLoading, loadingText = 'Loading') => {
    if (isLoading) {
      announceForAccessibility(loadingText);
    }
  },

  /**
   * Error state announcement
   */
  error: (error, context = '') => {
    if (error) {
      const message = `Error${context ? ` in ${context}` : ''}: ${error}`;
      announceForAccessibility(message);
    }
  },

  /**
   * Success state announcement
   */
  success: (message, context = '') => {
    if (message) {
      const announcement = `Success${context ? ` in ${context}` : ''}: ${message}`;
      announceForAccessibility(announcement);
    }
  },

  /**
   * Navigation announcement
   */
  navigation: (screenName, previousScreen) => {
    const message = previousScreen 
      ? `Navigated from ${previousScreen} to ${screenName}`
      : `Entered ${screenName}`;
    announceForAccessibility(message);
  },

  /**
   * Form validation announcement
   */
  formValidation: (errors, fieldName) => {
    if (errors && errors.length > 0) {
      const message = `${fieldName} has ${errors.length} error${errors.length > 1 ? 's' : ''}: ${errors.join(', ')}`;
      announceForAccessibility(message);
    }
  },
};

/**
 * Accessibility preferences
 */
export const accessibilityPreferences = {
  /**
   * Check for reduced motion preference
   */
  isReduceMotionEnabled: async () => {
    try {
      return await AccessibilityInfo.isReduceMotionEnabled();
    } catch (error) {
      console.warn('Error checking reduce motion preference:', error);
      return false;
    }
  },

  /**
   * Check for reduce transparency preference
   */
  isReduceTransparencyEnabled: async () => {
    try {
      return await AccessibilityInfo.isReduceTransparencyEnabled();
    } catch (error) {
      console.warn('Error checking reduce transparency preference:', error);
      return false;
    }
  },

  /**
   * Get preferred content size category
   */
  getPreferredContentSizeCategory: async () => {
    try {
      // This would need platform-specific implementation
      return 'medium';
    } catch (error) {
      console.warn('Error getting content size category:', error);
      return 'medium';
    }
  },
};

/**
 * Accessibility event listeners
 */
export const accessibilityListeners = {
  /**
   * Listen for screen reader state changes
   */
  onScreenReaderChanged: (callback) => {
    return AccessibilityInfo.addEventListener('screenReaderChanged', callback);
  },

  /**
   * Listen for reduce motion changes
   */
  onReduceMotionChanged: (callback) => {
    return AccessibilityInfo.addEventListener('reduceMotionChanged', callback);
  },

  /**
   * Clean up listeners
   */
  removeAllListeners: () => {
    AccessibilityInfo.removeAllListeners();
  },
};