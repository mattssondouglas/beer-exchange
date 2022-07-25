// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')

// Create POST controller
router.post('/orders', async (req, res) => {
  // no authentication planned at present
  // if (req.isAuthenticated()) {
  // } else {
  //   res.redirect('/auth/login')
  // }

  let test = { beer: 'Hello', price: 25 }
  console.log(test)
  let order = await Orders.create(test)
  console.log(order)
})

// Create GET controller
router.get('/orders', async (req, res) => {
  res.send('Hello world')
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
