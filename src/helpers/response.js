
// Handle success here
exports.handleSuccess = async function (res, data = '', message = '') {
    return res.send({
        code: 200,
        message: message,
        data: data
    })
}
// Handle error here
exports.handleError = async function (res, message = '', status = 'ERROR') {
    return res.send({
        code: 403,
        message: message,
        status: status
    })
}
