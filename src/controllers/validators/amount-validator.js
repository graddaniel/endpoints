const ValidationError = require('./validation-error');

class AmountValidator {
    static validate(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new ValidationError('amount is not a number');
        }

        if (amount <= 0) {
            throw new ValidationError('amount is not a positive value');
        }
    }
}

module.exports = AmountValidator;