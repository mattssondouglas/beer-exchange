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
    let beers = await Beers.find({})
    res.render('chart', { beers })
  } catch (err) {
    throw err
  }
})

router.get('/chartdata', async (req, res, next) => {
  try {
    let latestHistory = await History.find({})
      .sort('timestamp')
      .populate({
        path: 'beers.beerId',
        select: 'name'
      })

    latestHistory = latestHistory.splice(
      latestHistory.length - 60,
      latestHistory.length - 1
    )

    const labels = []

    let beers = []

    let beerNames = []

    latestHistory.map(history => {
      labels.push(history.timestamp)
      history.beers.map(beer => {
        beers.push(beer)
        beerNames.push(beer.beerId.name)
      })
    })

    let colors = [
      '#e6194b',
      '#3cb44b',
      '#ffe119',
      '#4363d8',
      '#f58231',
      '#911eb4',
      '#46f0f0',
      '#f032e6',
      '#bcf60c',
      '#fabebe',
      '#008080',
      '#e6beff',
      '#9a6324',
      '#fffac8',
      '#800000',
      '#aaffc3',
      '#808000',
      '#ffd8b1',
      '#000075',
      '#808080',
      '#ffffff',
      '#000000'
    ]

    let data = {
      labels: labels,
      datasets: latestHistory[0].beers.map((beer, beerindex) => {
        return {
          label: beer.beerId.name,
          backgroundColor: colors[beerindex],
          borderColor: colors[beerindex],
          data: latestHistory.map(history => {
            return history.beers[beerindex].currentPrice
          })
        }
      })
    }

    console.log(
      latestHistory.map(history => {
        return history
      })
    )

    res.json(data)
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
