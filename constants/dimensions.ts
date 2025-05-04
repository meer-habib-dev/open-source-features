import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions assuming iPhone 11 Pro (375 x 812)
const baseWidth = 375;
const baseHeight = 812;

// Scale ratios
const widthRatio = width / baseWidth;
const heightRatio = height / baseHeight;

// Normalize sizes
export const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  const ratio = based === 'width' ? widthRatio : heightRatio;
  return Math.round(size * ratio);
};

// Spacing based on 8-point grid system
export const spacing = {
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(16),
  lg: normalize(24),
  xl: normalize(32),
  xxl: normalize(48),
};

// Screen information
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const IS_SMALL_DEVICE = width < 375;