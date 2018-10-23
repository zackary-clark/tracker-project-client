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
        .then(function() {
            $.ajax({
                type: "GET",
                url: "public/Measurement-Summary-2012-07-15-to-2018-10-23.csv",
                dataType: "text",
                success: function(data) {processData(data)}
            })
        })
        .catch(ui.failure)
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/)
    var headers = allTextLines[0].split(',')
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',')
        if (data.length == headers.length) {

            var tarr = []
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j])
            }
            lines.push(tarr)
        }
    }
    store.lines = lines
    console.log(lines)
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