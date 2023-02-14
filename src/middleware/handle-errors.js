const { StatusCodes } = require('http-status-codes');

const BusinessDomainError = require('../services/errors/business-domain-error');
const NotAllowedError = require('../services/errors/not-allowed-error');
const ResourceNotFoundError = require('../services/errors/resource-not-found-error');
const MissingParametersError = require('../services/errors/missing-parameters-error');

function handleErrors(error, req, res, next) {
    let response = error.message;
    let httpCode = StatusCodes.INTERNAL_SERVER_ERROR;

    switch(error.constructor) {
        case BusinessDomainError:
            httpCode = StatusCodes.CONFLICT;
            break;
        case NotAllowedError:
            httpCode = StatusCodes.FORBIDDEN;
            break;
        case ResourceNotFoundError:
            httpCode = StatusCodes.NOT_FOUND;
            break;
        case MissingParametersError:
            httpCode = StatusCodes.BAD_REQUEST;
        default:
            response = 'Unexpected error'
            console.error(error);
    }

    res.status(httpCode).send(response);
}

module.exports = handleErrors;