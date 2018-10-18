'use strict'

const resetForms = function() {
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#new-max-form').trigger('reset')
    $('#edit-max-form').trigger('reset')
}

const showNavItems = function() {
    $('#new-max').show()
    $('#show-maxes-button').show()
}

const hideNavItems = function() {
    $('#new-max').hide()
    $('#show-maxes-button').hide()
}

module.exports = {
    resetForms,
    showNavItems,
    hideNavItems
}