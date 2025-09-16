import { create } from 'zustand';
import { ProductStore } from '../interfaces/ProductStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useProducts = create<ProductStore>((set) => ({
   products: [],
   setProducts: async (products) => {
      set({ products });
      await AsyncStorage.setItem('products', JSON.stringify(products));
   }
}));

export const usePersistProductsStore = create<ProductStore>()(
   persist((set) => ({
      products: [],
      setProducts: (products) => set({ products })
   }), {
      name: 'products',
      storage: createJSONStorage(() => AsyncStorage),
   })
)