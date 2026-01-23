const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true },

    customerName: { type: String, required: true, minlength: 3 },

    email: {       
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }, 

    issue: { type: String, required: true, minlength: 5 },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Ticket",ticketSchema);