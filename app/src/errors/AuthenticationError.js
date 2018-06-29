
class AuthenticationError extends Error {
    constructor() {
        super('User is not authenticated.');
        this.type = 'AUTHENTIFICATION';
    }
}

module.exports = AuthenticationError;

