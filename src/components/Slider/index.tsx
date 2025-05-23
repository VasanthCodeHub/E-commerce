import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import SliderItem from "./SliderItem";
import { useSliderData } from "../data/useSliderData";

const { width } = Dimensions.get("window");

const Slider = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { images, loading } = useSliderData();

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); 
    return () => clearInterval(interval); 
     
  }, [currentIndex]);
    if (loading) return null;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => <SliderItem imageUrl={item.url} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

export default Slider;
