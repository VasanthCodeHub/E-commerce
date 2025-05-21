import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,

} from "react-native";
import SCREENS from "..";
import IMAGES from "../../assets/images";
import auth from "@react-native-firebase/auth";
const SignupScreen = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleRegister = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    setAuthError(''); 

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

     setLoading(true);

     auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      setLoading(false);
      navigation.navigate(SCREENS.MAIN_TABS);
    })
    .catch((error) => {
      setLoading(false);
      switch (error.code) {
        case 'auth/invalid-email':
          setAuthError('The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          setAuthError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setAuthError('Incorrect password.');
          break;
        case 'auth/user-disabled':
          setAuthError('This account has been disabled.');
          break;
        default:
          setAuthError('Login failed. Please try again.');
      }
  });

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.des}>Continue to Login</Text>

      <Image style={styles.image} source={IMAGES.SIGNUP} />

      <TextInput
        style={[styles.inputName, errors.email ? styles.inputError : null]}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({ ...errors, email: '' });
        }}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.inputName, errors.password ? styles.inputError : null]}
        placeholder="Enter your password"
        value={password}
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: '' });
        }}
      />
      {errors.password ? 
      <Text style={styles.errorText}>{errors.password}</Text> : null}

      {loading && (
  <View style={{ marginVertical: 20 }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
)}
{authError !== '' && (
  <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
    {authError}
  </Text>
)}

      <TouchableOpacity onPress={handleRegister} style={styles.confirmButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.FORGETPASSWORD)}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LOGIN)}>
        <Text style={styles.haveAccount}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#f8f9fa',
    flex: 1,
    justifyContent: 'center',
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
    width: 150,
    height: 150,
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
  haveAccount: {
    fontSize: 11,
    padding: 10,
    fontWeight: 'normal',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },
  forgotPassword: {
    fontSize: 11,
    padding: 10,
    fontWeight: 'normal',
    color: 'black',
    marginTop: 5,
    alignSelf: 'flex-end',
    marginEnd: 20,
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

export default SignupScreen;
