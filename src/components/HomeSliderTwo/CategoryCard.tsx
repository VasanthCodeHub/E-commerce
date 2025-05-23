import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useWishlist } from "../../context/WishlistContext";


const CategoryCard = ({ item }: Props) => {


  const { addToWishlist } = useWishlist();

  return (
    <View style={styles.card}>
      <View style={styles.imageRow}>
        <Image source={{ uri: item.images[0] }} style={styles.mainImage} />
        <View style={styles.sideImages}>
          <Image source={{ uri: item.images[1] }} style={styles.sideImage} />
          <Image source={{ uri: item.images[2] }} style={styles.sideImage} />
          {/*<View style={styles.sideImage}>
            <Text style={styles.plusText}>+{item.images.length - 1}</Text>
          </View>*/}
        </View>
      </View>

      <Text style={styles.name}>{item.name || "Category"}</Text>
      <Text style={styles.brand}>{item.brand || "Brand Name"}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.oldPrice}>{item.originalPrice}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.discount}>({item.discount})</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.wishlist}>
          <Text style={styles.wishlistText}
          onPress={() => addToWishlist(item)}
          
          >Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToBag}>
          <Text style={styles.addToBagText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard; 
