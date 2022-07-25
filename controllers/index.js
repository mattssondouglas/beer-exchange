// use express router
const express = require('express')
const router = express.Router()
// GET route and render 'pos' template

router.get('/', (req, res) => {
  res.render('beers')
})

// export router
module.exports = router
