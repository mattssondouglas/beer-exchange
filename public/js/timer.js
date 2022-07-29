setInterval(myTimer, 1000)
function myTimer() {}
// For Emergency, stop timer after 20 seconds
setTimeout(() => {
  clearInterval(myTimer)
}, 20 * 1000)
