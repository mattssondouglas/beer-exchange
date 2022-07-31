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

const decreasePrice = async () => {
  await Beers.updateMany(
    {},
    [
      {
        $set: {
          currentPrice: {
            $round: [{ $multiply: ['$currentPrice', 0.98] }, 2]
          }
        }
      }
      // }
    ],
    { new: true }
  )
}

// checks if any of the beers current price is below the minimumPrice and sets the currentPrice to the minimum where true
const checkMinimum = async () => {
  await Beers.updateMany(
    {
      $expr: { $gt: ['$minimumPrice', '$currentPrice'] }
      // minimumPrice: { $gte: 'currentPrice' }
    },
    [
      {
        $set: {
          currentPrice: '$minimumPrice'
        }
      }
      // }
    ],
    { new: true }
  )
}

// checks if the current price of each beer is lower than the lowest price and updates the lowest price field where true
const setLowestPrice = async () => {
  await Beers.updateMany(
    {
      $expr: { $gt: ['$lowestPrice', '$currentPrice'] }
      // minimumPrice: { $gte: 'currentPrice' }
    },
    [
      {
        $set: {
          lowestPrice: '$currentPrice'
        }
      }
      // }
    ],
    { new: true }
  )
}

// function to reset market prices to starting price
const resetMarket = async () => {
  await Beers.updateMany(
    {},
    [
      {
        $set: {
          currentPrice: '$startingPrice'
        }
      }
    ],
    { new: true }
  )
}

// Export module
module.exports = {
  createBeer,
  decreasePrice,
  checkMinimum,
  setLowestPrice,
  resetMarket
}
