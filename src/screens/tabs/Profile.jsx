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
      <Text style={styles.heading}>
        Jack
        </Text>
            </View>
            <TouchableOpacity 
            onPress={ () => confirmLogout()
            }>
                <Image style={styles.logoutIcon} source={IMAGES.LOGOUT} />
            </TouchableOpacity>
    
          </View>

     </View>

    )

}

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

  logoutIcon: {
  width: 20,   
  height: 20,
  resizeMode: 'contain',
}, 


 
});
export default UserScreen;