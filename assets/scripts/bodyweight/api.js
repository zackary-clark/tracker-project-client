'use strict'

const config = require('../config.js')
const store = require('../store.js')

const newBW = function (data) {
    return $.ajax({
        url: config.apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'POST',
        data
    })
}

const showBWs = function () {
    return $.ajax({
        url: config.apiUrl + '/bodyweights',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    })
}

const editBW = function (id, data) {
    return $.ajax({
        url: config.apiUrl + `/bodyweights/${id}`,
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'PATCH',
        data
    })
}

const deleteBW = function (id) {
    return $.ajax({
        url: config.apiUrl + `/bodyweights/${id}`,
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'DELETE'
    })
}

module.exports = {
    newBW,
    showBWs,
    editBW,
    deleteBW
}