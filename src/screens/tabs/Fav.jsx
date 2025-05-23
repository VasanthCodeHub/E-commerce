
import React from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import { useWishlist } from "../../context/WishlistContext";

const FavouriteScreen = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Your wishlist is empty.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlist}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (

       
        <View style={styles.card}>
          <Image source={{ uri: item.images[0] }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
       
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60, height: 60, borderRadius: 8
  },
  info: {
    marginLeft: 12, justifyContent: 'center'
  },
  name: {
    fontSize: 16, fontWeight: '600', color: '#333'
  },
  brand: {
    fontSize: 14, color: '#888'
  },
  price: {
    fontSize: 16, fontWeight: 'bold', color: '#000'
  }
});

export default FavouriteScreen;
