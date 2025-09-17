import SecureStorage from '../implementations/secureStorage';
import AuthServices from '../services/auth.services';

export const useAutoLogin = () => {

  const handleAutoLogin = async (): Promise<boolean> => {
    try {
      const token = await SecureStorage.get('accessToken');
      if (!token || typeof token !== 'string') {
         return false;
      }

      try {
         const userData = await AuthServices.getAuthUser(token);
         if (!userData) {
            return false;
         }
      }
      catch (err: any) {
         const status = err?.response?.status;
         if (status === 401) {
            try {
               await SecureStorage.remove('accessToken');
            } 
            catch (removeErr) {
               console.warn('[useAutoLogin] failed to remove expired token', removeErr);
            }
         }
         return false;
      }
      return true;
    } catch (e) {
      console.warn('autoLogin error', e);
      return false;
    }
  };

  return { handleAutoLogin };
};