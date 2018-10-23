'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onSignUp = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.signUp(data)
        .then(ui.signUpSuccess)
        .catch(ui.failure)
}

const onSignIn = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.signIn(data)
        .then(ui.signInSuccess)
        .catch(ui.failure)
}

const onShowChangePassword = function (event) {
    event.preventDefault()
    ui.showChangePassword()
}

const onHideChangePassword = function (event) {
    event.preventDefault()
    ui.hideChangePassword()
}

const onChangePassword = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.changePassword(data)
        .then(ui.changePasswordSuccess)
        .catch(ui.failure)
}

const onSignOut = function(event) {
    event.preventDefault()
    api.signOut()
        .then(ui.signOutSuccess)
        .catch(ui.failure)
    store.user = {}
}

const onShowSignUp = function(event) {
    event.preventDefault()
    ui.showSignUp()
}

module.exports = {
    onSignUp,
    onSignIn,
    onChangePassword,
    onSignOut,
    onShowChangePassword,
    onHideChangePassword,
    onShowSignUp
}