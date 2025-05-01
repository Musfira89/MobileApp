import { getFirestore } from "firebase-admin/firestore";

export const saveReservationData = async (req, res) => {
  const { id } = req.params;
  const { date, time, guests, restaurantId } = req.body;

  try {
    const db = getFirestore();
    const reservationRef = db
      .collection("restaurants")
      .doc(id)
      .collection("storedReservations") // <-- updated here
      .doc(`${date}_${time.toUpperCase().replace(/ /g, "_")}`);

    const existingReservation = await reservationRef.get();

    if (existingReservation.exists) {
      return res
        .status(400)
        .json({ message: "Reservation already exists for this time." });
    }

    await reservationRef.set({
      date,
      time,
      guests,
      available: true, // Assuming availability is true initially
      restaurantId,
    });

    res.status(201).json({ message: "Reservation saved successfully." });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getReservationData = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getFirestore();
    const reservationsSnapshot = await db
      .collection("restaurants")
      .doc(id)
      .collection("storedReservations")
      .orderBy("date", "desc") // latest reservation first
      .limit(1) // sirf latest reservation
      .get();

    if (reservationsSnapshot.empty) {
      return res.status(404).json({ error: "No reservation found." });
    }

    const reservationDoc = reservationsSnapshot.docs[0];
    const reservationData = reservationDoc.data();

    const { date, guests, time } = reservationData;

    res.status(200).json({ date, guests, time }); // sirf 3 fields bhej rahe
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};