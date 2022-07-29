// setInterval(myTimer, 1000)
// function myTimer() {}
// // For Emergency, stop timer after 20 seconds
// setTimeout(() => {
//   clearInterval(myTimer)
// }, 20 * 1000)

const updateBeers = async () => {
  console.log('hi')
}

updateBeers()

let decrease = setInterval(() => {
  updateBeers()
}, 1 * 1000)

// Stop after 60 seconds

setInterval(() => {
  clearInterval(decrease)
}, 5 * 1000)
