import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Product } from '../interfaces/Product';

type Props = {
   product: Product
}

export const ProductCard = ({ product }: Props) => {
   const navigation = useNavigation<any>();
   const { colors } = useTheme();

   return (
   <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
         onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
         activeOpacity={0.8}
      >
         <View style={styles.cardImage}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
         </View>
         <View style={styles.cardContent}>
            <Text style={[{ fontWeight: 'bold', fontSize: 14, color: colors.text }]} ellipsizeMode='tail' numberOfLines={1}>{product.title}</Text>
            <Text style={[{ textAlign: 'right', fontSize: 22, color: colors.text } ]}>${product.price}</Text>
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: 'auto',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#ffffffb9',
    marginBlock: 5,
    borderRadius: 15,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
  },
   cardContent: {
    width: '55%',
    height: '100%',
    flexWrap: 'nowrap',
    padding: 15,
  },
  image: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  }
});
