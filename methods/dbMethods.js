const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')
const Settings = require('../models/settings')

const createBeer = async beer => {
  await Beers.create({
    name: beer.name,
    photo: beer.photo,
    startingPrice: beer.startingPrice,
    minimumPrice: beer.minimumPrice,
    currentPrice: beer.startingPrice,
    lowestPrice: beer.startingPrice,
    highestPrice: beer.startingPrice
  })
}

const getSettings = async () => {
  let mySettings = await Settings.findOne({})
  return mySettings
}

const setPriceOnDecrease = async () => {
  try {
    let mySettings = await getSettings()
    let priceDrop = (100 - mySettings.priceDrop) / 100
    // console.log('start query')
    let a = await Beers.updateMany(
      {},
      [
        {
          $set: {
            currentPrice: {
              $cond: {
                if: {
                  $gt: [
                    '$minimumPrice',
                    {
                      // $round: [{ $multiply: ['$currentPrice', 0.98] }, 2]
                      $round: [{ $multiply: ['$currentPrice', +priceDrop] }, 2]
                    }
                  ]
                },
                then: '$minimumPrice',
                else: {
                  // $round: [{ $multiply: ['$currentPrice', 0.98] }, 2]
                  $round: [{ $multiply: ['$currentPrice', +priceDrop] }, 2]
                }
              }
            },
            lowestPrice: {
              $cond: {
                if: {
                  $gt: ['$lowestPrice', '$currentPrice']
                },
                then: '$currentPrice',
                else: '$lowestPrice'
              }
            }
          }
        }
        // }
      ],
      { new: true }
    )
    // console.log(a)
    // console.log('finished query')
  } catch (err) {
    // console.log('catching error')
    // console.log(err)
    next(err)
  }

  return
}

// const decreasePrice = async () => {
//   await Beers.updateMany(
//     {},
//     [
//       {
//         $set: {
//           currentPrice: {
//             $round: [{ $multiply: ['$currentPrice', 0.98] }, 2]
//           }
//         }
//       }
//       // }
//     ],
//     { new: true }
//   )
// }
//
// // checks if any of the beers current price is below the minimumPrice and sets the currentPrice to the minimum where true
// const checkMinimum = async () => {
//   await Beers.updateMany(
//     {
//       $expr: { $gt: ['$minimumPrice', '$currentPrice'] }
//       // minimumPrice: { $gte: 'currentPrice' }
//     },
//     [
//       {
//         $set: {
//           currentPrice: '$minimumPrice'
//         }
//       }
//       // }
//     ],
//     { new: true }
//   )
// }

// updates the current price in the database after an order
const setCurrentPrice = async (beer, updatedPrice) => {
  await Beers.findOneAndUpdate(
    {
      _id: beer.id
    },
    {
      currentPrice: updatedPrice
    }
  )
  return
}

const checkCrashStatus = async () => {
  let crashActive = false
  let settings = await Settings.findOne({})

  if (settings.crashActive) {
    crashActive = true
  }
  // console.log('checkCrashStatus: crash is currently ' + crashActive)
  return crashActive
}
// checks if the current price of each beer is lower than the lowest price and updates the lowest price field where true
// const setLowestPrice = async () => {
//   await Beers.updateMany(
//     {
//       $expr: { $gt: ['$lowestPrice', '$currentPrice'] }
//       // minimumPrice: { $gte: 'currentPrice' }
//     },
//     [
//       {
//         $set: {
//           lowestPrice: '$currentPrice'
//         }
//       }
//       // }
//     ],
//     { new: true }
//   )
// }

const setHighestPrice = async beer => {
  if (beer.currentPrice > beer.highestPrice) {
    await Beers.findOneAndUpdate(
      {
        _id: beer.id
      },
      {
        highestPrice: beer.currentPrice
      }
    )
  }
  return
}

// function to reset market prices to starting price
const resetMarket = async () => {
  await Beers.updateMany(
    {},
    [
      {
        $set: {
          currentPrice: '$startingPrice',
          lowestPrice: '$startingPrice',
          highestPrice: '$startingPrice'
        }
      }
    ],
    { new: true }
  )
  return
}

const toggleCrash = async crash => {
  // console.log('TOGGLECRASH: crash status is: ', crash)

  crash = await Settings.findOneAndUpdate(
    {},
    { crashActive: !crash },
    { new: true }
  )
  // console.log('crash changed to : ', crash.crashActive)

  return
}

const crashPricesUpdate = async crash => {
  if (crash) {
    console.log('restoring prices')
    await Beers.updateMany(
      {},
      [
        {
          $set: {
            currentPrice: '$backupPrice'
          }
        }
      ],
      { new: true }
    )
  } else {
    console.log('backup prices')
    await Beers.updateMany(
      {},
      [
        {
          $set: {
            backupPrice: '$currentPrice'
          }
        }
      ],
      { new: true }
    )
  }
}

// Export module
module.exports = {
  setPriceOnDecrease,
  createBeer,
  // decreasePrice,
  // checkMinimum,
  setCurrentPrice,
  // setLowestPrice,
  setHighestPrice,
  resetMarket,
  getSettings,
  checkCrashStatus,
  toggleCrash,
  crashPricesUpdate
}
