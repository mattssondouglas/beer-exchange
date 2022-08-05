// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')
const Beers = require('../models/beers')
const Settings = require('../models/settings')
const dbMethods = require('../methods/dbMethods')

// Create POST controller
router.post('/', async (req, res) => {
  console.log('starting order')
  let beer = await Beers.findOne({
    _id: req.body.id
  })
  let mySettings = await dbMethods.getSettings()
  let priceIncrease = mySettings.priceIncrease / 100 + 1
  // console.log(priceIncrease)
  // console.log(mySettings)
  let tempOrder = { beer: req.body.id, price: beer.currentPrice }

  // enter order into the orders collection
  let order = await Orders.create(tempOrder)

  let crashActive = await dbMethods.checkCrashStatus()

  if (!crashActive) {
    let updatedPrice = (beer.currentPrice * priceIncrease).toFixed(2)
    await dbMethods.setCurrentPrice(beer, updatedPrice)
  }
  // await dbMethods.setPriceOnOrder(beer, updatedPrice)
  await dbMethods.setHighestPrice(beer)
  // update the current price of the beers

  // res.redirect('/')
})

// Create GET controller
router.get('/', async (req, res) => {
  //
  // res.render('orders')
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
