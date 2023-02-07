const mongoose = require('mongoose');


const oneToOne = new mongoose.Schema({
    from_user: {
      type: String,
      required: true
    },
    to_user: {
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

//Create models
const PrivateModel = mongoose.model("oneToOne", oneToOne);
module.exports = PrivateModel;
