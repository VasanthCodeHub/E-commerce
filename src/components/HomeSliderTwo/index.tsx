import React from "react";
import { View, FlatList } from "react-native";
import CategoryCard from "./CategoryCard";
import { styles } from "./styles";
import { categories } from "../data/categoriesData2";



const HomeSliderTwo = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeSliderTwo;
