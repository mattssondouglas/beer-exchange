// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')

//Requests
// GET
router.get('/', (req, res, next) => {
  res.render('create')
})

// POST /
router.post('/', async (req, res, next) => {
  try {
    // set the current = start
    let currentPrice = req.body.startingPrice
    let beer = await Beers.create({
      name: req.body.name,
      photo: req.body.photo,
      startingPrice: req.body.startingPrice,
      minimumPrice: req.body.minimumPrice,
      currentPrice: req.body.startingPrice
    })
    res.redirect('/create')
  } catch (err) {
    next(err)
  }
})

// Export module
module.exports = router
