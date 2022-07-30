// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')
const calcMethods = require('../methods/calcMethods')
const dbMethods = require('../methods/dbMethods')

//Requests
// GET
router.get('/', (req, res, next) => {
  // res.render('create')
})

// PATCH

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
router.patch('/decrease', async (req, res, next) => {
  try {
    // console.log('hello')
    await Beers.updateMany(
      {},
      [
        {
          $set: {
            currentPrice: {
              $round: [{ $multiply: ['$currentPrice', 0.98] }, 2]
            }
          }
        }
        // }
      ],
      { new: true }
    )

    await Beers.updateMany(
      {
        $expr: { $gt: ['$minimumPrice', '$currentPrice'] }
        // minimumPrice: { $gte: 'currentPrice' }
      },
      [
        {
          $set: {
            currentPrice: '$minimumPrice'
          }
        }
        // }
      ],
      { new: true }
    ) // console.log(items)
    let beers = await Beers.find({})
    // console.log(beers)
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

router.patch('/crash', async (req, res, next) => {
  try {
    console.log('Starting crash')
    // retrieve all Beers
    let allBeers = await Beers.find({})

    await Promise.all(
      allBeers.map(beer => {
        beer.currentPrice = calcMethods.marketCrash(beer)
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

router.patch('/reset', async (req, res, next) => {
  try {
    let items = await Beers.updateMany(
      {},
      [
        {
          $set: {
            currentPrice: '$startingPrice'
          }
        }
      ],
      { new: true }
    )
    let beers = await Beers.find({})
    res.render('beers', { beers })
  } catch (err) {
    next(err)
  }
})

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
