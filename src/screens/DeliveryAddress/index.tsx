import React, { useEffect, useState } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet, FlatList, Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { DeliveryAddressScreenProps } from '../../types';

type Address = {
  id: string; 
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
      const addressList: Address[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Address[];
        setAddresses(addressList);
      });

    return () => unsubscribe();
  }, []);

    const handleDelete = async (id: string) => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore()
              .collection('users')
              .doc(uid)
              .collection('addresses')
              .doc(id)
              .delete();
          } catch (error) {
            console.error('Failed to delete address:', error);
            Alert.alert('Error', 'Could not delete address');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} {item.lastName}</Text>
            <Text>{item.address}</Text>
            <Text>{item.city}, {item.state} {item.zipCode}</Text>
            <Text>Phone: {item.phoneNumber}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => navigation.navigate('AddAddressScreen', { address: item })}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemText: { fontWeight: 'bold' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#03dac5',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#b00020',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 100,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});