const ValidationError = require('./validation-error');


class LimitValidator {
    static validate(limit) {
        if (typeof limit !== 'number' || isNaN(limit)) {
            throw new ValidationError('Limit is not a number');
        }

        if (limit < 0) {
            throw new ValidationError('Limit must be positive');
        }
    }
}

module.exports = LimitValidator;