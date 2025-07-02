const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Event = require('../Models/events');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

router.get('/vendor-events/:vendorId' , async (req,res) => {
  try {
     const vendorObjectId = new mongoose.Types.ObjectId(req.params.vendorId);
    const events = await Event.find({ vendorId: vendorObjectId });
    res.json(events)
  } catch (err) {
    console.error("Error fetching vendor events:", err);
    res.status(500).json({error : 'failed to fetch vendor events'});
    }
})

// POST a new event (vendor only)
router.post('/', async (req, res) => {
   const {
    title, description, category,
    availableDates, availableTimes,
    date, time, location,
    price, seatsAvailable, vendorId 
  } = req.body;
  try {
     console.log("Incoming event request:", req.body);
    const newEvent = new Event(req.body);     

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating event' });
  }
});


// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;

