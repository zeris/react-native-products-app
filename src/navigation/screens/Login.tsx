import { Text, Button } from '@react-navigation/elements';
import { StyleSheet, View, TextInput } from 'react-native';
import AuthServices from '../../services/auth.services';
import { useState, useEffect } from 'react';
import SecureStorage from '../../implementations/secureStorage';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/userContext'; 
import { User } from '../../interfaces/User';
import { LoginResponse } from '../../interfaces/Auth';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();
  const { setUser } = useUser();

  const handleAutoLogin = async () => {
    let token;
    try {
      token = await SecureStorage.get('accessToken');
      if (typeof token !== 'string' || !token) {
        return;
      }
    }
    catch (e) {
      console.log(e);
      return;
    }
    
    try {
      const response = await AuthServices.getAuthUser(token);
      if (response) {
        navigation.navigate('HomeTabs');
        return;
      }
    }
    catch (e) {
      console.log(e);
      return
    }
  }

  const handleSaveUser = (userData: User) => {
    try {
      setUser(userData);
    }
    catch (e) {
      console.log(e);
    }
  }

  const onLogin = async () => {
    try {
      const response = await AuthServices.Login ({ username: username, password: password });
      if(response) {
        await SecureStorage.set('accessToken', response.accessToken);
        await handleSaveUser({...response})
        navigation.navigate('HomeTabs');
        return;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleAutoLogin();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Osteo App</Text>
      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername}/>
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword}/>
      <Button onPress={onLogin}>Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
