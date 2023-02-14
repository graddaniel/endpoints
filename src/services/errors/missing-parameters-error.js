class MissingParametersError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = MissingParametersError;