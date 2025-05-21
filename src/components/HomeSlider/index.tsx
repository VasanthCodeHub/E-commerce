import React from "react";
import { View, FlatList } from "react-native";
import { categories } from "../data/categoriesData";
import CategoryCard from "./CategoryCard";
import { styles } from "./styles";

const HomeSlider = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeSlider;
