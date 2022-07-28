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
  try {
    console.log('Starting crash')
    // retrieve all Beers
    let allBeers = await Beers.find({})

    const calcBeer = beer => {
      console.log('start function calcBeer')
      if (beer.currentPrice >= beer.startingPrice) {
        beer.currentPrice = (beer.currentPrice * 0.5).toFixed(2)
      } else if (beer.currentPrice < beer.startingPrice) {
        beer.currentPrice = (beer.minimumPrice * 1.2).toFixed(2)
      }
      return beer.currentPrice
    }

    await Promise.all(
      allBeers.map(beer => {
        beer.currentPrice = calcBeer(beer)
        return beer
      })
    )
    allBeers.forEach(async beer => {
      beer.save()
    })

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
