import { getFirestore } from "firebase-admin/firestore";
import { auth } from "../firebaseConnect.js"; // Import Firebase Admin Auth

const db = getFirestore();

export const confirmRide = async (req, res) => {
  const { authorization } = req.headers; // Extract the Authorization header

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authorization.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the Firebase Authentication token
    const decodedToken = await auth.verifyIdToken(token);
    console.log("Decoded Token:", decodedToken); // Debugging log

    const email = decodedToken.email || "No Email"; // Extract the user's email
    const displayName = decodedToken.name || "Guest"; // Extract the display name or fallback to "Guest"
    const firstName = displayName.split(" ")[0]; // Extract the first name

    const rideData = req.body;

    // Add default fields and timestamps
    const rideDetails = {
      firstName, // Store the user's first name
      email, // Store the user's email
      rideType: rideData.rideType,
      pickupLocation: rideData.pickupLocation, // Only store location names
      destinationLocation: rideData.destinationLocation, // Only store location names
      selectedDate: new Date(rideData.selectedDate).toISOString(),
      selectedTime: new Date(rideData.selectedTime).toISOString(),
      selectedAC: rideData.selectedAC,
      vehicle: null, // Default to null
      status: "pending", // Default to pending
      createdAt: new Date().toISOString(),
    };

    // Store the ride details in Firestore
    const docRef = await db.collection("rides").add(rideDetails);
    console.log("Ride Details Stored:", rideDetails); // Debugging log

    // Respond with success
    res.status(201).json({
      message: "Ride confirmed successfully.",
      rideId: docRef.id,
    });
  } catch (error) {
    console.error("Error confirming ride:", error.message);
    res.status(500).json({ error: "Failed to confirm the ride." });
  }
};