import React, { useEffect, useState } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { DeliveryAddressScreenProps } from '../../types';

type Address = {
  name: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
};

const DeliveryAddressScreen = ({ navigation }: DeliveryAddressScreenProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .collection('addresses')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const addressList: Address[] = snapshot.docs.map(doc => doc.data() as Address);
        setAddresses(addressList);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} {item.lastName}</Text>
            <Text>{item.address}</Text>
            <Text>{item.city}, {item.state} {item.zipCode}</Text>
            <Text>Phone: {item.phoneNumber}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddressScreen')}
      >
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryAddressScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    backgroundColor: '#fff', padding: 15,
    borderRadius: 10, marginBottom: 10, elevation: 2
  },
  itemText: { fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
