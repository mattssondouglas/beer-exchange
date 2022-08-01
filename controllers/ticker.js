// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')
const Beers = require('../models/beers')

// Routes

router.get('/', async (req, res, next) => {
  let beers = await Beers.find({})
  res.render('ticker', { beers })
})

// Export module
module.exports = router
