
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.type = 'NOT_FOUND';
    }
}

module.exports = NotFoundError;

