import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, Image, BackHandler, Platform } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react'
import productsService from '../../services/products.services';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../../interfaces/Product';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../stores/useProducts';
import { useUser } from '../../context/userContext';

export function Home() {
  const { products, setProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const { user } = useUser();
  const currentTheme = user?.preferences?.theme || 'system';

  // handle Android hardware back button: when Home is focused, exit the app
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;
      const onBackPress = () => {
        BackHandler.exitApp();
        return true; // indicates we've handled the event
      };
  const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  return () => subscription.remove();
    }, [])
  );

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
  <View style={[styles.container, { backgroundColor: colors.background }]}>
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
