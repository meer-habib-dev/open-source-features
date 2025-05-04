import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useColorScheme } from '@/hooks/useColorScheme';
interface CustomImageProps {
  source: string | { uri: string };
  style?: StyleProp<ViewStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  transition?: number;
  className?: string;
  showSkeleton?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  style,
  contentFit = 'cover',
  transition = 300,
  className = '',
  showSkeleton = true,
}) => {
  const { theme, colors, isDarkMode } = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  // Handle source in different formats
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <View style={[styles.container, style]} className={className}>
      {showSkeleton && isLoading && (
        <View
          style={[
            styles.skeleton,
            {
              backgroundColor: isDarkMode ? '#333333' : colors.gray[200],
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <ActivityIndicator
            size="small"
            color={isDarkMode ? colors.gray[400] : colors.gray[500]}
          />
        </View>
      )}

      <Image
        source={imageSource}
        style={StyleSheet.absoluteFill}
        contentFit={contentFit}
        transition={transition}
        cachePolicy="memory-disk"
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        recyclingKey={
          typeof imageSource === 'object' ? imageSource.uri : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  skeleton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomImage;
