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
    allBeers = await Beers.find({})
    // console.log(allBeers)
    const updateDB = async (id, price) => {
      // console.log('starting func')
      let mynew = await Beers.findByIdAndUpdate(id, {
        currentPrice: price
      })
      console.log(mynew)
    }
    // update beer price to be 50% off
    allBeers.map(beer => {
      if (beer.currentPrice >= beer.startingPrice) {
        beer.currentPrice = (beer.currentPrice * 0.5).toFixed(2)
        updateDB(beer._id, beer.currentPrice)
      } else if (beer.currentPrice < beer.startingPrice) {
        beer.currentPrice = beer.minimumPrice * 1.2
        updateDB(beer._id, beer.currentPrice)
      }
      // return beer.save()
    })

    //console.log(allBeers[2])
    // update database with updated prices
    // let beers = await allBeers.save()

    // filter for all beers below starting price
    // update beer price to be above floor price

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
