// const express = require('express')
// const router = express.Router()
// const dbMethods = require('../methods/dbMethods')
//
// let mySettings = dbMethods.getSettings()

// console.log('Hello world')
//
// let decreased = setInterval(() => {
//   console.log('my settings are: ' + mySettings)
// }, 1 * 1000)

if (window.location.href.includes('reset')) {
  window.location.replace('/settings')
  // console.log('this is the right location')
}
// console.log('Starting settings')
const pricedrop = val => {
  let str =
    'A beer that costs 70฿ will drop in price in the following increments '
  let prices = [1, 2, 3]
  let beerCost = 70
  let percentage = val / 100

  prices[0] = 70 - 70 * percentage
  prices[1] = prices[0] - prices[0] * percentage
  prices[2] = prices[1] - prices[1] * percentage

  prices = prices.map(price => {
    return Number(price.toFixed(2))
  })

  // console.log(prices)
  document.querySelector('.pricedrop').innerHTML =
    str + '฿' + prices[0] + ' ' + '฿' + prices[1] + ' ' + '฿' + prices[2] + ' '
  return
}

const priceincrease = val => {
  let str =
    'A beer that costs 70฿ will increase in price in the following increments '
  let prices = [1, 2, 3]
  let beerCost = 70
  let percentage = val / 100

  prices[0] = 70 + 70 * percentage
  prices[1] = prices[0] + prices[0] * percentage
  prices[2] = prices[1] + prices[1] * percentage

  prices = prices.map(price => {
    return Number(price.toFixed(2))
  })

  // console.log(prices)
  document.querySelector('.priceincrease').innerHTML =
    str + '฿' + prices[0] + ' ' + '฿' + prices[1] + ' ' + '฿' + prices[2] + ' '
  return
}

const downtrend = val => {
  let str = 'A beer with a minium price of ฿30 will sell at '
  let prices = 0
  let beerCost = 70
  let percentage = val / 100

  prices = (30 + 30 * percentage).toFixed(2)

  // console.log(prices)
  document.querySelector('.downtrend').innerHTML =
    str + '฿' + prices + ' during a market crash'
  return
}

const uptrend = val => {
  let str =
    'A beer selling at ฿100 above its starting price of ฿70 will sell at '
  let prices = 0
  let percentage = val / 100

  prices = (100 - 100 * percentage).toFixed(2)

  // console.log(prices)
  document.querySelector('.uptrend').innerHTML =
    str + '฿' + prices + ' during a market crash'
  return
}
