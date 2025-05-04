import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import SplashScreen from '@/screens/SplashScreen';

export default function Index() {
  useEffect(() => {
    const checkAndNavigate = async () => {
      // Show splash screen for at least 2 seconds
      setTimeout(() => {
        router.replace('/onboarding');
      }, 2000);
    };

    checkAndNavigate();
  }, []);

  return (
    <View className="flex-1">
      <SplashScreen />
    </View>
  );
}
