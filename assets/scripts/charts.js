'use strict'

const config = require('./config')
const common = require('./commonUI')
const store = require('./store')

const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const maxUI = require('./max/ui')
const bodyweightUI = require('./bodyweight/ui')

import {GoogleCharts} from 'google-charts'

GoogleCharts.load(initializeMax)
GoogleCharts.load(initializeBW)
GoogleCharts.load(initializeCompare)

// Max Chart functions

function initializeMax() {
    // draw chart on click
    $('#show-maxes-chart').on('click', getAndDrawMaxes)
    $('.interval-dropdown').on('click', '.max-dropdown-item', maxChooseInterval)
}

function maxChooseInterval(event) {
    event.preventDefault()
    if (event.target.id === 'max-alltime') {
        onShowMaxChart(0)
    }
    if (event.target.id === 'max-1year') {
        onShowMaxChart(12)
    }
    if (event.target.id === 'max-1month') {
        onShowMaxChart(1)
        console.log(event.target.id)
    }
    if (event.target.id === 'max-3month') {
        onShowMaxChart(3)
    }
    if (event.target.id === 'max-6month') {
        onShowMaxChart(6)
    }
}

function maxShowAndHide() {
    $('.display-message').text('Loading...')
    $('.display-message').css('color', 'black')
    $('.max-container').show()
    $('.chart-container').show()
    $('.bodyweight-container').hide()
    $('.table-container').hide()
    $('.about-message').hide()
}

function getAndDrawMaxes(event) {
    event.preventDefault()
    maxShowAndHide()
    common.populateChartDropdown('max')
    const maxPromise = Promise.resolve($.ajax({
        url: config.apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    }))

    maxPromise
        .then(drawMaxesChart)
        .then(values => {
            store.maxes = values.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
        })
        .catch(failure)
}

function onShowMaxChart(interval) {
    maxShowAndHide()
    common.populateChartDropdown('max')
    // because drawMaxesChart is expecting an object with 'maxes' key
    const values = {}
    // default interval is all-time
    values.maxes = store.maxes
    // if we have an interval other than all-time, we filter for the last 'interval' months of data
    if (interval > 0) {
        values.maxes = store.maxes.filter(max => {
            const date = moment(max.date)
            const range = moment.rangeFromInterval('month', -interval, new Date())
            return date.within(range)
        })
    }
    drawMaxesChart(values)
}

function drawMaxesChart(values) {
    $('.display-message').html('&nbsp;')

    const maxes = values.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))

    const data = new GoogleCharts.api.visualization.DataTable()
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

    const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('maxes-chart'))

    function selectHandler() {
        const selectedItem = chart.getSelection()[0]
        if (selectedItem) {
            const date = data.getValue(selectedItem.row, 0)
            store.maxesLocation = store.maxes.findIndex(max => {
                const maxMoment = moment.utc(max.date).format("MMM Do YY")
                const selectedMoment = moment.utc(date).format("MMM Do YY")
                return maxMoment === selectedMoment
            })
            store.editMaxId = store.maxes[store.maxesLocation].id
            maxUI.showEditMax()
        }
    }

    GoogleCharts.api.visualization.events.addListener(chart, 'select', selectHandler)

    chart.draw(data, options)

    return values
}

// BW Chart Functions

function initializeBW() {
    // draw chart on click
    $('#show-bodyweights-chart').on('click', getAndDrawBWs)
    $('.interval-dropdown').on('click', '.bodyweight-dropdown-item', bodyweightChooseInterval)
}

function bodyweightChooseInterval(event) {
    event.preventDefault()
    if (event.target.id === 'bodyweight-alltime') {
        onShowBWChart(0)
    }
    if (event.target.id === 'bodyweight-1year') {
        onShowBWChart(12)
    }
    if (event.target.id === 'bodyweight-1month') {
        onShowBWChart(1)
        console.log(event.target.id)
    }
    if (event.target.id === 'bodyweight-3month') {
        onShowBWChart(3)
    }
    if (event.target.id === 'bodyweight-6month') {
        onShowBWChart(6)
    }
}

function bodyweightShowAndHide() {
    $('.display-message').text('Loading...')
    $('.display-message').css('color', 'black')
    $('.bodyweight-container').show()
    $('.bodyweight-chart-container').show()
    $('.max-container').hide()
    $('.bodyweight-table-container').hide()
    $('.about-message').hide()
}

function getAndDrawBWs(event) {
    event.preventDefault()
    bodyweightShowAndHide()
    common.populateChartDropdown('bodyweight')
    const bodyweightPromise = Promise.resolve($.ajax({
        url: config.apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    }))

    bodyweightPromise
        .then(drawBWsChart)
        .then(values => {
            store.bodyweights = values.bodyweights.sort((bodyweightA, bodyweightB) => new Date(bodyweightA.date) - new Date(bodyweightB.date))
        })
        .catch(failure)
}

function onShowBWChart(interval) {
    bodyweightShowAndHide()
    common.populateChartDropdown('bodyweight')
    const values = {}
    values.bodyweights = store.bodyweights
    if (interval > 0) {
        values.bodyweights = store.bodyweights.filter(bodyweight => {
            const date = moment(bodyweight.date)
            const range = moment.rangeFromInterval('month', -interval, new Date())
            return date.within(range)
        })
    }
    drawBWsChart(values)
}

function drawBWsChart(values) {
    $('.display-message').html('&nbsp;')

    const bodyweights = values.bodyweights.sort((bodyweightA, bodyweightB) => new Date(bodyweightA.date) - new Date(bodyweightB.date))

    const data = new GoogleCharts.api.visualization.DataTable()
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

    const chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('bodyweights-chart'))

    function selectHandler() {
        const selectedItem = chart.getSelection()[0]
        if (selectedItem) {
            const date = data.getValue(selectedItem.row, 0)
            store.bodyweightsLocation = store.bodyweights.findIndex(bodyweight => {
                const bodyweightMoment = moment.utc(bodyweight.date).format("MMM Do YY")
                const selectedMoment = moment.utc(date).format("MMM Do YY")
                return bodyweightMoment === selectedMoment
            })
            store.editBWId = store.bodyweights[store.bodyweightsLocation].id
            bodyweightUI.showEditBW()
        }
    }

    GoogleCharts.api.visualization.events.addListener(chart, 'select', selectHandler)

    chart.draw(data, options)

    return values
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
        url: config.apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    }))

    const maxPromise = Promise.resolve($.ajax({
        url: config.apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + store.user.token
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
