'use strict'

google.charts.load('current', {packages: ['corechart']})

google.charts.setOnLoadCallback(initializeMax)
google.charts.setOnLoadCallback(initializeBW)
google.charts.setOnLoadCallback(initializeCompare)

// We have to repeat the config file here, since we cannot require the file in a Google Charts file
let apiUrl = ''
const apiUrls = {
    production: 'https://infinite-coast-74819.herokuapp.com',
    development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

// Max Chart functions

function initializeMax() {
    // draw chart on click
    $('#show-maxes-chart').on('click', onShowMaxChart)
    // $('#new-max-submit').on('click', checkIfChartVisible)
}

function checkIfChartVisible() {
    event.preventDefault()
    if ($('.chart-container').css("display") === "block") {
        setTimeout(onShowMaxChart, 50)
    }
}

// TODO: Add ability to only show last 12, 6, 1 month(s) in chart
function onShowMaxChart() {
    event.preventDefault()
    $('.display-message').text('Loading...')
    $('.display-message').css('color', 'black')
    $('.max-container').show()
    $('.chart-container').show()
    $('.bodyweight-container').hide()
    $('.table-container').hide()
    $('.about-message').hide()

    const maxPromise = Promise.resolve($.ajax({
        url: apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        method: 'GET'
    }))

    maxPromise.then(drawMaxesChart, failure)
}

function drawMaxesChart(values) {
    $('.display-message').html('&nbsp;')

    const maxes = values.maxes
    maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))

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
    $('#show-bodyweights-chart').on('click', onShowBWChart)
    // $('#new-bodyweight-submit').on('click', checkIfBWChartVisible)
}

function checkIfBWChartVisible() {
    event.preventDefault()
    if ($('.bodyweight-chart-container').css("display") === "block") {
        // make sure the server recieves the POST before the GET
        setTimeout(onShowBWChart, 50)
    }
}

function onShowBWChart() {
    event.preventDefault()
    $('.display-message').text('Loading...')
    $('.display-message').css('color', 'black')
    $('.bodyweight-container').show()
    $('.bodyweight-chart-container').show()
    $('.max-container').hide()
    $('.bodyweight-table-container').hide()
    $('.about-message').hide()

    const bodyweightPromise = Promise.resolve($.ajax({
        url: apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        method: 'GET'
    }))

    bodyweightPromise.then(drawBWsChart, failure)
}

function drawBWsChart(values) {
    $('.display-message').html('&nbsp;')

    const bodyweights = values.bodyweights
    bodyweights.sort((bodyweightA, bodyweightB) => new Date(bodyweightA.date) - new Date(bodyweightB.date))

    const data = new google.visualization.DataTable()
    data.addColumn('date', 'Date')
    data.addColumn('number', 'Weight')
    data.addColumn({type: 'string', role: 'tooltip'})

    bodyweights.forEach(bodyweight => {
        const date = new Date(bodyweight.date)
        const correctedDate = new Date(date.getTime() - date.getTimezoneOffset() * -60000)
        const month = date.getUTCMonth() + 1
        const day = date.getUTCDate()
        const year = date.getUTCFullYear()
        const showDate = month + "/" + day + "/" + year
        const tooltipHTML = 
            `${showDate}
            Weight: ${bodyweight.weight}
            ${bodyweight.notes}`
        data.addRow([correctedDate, bodyweight.weight, tooltipHTML])
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
        tooltip: {isHtml: true}
    }

    const chart = new google.visualization.LineChart(document.getElementById('bodyweights-chart'))

    chart.draw(data, options)
}

// Compare Chart Functions

function initializeCompare() {
    $('#show-bodyweight-max-compare').on('click', onShowCompareChart)
}

function onShowCompareChart() {
    event.preventDefault()
    $('.display-message').text('LOADING...')
    $('.display-message').css('color', 'black')
    $('.bodyweight-container').hide()
    $('.max-container').hide()
    $('.about-message').hide()
    // cast ajax calls into JS Promises so we can use Promise.all
    const bodyweightPromise = Promise.resolve($.ajax({
        url: apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        method: 'GET'
    }))

    const maxPromise = Promise.resolve($.ajax({
        url: apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        method: 'GET'
    }))

    Promise.all([bodyweightPromise, maxPromise]).then(drawCompareChart, failure)
}

function drawCompareChart(values) {
    $('.display-message').html('&nbsp;')
    const bodyweights = values[0].bodyweights
    const maxes = values[1].maxes
    if (bodyweights.length >= 20 && maxes.length >= 20) {
        $('.display-message').text("Turns out this requires even more math than expected... Come back soon for this feature!")
        $('.display-message').css('color', 'black')
        setTimeout(() => $('.display-message').html('&nbsp;'), 5000)
        // TODO: Do interesting math to determine rate of change of 1RM vs BW
    } else {
        $('.display-message').text("You won't get anything useful from this feature with so little data!")
        $('.display-message').css('color', 'black')
        setTimeout(() => $('.display-message').html('&nbsp;'), 5000)
    }
}

function failure() {
    $('.display-message').text('API Call Failed!')
    $('.display-message').css('color', 'red')
    setTimeout(() => $('.display-message').html('&nbsp;'), 3000)
}
