const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// create the orders model

module.exports = mongoose.model('orders', {
  beer: {
    type: String,
    required: true
    //  ref: 'beers'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
