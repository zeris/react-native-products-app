import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useUser } from '../../context/userContext';
import SecureStorage from '../../implementations/secureStorage';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export function Profile() {
  const { user, clearUser } = useUser();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  
  const handleLogout = async () => {
    try {
      await SecureStorage.remove('accessToken');
      await clearUser();
      // reset navigation stack to Login
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) {
      console.error('Logout failed', e);
    }
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}> 
        {user?.image && (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        )}
        <Text style={[styles.title, { color: colors.text }]}>{user?.firstName ?? 'User'}</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>{user?.username}</Text>
        <View style={styles.actionsColumn}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[styles.actionText, { color: colors.background }]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButtonOutline, { borderColor: colors.border, marginTop: 10 }]} onPress={() => navigation.navigate('Settings')}>
            <Text style={[styles.actionTextOutline, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButtonOutline, { borderColor: colors.border, marginTop: 10 }]} onPress={handleLogout}>
            <Text style={[styles.actionTextOutline, { color: colors.text }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  card: {
    width: '92%',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 12,
    fontSize: 14,
    opacity: 0.8,
  },
  actions: {
    marginTop: 16,
    width: '100%',
    // column layout for buttons
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
  },
  actionButton: {
  width: '100%',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  },
  actionButtonOutline: {
  width: '100%',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: 'transparent',
  },
  actionsColumn: {
    width: '100%',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  actionText: {
    fontWeight: '600',
  },
  actionTextOutline: {
    fontWeight: '600',
  },
});
