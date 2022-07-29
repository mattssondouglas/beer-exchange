// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')

// Create POST controller

// Create GET controller
router.get('/', async (req, res) => {
  try {
    let beers = await Beers.find({})

    // console.log(beers)
    res.render('beers', { beers })
  } catch (err) {
    throw error
  }
})

// Create PATCH controller

// Create DELETE controller

// Views
// Create here a controller that accepts GET requests and renders the "search" page

// Export module
module.exports = router
