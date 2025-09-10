import axios from "axios";
import { HttpClient } from "../interfaces/HttpClient";

const axiosInstances = axios.create({
   baseURL: 'https://dummyjson.com', // Replace with your API base URL
   timeout: 10000, // Set a timeout for requests
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosInstances.interceptors.request.use(
   (request) => {
      return request;
   },
   (error: any) => {
      return Promise.reject(error.response || error);
   }
);

axiosInstances.interceptors.response.use(
   (response) => {
      return response;
   },
   (error: any) => {
      return Promise.reject(error.response || error);
   }
);

export const axiosClient: HttpClient = {
   get: async <T>(url: string, config?: any): Promise<T> => {
      const response = await axiosInstances.get<T>(url, config);
      return response.data;
   },
   post: async <T>(url: string, config?: any): Promise<T> => {
      const response = await axiosInstances.post<T>(url, config);
      return response.data;
   },
   put: async <T>(url: string, config?: any): Promise<T> => {
      const response = await axiosInstances.put<T>(url, config);
      return response.data;
   },
   delete: async <T>(url: string, config?: any): Promise<T> => {
      const response = await axiosInstances.delete<T>(url, config);
      return response.data;
   }
}