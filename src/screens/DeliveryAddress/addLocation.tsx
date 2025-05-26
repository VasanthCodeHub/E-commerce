import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AddDeliveryAddressScreenProps } from '../../types';

const AddDeliveryAddressScreen = ({ navigation }: AddDeliveryAddressScreenProps) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = async () => {
    if (!name || !lastName || !address || !city || !state || !zipCode || !phoneNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const uid = auth().currentUser?.uid;
    if (!uid) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .collection('addresses')
        .add({
          name,
          lastName,
          address,
          city,
          state,
          zipCode,
          phoneNumber,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      navigation.goBack();
    } catch (error) {
      console.error('Failed to save address:', error);
      Alert.alert('Error', 'Could not save address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Address</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="First name" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last name" />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Street Address" />
      <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" />
      <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="State" />
      <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} placeholder="Zip Code" />
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddDeliveryAddressScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 10
  },
  saveButton: {
    backgroundColor: '#6200ee', padding: 12,
    borderRadius: 8, alignItems: 'center'
  },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
});
