'use strict'

const store = require('../store.js')
const common = require('../commonUI.js')

const signUpSuccess = function(data) {
    $('.display-message').html(`Successfully Registered!<br>Email: ${data.user.email}`)
    $('.display-message').css('color', 'green')
    common.resetForms()
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#sign-up-button').show()
}

const signInSuccess = function(data) {
    clearDisplayMessage()
    $('#current-user').show()
    $('#current-user').text(`${data.user.email}`)
    store.user = data.user
    $('.sign-in-up-container').hide()
    $('#show-change-password').show()
    $('#sign-out-button').show()
    common.resetForms()
    common.showNavItems()
    $('.navbar-toggler').css('visibility', 'visible')
}

const changePasswordSuccess = function() {
    $('.display-message').text('Successfully Changed Password!')
    $('.display-message').css('color', 'green')
    common.resetForms()
    $('#change-password-modal').modal('hide')
}

const hideChangePassword = function () {
    $('#show-change-password').show()
    $('#change-password').hide()
    common.showNavItems()
}

const showSignUp = function() {
    $('#sign-up-button').hide()
    $('#sign-up-form').show()
    $('#sign-in-form').show()
    common.resetForms()
}

const signOutSuccess = function() {
    clearDisplayMessage()
    $('.sign-in-up-container').show()
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#current-user').text('')
    common.resetForms()
    $('#show-change-password').hide()
    $('#sign-out-button').hide()
    common.hideNavItems()
    $('#current-user').hide()
    $('#sign-up-button').show()
    $('.table-container').hide()
    $('.navbar-toggler').css('visibility', 'hidden')
}

const failure = function() {
    $('.display-message').text('Authentication Request Failed!')
    $('.display-message').css('color', 'red')
    common.resetForms()
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
