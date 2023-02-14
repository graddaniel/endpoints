const ValidationError = require('./validation-error');


const DATE_REGEXP = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;

class DateValidator {
    static validate(date) {
        if (typeof date !== 'string') {
            throw new ValidationError('Date is not a string');
        }

        if (!DATE_REGEXP.test(date)) {
            throw new ValidationError(
                'Incorrect date format. Expected YYYY-MM-DD'
            );
        }
    }
}

module.exports = DateValidator;