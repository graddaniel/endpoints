class BusinessDomainError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = BusinessDomainError;