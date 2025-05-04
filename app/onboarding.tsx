import React from 'react';
import { View, StatusBar } from 'react-native';
import OnboardingScreen from '@/screens/OnboardingScreen';

export default function Onboarding() {
  return (
    <View className="flex-1">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <OnboardingScreen />
    </View>
  );
}
