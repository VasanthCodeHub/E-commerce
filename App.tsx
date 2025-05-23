import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './src/navigation/index'
import { WishlistProvider } from './src/context/WishlistContext';



const App = () => {
  return (
     <WishlistProvider>
       <NavigationContainer>
       <StackNavigator/>
      </NavigationContainer>
     </WishlistProvider>
    
  );
};

export default App;
