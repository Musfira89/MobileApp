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

export const checkReservationAvailability = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  try {
    const db = getFirestore();
    const timeUpper = time.toUpperCase();
    const docId = `${date}_${timeUpper}`;

    const docRef = db
      .collection("restaurants")
      .doc(id)
      .collection("reservations")
      .doc(docId);

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      const db = getFirestore();
      const reservationsRef = db
        .collection("restaurants")
        .doc(id)
        .collection("reservations");
    
      const dateSnapshot = await reservationsRef
        .where("date", "==", date)
        .limit(1)
        .get();
    
      if (dateSnapshot.empty) {
        // ❌ No documents found for the date
        return res.json({ available: false, earliestTime: null, noData: true });
      }
    
      // ✅ Document doesn't exist but date has other slots → considered available
      return res.json({ available: true, earliestTime: null });
    }
    
    const data = docSnap.data();

    if (data.available === false) {
      const earliestTime = await getEarliestAvailableTime(id, date);
      return res.json({ available: false, earliestTime });
    }

    res.json({ available: true, earliestTime: null });
  } catch (error) {
    console.error("Error checking reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function getEarliestAvailableTime(restaurantId, date) {
  const db = getFirestore();
  const reservationsRef = db
    .collection("restaurants")
    .doc(restaurantId)
    .collection("reservations");

  const querySnapshot = await reservationsRef
    .where("date", "==", date)
    .orderBy("time")
    .get();

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    if (data.available === true) {
      return data.time;
    }
  }

  return null;
}



