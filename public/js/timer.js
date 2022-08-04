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
        if (beer.trending) {
          document.querySelectorAll('.trend')[i].innerHTML = 'UP'
        } else {
          document.querySelectorAll('.trend')[i].innerHTML = 'DOWN'
        }
      })
    })
    .catch(err => {})
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
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getSettings = async () => {
  fetch('/settings', {
    method: 'GET'
  }).then(response => response.json())
  return settings
}
let mySettings = 23
mySettings = getSettings()
console.log('settings are: ' + mySettings)

// console.log('location is ' + window.location.href.includes('ticker'))
// updateBeers()
// updateTicker()
//
let ticker = setInterval(() => {
  if (window.location.href.includes('ticker')) {
    updateTicker()
  }
}, 10 * 1000)

let num = 5

let decrease = setInterval(() => {
  updateBeers()
}, num * 1000)

// Stop after 60 seconds

setInterval(() => {
  clearInterval(decrease)
}, 200 * 1000)
