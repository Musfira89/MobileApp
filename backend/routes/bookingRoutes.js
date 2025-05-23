import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route to create a booking
router.post('/bookings', async (req, res) => {
    try {
        const { userId, car, pickupLocation, restaurantLocation } = req.body;
        await createBooking(userId, car, pickupLocation, restaurantLocation);
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
