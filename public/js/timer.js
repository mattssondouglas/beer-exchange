// import { Beers } from '../models/beers'
// console.log('start')
document.querySelectorAll('.price').innerHTML = 'Hi'

const decreasePrices = () => {
  // console.log('decrease prices')
}

const updateBeers = async () => {
  // decreasePrices()
  // console.log('updateBeers')
  // console.log('hi')

  fetch('/beers/decrease', {
    method: 'PATCH'
  })
    .then(response => response.json())
    .then(beers => {
      console.log('beers', beers)
      beers.forEach(beer => {
        console.log('beer', beer)
        // update beers price in the UI
        document.querySelectorAll('.price').innerHTML =
          '<span>${beer.price}</span>'
      })
    })
    .catch(err => {
      console.log('err', err)
    })

  // console.log(beers)
}

updateBeers()

// let decrease = setInterval(() => {
//   updateBeers()
// }, 1 * 1000)

// Stop after 60 seconds

// setInterval(() => {
//   clearInterval(decrease)
// }, 5 * 1000)
