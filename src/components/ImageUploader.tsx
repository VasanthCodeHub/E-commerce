import React, { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { pickImages } from '../services/imagePicker';
import { uploadToCloudinary } from "../services/cloudinary";


const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  
const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async () => {
  try {
    setUploading(true);
    const picked = await pickImages();
    const urls = await Promise.all(picked.map(img => uploadToCloudinary(img)));
    const filtered = urls.filter((url): url is string => !!url);
    setImageUrls(filtered);
  } catch (error) {
    console.error('Image upload error:', error);
    alert('Image upload failed.');
  } finally {
    setUploading(false);
  }
};
  return (
    <View style={styles.container}>
      <Button
        title={uploading ? 'Uploading...' : 'Pick & Upload Images'}
        onPress={handleUpload}
        disabled={uploading}
      />
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: { padding: 20 },
});
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

