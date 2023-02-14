const ValidationError = require('./validation-error');

class IdValidator {
    static validate(id) {
        if (typeof id !== 'number') {
            throw new ValidationError('id is not a number');
        }

        if (id < 0) {
            throw new ValidationError('id cannot be negative');
        }
    }
}

module.exports = IdValidator;