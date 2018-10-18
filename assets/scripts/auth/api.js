'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = function(data) {
    return $.ajax({
        url: config.apiUrl + '/sign-up',
        method: 'POST',
        data
    })
}

const signIn = function(data) {
    return $.ajax({
        url: config.apiUrl + '/sign-in',
        method: 'POST',
        data
    })
}

const changePassword = function(data) {
    return $.ajax({
        url: config.apiUrl + '/change-password',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'PATCH',
        data
    })
}

const signOut = function() {
    return $.ajax({
        url: config.apiUrl + '/sign-out',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'DELETE'
    })
}

module.exports = {
    signUp,
    signIn,
    changePassword,
    signOut
}
