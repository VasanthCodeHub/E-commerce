import React from "react";
import {  Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  item: {
    name: string;
    description: string;
    image: any;

  };
};

const CategoryCard = ({ item }: Props) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
