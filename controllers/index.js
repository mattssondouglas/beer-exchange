// Import Packages
const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')
const History = require('../models/history')

// Create POST controller

// Create GET controller
router.get('/', async (req, res) => {
  try {
    let beers = await Beers.find({})

    // console.log(beers)
    res.render('beers', { beers })
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
    let latestHistory = await History.find({}).populate({
      path: 'beers.beerId',
      select: 'name'
    })

    // const labels = latestHistory.map(history => history.timestamp)
    //
    // let beers = latestHistory.map(history => history.beers.map(beer => beer))
    //
    // let beerNames = latestHistory.map(history =>
    //   history.beers.map(beer => beer.beerId.name)
    // )
    //
    // let beerPrices = latestHistory.map(history =>
    //   history.beers.map(beer => beer.currentPrice)
    // )
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

    console.log(beerPrices)

		let data = {
	    labels: labels,
	    datasets: latestHistory[0].beers.map(beer => {
				return {
					label: beer.beerId.name,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data:
				}
			})

					// data: [
					// 	beer.currentPrice[0],
					// 	beer.currentPrice[1],
					// 	beer.currentPrice[2],
					// 	2,
					// 	20,
					// 	30,
					// 	45
					// ]


		// let data = {
		//   labels: histories.map(h => h.timestamp),
		//   datasets: histories[0].beers.map(beer => {
		//     return {
		//       label: beer.beerId.name,
		//       data: 'o'
		//     }
		//   })
		// }
    let everything = {
      labels,
      beers,
      beerNames,
    }

    // one loop with four accumulators where current variables are accumulators.

    // getChartData()
    res.json(everything)
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
