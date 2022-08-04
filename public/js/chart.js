const createChart = data => {
  const config = {
    type: 'line',
    data: data,
    options: {}
  }

  myChart = new Chart(document.getElementById('myChart'), config)
}

const getDataFromAPI = async () => {
  // 1. get data from API
  // let rawData = await fetch('/yourURL')
  const url = '/chartdata'
  const rawData = await fetch(url)
  return await rawData.json()
  // 2. transform the data from controller into chart.js format

  // 3. pass the data to the chart
  // console.log(data)
  // createChart(data)
}

const getDataAndCreateChart = async () => {
  let data = await getDataFromAPI()
  createChart(data)
}

const getDataAndUpdateChart = async () => {
  let data = await getDataFromAPI()
  // myChart.data.labels.push('hello')
  // myChart.data.labels.pop()
  // myChart.data.datasets.push('')
  // myChart.data.labels.pop()
  myChart.data.labels = data.labels
  myChart.data.datasets = data.datasets
  myChart.update()
}

getDataAndCreateChart()

setInterval(() => {
  console.log('hello')
  getDataAndUpdateChart()
}, 5000)
