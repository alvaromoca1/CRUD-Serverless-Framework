const responseSuccess = ({ data, message }, statusCode = 200) => {
    return {
        success: true,
        data,
        message,
        statusCode
    };
}

const responseFail = ({ data, message }, statusCode = 500) => {
    return {
        success: false,
        data,
        message,
        statusCode
    };
}

module.exports = {
    responseSuccess,
    responseFail
}