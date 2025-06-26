const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId :
  {
    type: Schema.Types.ObjectId,
    ref:'user',
    required:true,
  },

  eventId :
  {
    type:Schema.Types.ObjectId,
    ref:'Event',
    required:true,
  },

  date:
  {
    type:String,
    required:true
  },

  time:
  {
    type:String,
    required:true
  },

  seats:
  {
    type:Number,
    required:true,
  },

  totalPrice:
  {
    type:Number,
    required:true,
  },

  status:
  {
    type:String,
    default:'confirmed',
  },

  createdAt:
  {
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Booking',bookingSchema);