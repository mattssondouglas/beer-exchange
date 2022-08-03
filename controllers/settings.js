// Import Packages
const express = require('express')
const router = express.Router()
const Settings = require('../models/settings')

// Create POST controller

// Create GET controller
router.get('/', async (req, res) => {
  try {
    // console.log('hi settings')
    let mySettings = await Settings.findOne({}).lean()
    console.log('type of ' + typeof mySettings.priceDrop)
    // console.log(mySettings.marketCrash[0].active)
    res.render('./settings', { mySettings })
  } catch (err) {
    throw err
  }
})

router.get('/create', (req, res, next) => {
  try {
    res.render('create')
  } catch (err) {
    throw err
  }
})

// Create PATCH controller
router.patch('/', async (req, res, next) => {
  try {
    // console.log('Hello Patch')
    console.log('body is', req.body)
    let mySettings = await Settings.findOneAndUpdate(
      {},
      {
        priceDrop: req.body.priceDrop,
        priceIncrease: req.body.priceIncrease,
        priceDropInterval: req.body.priceDropInterval,
        upTrendDiscount: req.body.upTrendDiscount,
        downTrendDiscount: req.body.downTrendDiscount,
        crashDuration: req.body.crashDuration
      },
      {
        new: true
      }
    )
    // console.log('result is', mySettings)
    // console.log(req.body)
    res.redirect('/settings')
  } catch (err) {
    next(err)
  }
})

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
