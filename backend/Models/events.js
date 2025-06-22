const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: 
  {
    type: String,
    required: true,
  },
  description: 
  {
    type: String,
  },
  category:
  {  type: String,
     enum: ["movie", "concert", "train"],
     required:true, 
  },
  date: 
  {
    type: Date,
    required:true,
  },

  time: 
  { 
    type: String 
  },
 location: 
  { 
    type: String 
  },
  price: 
  { 
    type: Number, 
    required: true 
  },
  seatsAvailable: 
  { type: Number ,
    required:true,
  },
  vendorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref:"user"
  }

});
module.exports = mongoose.model("Event", eventSchema);
