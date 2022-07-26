// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')
const Beers = require('../models/beers')

// Create POST controller
router.post('/', async (req, res) => {
  // no authentication planned at present
  // if (req.isAuthenticated()) {
  // } else {
  //   res.redirect('/auth/login')
  // }

  // let check = await Orders.findOne({
  //   beer: '62df7bfaf9179b0bb64d569b'
  // })

  let beer = await Beers.findOne({
    _id: req.body.id
  })

  let tempOrder = { beer: req.body.id, price: beer.currentPrice }

  let order = await Orders.create(tempOrder)

  // let history = await History.create({
  //   beers: [
  //     {
  //       beer: order.beer,
  //       currentPrice: order.price,
  //       lowestPrice: order.price,
  //       highestPrice: order.price
  //     }
  //   ]
  // })

  // let history = await History.findOneAndUpdate({
  // 	beers.beer = order.beer
  // }, {
  // 	beers.currentPrice: 50
  // })

  res.redirect('/')
})

// Create GET controller
router.get('/', async (req, res) => {
  // let test = { beer: '62de495d2d09db30945b410a', price: 35 }
  //
  // let order = await Orders.create(test)
  //
  res.render('orders')
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
