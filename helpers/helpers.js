function convertStringToDate(dateString) {
    var arr = dateString.split('-');

    return new Date(arr[2], arr[1], arr[0]);
}

module.exports = {
    convertStringToDate
}