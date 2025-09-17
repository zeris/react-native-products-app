import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput, Pressable, Image } from 'react-native';
import { useUser } from '../../context/userContext';
import { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export function EditProfile() {
   const { user, setUser } = useUser();
   const [firstName, setFirstName] = useState(user?.firstName || '');
   const [lastName, setLastName] = useState(user?.lastName || '');
   const [gender, setGender] = useState(user?.gender || '');
   const [email, setEmail] = useState(user?.email || '');
      const [localImage, setLocalImage] = useState<string | null>(user?.image ?? null);
   const navigation = useNavigation<any>();
   const { colors } = useTheme();
   

   const handleSave = () => {
      if (!user) {
         return;
      }

      setUser({
         ...user,
         id: user.id, // Ensure id is always present
         firstName,
         lastName,
         gender,
         email,
            image: localImage ?? user.image ?? '', // save selected image if any
      });

      navigation.goBack();
   };

   const handleCancel = () => {
      setFirstName('');
      setLastName('');
      setGender('');
      setEmail('');
      navigation.goBack();
   }

   return (
      <View style={[styles.container, { backgroundColor: colors.background }] }>
         <View style={[styles.card, { backgroundColor: colors.card }] }>
                   <View style={styles.avatarRow}>
                      {localImage ? (
                         <Image source={{ uri: localImage }} style={styles.avatarPreview} />
                      ) : (
                         user?.image ? <Image source={{ uri: user.image }} style={styles.avatarPreview} /> : null
                      )}
                      <View style={{ flex: 1, marginLeft: 12 }}>
                               <Pressable onPress={async () => {
                                  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                                  if (status !== 'granted') return;
                                  const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
                                  // new API returns { canceled, assets: [{uri}] }
                                  const uri = (res as any)?.assets?.[0]?.uri ?? (res as any)?.uri;
                                  if (uri) setLocalImage(uri as string);
                               }} style={[styles.smallButton, { backgroundColor: colors.primary }]}>
                            <Text style={{ color: colors.background, textAlign: 'center' }}>Choose Photo</Text>
                         </Pressable>
                               <Pressable onPress={async () => {
                                  const { status } = await ImagePicker.requestCameraPermissionsAsync();
                                  if (status !== 'granted') return;
                                  const res = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
                                  const uri = (res as any)?.assets?.[0]?.uri ?? (res as any)?.uri;
                                  if (uri) setLocalImage(uri as string);
                               }} style={[styles.smallButtonOutline, { borderColor: colors.border, marginTop: 8 }]}>
                            <Text style={{ color: colors.text, textAlign: 'center' }}>Take Photo</Text>
                         </Pressable>
                      </View>
                   </View>
            <Text style={[styles.label, { color: colors.text }]}>First name</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={firstName} onChangeText={setFirstName} />

            <Text style={[styles.label, { color: colors.text }]}>Last name</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={lastName} onChangeText={setLastName} />

            <Text style={[styles.label, { color: colors.text }]}>Gender</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={gender} onChangeText={setGender} />

            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput style={[styles.input, { color: colors.text, borderColor: colors.border }]} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <View style={styles.controls}>
               <Pressable onPress={handleSave} style={[styles.btn, { backgroundColor: colors.primary }] }>
                  <Text style={{ color: colors.background, fontWeight: '600' }}>Save</Text>
               </Pressable>
               <Pressable onPress={handleCancel} style={[styles.btn, { backgroundColor: colors.notification }] }>
                  <Text style={{ color: colors.background, fontWeight: '600' }}>Cancel</Text>
               </Pressable>
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
      padding: 16,
  },
   card: {
      width: '100%',
      borderRadius: 12,
      padding: 16,
   },
   label: {
      fontSize: 14,
      marginTop: 8,
   },
   input: {
      width: '100%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 6,
   },
   controls: {
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'stretch',
   gap: 12,
   marginTop: 16,
   },
   btn: {
   width: '100%',
   paddingVertical: 12,
   borderRadius: 8,
   alignItems: 'center',
   },
   avatarRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
   },
   avatarPreview: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#ddd',
   },
   smallButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
   },
   smallButtonOutline: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
   },
   
});
