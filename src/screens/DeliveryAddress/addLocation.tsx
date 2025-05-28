import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AddDeliveryAddressScreenProps } from '../../types';

const AddDeliveryAddressScreen = ({ navigation, route }: AddDeliveryAddressScreenProps & { route: any }) => {
  const addressToEdit = route?.params?.address;

  const [name, setName] = useState(addressToEdit?.name || '');
  const [lastName, setLastName] = useState(addressToEdit?.lastName || '');
  const [address, setAddress] = useState(addressToEdit?.address || '');
  const [city, setCity] = useState(addressToEdit?.city || '');
  const [state, setState] = useState(addressToEdit?.state || '');
  const [zipCode, setZipCode] = useState(addressToEdit?.zipCode || '');
  const [phoneNumber, setPhoneNumber] = useState(addressToEdit?.phoneNumber || '');

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
      const addressRef = firestore()
        .collection('users')
        .doc(uid)
        .collection('addresses');

      if (addressToEdit?.id) {
        // Update existing
        await addressRef.doc(addressToEdit.id).update({
          name,
          lastName,
          address,
          city,
          state,
          zipCode,
          phoneNumber,
        });
      } else {
        // Add new
        await addressRef.add({
          name,
          lastName,
          address,
          city,
          state,
          zipCode,
          phoneNumber,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error('Failed to save address:', error);
      Alert.alert('Error', 'Could not save address');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{addressToEdit ? 'Edit Address' : 'Add Address'}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="First name" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last name" />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Street Address" />
      <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" />
      <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="State" />
      <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} placeholder="Zip Code" />
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{addressToEdit ? 'Update Address' : 'Add Address'}</Text>
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
