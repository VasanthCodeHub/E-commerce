import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import IMAGES from "../../assets/images";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image style={styles.icon} source={IMAGES.SEARCH} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity>
          <Image style={styles.icon} source={IMAGES.NOTIFICATION} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#888",
  },
});

export default SearchScreen;
