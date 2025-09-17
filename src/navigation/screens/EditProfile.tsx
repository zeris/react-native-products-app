import { Text, Button } from '@react-navigation/elements';
import { StyleSheet, View, TextInput } from 'react-native';
import { useUser } from '../../context/userContext';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function EditProfile() {
   const { user, setUser } = useUser();
   const [username, setUsername] = useState(user?.username || '');
   const [firstName, setFirstName] = useState(user?.firstName || '');
   const [lastName, setLastName] = useState(user?.lastName || '');
   const [gender, setGender] = useState(user?.gender || '');
   const [email, setEmail] = useState(user?.email || '');
   const navigation = useNavigation<any>();
   

   const handleSave = () => {
      if (!user) {
         return;
      }

      setUser({
         ...user,
         id: user.id, // Ensure id is always present
         username,
         firstName,
         lastName,
         gender,
         email,
         image: user.image ?? '', // Ensure image is always a string
      });

      navigation.goBack();
   };

   const handleCancel = () => {
      setUsername('');
      setFirstName('');
      setLastName('');
      setGender('');
      setEmail('');
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
         <TextInput
         value={username}
         onChangeText={setUsername}
         />
         <TextInput
         value={firstName}
         onChangeText={setFirstName}
         />
         <TextInput
         value={lastName}
         onChangeText={setLastName}
         />
         <TextInput
         value={gender}
         onChangeText={setGender}
         />
         <TextInput
         value={email}
         onChangeText={setEmail}
         />
         <Button onPress={handleSave}>Save</Button>
         <Button onPress={handleCancel}>Cancel</Button>
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
