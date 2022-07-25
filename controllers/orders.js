// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')

// Create POST controller
router.post('/', async (req, res) => {
  // no authentication planned at present
  // if (req.isAuthenticated()) {
  // } else {
  //   res.redirect('/auth/login')
  // }
  let test = { beer: '62de495d2d09db30945b410a', price: 25 }
  console.log(test)
  let order = await Orders.create(test)
  console.log(order)
})

// Create GET controller
router.get('/', async (req, res) => {
  let test = { beer: '62de495d2d09db30945b410a', price: 35 }
  console.log(test)
  let order = await Orders.create(test)
  console.log(order)

  console.log(res)
  console.log(req)
  console.log('Hello from GET')
  res.render('orders')
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
