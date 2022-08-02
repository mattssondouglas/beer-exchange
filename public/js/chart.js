const createChart = data => {
  const config = {
    type: 'line',
    data: data,
    options: {}
  }

  const myChart = new Chart(document.getElementById('myChart'), config)

  // 4. use data to create config
  // {
  // 	data...
  // }
  // 5. code that creates chart
  // document.querySelector('#chartId')
}

const getDataFromAPI = async () => {
  // 1. get data from API
  // let rawData = await fetch('/yourURL')
  const url = '/chartdata'
  const response = await fetch(url)
  const rawData = await response.json()
  // 2. transform the data from controller into chart.js format
  // data = rawData.map(e => {
  // etc.
  // })

  // const labels = ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6']
  const labels = rawData.map(history => history.timestamp)

  let beers = rawData.map(history => history.beers.map(beer => beer))

  let beerNames = rawData.map(history => history.beers.map(beer => beer.name))

  let beerPrices = rawData.map(history =>
    history.beers.map(beer => beer.currentPrice)
  )

  console.log(
    rawData.map(history =>
      history.beers.map(beer => {
        return {
          label: beerNames,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: beerPrices
        }
      })
    )
  )

  const data = {
    labels: labels,
    datasets: rawData.map(history =>
      history.beers.map(beer => {
        return {
          label: beerNames,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: beerPrices
        }
      })
    )

    // [
    //   {
    //     label: beerNames[0],
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: [
    //       beer.currentPrice[0],
    //       beer.currentPrice[1],
    //       beer.currentPrice[2],
    //       2,
    //       20,
    //       30,
    //       45
    //     ]
    //   },
    //   {
    //     label: 'Leo',
    //     backgroundColor: 'rgb(0, 99, 132)',
    //     borderColor: 'rgb(0, 99, 132)',
    //     data: [10, 1, 15, 12, 2, 13, 40]
    //   }
    // ]
  }

  // 3. pass the data to the chart
  createChart(data)
}

getDataFromAPI()