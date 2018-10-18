'use strict'

const authEvents = require('./auth/events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    // hide pieces which should be hidden upon refresh
    $('#show-change-password').hide()
    $('#sign-up-form').hide()
    $('#sign-out-button').hide()
    $('#new-game').hide()
    $('#current-user').hide()
    $('.navbar-toggler').css('visibility', 'hidden')

    // add event handlers for user api use
    $('#sign-up-form').on('submit', authEvents.onSignUp)
    $('#sign-in-form').on('submit', authEvents.onSignIn)
    $('#sign-up-button').on('click', authEvents.onShowSignUp)
    $('#change-password').on('submit', authEvents.onChangePassword)
    $('#sign-out-button').on('click', authEvents.onSignOut)
})
