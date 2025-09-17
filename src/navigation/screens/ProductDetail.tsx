import { StaticScreenProps } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useProducts } from '../../stores/useProducts';
import { Carousel } from '../../components/Carousel';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = StaticScreenProps<{productId: string}>;
const { width } = Dimensions.get('window');

export function ProductDetail({ route }: Props) {
  const { productId } = route.params;
  const { products } = useProducts();
  const product = products.find(p => p.id === productId);

  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);
  const CARD_INITIAL_POSITION = -70; // initial position above carousel
  const MAX_PULL_UP = -280; // maximum distance to pull up

  const gesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newPosition = startY.value + event.translationY;
      translateY.value = Math.max(MAX_PULL_UP, Math.min(0, newPosition));
    })
    .onEnd(() => {
      const shouldSnapToTop = translateY.value < MAX_PULL_UP / 2;
      translateY.value = withSpring(
        shouldSnapToTop ? MAX_PULL_UP : 0,
        { damping: 20 }
      );
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Carousel Section - Fixed position */}
      <View style={styles.carouselSection}>
        <Text style={styles.productTitle}>{product?.title}</Text>
        <Text style={styles.productSku}>SKU: {product?.sku}</Text>
        <Carousel images={product?.images ?? []} />
      </View>

      {/* Info Card Section - Animated */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.infoCard, animatedStyle]}>
        <View style={styles.priceSection}>
          <Text style={styles.price}>${product?.price}</Text>
          <Text style={styles.stock}>
            Stock: <Text style={styles.stockValue}>{product?.stock}</Text>
          </Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.infoBox}>
            <Text style={styles.description}>{product?.description}</Text>
            
            <View style={styles.productMetadata}>
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Category</Text>
                <Text style={styles.metadataValue}>{product?.category}</Text>
              </View>
              
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Brand</Text>
                <Text style={styles.metadataValue}>{product?.brand}</Text>
              </View>
              
              <View style={styles.metadataItem}>
                <Text style={styles.metadataLabel}>Rating</Text>
                <Text style={styles.metadataValue}>{product?.rating}</Text>
              </View>
            </View>
          </View>
        </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselSection: {
    height: 300,
    backgroundColor: '#000',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productSku: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
    opacity: 0.8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 70,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceSection: {
    marginBottom: 20,
  },
  price: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'right',
    color: '#2c3e50',
  },
  stock: {
    fontSize: 16,
    textAlign: 'right',
    color: '#7f8c8d',
  },
  stockValue: {
    fontWeight: '600',
    color: '#2ecc71',
  },
  descriptionSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 16,
  },
  productMetadata: {
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
});