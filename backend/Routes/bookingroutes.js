const express = require("express");
const router = express.Router();
const Booking = require("../Models/booking");
const Event = require("../Models/events");
const User = require("../Models/user");


router.get('/test', (req, res) => {
  res.send("Booking route works!");
});


router.post('/', async (req, res) => {
  const { userId, eventId, seats, date, time } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const user = await User.findById(userId);
     if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

     if (event.category === "movie") {
    
      if (!event.availableDates.includes(date) || !event.availableTimes.includes(time)) {
        return res.status(400).json({ message: "Invalid date or time selected for movie" });
      }
    } else if (event.category === "concert" || event.category === "train") {
    
      if (date !== event.date || time !== event.time) {
        return res.status(400).json({ message: "Date/time mismatch for this event type" });
      }
    }


    if (event.seatsAvailable < seats) {
      return res.status(400).json({ error: "not enough seats available" });
    }

    const totalPrice = event.price * seats;

    if (user.wallet < totalPrice) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    user.wallet -= totalPrice;
    event.seatsAvailable -= seats;

    await user.save();
    await event.save();

    const newBooking = new  Booking({
      userId,
      eventId,
      seats,
      date,
      time,
      totalPrice,
    });
    
      await newBooking.save();
      return res.status(200).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/user/:userId" , async(req,res) => {
   const { userId } = req.params;
   try {
    const bookings = await Booking.find({ userId }).populate('eventId');
    res.json(bookings);
   } catch (error) {
     res.status(500).json({ error : error.message});
   }
});

router.put('/:bookingId/cancel' , async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if(!booking) return res.status(404).json({ error : 'Booking not found'});

    booking.status ='cancelled';
    await booking.save();

    const event = await Event.findById(booking.eventId);
    const  user = await User.findById(booking.userId);

    if (event)  event.seatsAvailable += booking.seats;
     if (user)  user.wallet += booking.totalPrice;

    await event.save();
    await user.save();

    res.json({ message : 'Booking cancelled and refunded' , booking});

  } catch (error) {
     res.status(500).json({ error : error.message});
  }
  
});

module.exports = router;
