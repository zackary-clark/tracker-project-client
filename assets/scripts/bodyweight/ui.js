'use strict'

const common = require('../commonUI.js')
const store = require('../store')
const showBWsTemplate = require('../templates/bodyweight-table.handlebars')

// TODO: make entries editable from chart view

const showNewBW = function () {
    $('#new-bodyweight-modal').modal('show')
    $('#new-bodyweight-date').attr('value', parseDateForDefault(new Date()))
}

const newBWSuccess = function(data) {
    $('.display-message').text('New BW Submit Success!')
    $('.display-message').css('color', 'green')
    common.fadeAndClearDisplayMessage()
    common.resetForms()
    $('#new-bodyweight-date').attr('value', parseDateForDefault(new Date()))
    // redraw table if the table is currently visible
    if (store.bodyweights) {
        store.bodyweights.push(data.bodyweight)
        store.bodyweights.sort((bodyweightA, bodyweightB) => new Date(bodyweightA.date) - new Date(bodyweightB.date))
        // sessionStorage.setItem("bodyweights", JSON.stringify(store.bodyweights))
    }
    if ($('.bodyweight-table-container').css("display") === "block") {
        redrawBWTableAfterEdit()
    }
    $('#new-bodyweight-multiple-entry').is(':checked') ? '' : $('#new-bodyweight-modal').modal('hide')
}

const newBWDateMatch = function () {
    $('.display-message').text('I told you not to use the same date twice!')
    $('.display-message').css('color', 'red')
    $('#new-bodyweight-date').addClass('is-invalid')
    setTimeout(() => $('#new-bodyweight-date').removeClass('is-invalid'), 3000)
    common.fadeAndClearDisplayMessage()
}

const newEditDateMatch = function () {
    $('.display-message').text('I told you not to use the same date twice!')
    $('.display-message').css('color', 'red')
    $('#edit-bodyweight-date').addClass('is-invalid')
    setTimeout(() => $('#edit-bodyweight-date').removeClass('is-invalid'), 3000)
    common.fadeAndClearDisplayMessage()
}

const showBWsSuccess = function(data) {
    store.bodyweights = data.bodyweights
    store.bodyweights.sort((bodyweightA, bodyweightB) => new Date(bodyweightA.date) - new Date(bodyweightB.date))
    // sessionStorage.setItem("bodyweights", JSON.stringify(store.bodyweights))
    $('.bodyweights-table').html('')
    $('.bodyweight-table-container').show()
    $('.bodyweight-chart-container').hide()
    $('.max-container').hide()
    $('.bodyweight-container').show()
    let showBWsHtml = ''
    store.bodyweights.length > 0 ? showBWsHtml = showBWsTemplate({ bodyweights: store.bodyweights }) : drawEmptyTable()
    $('.bodyweights-table').append(showBWsHtml)
}

const drawEmptyTable = function () {
    $('.bodyweights-table').append('You have no 1RM entered yet!')
}

const showEditBW = function () {
    $('#edit-bodyweight-modal').modal('show')
    $('#edit-bodyweight-date').attr('value', store.bodyweights[store.bodyweightsLocation].date.slice(0, 10))
    $('#edit-bodyweight-weight').attr('value', store.bodyweights[store.bodyweightsLocation].weight)
    $('#edit-bodyweight-notes').attr('value', store.bodyweights[store.bodyweightsLocation].notes)
}

const redrawBWTableAfterEdit = function () {
    showBWsSuccess(store)
    $('#edit-bodyweight-modal').modal('hide')
    common.resetForms()
}

const editBWSuccess = function (data) {
    store.bodyweights[store.bodyweightsLocation] = data.bodyweight
    redrawBWTableAfterEdit()
    // sessionStorage.setItem("bodyweights", JSON.stringify(store.bodyweights))
}

const deleteBWSuccess = function () {
    store.bodyweights.splice(store.bodyweightsLocation, 1)
    redrawBWTableAfterEdit()
    // sessionStorage.setItem("bodyweights", JSON.stringify(store.bodyweights))
}

const parseDateForDefault = function (dateObject) {
    const date = dateObject.toDateString()
    const monthString = date.slice(4, 7)
    let month = '01'
    switch (monthString) {
        case 'Jan':
            month = '01'
            break
        case 'Feb':
            month = '02'
            break
        case 'Mar':
            month = '03'
            break
        case 'Apr':
            month = '04'
            break
        case 'May':
            month = '05'
            break
        case 'Jun':
            month = '06'
            break
        case 'Jul':
            month = '07'
            break
        case 'Aug':
            month = '08'
            break
        case 'Sep':
            month = '09'
            break
        case 'Oct':
            month = '10'
            break
        case 'Nov':
            month = '11'
            break
        case 'Dec':
            month = '12'
            break
        default:
            month = "Something's gone horribly wrong. There are only 12 months."
    }
    let parsedDate = ''
    parsedDate += date.slice(11, 15) + '-' + month + '-' + date.slice(8, 10)
    return parsedDate
}

const failure = function() {
    $('.display-message').text('BW API Call Failed!')
    $('.display-message').css('color', 'red')
    common.fadeAndClearDisplayMessage()
}

module.exports = {
    newBWSuccess,
    failure,
    showBWsSuccess,
    editBWSuccess,
    showEditBW,
    deleteBWSuccess,
    showNewBW,
    newBWDateMatch,
    newEditDateMatch
}