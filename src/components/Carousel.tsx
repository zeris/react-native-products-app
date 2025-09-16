import { StaticScreenProps } from '@react-navigation/native';
import { View, StyleSheet, Image, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState } from 'react';

type Props = {
   images: string[]
}
const { width } = Dimensions.get('window');

export const Carousel = ({ images }: Props) => {
   const [index, setIndex] = useState(0);

   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setIndex(index);
   };


   return (
   <View>
      <FlatList 
         data={images}
         style={styles.carousel}
         renderItem={({item}) => (
            <Image source={{ uri: item }} style={styles.image} />
         )}
         horizontal
         pagingEnabled
         keyExtractor={(item, index) => index.toString()}
         showsHorizontalScrollIndicator={false}
         scrollEventThrottle={5}
         onScroll={handleScroll}
         onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndex(newIndex);
         }}
      />
      <View style={styles.dots}>
         {images.map((_, i) => (
            <View
            key={i}
            style={[styles.dot, { opacity: i === index ? 1 : 0.3 }]}
            />
         ))}
      </View>
   </View>
   );
}

const styles = StyleSheet.create({
  carousel: {
   height: '84%',
   width: 'auto',
   backgroundColor: '#ffffff',
  },
  image: {
   width,
   height: 'auto',
   resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});