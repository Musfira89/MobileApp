// controllers/bookingController.js
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// Create a Booking
export const createBooking = async (userId, car, pickupLocation, restaurantLocation) => {
  const fare = car.pricePerKm * 10; // Assume fixed distance (10 km)
  const commission = fare * 0.20; // 20% commission
  const ownerAmount = fare - commission;

  const bookingRef = collection(db, 'bookings');
  await addDoc(bookingRef, {
    userId,
    carId: car.id,
    pickupLocation,
    dropoffLocation: restaurantLocation,
    totalFare: fare,
    commission,
    ownerAmount,
    status: "pending",
    createdAt: new Date(),
  });


  // Mark Car as Unavailable
  await updateCarAvailability(car.id, false);
};
