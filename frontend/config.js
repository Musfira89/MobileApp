import { Platform } from "react-native";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000" // For browser
    : "http://192.168.100.13:5000"
     // For Expo app (replace with your local IP)

export default API_URL;
