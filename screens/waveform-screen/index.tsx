import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import WaveformAnimation from './components/WaveformAnimation';

export default function WaveformDemoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen
        options={{
          title: 'Waveform Animation',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 items-center justify-center p-4 gap-16">
          <Text className="text-white text-xl font-semibold">
            Basic Waveform
          </Text>
          <WaveformAnimation barCount={12} className="w-full h-32" />

          <Text className="text-white text-xl font-semibold mt-8">
            Wide Bars
          </Text>
          <WaveformAnimation
            barCount={8}
            barWidth={10}
            barGap={6}
            barColor="#22d3ee" // cyan-400
            className="w-full h-32"
          />

          <Text className="text-white text-xl font-semibold mt-8">
            Tall Animation
          </Text>
          <WaveformAnimation
            barCount={16}
            minHeight={5}
            maxHeight={100}
            barWidth={3}
            barGap={4}
            barColor="#a855f7" // purple-500
            className="w-full h-40"
          />

          <Text className="text-white text-xl font-semibold mt-8">
            Microphone Style
          </Text>
          <WaveformAnimation
            barCount={40}
            minHeight={2}
            maxHeight={30}
            barWidth={2}
            barGap={2}
            barColor="#f97316" // orange-500
            className="w-full h-16"
          />

          <Text className="text-white text-xl font-semibold mt-8">
            Rainbow Wave
          </Text>
          <WaveformAnimation
            barCount={24}
            minHeight={10}
            maxHeight={60}
            barWidth={4}
            barGap={3}
            barColor="#ec4899" // pink-500
            className="w-full h-32"
          />

          <Text className="text-white text-xl font-semibold mt-8">
            Minimalist Style
          </Text>
          <WaveformAnimation
            barCount={6}
            minHeight={20}
            maxHeight={80}
            barWidth={15}
            barGap={8}
            barColor="#10b981" // emerald-500
            className="w-full h-32"
          />

          <Text className="text-white text-xl font-semibold mt-8">
            Dense Pattern
          </Text>
          <WaveformAnimation
            barCount={50}
            minHeight={3}
            maxHeight={25}
            barWidth={1.5}
            barGap={1.5}
            barColor="#6366f1" // indigo-500
            className="w-full h-20"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
