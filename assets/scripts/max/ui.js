'use strict'

const common = require('../commonUI.js')
const store = require('../store')

const maxTableIdAddIn = "-maxes"

// TODO: make entries editable from chart view

const showNewMax = function () {
    $('#new-max-modal').modal('show')
    $('#new-max-date').attr('value', parseDateForDefault(new Date()))
}

const newMaxSuccess = function(data) {
    $('.display-message').text('New Max Submit Success!')
    $('.display-message').css('color', 'green')
    common.fadeAndClearDisplayMessage()
    common.resetForms()
    $('#new-max-date').attr('value', parseDateForDefault(new Date()))
    // redraw table if the table is currently visible
    if (store.maxes) {
        store.maxes.push(data.max)
        store.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
        common.copyStoreToSessionStorage()
    }
    if ($('.table-container').css("display") === "block") {
        redrawMaxTableAfterEdit()
    }
    $('#new-max-multiple-entry').is(':checked') ? '' : $('#new-max-modal').modal('hide')
}

const newMaxDateMatch = function () {
    $('.display-message').text('I told you not to use the same date twice!')
    $('.display-message').css('color', 'red')
    $('#new-max-date').addClass('is-invalid')
    setTimeout(() => $('#new-max-date').removeClass('is-invalid'), 3000)
    common.fadeAndClearDisplayMessage()
}

const newEditDateMatch = function () {
    $('.display-message').text('I told you not to use the same date twice!')
    $('.display-message').css('color', 'red')
    $('#edit-max-date').addClass('is-invalid')
    setTimeout(() => $('#edit-max-date').removeClass('is-invalid'), 3000)
    common.fadeAndClearDisplayMessage()
}

const showMaxesSuccess = function(data) {
    store.maxes = data.maxes
    store.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
    common.copyStoreToSessionStorage()
    $('.maxes-table').html('')
    $('.table-container').show()
    $('.chart-container').hide()
    $('.max-container').show()
    store.maxes.length > 0 ? store.maxes.forEach(populateMaxesTable) : drawEmptyTable()
}

const drawEmptyTable = function () {
    $('.maxes-table').append('You have no 1RM entered yet!')
}

const showChartSuccess = function (data) {
    store.maxes = data.maxes
    store.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
    common.copyStoreToSessionStorage()
}

const showEditMax = function () {
    $('#edit-max-modal').modal('show')
    $('#edit-max-date').attr('value', store.maxes[store.maxesLocation].date.slice(0, 10))
    $('#edit-max-squat').attr('value', store.maxes[store.maxesLocation].squat1RM)
    $('#edit-max-bench').attr('value', store.maxes[store.maxesLocation].bench1RM)
    $('#edit-max-deadlift').attr('value', store.maxes[store.maxesLocation].deadlift1RM)
    $('#edit-max-press').attr('value', store.maxes[store.maxesLocation].press1RM)
}

const redrawMaxTableAfterEdit = function () {
    showMaxesSuccess(store)
    $('#edit-max-modal').modal('hide')
    common.resetForms()
}

const editMaxSuccess = function (data) {
    store.maxes[store.maxesLocation] = data.max
    redrawMaxTableAfterEdit()
    common.copyStoreToSessionStorage()
}

const deleteMaxSuccess = function () {
    store.maxes.splice(store.maxesLocation, 1)
    redrawMaxTableAfterEdit()
    common.copyStoreToSessionStorage()
}

const populateMaxesTable = function (max) {
    const maxesHTML = (`
        <tr id="${max.id}${maxTableIdAddIn}">
            ${populateTableInnerHTML(max)}
        </tr>`)
    $('.maxes-table').append(maxesHTML)
}

const populateTableInnerHTML = function (max) {
    return `<td>${parseDateForDisplay(max.date)}</td>
    <td>${max.squat1RM ? max.squat1RM : ''}</td>
    <td>${max.bench1RM ? max.bench1RM : ''}</td>
    <td>${max.deadlift1RM ? max.deadlift1RM : ''}</td>
    <td>${max.press1RM ? max.press1RM : ''}</td>`
}

const parseDateForDisplay = function (date) {
    const month = date.slice(5, 7)
    let monthString = ''
    switch (month) {
        case '01':
            monthString = 'Jan'
            break
        case '02':
            monthString = 'Feb'
            break
        case '03':
            monthString = 'Mar'
            break
        case '04':
            monthString = 'Apr'
            break
        case '05':
            monthString = 'May'
            break
        case '06':
            monthString = 'Jun'
            break
        case '07':
            monthString = 'Jul'
            break
        case '08':
            monthString = 'Aug'
            break
        case '09':
            monthString = 'Sep'
            break
        case '10':
            monthString = 'Oct'
            break
        case '11':
            monthString = 'Nov'
            break
        case '12':
            monthString = 'Dec'
            break
        default:
            monthString = "Something's gone horribly wrong. There are only 12 months."
    }
    return `${monthString} ${date.slice(8, 10)}, ${date.slice(0, 4)}`
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
    $('.display-message').text('Max API Call Failed!')
    $('.display-message').css('color', 'red')
    common.fadeAndClearDisplayMessage()
}

module.exports = {
    newMaxSuccess,
    failure,
    showMaxesSuccess,
    editMaxSuccess,
    showEditMax,
    deleteMaxSuccess,
    showNewMax,
    showChartSuccess,
    newMaxDateMatch,
    newEditDateMatch
}