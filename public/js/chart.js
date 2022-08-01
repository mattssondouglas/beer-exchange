const labels = ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Singha',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45]
    },
    {
      label: 'Leo',
      backgroundColor: 'rgb(0, 99, 132)',
      borderColor: 'rgb(0, 99, 132)',
      data: [10, 1, 15, 12, 2, 13, 40]
    }
  ]
}

const config = {
  type: 'line',
  data: data,
  options: {}
}

const myChart = new Chart(document.getElementById('myChart'), config)

// make route (which one?) res.json instead of rendering some page
// for each beer, create a dataset. in each dataset, get datapoints from history.currentPrice (use a loop)
