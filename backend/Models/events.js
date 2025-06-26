const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
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
   
  availableDates :[String],
  availableTimes: [String],

  date: 
  {
    type: Date,
     required: function () {
      return this.category !== "movie";
    }
  },

  time: 
  { 
    type: String ,
    required: function () {
      return this.category !== "movie";
    }
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
