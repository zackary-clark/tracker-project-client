'use strict'

google.charts.load('current', {packages: ['corechart']})

google.charts.setOnLoadCallback(initializeMax)
google.charts.setOnLoadCallback(initializeBW)

// Max Chart functions

function initializeMax() {
    // draw chart on click
    $('#show-maxes-chart').on('click', noCheckForExistingMaxData)
    $('#new-max-submit').on('click', checkIfChartVisible)
}

function checkIfChartVisible() {
    if ($('.chart-container').css("display") === "block") {
        noCheckForExistingMaxData()
    }
}

// TODO: Use real async instead of setTimeout
function noCheckForExistingMaxData() {
    $('.display-message').text('Loading...')
    setTimeout(() => $('.display-message').html('&nbsp;'), 3000)
    setTimeout(drawMaxesChart, 3000)
}

function drawMaxesChart() {

    const maxes = JSON.parse(sessionStorage.getItem("maxes"))

    $('.max-container').show()
    $('.chart-container').show()

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
        interpolateNulls: true,
        focusTarget: 'category'
    }

    const chart = new google.visualization.LineChart(document.getElementById('maxes-chart'))

    chart.draw(data, options)
}

// BW Chart Functions

function initializeBW() {
    // draw chart on click
    $('#show-bodyweights-chart').on('click', noCheckForExistingBWData)
    $('#new-bodyweight-submit').on('click', checkIfBWChartVisible)
}

function checkIfBWChartVisible() {
    if ($('.bodyweight-chart-container').css("display") === "block") {
        noCheckForExistingBWData()
    }
}

function noCheckForExistingBWData() {
    $('.display-message').text('Loading...')
    setTimeout(() => $('.display-message').html('&nbsp;'), 3000)
    setTimeout(drawBWsChart, 3000)
}

function drawBWsChart() {

    const bodyweights = JSON.parse(sessionStorage.getItem("bodyweights"))

    $('.bodyweight-container').show()
    $('.bodyweight-chart-container').show()

    const data = new google.visualization.DataTable()
    data.addColumn('date', 'Date')
    data.addColumn('number', 'Weight')

    bodyweights.forEach(bodyweight => {
        const date = new Date(bodyweight.date)
        data.addRow([new Date(date.getTime() - date.getTimezoneOffset() * -60000), bodyweight.weight])
    })

    const options = {
        title: 'Body Weight',
        legend: {
            position: 'right'
        },
        vAxis: {
            title: 'Weight in Pounds'
        },
        interpolateNulls: true,
        focusTarget: 'category'
    }

    const chart = new google.visualization.LineChart(document.getElementById('bodyweights-chart'))

    chart.draw(data, options)
}
