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

updateBeers()
//
let decrease = setInterval(() => {
  updateBeers()
}, 5 * 1000)

// Stop after 60 seconds

setInterval(() => {
  clearInterval(decrease)
}, 200 * 1000)
