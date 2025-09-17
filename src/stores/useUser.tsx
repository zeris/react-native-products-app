import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/userContext';
import { User } from '../interfaces/User';
import { UserProviderProps, UserContextType } from '../interfaces/Context';

const USER_STORAGE_KEY = '@user_data';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    }
  };

  const setUser = async (newUser: User | null) => {
    try {
      if (newUser) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      }
      setUserState(newUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUserState(null);
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};