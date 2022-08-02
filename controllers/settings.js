// Import Packages
const express = require('express')
const router = express.Router()
const Settings = require('../models/settings')

// Create POST controller

// Create GET controller
router.get('/', async (req, res) => {
  try {
    console.log('hi there')
    let mySettings = await Settings.findOne({})
    console.log(mySettings.marketCrash[0].active)
    // console.log(beers)
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
router.post('/', async (req, res, next) => {
  try {
    console.log('Hello Patch')
  } catch (err) {
    next(err)
  }
})

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
