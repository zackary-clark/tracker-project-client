'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onNewBW = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    if (store.bodyweights.every(bodyweight => bodyweight.date.slice(0, 10) !== data.bodyweight.date)) {
        api.newBW(data)
            .then(ui.newBWSuccess)
            .catch(ui.failure)
    } else {
        ui.newBWDateMatch()
    }
}

const onShowBWs = function(event) {
    event.preventDefault()
    api.showBWs()
        .then(ui.showBWsSuccess)
        .catch(ui.failure)
}

const onShowEditBW = function (event) {
    event.preventDefault()
    store.editBWId = parseInt(event.target.parentNode.id)
    store.bodyweightsLocation = store.bodyweights.findIndex(element => element.id === store.editBWId)
    if (store.editBWId) {
        ui.showEditBW()
    }
}

const onShowNewBW = function (event) {
    event.preventDefault()
    ui.showNewBW()
}

const onEditBW = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    if (store.bodyweights.filter((bodyweight, index) => index !== store.bodyweightsLocation).every(bodyweight => bodyweight.date.slice(0, 10) !== data.bodyweight.date)) {
        api.editBW(store.editBWId, data)
            .then(ui.editBWSuccess)
            .catch(ui.failure)
    } else {
        ui.newEditDateMatch()
    }
}

const onDeleteBW = function (event) {
    event.preventDefault()
    api.deleteBW(store.editBWId)
        .then(ui.deleteBWSuccess)
        .catch(ui.failure)
}

module.exports = {
    onNewBW,
    onShowBWs,
    onEditBW,
    onShowEditBW,
    onDeleteBW,
    onShowNewBW
}