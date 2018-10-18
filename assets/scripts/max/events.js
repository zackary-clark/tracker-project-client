'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onNewMax = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.newMax(data)
        .then(ui.newMaxSuccess)
        .catch(ui.failure)
}

const onShowMaxes = function(event) {
    event.preventDefault()
    api.showMaxes()
        .then(ui.showMaxesSuccess)
        .catch(ui.failure)
}

const onShowEditMax = function (event) {
    event.preventDefault()
    store.editMaxId = event.target.parentNode.id
    ui.showEditMax()
}

// TODO: add current data as current value in form
const onEditMax = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.editMax(parseInt(store.editMaxId), data)
        .then(ui.editMaxSuccess)
        .catch(ui.failure)
}

module.exports = {
    onNewMax,
    onShowMaxes,
    onEditMax,
    onShowEditMax
}