import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firestore()
          .collection("admin")
          .doc("productList")
          .collection("items")
          .get();

        const fetched = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.category,
            brand: data.brandName,
            price: `Rs. ${data.offerCost}`,
            originalPrice: `Rs. ${data.originalCost}`,
            discount: `${data.offerPercentage}% Off`,
            images: data.imageUrls || [],
          };
        });

        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
