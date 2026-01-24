// for chat history

const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId, //enables .populare later
      ref: "Ticket",
      required: true,
      index: true, //without index every query will be slow if large data
    },

    senderRole: {
      type: String,
      enum: ["guest", "agent"],
      required: true,
    },

    senderName: {
      type: String,
      trim: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent", // only exists for agent mostly
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);