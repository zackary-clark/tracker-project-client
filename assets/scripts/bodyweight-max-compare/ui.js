'use strict'

const common = require('../commonUI')

const getBWAndMaxesSuccess = function (bodyweights, maxes) {
    console.log('ui call')
}

const failure = function () {
    $('.display-message').text('API Call Failed!')
    $('.display-message').css('color', 'red')
    common.fadeAndClearDisplayMessage()
}

module.exports = {
    getBWAndMaxesSuccess,
    failure
}