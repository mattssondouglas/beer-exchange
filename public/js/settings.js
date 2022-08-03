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
  console.log('this is the right location')
} else {
  console.log('wrong location')
}
