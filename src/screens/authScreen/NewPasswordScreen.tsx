import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,  
} from "react-native"; 
import SCREENS from "..";
import IMAGES from "../../assets/images";

  const NewPasswordScreen = (props) => {
  const { navigation } = props;


  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({ 
   password: '',
   newPassword: '',
  });

  const handleNewPassword = () => {
  let valid = true;
  const newErrors = { password: '', newPassword: '' };

  if (!password) {
    newErrors.password = 'Set new password';
    valid = false;
  }

  if (!newPassword) {
    newErrors.newPassword = 'Confirm new password';
    valid = false;
  }
  
  if (password && newPassword && password !== newPassword) {
    newErrors.newPassword = 'Passwords do not match';
    valid = false;
  }

  setErrors(newErrors);

  if (!valid) return;

  navigation.navigate(SCREENS.MAIN_TABS);
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        New Password</Text>

      <Text style={styles.des}>
        Set new password to your account </Text>

      <Image style={styles.image}
         source={
          IMAGES.SIGNUP
         }
          
      />
      
        <TextInput
             style={[
             styles.inputName,
             errors.password ? styles.inputError : null
        ]}
             placeholder="Create new password"
             value={password}
             onChangeText={(text) => { 
             setPassword(text);
             setErrors({ ...errors, password: '' });
        }}
      />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      
            <TextInput
             style={[
             styles.inputName,
             errors.newPassword ? styles.inputError : null
        ]}
             placeholder="Confirm new password"
             value={newPassword}
             onChangeText={(text) => {
             setNewPassword(text);
             setErrors({ ...errors, newPassword: '' });
        }}
      />
            {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
      
      <TouchableOpacity onPress={() => handleNewPassword()}
      style={styles.confirmButton}>
      <Text style={styles.buttonText}>Set Password</Text>
      
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

export default NewPasswordScreen;
