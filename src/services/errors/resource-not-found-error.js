class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = ResourceNotFoundError;