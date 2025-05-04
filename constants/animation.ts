import { Easing } from 'react-native-reanimated';

export const ANIMATION = {
  // Duration in milliseconds
  duration: {
    fastest: 150,
    fast: 250,
    normal: 350,
    slow: 500,
    slowest: 750,
  },
  // Easing functions
  easing: {
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    // Bounce effect
    bounce: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    // Elastic effect
    elastic: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  },
  // Default animation config
  defaultConfig: {
    duration: 350,
    easing: Easing.inOut(Easing.ease),
  },
  // Screen transition animations
  screen: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        duration: 250,
        easing: Easing.out(Easing.ease),
      },
    },
    slideUp: {
      from: { transform: [{ translateY: 100 }], opacity: 0 },
      to: { transform: [{ translateY: 0 }], opacity: 1 },
      config: {
        duration: 350,
        easing: Easing.out(Easing.ease),
      },
    },
    slideInRight: {
      from: { transform: [{ translateX: 100 }], opacity: 0 },
      to: { transform: [{ translateX: 0 }], opacity: 1 },
      config: {
        duration: 350,
        easing: Easing.out(Easing.ease),
      },
    },
  },
};