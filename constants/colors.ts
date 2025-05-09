export const colors = {
  primary: {
    50: '#f0f9f1',
    100: '#dcf3df',
    200: '#b9e6c0',
    300: '#8ed59a',
    400: '#5abe70',
    500: '#3da450',
    600: '#2a833c',
    700: '#236833',
    800: '#1d512a',
    900: '#184324',
    950: '#0c2515',
  },
  secondary: {
    50: '#f8f6f1',
    100: '#efe9e1',
    200: '#ded0c3',
    300: '#cbb39e',
    400: '#b79274',
    500: '#a77b59',
    600: '#95674a',
    700: '#7c533e',
    800: '#664536',
    900: '#543a30',
    950: '#2d1e19',
  },
  accent: {
    50: '#f5fff0',
    100: '#e9ffdc',
    200: '#d0ffb7',
    300: '#adff85',
    400: '#87ff4d',
    500: '#64ea26',
    600: '#4cc70f',
    700: '#3d9c11',
    800: '#347b17',
    900: '#2e6619',
    950: '#153a09',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  warning: {
    50: '#fff9ec',
    100: '#ffeac2',
    200: '#fed58b',
    300: '#fec554',
    400: '#fdb022',
    500: '#f79009',
    600: '#dc6803',
    700: '#b54708',
    800: '#923a0e',
    900: '#78310f',
    950: '#451a03',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const lightTheme = {
  background: '#f9faf8', // Slightly green-tinted white
  text: colors.gray[900],
  secondaryText: colors.gray[600],
  card: colors.white,
  border: colors.primary[100],
  primaryButton: colors.primary[600],
  secondaryButton: colors.secondary[500],
  success: colors.success[500],
  warning: colors.warning[500],
  error: colors.error[500],
  muted: colors.primary[50],
  cardBackground: colors.primary[50],
  inputBackground: colors.white,
  shadow: 'rgba(12, 37, 21, 0.05)',
};

export const darkTheme = {
  background: '#121212', // Deep neutral dark background
  text: colors.gray[50],
  secondaryText: colors.gray[400],
  card: '#1e1e1e', // Slightly lighter dark
  border: '#2c2c2c',
  primaryButton: colors.primary[500],
  secondaryButton: colors.secondary[400],
  success: colors.success[400],
  warning: colors.warning[400],
  error: colors.error[400],
  muted: '#282828', // Subtle dark muted
  cardBackground: '#222222',
  inputBackground: '#333333',
  shadow: 'rgba(0, 0, 0, 0.5)',
  accent: colors.primary[500], // Green accent color
  highlight: '#2a833c26', // Semi-transparent green highlight
};

export type AppTheme = typeof lightTheme;
