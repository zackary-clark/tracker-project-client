'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const common = require('../commonUI')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onNewMax = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    if (store.maxes.every(max => max.date.slice(0, 10) !== data.max.date)) {
        api.newMax(data)
            .then(ui.newMaxSuccess)
            .catch(ui.failure)
    } else {
        common.dateMatch()
    }
}

const onShowMaxes = function(event) {
    event.preventDefault()
    api.showMaxes()
        .then(ui.showMaxesSuccess)
        .catch(ui.failure)
}

const onShowEditMax = function (event) {
    event.preventDefault()
    store.editMaxId = parseInt(event.target.parentNode.id)
    store.maxesLocation = store.maxes.findIndex(element => element.id === store.editMaxId)
    ui.showEditMax()
}

const onShowNewMax = function (event) {
    event.preventDefault()
    ui.showNewMax()
}

const onEditMax = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    if (store.maxes.filter((max, index) => index !== store.maxesLocation).every(max => max.date.slice(0, 10) !== data.max.date)) {
        api.editMax(store.editMaxId, data)
            .then(ui.editMaxSuccess)
            .catch(ui.failure)
    } else {
        common.dateMatch()
    }
}

const onDeleteMax = function (event) {
    event.preventDefault()
    api.deleteMax(store.editMaxId)
        .then(ui.deleteMaxSuccess)
        .catch(ui.failure)
}

module.exports = {
    onNewMax,
    onShowMaxes,
    onEditMax,
    onShowEditMax,
    onDeleteMax,
    onShowNewMax
}