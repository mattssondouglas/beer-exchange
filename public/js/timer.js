// import { Beers } from '../models/beers'
// console.log('start')
// document.querySelectorAll('.price').innerHTML = 'Hi'

// const decreasePrices = beer => {
//   // console.log('decrease prices')
//   let myContents = (document.querySelectorAll('.price').innerHTML = '80')
//   // console.log(myContents)
//
//   contents.forEach((content, i) => {
//     content.innerHTML = '80'
//   })
// }
// document.querySelector('.button').innerHTML = 'Hello'

const updateBeers = async () => {
  //
  // console.log('updateBeers')
  // console.log('hi')

  fetch('/beers/decrease', {
    method: 'PATCH'
  })
    .then(response => response.json())
    .then(beers => {
      // console.log('beers', beers)
      // console.log(beers.length)
      // console.log(beers[1])
      // let myContents = document.querySelector('.price').innerHTML[0]
      // console.log(myContents)
      // console.log(myContents.length)
      // beers = JSON.parse(beers)
      // console.log(beers)

      beers.forEach((beer, i) => {
        // console.log(document.querySelectorAll('.price')[i].innerHTML) // console.log(myContents)

        document.querySelectorAll('.price')[i].innerHTML = beer.currentPrice
        // decreasePrices(beer)
        // console.log('beer', beer)
        // update beers price in the UI
        // console.log('this is the' + beersList)
      })
    })
    .catch(err => {
      console.log('err', err)
    })

  // console.log(beers)
}

updateBeers()
//
let decrease = setInterval(() => {
  updateBeers()
}, 1 * 1000)

// Stop after 60 seconds

setInterval(() => {
  clearInterval(decrease)
}, 200 * 1000)
