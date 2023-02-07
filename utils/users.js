const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creaton: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", (next) => {
  console.log("Having Timestamp");
  let now = Date.now();

  this.creaton = now;
  next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
/*
{
    "username": "safaaru",
    "firstname": "Safa",
    "lastname": "Aru",
    "password": "123456"
}
*/


