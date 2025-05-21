import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IMAGES from "../../assets/images";
import Slider from "../../components/Slider";
import HomeSlider from "../../components/HomeSlider";
import HomeSliderTwo from "../../components/HomeSliderTwo";


const categories = [
  { id: '1', name: 'Categories', image: require('../../assets/images/categories.png') },
  { id: '2', name: 'Mens', image: require('../../assets/images/1.png') },
  { id: '3', name: 'Women', image: require('../../assets/images/2.png') },
  { id: '4', name: 'Kids', image: require('../../assets/images/3.png') },
  { id: '5', name: 'Western clothing', image: require('../../assets/images/4.png') },
  { id: '6', name: 'Styles', image: require('../../assets/images/5.png') },
  { id: '7', name: 'Habibbi', image: require('../../assets/images/6.png') },
  { id: '8', name: 'Gen-z', image: require('../../assets/images/7.png') },
];

const HomeScreen = ({ navigation }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.storyItem}>
      <Image source={item.image} style={styles.storyImage} />
      <Text style={styles.storyLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (

    <View style={styles.container}>

<View style={styles.header}>
  <View style={styles.leftHeader}>
    <Image style={styles.userImage} source={IMAGES.USERPROFLIE} />
    <Text style={styles.heading}>Jack</Text>
  </View>
  <Image style={styles.searchIcon} source={IMAGES.SEARCH} />
</View>

      <ScrollView>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storyList}
        />
        <View style={styles.banner} >
    
       <Slider/>
       <HomeSlider/>
       <Text style = {styles.collectionText}>Our Collection</Text>
       <HomeSliderTwo/>
     
       
     </View>

      </ScrollView>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
 
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 20,
  marginTop: 10,
},
  collectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 1,
    marginBottom: 10,
  },
 banner: {
  marginTop: 20,
},

  leftHeader: {
  flexDirection: 'row',
  alignItems: 'center',
},
  userImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  marginRight: 10,
},
  heading: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},

  searchIcon: {
  width: 20,   
  height: 20,
  resizeMode: 'contain',
}, 

  storyList: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
    
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Rounded image
    borderWidth: 2,
    borderColor: '#ccc',
  },
   
  storyLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },
});