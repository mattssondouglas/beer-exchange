const createChart = data => {
  const config = {
    type: 'line',
    data: data,
    options: {}
  }

  myChart = new Chart(document.getElementById('myChart'), config)
}

const getDataFromAPI = async () => {
  const url = '/chartdata'
  const rawData = await fetch(url)
  return await rawData.json()
}

const getDataAndCreateChart = async () => {
  let data = await getDataFromAPI()
  createChart(data)
}

const getDataAndUpdateChart = async () => {
  let data = await getDataFromAPI()
  console.log(data.labels)
  console.log(data.labels[data.labels.length - 1])
  myChart.data.labels.push(data.labels[data.labels.length - 1])
  myChart.data.labels.shift()
  myChart.data.datasets.forEach((dataset, index) => {
    dataset.data.push(
      data.datasets[index].data[data.datasets[index].data.length - 1]
    )
    dataset.data.shift()
  })
  myChart.update()
}

getDataAndCreateChart()

setInterval(() => {
  console.log('hello')
  getDataAndUpdateChart()
}, 5000)
