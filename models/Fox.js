const mongoose = require('mongoose');
const { type } = require('os');

const FoxSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  votes: {
    type: Number,
    default: 0
  },
  foxNumber: { type: Number,
   unique: true
  } 
});

module.exports = mongoose.model('Fox', FoxSchema);
