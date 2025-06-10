const mongoose = require('mongoose');

const FoxSchema = new mongoose.Schema({
  imageUrl: String,
  votes: { type: Number, default: 0 },
  // Add more fields as needed
});

module.exports = mongoose.model('Fox', FoxSchema);
