const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// create the orders model

module.exports = mongoose.model('history', {
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  beers: [
    {
      beerId: {
        type: ObjectId,
        ref: 'beers'
      },
      currentPrice: Number
    }
  ]
})
