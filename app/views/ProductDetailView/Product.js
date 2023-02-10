import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Product = React.memo(({ item, onPressItem }) => (
  <TouchableOpacity style={styles.productContainer} onPress={onPressItem}>
    <View style={styles.productImageContainer}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productKanaTitle}>{item.name_kana}</Text>
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  </TouchableOpacity>
));

export default Product;
