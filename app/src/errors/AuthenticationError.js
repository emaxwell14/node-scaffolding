
class AuthentificationError extends Error {
    constructor(message = 'User is not authenticated.') {
        super(message);
        this.type = 'AUTHENTIFICATION';
    }
}

module.exports = AuthentificationError;

