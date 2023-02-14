class NotAllowedError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = NotAllowedError;