import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import AuthServices from '../../services/auth.services';
import { useState, useEffect } from 'react';
import SecureStorage from '../../implementations/secureStorage';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/userContext'; 
import { User } from '../../interfaces/User';
import { useAutoLogin } from '../../hooks/useAutoLogin';
import { useTheme } from '@react-navigation/native';


export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderInputs, setShouldRenderInputs] = useState(false);
  const navigation = useNavigation<any>();
  const { setUser } = useUser();
  const { handleAutoLogin } = useAutoLogin();
  const { colors } = useTheme();


  const isTokenStored = async () => {
    const isTokenAlive = await handleAutoLogin();
    setShouldRenderInputs(!isTokenAlive);
  }
  useEffect(() => {
    isTokenStored()
  }, [])

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
        // store token in SecureStorage
        await SecureStorage.set('accessToken', response.accessToken);
        // set user in context (which persists to AsyncStorage internally)
        handleSaveUser({
          ...response,
          preferences: {
            theme: undefined
          }
        });
        navigation.navigate('HomeTabs');
        return;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }] }>
      { shouldRenderInputs &&
        <View style={[styles.card, { backgroundColor: colors.background }] }>
          <Text style={[styles.title, { color: colors.text }]}>Products App</Text>
          <TextInput placeholder="Username" placeholderTextColor={colors.text} style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={username} onChangeText={setUsername}/>
          <TextInput placeholder="Password" placeholderTextColor={colors.text} style={[styles.input, { color: colors.text, borderColor: colors.border }]} secureTextEntry value={password} onChangeText={setPassword}/>

          <View style={styles.controls}>
            <Pressable onPress={onLogin} style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
              <Text style={[styles.primaryText, { color: colors.background }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  controls: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: {
    fontWeight: '600',
    fontSize: 16,
  }
});
