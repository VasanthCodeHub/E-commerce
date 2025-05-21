import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageRow: {
    flexDirection: "row",
    marginBottom: 12,
    height: 170, // Fixed height for the row
  },
  mainImage: {
    width: width * 0.55, // Takes 55% of screen width
    height: "100%",
    borderRadius: 10,
    marginRight: 8,
    resizeMode: "cover",
  },
  sideImages: {
    flex: 1,
    justifyContent: "space-between",
  },
  sideImage: {
    width: "100%",
    height: "48%", // Slightly less than half to account for space-between
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    overflow: "hidden",
  },
  plusText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#666",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  brand: {
    color: "#777",
    marginBottom: 8,
    fontSize: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    marginRight: 8,
    fontSize: 14,
  },
  price: {
    color: "#000",
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 16,
  },
  discount: {
    color: "green",
    fontSize: 14,
    fontWeight: "500",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  wishlist: {
    borderWidth: 1,
    borderColor: "#0033cc",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 8,
  },
  wishlistText: {
    color: "#0033cc",
    textAlign: "center",
    fontWeight: "500",
  },
  addToBag: {
    backgroundColor: "#0033cc",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
  },
  addToBagText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});