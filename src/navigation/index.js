import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import LoginScreen from '../screens/authScreen/Login';
import SignupScreen from '../screens/authScreen/Signup';
import ForgetScreen from '../screens/authScreen/Forgetpassword';
import VerificationScreen from '../screens/authScreen/VerificationScreen';
import PasswordResetScreen from '../screens/authScreen/NewPasswordScreen';

import HomeScreen from '../screens/tabs/Home';
import SearchScreen from '../screens/tabs/Search';
import FavouriteScreen from '../screens/tabs/Fav';
import UserScreen from '../screens/tabs/Profile';

import AdminScreen from '../screens/tabs/admin';



import DeliveryAddressScreen from '../screens/DeliveryAddress/index';
import AddDeliveryAddressScreen from '../screens/DeliveryAddress/addLocation';



import SCREENS from '../screens';
import IMAGES from '../assets/images';
import COLORS from '../constants/colors'; 


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={SCREENS.HOMESCREEN}>
      <Tab.Screen
        name={SCREENS.HOMESCREEN}
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.HOME}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.SEARCH}
        component={SearchScreen}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.SEARCH}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.FAVOURITE}
        component={FavouriteScreen}
        options={{
          title: 'Wishlist',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.FAVOURITE}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.ADMIN}
        component={AdminScreen}
        options={{
          title: 'Admin',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.ADMIN}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={UserScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.USER}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT,
              }}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

// 2. Main Stack Navigator
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
       {/* This is now the entry point to the tabs */}
      <Stack.Screen name={SCREENS.MAIN_TABS} component={TabNavigator} />

      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={SCREENS.FORGETPASSWORD} component={ForgetScreen} />
      <Stack.Screen name={SCREENS.VERIFICATION} component={VerificationScreen} />
      <Stack.Screen name={SCREENS.NEWPASSWORD} component={PasswordResetScreen} />
      <Stack.Screen name={SCREENS.ADMIN} component={AdminScreen} />
      <Stack.Screen name={SCREENS.FAVOURITE} component={FavouriteScreen} />
      
      <Stack.Screen name={SCREENS.DELIVERY_ADDRESS} component={DeliveryAddressScreen} />
      <Stack.Screen name={SCREENS.ADD_ADDRESS} component={AddDeliveryAddressScreen} />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
