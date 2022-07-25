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
    console.log('hello')
    let beer = await Beers.create(req.body)
    console.log(beer)
    res.redirect('/create')
  } catch (err) {
    next(err)
  }
})

// Export module
module.exports = router
