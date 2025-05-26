import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useWishlist } from "../../context/WishlistContext";


const CategoryCard = ({ item }: Props) => {


  const { addToWishlist } = useWishlist();

  return (
    <View style={styles.card}>
      

      <View style={styles.imageRow}>
  {item.images?.[0] ? (
    <Image source={{ uri: item.images[0] }} style={styles.mainImage} />
  ) : null}

  <View style={styles.sideImages}>
    {item.images?.[1] ? (
      <Image source={{ uri: item.images[1] }} style={styles.sideImage} />
    ) : null}
    {item.images?.[2] ? (
      <Image source={{ uri: item.images[2] }} style={styles.sideImage} />
    ) : null}
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
