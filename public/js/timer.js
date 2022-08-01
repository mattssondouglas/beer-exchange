const updateBeers = async () => {
  //
  fetch('/beers/decrease', {
    method: 'PATCH'
  })
    .then(response => response.json())
    .then(beers => {
      beers.forEach((beer, i) => {
        document.querySelectorAll('.price')[i].innerHTML =
          beer.currentPrice + '฿'
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}

const updateTicker = async () => {
  fetch('/beers', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(beers => {
      beers.forEach((beer, i) => {
        document.querySelectorAll('.price')[i].innerHTML =
          beer.currentPrice + '฿'
        document.querySelectorAll('.lprice')[i].innerHTML =
          beer.lowestPrice + '฿'
        document.querySelectorAll('.hprice')[i].innerHTML =
          beer.highestPrice + '฿'
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}

const orderBeer = async () => {
  fetch('/beers', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(beers => {
      beers.forEach((beer, i) => {
        document.querySelectorAll('.price')[i].innerHTML =
          beer.currentPrice + '฿'
        // document.querySelectorAll('.lprice')[i].innerHTML =
        //   beer.lowestPrice + '฿'
        // document.querySelectorAll('.hprice')[i].innerHTML =
        //   beer.highestPrice + '฿'
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}

console.log('location is ' + window.location.href.includes('ticker'))
updateBeers()
// updateTicker()
//
let ticker = setInterval(() => {
  if (window.location.href.includes('ticker')) {
    updateTicker()
  }
}, 1 * 1000)

let decrease = setInterval(() => {
  updateBeers()
}, 5 * 1000)

// Stop after 60 seconds

setInterval(() => {
  clearInterval(decrease)
}, 200 * 1000)
