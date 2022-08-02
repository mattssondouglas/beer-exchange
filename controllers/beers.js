// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')
const History = require('../models/history')
const calcMethods = require('../methods/calcMethods')
const dbMethods = require('../methods/dbMethods')

//Requests
// GET
router.get('/', async (req, res, next) => {
  // res.render('create')
  let beers = await Beers.find({})
  calcMethods.setTrend(beers)
  res.json(beers)
})

// PATCH

// POST /
router.post('/', async (req, res, next) => {
  try {
    // set the current = start
    // let currentPrice = req.body.startingPrice
    await dbMethods.createBeer(req.body)
    res.redirect('/create')
  } catch (err) {
    next(err)
  }
})

// Create PATCH controller
router.patch('/decrease', async (req, res, next) => {
  try {
    // console.log('patch decrease')

    await dbMethods.setPriceOnDecrease()
    // await dbMethods.decreasePrice()
    // await dbMethods.checkMinimum()
    //await dbMethods.setLowestPrice()

    let beers = await Beers.find({}).lean()
    beers = beers.map(beer => {
      beer.beerId = beer._id
      return beer
    })
    console.log(beers)
    let history = await History.create({
      beers
    })
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

router.patch('/crash', async (req, res, next) => {
  try {
    // console.log('Starting crash')
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
    await dbMethods.resetMarket()
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
