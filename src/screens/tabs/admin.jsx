import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { pickImages } from '../../services/imagePicker';
import { uploadToCloudinary } from '../../services/cloudinary';



const AdminScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [brandName, setBrandName] = useState('');
  const [originalCost, setOriginalCost] = useState('');
  const [offerPercentage, setOfferPercentage] = useState('');
  const [offerCost, setOfferCost] = useState('');
  const [imageUrls, setImageUrls] = useState([]); 

  const [errors, setErrors] = useState({
    category: '',
    brandName: '',
    originalCost: '',
    offerPercentage: '',
  });

  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const cost = parseFloat(originalCost);
    const discount = parseFloat(offerPercentage);
    if (!isNaN(cost) && !isNaN(discount)) {
      const calculated = cost - (cost * discount) / 100;
      setOfferCost(calculated.toFixed(2));
    } else {
      setOfferCost('');
    }
  }, [originalCost, offerPercentage]);

  const handleImageUpload = async () => {
    try {
      setLoading(true);
      const picked = await pickImages();
      const urls = await Promise.all(picked.map((img) => uploadToCloudinary(img)));
      const filtered = urls.filter((url) => !!url);
      setImageUrls(filtered);
      Alert.alert(`${filtered.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Image upload error:', error);
      Alert.alert('Image upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const uploadData = async () => {
    let valid = true;
    const newErrors = {
      category: '',
      brandName: '',
      originalCost: '',
      offerPercentage: '',
    };
    setErrors(newErrors);
    setInputError('');

    if (!category) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    if (!brandName) {
      newErrors.brandName = 'Brand name is required';
      valid = false;
    }
    if (!originalCost) {
      newErrors.originalCost = 'Original cost is required';
      valid = false;
    }
    if (!offerPercentage) {
      newErrors.offerPercentage = 'Offer percentage is required';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);

    try {
      await firestore()
        .collection('admin')
        .doc('productList')
        .collection('items')
        .add({
          category,
          brandName,
          originalCost: parseFloat(originalCost),
          offerPercentage: parseFloat(offerPercentage),
          offerCost: parseFloat(offerCost),
          imageUrls,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setCategory('');
      setBrandName('');
      setOriginalCost('');
      setOfferPercentage('');
      setOfferCost('');
      setImageUrls([]);
      Alert.alert('Product added successfully!');
    } catch (error) {
      console.error('Error uploading data: ', error);
      setInputError('Failed to upload. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputName, errors.category ? styles.inputError : null]}
        placeholder="Category name"
        value={category}
        onChangeText={(text) => {
          setCategory(text);
          setErrors({ ...errors, category: '' });
        }}
      />
      {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

      <TextInput
        style={[styles.inputName, errors.brandName ? styles.inputError : null]}
        placeholder="Brand name"
        value={brandName}
        onChangeText={(text) => {
          setBrandName(text);
          setErrors({ ...errors, brandName: '' });
        }}
      />
      {errors.brandName ? <Text style={styles.errorText}>{errors.brandName}</Text> : null}

      <TextInput
        style={[styles.inputName, errors.originalCost ? styles.inputError : null]}
        placeholder="Original cost"
        value={originalCost}
        keyboardType="numeric"
        onChangeText={(text) => {
          setOriginalCost(text);
          setErrors({ ...errors, originalCost: '' });
        }}
      />
      {errors.originalCost ? <Text style={styles.errorText}>{errors.originalCost}</Text> : null}

      <TextInput
        style={[styles.inputName, errors.offerPercentage ? styles.inputError : null]}
        placeholder="Offer percentage"
        value={offerPercentage}
        keyboardType="numeric"
        onChangeText={(text) => {
          setOfferPercentage(text);
          setErrors({ ...errors, offerPercentage: '' });
        }}
      />
      {errors.offerPercentage ? <Text style={styles.errorText}>{errors.offerPercentage}</Text> : null}

      <TextInput
        style={styles.inputName}
        placeholder="Offer Price"
        value={offerCost}
        editable={false}
      />

      <TouchableOpacity
        onPress={handleImageUpload}
        style={[styles.confirmButton, { backgroundColor: '#28a745' }]}
      >
        <Text style={styles.buttonText}>Pick Images</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={uploadData} style={styles.confirmButton}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {inputError ? <Text style={styles.errorText}>{inputError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#f8f9fa',
    marginTop: 50,
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
  inputName: {
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

export default AdminScreen;
