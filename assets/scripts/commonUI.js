'use strict'

const store = require('./store')

const resetForms = function() {
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#new-max-form').trigger('reset')
    $('#edit-max-form').trigger('reset')
}

const showNavItems = function() {
    $('#show-maxes-dropdown').show()
}

const hideNavItems = function() {
    $('#show-maxes-dropdown').hide()
}

const hideMaxTable = function() {
    $('.table-container').hide()
}

const hideMaxItems = function() {
    $('.table-container').hide()
    $('.chart-container').hide()
    $('.max-container').hide()
}

const fadeAndClearDisplayMessage = function () {
    setTimeout(() => $('.display-message').html('&nbsp;'), 3000)
}

const copyStoreToSessionStorage = function () {
    sessionStorage.clear()
    sessionStorage.setItem("maxes", JSON.stringify(store.maxes))
}

module.exports = {
    resetForms,
    showNavItems,
    hideNavItems,
    hideMaxTable,
    fadeAndClearDisplayMessage,
    copyStoreToSessionStorage,
    hideMaxItems
}