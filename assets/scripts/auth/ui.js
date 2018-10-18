'use strict'

const store = require('../store.js')

const signUpSuccess = function(data) {
    $('.display-message').html(`Successfully Registered!<br>Email: ${data.user.email}`)
    $('.display-message').css('color', 'green')
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#sign-up-button').show()
}

const signInSuccess = function(data) {
    $('.display-message').text('')
    $('#current-user').show()
    $('#current-user').text(`${data.user.email}`)
    store.user = data.user
    $('#sign-up-form').hide()
    $('#sign-in-form').hide()
    $('#sign-up-button').hide()
    $('#show-change-password').show()
    $('#sign-out-button').show()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#new-game').show()
    $('.navbar-toggler').css('visibility', 'visible')
}

const changePasswordSuccess = function() {
    $('.display-message').text('Successfully Changed Password!')
    $('.display-message').css('color', 'green')
    $('#change-password').trigger('reset')
    $('#change-password-modal').modal('hide')
}

const hideChangePassword = function () {
    $('#show-change-password').show()
    $('#change-password').hide()
    $('#new-game').show()
}

const showSignUp = function() {
    $('#sign-up-button').hide()
    $('#sign-up-form').show()
    $('#sign-in-form').show()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
}

const signOutSuccess = function() {
    clearDisplayMessage()
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#current-user').text('')
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#show-change-password').hide()
    $('#sign-out-button').hide()
    $('#new-game').hide()
    $('#current-user').hide()
    $('#sign-up-button').show()
    $('.navbar-toggler').css('visibility', 'hidden')
}

const failure = function() {
    $('.display-message').text('Authentication Request Failed!')
    $('.display-message').css('color', 'red')
}

const clearDisplayMessage = function () {
    $('.display-message').text('')
}

module.exports = {
    signUpSuccess,
    signInSuccess,
    failure,
    changePasswordSuccess,
    signOutSuccess,
    showSignUp,
    clearDisplayMessage,
    hideChangePassword
}
