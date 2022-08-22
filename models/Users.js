const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  age: Number,
});
const User = mongoose.model("User", blogSchema);
module.exports = User;
