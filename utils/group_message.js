const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  from_user: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date_sent: {
    type: Date,
    default: Date.now
  },
});

groupSchema.pre('save', (next) => {
  console.log("Having Timestamp")
  let now = Date.now()
   
  this.date_sent = now
  next()
});


const GroupMessage = mongoose.model("GroupMessage", groupSchema);
module.exports = GroupMessage;
