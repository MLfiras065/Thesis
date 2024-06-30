import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  tripImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tripLocation: {
    color: "#757575",
    marginBottom: 5,
  },
  tripPrice: {
    color: "#00796b",
  },
  removeButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: 8,
    padding: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
