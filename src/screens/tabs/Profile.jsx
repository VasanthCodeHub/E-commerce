import React, {useEffect, useState} from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert, 
  ActivityIndicator,
}
from "react-native";
import IMAGES from "../../assets/images";
import auth from "@react-native-firebase/auth";
import SCREENS from "..";

const UserScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [error, setError] = useState(null);

   // Fetch quote
  useEffect(() => {

    let intervalId;
    const fetchQuote = async () => {
      try {
       const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        setQuote({
           text: data[0].q,
          author: data[0].a,
        });
        setError(null); // Clear previous errors
      } catch (err) {
        setError("Failed to fetch quote");
        console.error(err);
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
    intervalId = setInterval(fetchQuote, 15000);
    
    return () => clearInterval(intervalId);
  }, []);


  // Track user authentication state
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return subscriber;
  }, []);

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: logout },
      ],
      { cancelable: true }
    );
  };

  const logout = async () => {
    try {
      await auth().signOut();
      navigation.replace(SCREENS.SIGNUP);
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Failed", "Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
return (
  <View style={styles.container}>
    
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Image style={styles.userImage} source={IMAGES.USERPROFLIE} />
        <Text style={styles.userName}>Jack</Text>
      </View>
      <TouchableOpacity onPress={() => confirmLogout()}>
        <Image style={styles.logoutIcon} source={IMAGES.LOGOUT} />
      </TouchableOpacity>
    </View>

    {/* Menu Items */}
    <View style={styles.menuContainer}>
    
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.SHOP} />
          <Text style={styles.menuText}>My Orders</Text>
        </View>
        <View style={styles.rightContent}> 
          <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => navigation.navigate('FavouriteScreen')}
      style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.FAVOURITE} />
          <Text style={styles.menuText}>Wishlist</Text>
        </View>
        <View style={styles.rightContent}>
          <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => navigation.navigate('DeliveryAddressScreen')}
      style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.LOCATION} />
          <Text style={styles.menuText}>Delivery Address</Text>
        </View>
        <View style={styles.rightContent}>       
          <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.PAYMENT} />
          <Text style={styles.menuText}>Payment Methods</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.OFFER} />
          <Text style={styles.menuText}>My Offers</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.NOTIFICATION} />
          <Text style={styles.menuText}>Notifications</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.SETTING} />
          <Text style={styles.menuText}>Settings</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.HELP} />
          <Text style={styles.menuText}>Help</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>   
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuContent}>
          <Image style={styles.menuIcon} source={IMAGES.ABOUT} />
          <Text style={styles.menuText}>About</Text>
        </View>
        <Image style={styles.arrowIcon} source={IMAGES.ARROW} />
      </TouchableOpacity>

    </View>

    {/* Quote Section */}
      <View style={styles.quoteContainer}>
        <View style={styles.quoteItem}>
          {loadingQuote ? (
            <ActivityIndicator size="small" color="#4a6fa5" />
          ) : error ? (
            <Text style={styles.quoteText}>Failed to load quote</Text>
          ) : (
            <>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.authorText}>- {quote.author}</Text>
            </>
          )}
        </View>
      </View>

  


     <View style={styles.container}>
    <View style={styles.policyContainer}>
      <Text style={styles.policyText}>
        Privacy Policy | Terms and Conditions
      </Text>
    </View>
  </View>
     
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    tintColor: '#666',
  },
  menuContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
    tintColor: '#555',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
   policyContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  policyText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },


  quoteContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  quoteItem: {
    width: "90%",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#4a6fa5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 8,
  },
  authorText: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "400",
    color: "#666",
  },

 
});



export default UserScreen;



