import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors, isDarkMode } = useColorScheme();

  // Size styles
  const sizeStyles = {
    sm: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 14,
    },
    md: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 16,
    },
    lg: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      fontSize: 18,
    },
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: disabled
              ? isDarkMode
                ? colors.gray[700]
                : colors.gray[300]
              : colors.primary[600],
          },
          text: {
            color: colors.white,
          },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: disabled
              ? isDarkMode
                ? colors.gray[700]
                : colors.gray[300]
              : colors.secondary[500],
          },
          text: {
            color: colors.white,
          },
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: disabled
              ? isDarkMode
                ? colors.gray[700]
                : colors.gray[300]
              : colors.primary[600],
          },
          text: {
            color: disabled
              ? isDarkMode
                ? colors.gray[600]
                : colors.gray[400]
              : colors.primary[600],
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: disabled
              ? isDarkMode
                ? colors.gray[600]
                : colors.gray[400]
              : colors.primary[600],
          },
        };
      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-lg ${fullWidth ? 'w-full' : ''}`}
      style={[
        {
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
        variantStyles.container,
        style,
      ]}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'outline' || variant === 'ghost'
                ? colors.primary[600]
                : colors.white
            }
            className="mr-2"
          />
        ) : (
          iconPosition === 'left' &&
          icon && <View className="mr-2">{icon}</View>
        )}

        <Text
          className="font-medium text-center"
          style={[{ fontSize: sizeStyles[size].fontSize }, variantStyles.text]}
        >
          {title}
        </Text>

        {iconPosition === 'right' && icon && !loading && (
          <View className="ml-2">{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}
