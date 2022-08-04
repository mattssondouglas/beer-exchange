const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// create the users model

module.exports = mongoose.model('settings', {
  priceDrop: {
    type: Number,
    required: true
  },
  priceIncrease: {
    type: Number,
    required: true
  },
  priceDropInterval: {
    type: Number,
    required: true
  },
  crashActive: {
    type: Boolean
  },
  duration: {
    type: Number,
    required: true
  },
  upTrendDiscount: {
    type: Number,
    required: true
  },
  downTrendDiscount: {
    type: Number,
    required: true
  }
})

// module.exports = Houses
