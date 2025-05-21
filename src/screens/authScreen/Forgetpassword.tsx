import React, {useState} from "react";
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


const ForgetPassword = (props) => {
  const { navigation } = props;

const [password, setPassword] = useState('');
const [errors, setErrors] = useState({ 
    password: '',
  });
  const handleResetPassword = () => {
  let valid = true;
  const newErrors = { password: '' };
  if (!password) {
    newErrors.password = 'Phone or E-mail is required';
    valid = false;
  }
   setErrors(newErrors);

  if (!valid) return;

  navigation.navigate(SCREENS.VERIFICATION);

};
return (
<View style={styles.container}>

    
    <Text style={styles.title}>
     Forgot Password</Text>

    <Text style={styles.des}>
    *we will send you a message to set or reset your new password </Text>

    <Image style={styles.image}
    source={
      IMAGES.LOGIN
    } 
    
          />

    <TextInput
     style={[
     styles.inputPassword,
     errors.password ? styles.inputError : null
            ]}
     placeholder="Enter Phone or E-mail"
     value={password}
     onChangeText={(text) => {
     setPassword(text);
     setErrors({ ...errors, password: '' });
            }}
          />
     {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          
    <TouchableOpacity onPress={() => handleResetPassword()}
     style={styles.confirmButton}>
    <Text style={styles.buttonText}>Send Verification</Text>
          
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
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginStart: 9,
     alignSelf: 'center'
   
  },
  des: {
    fontSize: 10,
    padding: 10,
    marginTop: -10,
    fontWeight: 'normal',
    color: 'black',
    marginStart: 12,
     alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
    alignSelf: 'center',
    
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





export default ForgetPassword;