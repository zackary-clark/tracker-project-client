'use strict'

const authEvents = require('./auth/events')
const maxEvents = require('./max/events')
const bodyweightEvents = require('./bodyweight/events')
const common = require('./commonUI')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    // hide pieces which should be hidden upon refresh
    $('#show-change-password').hide()
    $('#sign-up-form').hide()
    $('#sign-out-button').hide()
    common.hideNavItems()
    $('#current-user').hide()
    common.hideMaxItems()
    common.hideBWItems()
    $('.navbar-toggler').css('visibility', 'hidden')

    // add event handlers for user api use
    $('#sign-up-form').on('submit', authEvents.onSignUp)
    $('#sign-in-form').on('submit', authEvents.onSignIn)
    $('#sign-up-button').on('click', authEvents.onShowSignUp)
    $('#change-password').on('submit', authEvents.onChangePassword)
    $('#sign-out-button').on('click', authEvents.onSignOut)

    // add event handlers for max
    $('#new-max-form').on('submit', maxEvents.onNewMax)
    $('#show-maxes-button').on('click', maxEvents.onShowMaxes)
    $('.maxes-table').on('click', maxEvents.onShowEditMax)
    $('#edit-max-form').on('submit', maxEvents.onEditMax)
    $('#delete-max-button').on('click', maxEvents.onDeleteMax)
    $('#new-max').on('click', maxEvents.onShowNewMax)
    $('#show-maxes-chart').on('click', maxEvents.onShowMaxChart)

    // add event handlers for bodyweight
    $('#new-bodyweight-form').on('submit', bodyweightEvents.onNewBW)
    $('#show-bodyweights-button').on('click', bodyweightEvents.onShowBWs)
    $('.bodyweights-table').on('click', bodyweightEvents.onShowEditBW)
    $('#edit-bodyweight-form').on('submit', bodyweightEvents.onEditBW)
    $('#delete-bodyweight-button').on('click', bodyweightEvents.onDeleteBW)
    $('#new-bodyweight').on('click', bodyweightEvents.onShowNewBW)
    $('#show-bodyweights-chart').on('click', bodyweightEvents.onShowBWChart)
})
