const mongoose = require("mongoose");
const seminarSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Seminar = new mongoose.model("Seminar", seminarSchema);
module.exports = Seminar;
