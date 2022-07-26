const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = mongoose.model('beers', {
  name: {
    type: String,
    required: true
  },

  startingPrice: {
    type: Number,
    required: true
  },

  currentPrice: {
    type: Number,
    required: true
  },

  minimumPrice: {
    type: Number,
    required: true
  },

  photo: String
})
