var mongoose = require('mongoose')


var petSchema = new mongoose.Schema({ // send the 'schema' to mongoose
  name: { type: String, required: true, unique: true },
  breed: String,
  dob: Date,
  gender: String,
  family: String,
  status: String,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now }
})

var Pet = mongoose.model('Pet', petSchema)

module.exports = Pet