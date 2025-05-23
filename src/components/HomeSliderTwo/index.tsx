// src/components/HomeSliderTwo.tsx
import React from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import CategoryCard from "./CategoryCard";
import { useProducts } from "../data/useProducts";

const HomeSliderTwo = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0033cc" />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeSliderTwo;
