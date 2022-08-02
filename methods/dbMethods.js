const express = require('express')
const router = express.Router()
const Beers = require('../models/beers')

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

const setPriceOnDecrease = async () => {
  await Beers.updateMany(
    {},
    [
      {
        $set: {
          currentPrice: {
            $cond: {
              if: {
                $gt: [
                  '$minimumPrice',
                  { $round: [{ $multiply: ['$currentPrice', 0.98] }, 2] }
                ]
              },
              then: '$minimumPrice',
              else: { $round: [{ $multiply: ['$currentPrice', 0.98] }, 2] }
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
  resetMarket
}
