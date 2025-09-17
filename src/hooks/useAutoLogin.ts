import SecureStorage from '../implementations/secureStorage';
import AuthServices from '../services/auth.services';
import { useUser } from '../context/userContext';

export const useAutoLogin = () => {
  const { setUser } = useUser();

  const handleAutoLogin = async (): Promise<boolean> => {
    try {
      const token = await SecureStorage.get('accessToken');
      if (!token || typeof token !== 'string') return false;

      const response = await AuthServices.getAuthUser(token);
      if (response) {
        // setea usuario en el contexto; no navegamos aquí
        await setUser(response as any);
        return true;
      }
      return false;
    } catch (e) {
      console.warn('autoLogin error', e);
      return false;
    }
  };

  return { handleAutoLogin };
};