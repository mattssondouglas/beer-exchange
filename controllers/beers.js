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

// Create PATCH controller
router.patch('/crash', async (req, res, next) => {
  console.log(' crash')
  try {
    console.log('Starting crash')
    if (confirm('Press a button!')) {
      console.log('You pressed OK!')
    } else {
      console.log('You pressed Cancel!')
    }
    res.redirect('/')
  } catch (err) {
    next(err)
  }
})

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
