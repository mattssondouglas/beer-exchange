// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')
const Beers = require('../models/beers')

// Routes

router.get('/', async (req, res, next) => {
  let beers = await Beers.find({})
  // let histories = await History.find({})
  // // Finds lowest prices
  // let lowestPrices = histories.map(history => {
  //   return history.beers.map(beer => {
  //     return beer.lowestPrice
  //   })
  // })
  // // Finds highest prices
  // let highestPrices = histories.map(history => {
  //   return history.beers.map(beer => {
  //     return beer.highestPrice
  //   })
  // })
  // console.log(lowestPrices)
  // console.log(highestPrices)
  //
  // let orders = await Orders.find({})
  // let history = History.create({
  //   beers: [
  //     {
  //       beer: {},
  //       currentPrice: Number,
  //       lowestPrice: Number,
  //       highestPrice: Number
  //     }
  //   ]
  // })
  // let lowestPrice = orders.map(order => {
  //   order.price
  // })
  // // let history = await History.create({
  // //   beers: [
  // //     {
  // //       beer: order.beer,
  // //       currentPrice: order.price,
  // //       lowestPrice: order.price,
  // //       highestPrice: order.price
  // //     }
  // //   ]
  // // })
  // console.log(highestPrice)

  // let lowestPrices = await History.find({
  // 	beers: [
  // 		beer.lowestPrice :
  // 	]
  // })
  res.render('ticker', { beers })
})

// Export module
module.exports = router
