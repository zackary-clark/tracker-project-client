'use strict'

const api = require('./api')
const ui = require('./ui')

const onShowCompareChart = function () {
    event.preventDefault()
    // make both API calls, and return as array: [maxes, bw]
    api.getBWAndMaxes()
        .then(ui.getBWAndMaxesSuccess)
        .catch(ui.failure)
}

module.exports = {
    onShowCompareChart
}