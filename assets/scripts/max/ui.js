'use strict'

const common = require('../commonUI.js')
const store = require('../store')

const maxTableIdAddIn = "-maxes"

const newMaxSuccess = function() {
    $('.display-message').text('New Max Submit Success!')
    $('.display-message').css('color', 'green')
    common.resetForms()
}

const showMaxesSuccess = function(data) {
    store.maxes = data.maxes
    store.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
    $('.maxes-table').html('')
    $('.table-container').show()
    store.maxes.forEach(populateMaxesTable)
}

const showEditMax = function () {
    $('#edit-max-modal').modal('show')
}

const editMaxSuccess = function (data) {
    store.maxes.sort((maxA, maxB) => maxA.id - maxB.id)
    store.maxes[data.max.id - 1] = data.max
    store.maxes.sort((maxA, maxB) => new Date(maxA.date) - new Date(maxB.date))
    showMaxesSuccess(store)
    $('#edit-max-modal').modal('hide')
    common.resetForms()
    $('.display-message').hide()
    // $(`#${data.max.id}${maxTableIdAddIn}`).html(populateTableInnerHTML(data.max))
}

const populateMaxesTable = function (max) {
    const maxesHTML = (`
        <tr id="${max.id}${maxTableIdAddIn}">
            ${populateTableInnerHTML(max)}
        </tr>`)
    $('.maxes-table').append(maxesHTML)
}

const populateTableInnerHTML = function (max) {
    return `<td>${parseDate(max.date)}</td>
    <td>${max.squat1RM ? max.squat1RM : 'None'}</td>
    <td>${max.bench1RM ? max.bench1RM : 'None'}</td>
    <td>${max.deadlift1RM ? max.deadlift1RM : 'None'}</td>
    <td>${max.press1RM ? max.press1RM : 'None'}</td>`
}

const parseDate = function (date) {
    // 2018-01-01T00:00:00.000Z
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
            monthString = "Something's gone horrible wrong. There are only 12 months."
    }
    return `${monthString} ${date.slice(8, 10)}, ${date.slice(0, 4)}`
}

const failure = function() {
    $('.display-message').text('Max API Call Failed!')
    $('.display-message').css('color', 'red')
    common.resetForms()
}

module.exports = {
    newMaxSuccess,
    failure,
    showMaxesSuccess,
    editMaxSuccess,
    showEditMax
}