import { useTheme } from '@/lib/theme';

export function useColorScheme() {
  // Use the theme context directly
  return useTheme();
}