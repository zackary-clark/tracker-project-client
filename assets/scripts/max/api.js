'use strict'

const config = require('../config.js')
const store = require('../store.js')

const newMax = function (data) {
    return $.ajax({
        url: config.apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'POST',
        data
    })
}

const showMaxes = function () {
    return $.ajax({
        url: config.apiUrl + '/maxes',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    })
}

const editMax = function (id, data) {
    return $.ajax({
        url: config.apiUrl + `/maxes/${id}`,
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'PATCH',
        data
    })
}

module.exports = {
    newMax,
    showMaxes,
    editMax
}