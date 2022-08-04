const express = require('express')
const router = express.Router()
const dbMethods = require('../methods/dbMethods')

const priceDrop = beer => {
  beer.currentPrice = (beer.currentPrice * 0.98).toFixed(2)
  return beer.currentPrice
}

const marketCrash = async beer => {
  try {
    // console.log('starting crash')
    let mySettings = await dbMethods.getSettings()
    // console.log('my settings are', mySettings)
    let discount = (100 - mySettings.upTrendDiscount) / 100
    // console.log('my uptrend value is', mySettings.upTrendDiscount)
    console.log('my discount is', discount)
    let aboveMin = mySettings.downTrendDiscount / 100 + 1
    // console.log('result for above min is', aboveMin)
    if (beer.currentPrice > beer.startingPrice) {
      beer.currentPrice = (beer.currentPrice * discount).toFixed(2)
    } else if (beer.currentPrice <= beer.startingPrice) {
      beer.currentPrice = (beer.minimumPrice * aboveMin).toFixed(2)
    }
    return beer.currentPrice
  } catch (err) {
    console.log('this is the error', err)
  }
}

const setTrend = beers => {
  let mybeers = beers.map((beer, i) => {
    if (beer.currentPrice > beer.startingPrice) {
      beer.trending = true
    } else {
      beer.trending = false
    }
    return beer
  })
  return mybeers
}
// Export module
module.exports = { marketCrash, priceDrop, setTrend }
