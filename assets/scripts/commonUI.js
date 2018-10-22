'use strict'

const store = require('./store')

const resetForms = function() {
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#new-max-form').trigger('reset')
    $('#edit-max-form').trigger('reset')
    $('#new-bodyweight-form').trigger('reset')
    $('#edit-bodyweight-form').trigger('reset')
}

const showNavItems = function() {
    $('#show-maxes-dropdown').show()
    $('#show-bodyweights-dropdown').show()
}

const hideNavItems = function() {
    $('#show-maxes-dropdown').hide()
    $('#show-bodyweights-dropdown').hide()
}

const hideMaxTable = function() {
    $('.table-container').hide()
}

const hideMaxItems = function() {
    $('.table-container').hide()
    $('.chart-container').hide()
    $('.max-container').hide()
}

const hideBWItems = function() {
    $('.bodyweight-container').hide()
    $('.bodyweight-table-container').hide()
    $('.bodyweight-chart-container').hide()
}

const fadeAndClearDisplayMessage = function () {
    setTimeout(() => $('.display-message').html('&nbsp;'), 3000)
}

// TODO: refactor this so that only the required data is cleared/copied each time
const copyStoreToSessionStorage = function () {
    sessionStorage.setItem("maxes", JSON.stringify(store.maxes))
    sessionStorage.setItem("bodyweights", JSON.stringify(store.bodyweights))
}

module.exports = {
    resetForms,
    showNavItems,
    hideNavItems,
    hideMaxTable,
    fadeAndClearDisplayMessage,
    copyStoreToSessionStorage,
    hideMaxItems,
    hideBWItems
}