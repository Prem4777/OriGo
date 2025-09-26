import { Animated, Easing } from 'react-native';

/**
 * Common animation configurations
 */
export const AnimationConfig = {
  // Duration presets
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  // Easing presets
  easing: {
    ease: Easing.ease,
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    bounce: Easing.bounce,
    spring: Easing.elastic(1),
  },
};

/**
 * Fade Animation Utility
 */
export class FadeAnimation {
  constructor(initialValue = 0) {
    this.value = new Animated.Value(initialValue);
  }

  fadeIn(duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: 1,
      duration,
      easing: AnimationConfig.easing.easeOut,
      useNativeDriver: true,
    }).start(callback);
  }

  fadeOut(duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: 0,
      duration,
      easing: AnimationConfig.easing.easeIn,
      useNativeDriver: true,
    }).start(callback);
  }

  fadeToggle(duration = AnimationConfig.duration.normal, callback) {
    const currentValue = this.value._value;
    const toValue = currentValue === 0 ? 1 : 0;
    
    return Animated.timing(this.value, {
      toValue,
      duration,
      easing: AnimationConfig.easing.easeInOut,
      useNativeDriver: true,
    }).start(callback);
  }
}

/**
 * Scale Animation Utility
 */
export class ScaleAnimation {
  constructor(initialValue = 1) {
    this.value = new Animated.Value(initialValue);
  }

  scaleIn(duration = AnimationConfig.duration.normal, callback) {
    return Animated.sequence([
      Animated.timing(this.value, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.spring(this.value, {
        toValue: 1,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }

  scaleOut(duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: 0,
      duration,
      easing: AnimationConfig.easing.easeIn,
      useNativeDriver: true,
    }).start(callback);
  }

  pulse(duration = AnimationConfig.duration.fast) {
    return Animated.sequence([
      Animated.timing(this.value, {
        toValue: 1.1,
        duration: duration / 2,
        easing: AnimationConfig.easing.easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(this.value, {
        toValue: 1,
        duration: duration / 2,
        easing: AnimationConfig.easing.easeIn,
        useNativeDriver: true,
      }),
    ]).start();
  }
}

/**
 * Slide Animation Utility
 */
export class SlideAnimation {
  constructor(initialValue = 0) {
    this.value = new Animated.Value(initialValue);
  }

  slideInFromRight(width = 300, duration = AnimationConfig.duration.normal, callback) {
    this.value.setValue(width);
    return Animated.timing(this.value, {
      toValue: 0,
      duration,
      easing: AnimationConfig.easing.easeOut,
      useNativeDriver: true,
    }).start(callback);
  }

  slideInFromLeft(width = 300, duration = AnimationConfig.duration.normal, callback) {
    this.value.setValue(-width);
    return Animated.timing(this.value, {
      toValue: 0,
      duration,
      easing: AnimationConfig.easing.easeOut,
      useNativeDriver: true,
    }).start(callback);
  }

  slideOutToRight(width = 300, duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: width,
      duration,
      easing: AnimationConfig.easing.easeIn,
      useNativeDriver: true,
    }).start(callback);
  }

  slideOutToLeft(width = 300, duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: -width,
      duration,
      easing: AnimationConfig.easing.easeIn,
      useNativeDriver: true,
    }).start(callback);
  }
}

/**
 * Rotation Animation Utility
 */
export class RotationAnimation {
  constructor(initialValue = 0) {
    this.value = new Animated.Value(initialValue);
  }

  spin(duration = 2000, callback) {
    return Animated.loop(
      Animated.timing(this.value, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start(callback);
  }

  rotate(angle = 360, duration = AnimationConfig.duration.normal, callback) {
    return Animated.timing(this.value, {
      toValue: angle / 360,
      duration,
      easing: AnimationConfig.easing.easeInOut,
      useNativeDriver: true,
    }).start(callback);
  }

  getRotateTransform() {
    return this.value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }
}

/**
 * Pre-built Animation Sequences
 */
export const AnimationSequences = {
  /**
   * Card entrance animation
   */
  cardEntrance: (animatedValue, delay = 0, callback) => {
    return Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(animatedValue.opacity, {
          toValue: 1,
          duration: AnimationConfig.duration.normal,
          easing: AnimationConfig.easing.easeOut,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue.scale, {
          toValue: 1,
          tension: 80,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start(callback);
  },

  /**
   * Button press animation
   */
  buttonPress: (animatedValue, callback) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        easing: AnimationConfig.easing.easeIn,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        easing: AnimationConfig.easing.easeOut,
        useNativeDriver: true,
      }),
    ]).start(callback);
  },

  /**
   * Loading pulse animation
   */
  loadingPulse: (animatedValue) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: AnimationConfig.easing.easeInOut,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 1000,
          easing: AnimationConfig.easing.easeInOut,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },

  /**
   * Staggered list animation
   */
  staggeredList: (items, delay = 100, callback) => {
    const animations = items.map((item, index) => {
      return Animated.sequence([
        Animated.delay(index * delay),
        Animated.parallel([
          Animated.timing(item.opacity, {
            toValue: 1,
            duration: AnimationConfig.duration.normal,
            easing: AnimationConfig.easing.easeOut,
            useNativeDriver: true,
          }),
          Animated.timing(item.translateY, {
            toValue: 0,
            duration: AnimationConfig.duration.normal,
            easing: AnimationConfig.easing.easeOut,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    return Animated.parallel(animations).start(callback);
  },
};