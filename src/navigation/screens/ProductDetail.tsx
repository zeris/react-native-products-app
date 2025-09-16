import { StaticScreenProps } from '@react-navigation/native';
import { View, Text,StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { useProducts } from '../../stores/useProducts';
import { Carousel } from '../../components/Carousel';

type Props = StaticScreenProps<{productId: string}>;
const { width } = Dimensions.get('window');

export function ProductDetail({ route }: Props) {
  const { productId } = route.params;
  const { products } = useProducts();
  const product = products.find(p => p.id === productId);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 0, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', marginBlockStart: 20, marginHorizontal: 16 }} >{product?.title}, SKU: {product?.sku}</Text>
        <Carousel images={product?.images ?? []} />
      </View>
      <View style={{ paddingHorizontal: 1, flex: 1 }}>
        <View style={{ paddingHorizontal: 20, borderStartWidth: 1, borderTopWidth: 1, borderEndWidth: 1, borderStartStartRadius: 15, borderEndStartRadius: 15, flex: 1 }}>
          <Text style={{ fontSize: 40, textAlign: 'right', fontWeight: 'bold' }}>${product?.price}</Text>
          <Text style={{ fontSize: 22, textAlign: 'right' }}>On stock: {product?.stock}</Text>
          <Text style={{ fontSize: 20, textAlign: 'left', fontWeight: 'bold' }}>Description</Text>
          <View style={{ borderColor: 'gray', borderWidth: 0.5, marginVertical: 10, padding: 10 }}>
            <Text style={{ fontSize: 16, textAlign: 'justify' }}>{product?.description}</Text>
            <Text style={{ fontSize: 16, textAlign: 'justify' }}>Category: {product?.category}</Text>
            <Text style={{ fontSize: 16, textAlign: 'justify' }}>Brand: {product?.brand}</Text>
            <Text style={{ fontSize: 16, textAlign: 'justify' }}>Rating: {product?.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  carrousel: {
    height: 200,
    width: 'auto',

  },
  carrouselContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width,
    height: 'auto',
    resizeMode: 'contain',
  }
});