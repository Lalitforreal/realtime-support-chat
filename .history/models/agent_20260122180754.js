const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
    name : {
        type : String,
        minLength : 3,
        trim : true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
    },

    role : {
        type : String,
        enum : ["agent"],
        default : "agent"
    },
},
{timestamps : true}
);

module.exports = mongoose.model("Agent",agentSchema);