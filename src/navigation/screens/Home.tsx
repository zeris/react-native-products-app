import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, Image } from 'react-native';
import { useState, useEffect } from 'react'
import productsService from '../../services/products.services';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../../interfaces/Product';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../stores/useProducts';

export function Home() {
  const { products, setProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(true);

  const findProducts = async () => {
    try {
      const response = await productsService.getProducts() as { products: Product[] };
      setProducts(response.products);
    }
    catch (e: any) {
      console.log(e);
    }
  }

  useEffect(()=>{
    findProducts();
  }, [])

  useEffect(()=>{
    if(products.length > 0) {
      setIsLoading(false);
    }
  }, [products])

  return (
    <View style={styles.container}>
      { !isLoading &&
        <SafeAreaView style={{ paddingTop: -40 }}>
          <FlatList
            data={products}
            renderItem={({item}) => <ProductCard product={item} />}
            keyExtractor={(item:any) => item.id }
            style={styles.cardsContainer}
          />
        </SafeAreaView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#d8d8d8ff'
  },
  cardsContainer: {
    height: '100%',
    padding: 10,
    top: 0,
  },
});
