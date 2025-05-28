import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
} from "react-native";
import IMAGES from "../../assets/images";

const SUGGESTIONS = [
  // Common Clothing Items
  "Shirt", "T-Shirt", "Pants", "Jeans", "Shorts", "Dress", "Skirt",
  "Jacket", "Coat", "Blazer", "Hoodie", "Sweater", "Cardigan",
  "Tracksuit", "Overalls", "Jumpsuit", "Leggings", "Dungarees",
  
  // Formal & Workwear
  "Work Attire", "Suit", "Tie", "Bow Tie", "Vest", "Tuxedo", "Blouse", "Office Skirt",
  
  // Footwear
  "Shoes", "Boots", "Sandals", "Heels", "Sneakers", "Flats", "Loafers", "Slippers", "Flip Flops",
  
  // Undergarments
  "Underwear", "Lingerie", "Bra", "Boxers", "Briefs", "Thermals",
  
  // Nightwear & Loungewear
  "Sleepwear", "Pajamas", "Nightgown", "Robe", "Loungewear",
  
  // Sports & Swimwear
  "Activewear", "Sports Bra", "Yoga Pants", "Gym Shorts", "Swimsuit", "Bikini", "Swim Trunks", "Rash Guard",
  
  // Ethnic & Cultural Wear
  "Sari", "Kurta", "Kimono", "Hanbok", "Abaya", "Dashiki", "Cheongsam", "Lehenga", "Sherwani",
  
  // Accessories
  "Accessories", "Bag", "Hat", "Cap", "Scarf", "Belt", "Sunglasses", "Gloves", "Watch", "Jewelry", "Earrings",
  
  // Seasonal & Weather-based
  "Raincoat", "Snow Boots", "Winter Coat", "Thermal Wear", "Windbreaker", "Sun Hat",
  
  // Baby & Kids
  "Onesie", "Baby Suit", "Kids T-Shirt", "Toddler Pants", "Baby Hat",
  
  // Gender/Style Specific
  "Unisex", "Male", "Female", "Teen", "Baby", "Maternity Wear"
];

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (text) => {
    setSearch(text);
    if (text.length > 0) {
      const filtered = SUGGESTIONS.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (item) => {
    setSearch(item);
    setShowSuggestions(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image style={styles.icon} source={IMAGES.SEARCH} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearchChange}
          onFocus={() => search.length > 0 && setShowSuggestions(true)}
        />
        <TouchableOpacity>
          <Image style={styles.icon} source={IMAGES.NOTIFICATION} />
        </TouchableOpacity>
      </View>

      {showSuggestions && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionPress(item)}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
          keyboardShouldPersistTaps="handled"
        />
      )}
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
  suggestionList: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchScreen;
