import { axiosClient } from '../implementations/axiosClient';
import { LoginParams, LoginResponse } from '../interfaces/Auth';

const Login = ({ username, password }: LoginParams): Promise<LoginResponse> => axiosClient.post('auth/login', { username, password, expiresInMin: 30 });
const getAuthUser = (token: string): Promise<LoginResponse> => axiosClient.get('auth/me', { headers: { Authorization: `Bearer ${token}` } });

export default {
   Login,
   getAuthUser,
}