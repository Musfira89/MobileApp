import { Platform } from "react-native";

const LOCAL_IP = "192.168.0.109";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5000"
    :      `http://${LOCAL_IP}:5000`; // Updated IP

export default API_URL;
