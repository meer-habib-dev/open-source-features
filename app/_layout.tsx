import { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { Image } from 'expo-image';
import '../global.css';
import { ThemeProvider } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Common images to prefetch
const COMMON_IMAGES = [
  'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

// Add interface for CareTask
interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  plantImage: string;
  type: string;
  dueDate: string;
  repeatInterval?: number;
  notes?: string;
  completed: boolean;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded or on error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prefetch common images
  useEffect(() => {
    // Prefetch common images used throughout the app
    Image.prefetch(COMMON_IMAGES);
  }, []);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: 'fade' }} />
          <Stack.Screen
            name="onboarding"
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="waveform-demo"
            options={{
              animation: 'slide_from_right',
              headerShown: true,
              headerTitle: 'Home',
            }}
          />

          <Stack.Screen name="+not-found" options={{ animation: 'fade' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
