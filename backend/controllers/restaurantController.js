import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// Fetch all restaurants (for the Home Screen)
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurantsSnapshot = await db.collection("restaurants").get();

    const restaurants = restaurantsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
};

// Fetch details of a single restaurant (for the Detail Screen)
export const getRestaurantDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurantDoc = await db.collection("restaurants").doc(id).get();

    if (!restaurantDoc.exists) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.status(200).json(restaurantDoc.data());
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ error: "Failed to fetch restaurant details." });
  }
};
