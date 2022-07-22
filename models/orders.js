const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// create the orders model

module.exports = mongoose.model('orders', {
  beer: {
    type: ObjectId,
    required: true,
    ref: 'beers'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  }
})
