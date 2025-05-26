import axios from 'axios';

const CLOUD_NAME = 'dbdz9tysf';
const UPLOAD_PRESET = 'react-native-upload';

export const uploadToCloudinary = async (image: any): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', {
    uri: image.path,
    type: image.mime,
    name: 'upload.jpg',
  });
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};
