import { createContext,  useContext } from 'react';
import { UserContextType } from '../interfaces/Context';


export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  clearUser: () => null,
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};