const express = require('express')
const router = express.Router()

const priceDrop = beer => {
  beer.currentPrice = (beer.currentPrice * 0.98).toFixed(2)
  return beer.currentPrice
}

const marketCrash = beer => {
  if (beer.currentPrice >= beer.startingPrice) {
    beer.currentPrice = (beer.currentPrice * 0.5).toFixed(2)
  } else if (beer.currentPrice <= beer.startingPrice) {
    beer.currentPrice = (beer.minimumPrice * 1.2).toFixed(2)
  }
  return beer.currentPrice
}

// Export module
module.exports = { marketCrash, priceDrop }
