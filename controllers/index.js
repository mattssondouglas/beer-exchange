// use express router
const express = require('express')
const router = express.Router()
// GET route and render 'pos' template

router.get('/', (req, res) => {
  res.render('pos.hbs')
})

// export router
module.exports = router
