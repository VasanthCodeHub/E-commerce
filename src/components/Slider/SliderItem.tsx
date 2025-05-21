import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

type Props = {
  imageUrl: string;
};

const SliderItem = ({ imageUrl }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});
