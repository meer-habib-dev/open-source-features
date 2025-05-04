import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  placeholderTextColor,
  ...props
}: InputProps) {
  const { colors, isDarkMode } = useColorScheme();
  
  return (
    <View className="mb-4">
      {label && (
        <Text
          className="mb-1 text-sm font-medium"
          style={{ color: isDarkMode ? colors.gray[300] : colors.gray[700] }}
        >
          {label}
        </Text>
      )}
      
      <View
        className="flex-row items-center border rounded-lg overflow-hidden"
        style={{
          borderColor: error
            ? colors.error[500]
            : isDarkMode
            ? colors.gray[700]
            : colors.gray[300],
          backgroundColor: isDarkMode ? colors.gray[900] : colors.white,
        }}
      >
        {leftIcon && <View className="pl-3">{leftIcon}</View>}
        
        <TextInput
          className="flex-1 py-3 px-4 text-base"
          placeholderTextColor={placeholderTextColor || (isDarkMode ? colors.gray[600] : colors.gray[400])}
          style={[
            { color: isDarkMode ? colors.white : colors.gray[900] },
            style,
          ]}
          {...props}
        />
        
        {rightIcon && <View className="pr-3">{rightIcon}</View>}
      </View>
      
      {error && (
        <Text className="mt-1 text-sm text-error-500">
          {error}
        </Text>
      )}
    </View>
  );
}