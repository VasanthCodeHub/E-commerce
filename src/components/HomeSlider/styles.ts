import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  description: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
