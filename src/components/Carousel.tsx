import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ImageViewer } from './ImageViewer';

type Props = {
  images: string[];
}

const { width } = Dimensions.get('window');

export const Carousel = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  const scrollToImage = (imageIndex: number) => {
    flatListRef.current?.scrollToOffset({
      offset: width * imageIndex,
      animated: true
    });
  };

  const { colors } = useTheme();

  return (
    <View style={[styles.container] }>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => setViewerVisible(true)}
          >
            <Image 
              source={{ uri: item }} 
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />

      <View style={styles.pagination} pointerEvents="box-none">
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => scrollToImage(i)}
          >
            <View style={[
              styles.dot,
              { backgroundColor: i === index ? colors.primary : colors.text },
              i === index && styles.dotActive
            ]} />
          </TouchableOpacity>
        ))}
      </View>

      <ImageViewer
        isVisible={viewerVisible}
        imageUrl={images[index]}
        onClose={() => setViewerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
  image: {
    width,
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
});