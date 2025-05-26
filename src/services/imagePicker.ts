import ImagePicker from 'react-native-image-crop-picker';

export const pickImages = async () => {
  try {
    const images = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    });
     return images.map(img => ({
      path: img.path,
      mime: img.mime,
    }));
  } catch (err) {
    console.error('Image pick error:', err);
    return [];
  }
};
