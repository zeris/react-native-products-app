import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type Props = {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

export const ImageViewer = ({ isVisible, imageUrl, onClose }: Props) => {
  const { colors } = useTheme();
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={[styles.container, { backgroundColor: colors.card + 'E6' }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color={colors.text} />
        </TouchableOpacity>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});