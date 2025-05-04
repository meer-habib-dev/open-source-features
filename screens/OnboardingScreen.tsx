import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { surveyData } from '@/components/onboarding/surveyData';
import {
  WelcomeSlide,
  ChoiceSlide,
  FeaturesSlide,
} from '@/components/onboarding/OnboardingSlides';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { colors, isDarkMode } = useColorScheme();
  const scrollRef = useRef<ScrollView>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = surveyData.length;

  const slideAnimation = useSharedValue(0);
  const progressAnimation = useSharedValue(0);
  const buttonAnimation = useSharedValue(0);

  const [responses, setResponses] = useState<Record<string, any>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentSlide = surveyData[currentStep];

  React.useEffect(() => {
    progressAnimation.value = withSpring(currentStep / (totalSteps - 1));

    slideAnimation.value = withTiming(1, { duration: 300 });

    buttonAnimation.value = withTiming(1, { duration: 400 });

    return () => {
      slideAnimation.value = 0;
      buttonAnimation.value = 0;
    };
  }, [currentStep]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressAnimation.value * 100}%`,
    };
  });

  const buttonAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonAnimation.value,
      transform: [
        { translateY: interpolate(buttonAnimation.value, [0, 1], [10, 0]) },
      ],
    };
  });

  const handleNext = () => {
    const processCurrentStepResponses = () => {
      if (
        currentSlide.type === 'multiple-choice' &&
        selectedOptions.length > 0
      ) {
        const value = selectedOptions[0];
        setResponses({ ...responses, [currentSlide.id]: value });

        if (currentSlide.id === 'plant-experience') {
        } else if (currentSlide.id === 'goals') {
        } else if (currentSlide.id === 'frequency') {
        }
      } else if (
        currentSlide.type === 'multiple-select' &&
        selectedOptions.length > 0
      ) {
        setResponses({ ...responses, [currentSlide.id]: [...selectedOptions] });

        if (currentSlide.id === 'plant-types') {
        }
      }
    };

    slideAnimation.value = 0;

    processCurrentStepResponses();

    if (currentStep === totalSteps - 1) {
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedOptions([]);
      scrollRef.current?.scrollTo({
        x: width * (currentStep + 1),
        animated: true,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      slideAnimation.value = 0;

      setCurrentStep(currentStep - 1);
      scrollRef.current?.scrollTo({
        x: width * (currentStep - 1),
        animated: true,
      });

      const prevSlide = surveyData[currentStep - 1];
      if (prevSlide.type === 'multiple-choice' && responses[prevSlide.id]) {
        setSelectedOptions([responses[prevSlide.id]]);
      } else if (
        prevSlide.type === 'multiple-select' &&
        responses[prevSlide.id]
      ) {
        setSelectedOptions(responses[prevSlide.id]);
      } else {
        setSelectedOptions([]);
      }
    }
  };

  const handleSkip = () => {};

  const handleOptionSelect = (optionId: string) => {
    if (currentSlide.type === 'multiple-choice') {
      setSelectedOptions([optionId]);
    } else if (currentSlide.type === 'multiple-select') {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const renderSlide = () => {
    const slide = surveyData[currentStep];

    switch (slide.type) {
      case 'welcome':
        return (
          <WelcomeSlide
            slide={slide}
            slideAnimation={slideAnimation}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
            handleNext={handleNext}
            colors={colors}
            isDarkMode={isDarkMode}
          />
        );
      case 'multiple-choice':
      case 'multiple-select':
        return (
          <ChoiceSlide
            slide={slide}
            slideAnimation={slideAnimation}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
            handleNext={handleNext}
            colors={colors}
            isDarkMode={isDarkMode}
          />
        );
      case 'features':
        return (
          <FeaturesSlide
            slide={slide}
            slideAnimation={slideAnimation}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
            handleNext={handleNext}
            colors={colors}
            isDarkMode={isDarkMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: isDarkMode ? '#121212' : colors.gray[50],
      }}
    >
      {currentStep > 0 && (
        <View className="flex-row justify-between items-center px-6 pt-16 pb-4">
          <TouchableOpacity
            onPress={handleBack}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: isDarkMode
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.05)',
            }}
          >
            <ChevronLeft
              size={24}
              color={isDarkMode ? colors.gray[400] : colors.gray[600]}
            />
          </TouchableOpacity>

          <View
            className="flex-1 h-2 mx-3 rounded-full overflow-hidden"
            style={{
              backgroundColor: isDarkMode ? '#222222' : colors.gray[200],
            }}
          >
            <Animated.View
              className="h-full rounded-full"
              style={[progressStyle, { backgroundColor: colors.primary[500] }]}
            />
          </View>

          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={{ color: colors.primary[500] }}
              className="text-base font-medium"
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        className="flex-1"
      >
        {renderSlide()}
      </ScrollView>

      {currentStep > 0 && (
        <View className="items-center mb-10 px-6">
          {currentStep === 0 ? null : currentStep === totalSteps - 1 ? (
            <Animated.View style={[buttonAnimStyle, { width: '100%' }]}>
              <TouchableOpacity
                onPress={() => {}}
                className="w-full py-4 rounded-xl justify-center items-center"
                style={{ backgroundColor: colors.primary[500] }}
              >
                <Text className="text-white font-semibold text-lg">
                  Continue to Premium
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[buttonAnimStyle, { width: '100%' }]}>
              <TouchableOpacity
                onPress={handleNext}
                className="w-full py-4 rounded-xl justify-center items-center flex-row"
                style={{
                  backgroundColor:
                    selectedOptions.length > 0
                      ? colors.primary[500]
                      : colors.gray[300],
                  opacity: selectedOptions.length > 0 ? 1 : 0.7,
                }}
                disabled={
                  (currentSlide.type === 'multiple-choice' ||
                    currentSlide.type === 'multiple-select') &&
                  selectedOptions.length === 0
                }
              >
                <Text className="text-white font-semibold text-lg mr-2">
                  Continue
                </Text>
                <ChevronRight size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      )}
    </View>
  );
}
