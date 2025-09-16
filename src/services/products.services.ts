import { axiosClient } from "../implementations/axiosClient";

const getProducts = () => axiosClient.get('products');

export default {
   getProducts,
}