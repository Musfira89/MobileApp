// reservationController.js
import { getFirestore } from "firebase-admin/firestore";
import { format } from "date-fns";
import sendConfirmationEmail from "../Mails/confirmEmail.js";

const db = getFirestore();

// Save Reservation (Availability - storedReservations)
export const saveReservationData = async (req, res) => {
  const { id } = req.params;
  const { date, time, guests } = req.body;

  try {
    const reservationRef = db
      .collection("restaurants")
      .doc(id)
      .collection("storedReservations")
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
      available: true, // Initial availability
    });

    res.status(201).json({ message: "Reservation saved successfully." });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Reservation Data (Availability)
export const getReservationData = async (req, res) => {
  const { id } = req.params;

  try {
    const reservationsSnapshot = await db
      .collection("restaurants")
      .doc(id)
      .collection("storedReservations")
      .orderBy("date", "desc")
      .limit(1)
      .get();

    if (reservationsSnapshot.empty) {
      return res.status(404).json({ error: "No reservation found." });
    }

    const reservationDoc = reservationsSnapshot.docs[0];
    const reservationData = reservationDoc.data();
    const { date, guests, time } = reservationData;

    res.status(200).json({ date, guests, time });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Reservation
export const createReservation = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    email,
    phoneNumber,
    reservationDay,
    reservationTime,
    guestCount,
    paymentMethod,
    specialRequest,
    totalAmount,
  } = req.body;

  try {
    const branchPrefixes = {
      KababjeesSuperHighway: "KSH",
      Tandoor: "TAN",
      SaltnPepper: "SNP",
      BBQTonight: "BBQ",
    };

    const branchPrefix = branchPrefixes[id] || "GEN";

    const reservationsSnapshot = await db
      .collection("restaurants")
      .doc(id)
      .collection("createReservations")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    let nextNumber = 101;
    if (!reservationsSnapshot.empty) {
      const lastData = reservationsSnapshot.docs[0].data();
      const match = lastData.readableReservationId?.match(/-(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const readableReservationId = `${branchPrefix}-${nextNumber}`;

    const reservationRef = db
      .collection("restaurants")
      .doc(id)
      .collection("createReservations")
      .doc();

    await reservationRef.set({
      fullName,
      email,
      phoneNumber,
      reservationDay,
      reservationTime,
      guestCount,
      paymentMethod,
      specialRequest,
      totalAmount,
      readableReservationId,
      createdAt: new Date(),
    });

    await sendConfirmationEmail({
      to: email,
      name: fullName,
      restaurantName: id === "KababjeesSuperHighway" ? "Kababjees" : id,
      reservationId: readableReservationId,
      date: reservationDay,
      time: reservationTime,
      guests: guestCount,
      totalBill: totalAmount,
      specialRequest: specialRequest || "None",
    });

    res.status(201).json({
      success: true,
      reservationId: readableReservationId,
      message: "Reservation created successfully",
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
    });
  }
};

// In your reservationController.js
export const getReservation = async (req, res) => {
  const { restaurantId, reservationId } = req.params;
  try {
    const db = getFirestore();
    const docRef = db
      .collection("restaurants")
      .doc(restaurantId)
      .collection("createReservations")
      .doc(reservationId);

    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    res.status(200).json(docSnap.data());
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reservation" });
  }
};
