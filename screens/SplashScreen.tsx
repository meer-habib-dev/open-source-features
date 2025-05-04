import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Leaf } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SplashScreen() {
  const { colors, isDarkMode } = useColorScheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
  }, []);

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: isDarkMode ? '#121212' : colors.white }}
    >
      <Animated.View style={[logoStyle]}>
        <View
          className="rounded-2xl p-5"
          style={{ backgroundColor: colors.primary[500] }}
        >
          <Leaf size={60} color="white" />
        </View>
      </Animated.View>

      <Animated.Text
        className="mt-6 text-2xl font-bold"
        style={[
          logoStyle,
          { color: isDarkMode ? colors.gray[50] : colors.gray[900] },
        ]}
      >
        Plant Insights AI
      </Animated.Text>

      <Animated.Text
        className="mt-2 text-sm text-center px-6"
        style={[
          logoStyle,
          { color: isDarkMode ? colors.gray[400] : colors.gray[600] },
        ]}
      >
        Identify and learn about plants with AI
      </Animated.Text>
    </View>
  );
}
