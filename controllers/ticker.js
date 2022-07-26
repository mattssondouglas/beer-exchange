// Import Packages
const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')
const History = require('../models/history')

// Routes

router.get('/', (req, res, next) => {
  res.render('ticker')
})

// Export module
module.exports = router
