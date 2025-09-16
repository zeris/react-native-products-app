import * as SecureStorage from 'expo-secure-store';

const set = (key: string, value: string) : Promise<void> => {
   return SecureStorage.setItemAsync(key, value);
}

const get = (key: string) : Promise<string | null> => {
   return SecureStorage.getItemAsync(key);
}

const remove = (key: string) : Promise<void> => {
   return SecureStorage.deleteItemAsync(key);
}

export default {
   set,
   get,
   remove,
}