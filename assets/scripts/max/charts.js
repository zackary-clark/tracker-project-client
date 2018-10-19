'use strict'

google.charts.load('current', {packages: ['line']})
google.charts.setOnLoadCallback(initialize)

// const store = require('../store')

function initialize() {
    // draw chart on click
    setTimeout(() => $('#show-maxes-chart').on('click', drawMaxesChart), 1000)
}

function drawMaxesChart() {
    $('.table-container').hide()
    $('#maxes-chart').show()
    const data = new google.visualization.DataTable()
    data.addColumn('date', 'Date')
    data.addColumn('number', 'Squat')
    data.addColumn('number', 'Bench')
    data.addColumn('number', 'Deadlift')
    data.addColumn('number', 'OHP')

    data.addRows([
        [new Date(2018, 6, 12), store.maxes.squat1RM, 80.8, 41.8, 3.4],
        [new Date(2018, 6, 13), store.maxes.squat1RM, 69.5, 32.4, 3.4],
        [new Date(2018, 6, 14), store.maxes.squat1RM,   57, 25.7, 3.4],
        [new Date(2018, 6, 15), store.maxes.squat1RM, 18.8, 10.5, 3.4],
        [new Date(2018, 6, 16), store.maxes.squat1RM, 17.6, 10.4, 3.4],
        [new Date(2018, 6, 17), store.maxes.squat1RM, 13.6,  7.7, 3.4],
        [new Date(2018, 6, 18), store.maxes.squat1RM, 12.3,  9.6, 3.4],
        [new Date(2018, 6, 19), store.maxes.squat1RM, 29.2, 10.6, 3.4],
        [new Date(2018, 6, 20), store.maxes.squat1RM, 42.9, 14.8, 3.4],
        [new Date(2018, 6, 21), store.maxes.squat1RM, 30.9, 11.6, 3.4],
        [new Date(2018, 6, 22), store.maxes.squat1RM,  7.9,  4.7, 3.4],
        [new Date(2018, 6, 23), store.maxes.squat1RM,  8.4,  5.2, 3.4],
        [new Date(2018, 6, 24), store.maxes.squat1RM,  6.3,  3.6, 3.4],
        [new Date(2018, 6, 25), store.maxes.squat1RM,  6.2,  3.4, 3.4]
    ])

    const options = {
        chart: {
            title: 'One Rep Maxes'
        },
        width: 750,
        height: 500
    }

    const chart = new google.charts.Line(document.getElementById('maxes-chart'))

    chart.draw(data, google.charts.Line.convertOptions(options))
}
