import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export type SliderImageType = {
  id: string;
  url: string;
};

export const useSliderData = () => {
  const [images, setImages] = useState<SliderImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const doc = await firestore().collection("data")
        .doc("banners").get();
         if (doc.exists()) {
          const urls = doc.data()?.urls || []; 
          const fetched = urls.map((url: string, index: number) => ({
            id: `img-${index}`,
            url,
          }));
          setImages(fetched);
        }

      } catch (error) {
        console.error('Error fetching slider images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  return { images, loading };
};
