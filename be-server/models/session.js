const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userSend: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: String,
    required: true,
  },
  chatMessage: {
    type: String,
    required: true,
  },
  sendTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Session", sessionSchema);
