import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import IMAGES from "../../assets/images";
import SCREENS from "..";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import WEBCLIENTID from "../../constants/webclient";


  const LoginScreen = (props) => { 
  const { navigation } = props;
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const [loading, setLoading] = useState(false);
const [authError, setAuthError] = useState('');

useEffect(() => {
  GoogleSignin.configure({
  webClientId: WEBCLIENTID,
});

},[])

// SCREENS.HOME should be your defined screen route
async function onGoogleButtonPress(navigation) {
  try {
    // 1. Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // 2. Get the user's ID token
    const { idToken } = await GoogleSignin.signIn();

    // 3. Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // 4. Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);

    // 5. Navigate to home screen after successful sign-in
    navigation.replace(SCREENS.MAIN_TABS); 

  } catch (error) {
    console.error('Google Sign-In Error:', error);
    Alert.alert('Login Failed', error.message || 'Something went wrong');
  }
}



const handleRegister = () => {
  let valid = true;
  const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
  setAuthError(''); // Clear previous auth errors

  // Validation
  if (!name) {
    newErrors.name = 'Name is required';
    valid = false;
  }

  if (!email) {
    newErrors.email = 'Email is required';
    valid = false;
  }

  if (!password) {
    newErrors.password = 'Password is required';
    valid = false;
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = 'Confirm password is required';
    valid = false;
  }

  if (password && confirmPassword && password !== confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
    valid = false;
  }

  setErrors(newErrors);
  if (!valid) return;

  // Begin loading
  setLoading(true);

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { uid, email: registeredEmail } = userCredential.user;

     // Save user data to Firestore
     return firestore()
    .collection('users') //  collection name
    .doc(uid) // Store user data using UID as the document ID
    .set({
      uid,
      name,
      email: registeredEmail,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
})
.then(() => {
      setLoading(false);
      navigation.navigate(SCREENS.MAIN_TABS);
    })
    .catch((error) => {
      setLoading(false);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setAuthError('The email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setAuthError('The email address is badly formatted.');
          break;
        case 'auth/weak-password':
          setAuthError('Password should be at least 6 characters.');
          break;
        case 'auth/operation-not-allowed':
          setAuthError('Email/password accounts are not enabled.');
          break;
        default:
          setAuthError('Registration failed. Please try again.');
      }
    });
};



  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Create Account</Text>
      <Text style={styles.des}>
        Please fill the details below</Text>
      <Image style={styles.image}
         source={
          IMAGES.LOGIN
         }
      />
      
      <TextInput
       style={[
       styles.inputName,
       errors.name ? styles.inputError : null
  ]}
       placeholder="Enter your name"
       value={name}
       onChangeText={(text) => {
       setName(text);
       setErrors({ ...errors, name: '' });
  }}
/>
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
       style={[
       styles.inputName,
       errors.email ? styles.inputError : null
  ]}
       placeholder="Enter your email"
       value={email}
       onChangeText={(text) => {
       setEmail(text);
       setErrors({ ...errors, email: '' });
  }}
/>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
   <TextInput
       style={[
       styles.inputPassword,
       errors.password ? styles.inputError : null
  ]}
       placeholder="Create your password"
       value={password}
       onChangeText={(text) => {
       setPassword(text);
       setErrors({ ...errors, password: '' });
  }}
/>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
   <TextInput
       style={[
       styles.inputPassword,
       errors.confirmPassword ? styles.inputError : null
  ]}
       placeholder="Confirm your password"
       value={confirmPassword}
       onChangeText={(text) => {
       setConfirmPassword(text);
       setErrors({ ...errors, confirmPassword: '' });
  }}
/>
      {errors.confirmPassword ? 

      <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
       {loading && (
    <View style={{ marginVertical: 20 }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )}
  {authError !== '' && (
    <Text style={{ color: 'red', textAlign: 'center' }}>{authError}</Text>
  )}
  
      <TouchableOpacity onPress={() => handleRegister()}
      style={styles.confirmButton}>
      <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.haveAccount}>OR</Text>
       
      <TouchableOpacity onPress={onGoogleButtonPress} style={styles.googleButton}>
  <Image source={IMAGES.GOOGLE} style={styles.googleIcon} />
</TouchableOpacity>
      
      <TouchableOpacity 
      onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.haveAccount}>Already have an account? Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 0,
    backgroundColor: '#f8f9fa',
  },
  inputError: {
  borderColor: 'red',
},

errorText: {
  color: 'red',
  marginStart: 22,
  marginBottom: 5,
  fontSize: 12,
},
googleButton: {
  padding: 20,
  backgroundColor: '#f8f9fa',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center'
  
},

googleIcon: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},

  title: {
    fontSize: 25,
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginStart: 9,
  },
  des: {
    fontSize: 15,
    padding: 10,
    marginTop: -20,
    fontWeight: 'normal',
    color: 'black',
    marginStart: 12,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
    
  },
   inputName: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginStart: 20,
    padding: 10,
    marginEnd: 25,
    marginBottom: 10,
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginStart: 20,
    padding: 10,
    marginEnd: 25,
    marginBottom: 10,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginStart: 20,
    padding: 10,
    marginEnd: 25,
    marginBottom: 10,
  },
  haveAccount: {
    fontSize: 11,
    padding: 10,
    fontWeight: 'normal',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },
  confirmButton: {
  backgroundColor: '#6200ee', 
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 8,
  marginHorizontal: 20,
  alignItems: 'center',
  elevation: 3, 
  marginTop: 10,
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},


});

export default LoginScreen;
