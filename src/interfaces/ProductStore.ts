import { Product } from "./Product";

export interface ProductStore {
   products: Product[]
   setProducts: (products: Product[]) => void;
}