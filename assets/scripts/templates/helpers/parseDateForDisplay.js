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

module.exports = parseDateForDisplay