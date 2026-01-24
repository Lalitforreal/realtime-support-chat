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
    
        handledBy:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Agent"
        }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Ticket",ticketSchema);