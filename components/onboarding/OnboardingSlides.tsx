import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowRight, Leaf, Heart, Droplets } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import {
  AnimatedFeatureIcon,
  AnimatedOption,
  CustomImageBackground,
  FeatureCard,
} from './OnboardingComponents';

const { width } = Dimensions.get('window');

interface SlideProps {
  slide: any;
  slideAnimation: any;
  selectedOptions: string[];
  handleOptionSelect: (optionId: string) => void;
  handleNext: () => void;
  colors: any;
  isDarkMode: boolean;
}

interface Option {
  id: string;
  text: string;
  icon: string;
}

interface Feature {
  text: string;
  icon: string;
}

export const WelcomeSlide: React.FC<SlideProps> = ({
  slide,
  slideAnimation,
  handleNext,
  colors,
}) => {
  const slideAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: slideAnimation.value,
      transform: [
        {
          translateX: interpolate(
            slideAnimation.value,
            [0, 1],
            [width * 0.1, 0]
          ),
        },
      ],
    };
  });

  return (
    <View style={{ width }} className="flex-1">
      <CustomImageBackground
        source={{ uri: slide.image || '' }}
        className="flex-1 justify-end"
      >
        <Animated.View
          style={[slideAnimStyle]}
          className="bg-black/40 p-8 pt-16"
        >
          <Text className="text-5xl font-bold mb-3 text-white">
            {slide.title}
          </Text>
          <Text className="text-lg text-white/90 mb-10">
            {slide.description}
          </Text>
          <View className="flex-row mb-8 justify-between items-center">
            <View className="flex-row ">
              <AnimatedFeatureIcon
                icon={<Leaf size={24} color="white" />}
                label="Identify"
                index={0}
                marginRight={true}
              />
              <AnimatedFeatureIcon
                icon={<Droplets size={24} color="white" />}
                label="Diagnose"
                index={1}
                marginRight={true}
              />
              <AnimatedFeatureIcon
                icon={<Heart size={24} color="white" />}
                label="Benefits"
                index={2}
              />
            </View>
            <TouchableOpacity
              onPress={handleNext}
              className="w-16 h-16 bottom-0 right-0 rounded-full justify-center items-center flex-row"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </CustomImageBackground>
    </View>
  );
};

export const ChoiceSlide: React.FC<SlideProps> = ({
  slide,
  slideAnimation,
  selectedOptions,
  handleOptionSelect,
  colors,
  isDarkMode,
}) => {
  const slideAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: slideAnimation.value,
      transform: [
        {
          translateX: interpolate(
            slideAnimation.value,
            [0, 1],
            [width * 0.1, 0]
          ),
        },
      ],
    };
  });

  return (
    <View style={{ width }} className="flex-1 px-6 pt-6">
      <Animated.View style={[slideAnimStyle]} className="flex-1">
        <Text
          className="text-2xl font-bold mb-6"
          style={{ color: isDarkMode ? colors.white : colors.gray[900] }}
        >
          {slide.question}
        </Text>

        {slide.description && (
          <Text
            className="text-base mb-6"
            style={{
              color: isDarkMode ? colors.gray[400] : colors.gray[600],
            }}
          >
            {slide.description}
          </Text>
        )}

        <View className="gap-y-3">
          {slide.options?.map((option: Option, index: number) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <AnimatedOption
                key={option.id}
                option={option}
                index={index}
                isSelected={isSelected}
                onSelect={() => handleOptionSelect(option.id)}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

export const FeaturesSlide: React.FC<SlideProps> = ({
  slide,
  slideAnimation,
  colors,
  isDarkMode,
}) => {
  const slideAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: slideAnimation.value,
      transform: [
        {
          translateX: interpolate(
            slideAnimation.value,
            [0, 1],
            [width * 0.1, 0]
          ),
        },
      ],
    };
  });

  return (
    <View style={{ width }} className="flex-1 px-6 pt-6">
      <Animated.View style={[slideAnimStyle]} className="flex-1">
        <Text
          className="text-3xl font-bold mb-3"
          style={{ color: isDarkMode ? colors.white : colors.gray[900] }}
        >
          {slide.title}
        </Text>
        <Text
          className="text-base mb-8"
          style={{
            color: isDarkMode ? colors.gray[400] : colors.gray[600],
          }}
        >
          {slide.description}
        </Text>

        <View className="mb-6">
          {slide.features?.map((feature: Feature, index: number) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              feature={feature.text}
              index={index}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
