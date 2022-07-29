// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')
const Beers = require('../models/beers')

// Create POST controller
router.post('/', async (req, res) => {
  let beer = await Beers.findOne({
    _id: req.body.id
  })
  let currentPrice = beer.currentPrice
  let tempOrder = { beer: req.body.id, price: currentPrice }

  // enter order into the orders collection
  let order = await Orders.create(tempOrder)

  let updatedPrice = (currentPrice * 1.02).toFixed(2)
  // update the current price of the beers
  await Beers.findOneAndUpdate(
    {
      _id: beer.id
    },
    {
      currentPrice: updatedPrice
    }
  )

  res.redirect('/')
})

// Create GET controller
router.get('/', async (req, res) => {
  //
  res.render('orders')
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
