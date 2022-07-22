// Import Packages
const express = require('express')
const router = express.Router()

//Requests
// POST BEERS /
router.post('/beers', async (req, res, next) => {
  try {
    let beer = await Beers.create(req.body)
    res.redirect('/beers')
  } catch (err) {
    next(err)
  }
})

// Export module
module.exports = router
// Make sure controller works, clean up old airbnb stuff, move onto model and create collection
