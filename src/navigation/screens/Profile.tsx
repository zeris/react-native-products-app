import { Text, Button } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { useUser } from '../../context/userContext';


export function Profile() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Text>{user?.username}'s Profile</Text>
      <Button screen='EditProfile'>Edit Profile</Button>
      <Button screen='Settings'>Settings</Button>
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
});
