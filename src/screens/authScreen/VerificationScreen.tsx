import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,  

} from "react-native";
import SCREENS from "..";

const VerificationScreen = (props) => {
  const { navigation } = props;
const [otp, setOTP] = useState('');
const [errors, setErrors] = useState({ 
    otp: '',
  });
  const handleOTP = () => {
  let valid = true;
  const newErrors = { otp: '' };
  if (!otp) {
    newErrors.otp = 'Enter the OTP';
    valid = false;
  }
   setErrors(newErrors);

  if (!valid) return;

  navigation.navigate(SCREENS.NEWPASSWORD);

};
return (
<View style={styles.container}>

    
    <Text style={styles.title}>
     Enter Verification code</Text>

    <Text style={styles.des}>
    *enter the code to sent to your message to set or reset your new password </Text>



    <TextInput
     style={[
     styles.inputOtp,
     errors.otp ? styles.inputError : null
            ]}
     placeholder="Enter OTP here"
     value={otp}
     onChangeText={(text) => {
     setOTP(text);
     setErrors({ ...errors, otp: '' });
            }}
          />
     {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}
          
    <TouchableOpacity onPress={() => handleOTP()}
     style={styles.confirmButton}>
    <Text style={styles.buttonText}>Confirm</Text>
          
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
  inputOtp: {
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





export default VerificationScreen;