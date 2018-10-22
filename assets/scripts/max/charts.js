'use strict'

google.charts.load('current', {packages: ['corechart']})
google.charts.setOnLoadCallback(initialize)

function initialize() {
    // draw chart on click
    $('#show-maxes-chart').on('click', checkForData)
}

function checkForData() {
    // FIXME: use real async. For now, poor man's async (waiting 3 seconds to draw the chart) will work
    sessionStorage.getItem("maxes") ? drawMaxesChart() : setTimeout(() => drawMaxesChart(), 3000)
}

function drawMaxesChart() {

    const maxes = JSON.parse(sessionStorage.getItem("maxes"))

    $('.table-container').hide()
    $('.chart-container').show()
    $('.max-container').show()

    const data = new google.visualization.DataTable()
    data.addColumn('date', 'Date')
    data.addColumn('number', 'Squat')
    data.addColumn('number', 'Bench')
    data.addColumn('number', 'Deadlift')
    data.addColumn('number', 'OHP')

    maxes.forEach(max => {
        const date = new Date(max.date)
        data.addRow([new Date(date.getTime() - date.getTimezoneOffset() * -60000), max.squat1RM, max.bench1RM, max.deadlift1RM, max.press1RM])
    })

    const options = {
        title: 'One Rep Maxes',
        legend: {
            position: 'right'
        },
        vAxis: {
            title: 'Weight in Pounds'
        },
        interpolateNulls: true
    }

    const chart = new google.visualization.LineChart(document.getElementById('maxes-chart'))

    chart.draw(data, options)
}
