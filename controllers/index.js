// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')
const Settings = require('../models/settings')
const History = require('../models/history')
const dbMethods = require('../methods/dbMethods')

// Create POST controller

// Create GET controller
router.get('/', async (req, res) => {
  try {
    let beers = await Beers.find({})
    // let mySettings = false
    // let settings = await Settings.findOne({})
    //
    // if (settings.marketCrash[0].active) {
    //   mySettings = true
    // }
    let crashActive = dbMethods.checkMarketCrash()
    // console.log(beers)
    res.render('beers', { beers, crashActive })
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

router.get('/chart', async (req, res, next) => {
  try {
    res.render('chart')
  } catch (err) {
    throw err
  }
})

router.get('/chartdata', async (req, res, next) => {
  try {
    let latestHistory = await History.find({})
    // getChartData()
    res.json(latestHistory)
  } catch (err) {
    throw err
  }
})
// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
