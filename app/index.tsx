import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const navigationButtons = [
    {
      title: 'Onboarding',
      route: '/onboarding' as const,
      icon: 'leaf-outline' as const,
      color: '#22c55e', // green-500
    },
    {
      title: 'Splash',
      route: '/splash' as const,
      icon: 'flash-outline' as const,
      color: '#f59e0b', // amber-500
    },
    {
      title: 'Waveform Demo',
      route: '/waveform-demo' as const,
      icon: 'pulse-outline' as const,
      color: '#3b82f6', // blue-500
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4 gap-4">
          {navigationButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(button.route)}
              className="flex-row items-center justify-between p-4 bg-white rounded-xl shadow-sm active:opacity-70"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center space-x-3 gap-3">
                <View
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${button.color}15` }}
                >
                  <Ionicons name={button.icon} size={24} color={button.color} />
                </View>
                <Text className="text-gray-800 font-semibold text-lg">
                  {button.title}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
