const express = require('express');
const router = express.Router();


const Booking = require('../Models/booking');
const Event = require('../Models/event');
const User = require('../Models/user');

// POST a booking
router.post('/', async (req, res) => {
  const { userId, eventId, seats } = req.body;
  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) return res.status(404).json({ error: 'Event or user not found' });
    if (event.seatsAvailable < seats) return res.status(400).json({ error: 'Not enough seats available' });

    const totalPrice = seats * event.price;
    if (user.wallet < totalPrice) return res.status(400).json({ error: 'Insufficient balance' });

    // Deduct seats and wallet
    event.seatsAvailable -= seats;
    await event.save();
    user.wallet -= totalPrice;
    await user.save();

    const booking = await Booking.create({ userId, eventId, seats, totalPrice });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET bookings by user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
