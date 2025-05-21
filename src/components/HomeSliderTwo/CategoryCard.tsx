import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  item: {
    id: string;
    name: string;
    brand?: string;
    price: string;
    originalPrice: string;
    discount: string;
    images: any[]; // array of image sources
  };
};

const CategoryCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      {/* Image Section */}
      <View style={styles.imageRow}>
        <Image source={item.images[0]} style={styles.mainImage} />
        <View style={styles.sideImages}>
          <Image source={item.images[1]} style={styles.sideImage} />
         <View style={styles.sideImage}>
         
           <Text style={styles.plusText}>+{item.images.length - 1}</Text>
           
         </View>
        </View>
      </View>

      {/* Info Section */}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.brand}>{item.brand || "Brand Name"}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.oldPrice}>{item.originalPrice}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.discount}>({item.discount})</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.wishlist}>
          <Text style={styles.wishlistText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToBag}>
          <Text style={styles.addToBagText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard;
