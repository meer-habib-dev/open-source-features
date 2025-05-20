import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface WaveformProps {
  barCount?: number;
  minHeight?: number;
  maxHeight?: number;
  barWidth?: number;
  barGap?: number;
  barColor?: string;
  className?: string;
  style?: ViewStyle;
}

export default function WaveformAnimation({
  barCount = 10,
  minHeight = 10,
  maxHeight = 50,
  barWidth = 4,
  barGap = 3,
  barColor = '#3b82f6', // Tailwind blue-500
  className = '',
  style,
}: WaveformProps) {
  // Create array of bars
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        ...style,
      }}
      className={className}
    >
      {bars.map((index) => (
        <WaveformBar
          key={index}
          minHeight={minHeight}
          maxHeight={maxHeight}
          barWidth={barWidth}
          barGap={barGap}
          barColor={barColor}
          // Make each bar have slightly different animation timing
          animationDuration={100 + Math.random() * 100}
        />
      ))}
    </View>
  );
}

interface WaveformBarProps {
  minHeight: number;
  maxHeight: number;
  barWidth: number;
  barGap: number;
  barColor: string;
  animationDuration: number;
}

function WaveformBar({
  minHeight,
  maxHeight,
  barWidth,
  barGap,
  barColor,
  animationDuration,
}: WaveformBarProps) {
  // Use a shared value for the height animation
  const height = useSharedValue(minHeight);

  // Set up the animation loop
  useEffect(() => {
    // Function to animate to a random height
    const animateToRandomHeight = () => {
      const randomHeight = minHeight + Math.random() * (maxHeight - minHeight);
      height.value = withTiming(randomHeight, {
        duration: animationDuration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    };

    // Start the animation loop
    const intervalId = setInterval(animateToRandomHeight, animationDuration);
    // Initial animation
    animateToRandomHeight();

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [height, minHeight, maxHeight, animationDuration]);

  // Create animated style for the bar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <View style={{ marginHorizontal: barGap / 2 }}>
      <Animated.View
        style={[
          animatedStyle,
          { width: barWidth, backgroundColor: barColor, borderRadius: 100 },
        ]}
      />
    </View>
  );
}
