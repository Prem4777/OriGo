import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, useEffect, useRef } from 'react-native';
import { theme } from '../../theme';

/**
 * Loading Spinner Component
 */
export function LoadingSpinner({ size = 'medium', color, style }) {
  const spinnerColor = color || theme.colors.primary[600];
  
  return (
    <View style={[styles.spinnerContainer, style]}>
      <ActivityIndicator 
        size={size} 
        color={spinnerColor}
      />
    </View>
  );
}

/**
 * Skeleton Loading Component
 */
export function Skeleton({ width, height, style, animated = true }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      
      return () => animation.stop();
    }
  }, [animated, animatedValue]);

  const backgroundColor = animated
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.neutral[200], theme.colors.neutral[300]],
      })
    : theme.colors.neutral[200];

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width || '100%',
          height: height || 16,
          backgroundColor,
        },
        style,
      ]}
    />
  );
}

/**
 * Skeleton Card Component
 */
export function SkeletonCard({ style }) {
  return (
    <View style={[styles.skeletonCard, style]}>
      <View style={styles.skeletonCardHeader}>
        <Skeleton width={40} height={40} style={styles.skeletonAvatar} />
        <View style={styles.skeletonCardHeaderText}>
          <Skeleton width="60%" height={16} style={styles.skeletonTitle} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton width="100%" height={120} style={styles.skeletonImage} />
      <View style={styles.skeletonCardContent}>
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
        <Skeleton width="60%" height={12} />
      </View>
    </View>
  );
}

/**
 * Skeleton List Item Component
 */
export function SkeletonListItem({ style }) {
  return (
    <View style={[styles.skeletonListItem, style]}>
      <Skeleton width={48} height={48} style={styles.skeletonAvatar} />
      <View style={styles.skeletonListItemContent}>
        <Skeleton width="70%" height={16} style={styles.skeletonTitle} />
        <Skeleton width="50%" height={12} />
      </View>
      <Skeleton width={60} height={32} style={styles.skeletonButton} />
    </View>
  );
}

/**
 * Full Screen Loading Component
 */
export function FullScreenLoading({ message }) {
  return (
    <View style={styles.fullScreenLoading}>
      <LoadingSpinner size="large" />
      {message && (
        <Text style={styles.loadingMessage}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[4],
  },
  skeleton: {
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing[1],
  },
  skeletonCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    ...theme.shadows.base,
  },
  skeletonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  skeletonCardHeaderText: {
    flex: 1,
    marginLeft: theme.spacing[3],
  },
  skeletonAvatar: {
    borderRadius: theme.borderRadius.full,
  },
  skeletonTitle: {
    marginBottom: theme.spacing[2],
  },
  skeletonImage: {
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[4],
  },
  skeletonCardContent: {
    gap: theme.spacing[2],
  },
  skeletonListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[4],
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[2],
  },
  skeletonListItemContent: {
    flex: 1,
    marginLeft: theme.spacing[3],
  },
  skeletonButton: {
    borderRadius: theme.borderRadius.md,
  },
  fullScreenLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingMessage: {
    marginTop: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});